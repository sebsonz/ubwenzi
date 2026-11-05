import { createDecipheriv } from "node:crypto";
import type { Pool } from "pg";
import type { EmailProvider } from "./email-provider";

interface OutboxMessage {
  id: string;
  waitlist_entry_id: string;
  payload: { email?: string; verificationTokenEncrypted?: string };
  attempts: number;
}

function decryptToken(encrypted: string, key: Buffer): string {
  const [version, ivText, tagText, ciphertextText] = encrypted.split(":");
  if (version !== "v1" || !ivText || !tagText || !ciphertextText) {
    throw new Error("WAITLIST_TOKEN_FORMAT_INVALID");
  }
  const decipher = createDecipheriv("aes-256-gcm", key, Buffer.from(ivText, "base64url"));
  decipher.setAuthTag(Buffer.from(tagText, "base64url"));
  return Buffer.concat([
    decipher.update(Buffer.from(ciphertextText, "base64url")),
    decipher.final(),
  ]).toString("utf8");
}

export class WaitlistOutboxWorker {
  private readonly encryptionKey: Buffer;
  private readonly publicWebUrl: string;

  constructor(
    private readonly pool: Pool,
    private readonly emailProvider: EmailProvider,
    encryptionKeyBase64: string,
    publicWebUrl: string,
  ) {
    this.encryptionKey = Buffer.from(encryptionKeyBase64, "base64");
    if (this.encryptionKey.length !== 32) {
      throw new Error("WAITLIST_OUTBOX_ENCRYPTION_KEY must decode to exactly 32 bytes.");
    }
    this.publicWebUrl = publicWebUrl.replace(/\/$/, "");
  }

  async processBatch(batchSize = 10): Promise<number> {
    const client = await this.pool.connect();
    let processed = 0;
    try {
      await client.query("BEGIN");
      const result = await client.query<OutboxMessage>(
        `select id, waitlist_entry_id, payload, attempts
           from acquisition.waitlist_email_outbox
          where status in ('PENDING', 'FAILED')
            and available_at <= now()
            and attempts < 5
          order by created_at
          for update skip locked
          limit $1`,
        [batchSize],
      );

      for (const message of result.rows) {
        await client.query(
          `update acquisition.waitlist_email_outbox
              set status = 'PROCESSING', attempts = attempts + 1
            where id = $1`,
          [message.id],
        );
      }
      await client.query("COMMIT");

      for (const message of result.rows) {
        processed += 1;
        await this.deliver(message);
      }
      return processed;
    } catch (error) {
      await client.query("ROLLBACK").catch(() => undefined);
      throw error;
    } finally {
      client.release();
    }
  }

  private async deliver(message: OutboxMessage): Promise<void> {
    try {
      const email = message.payload.email;
      const encrypted = message.payload.verificationTokenEncrypted;
      if (!email || !encrypted) throw new Error("WAITLIST_OUTBOX_PAYLOAD_INVALID");

      const token = decryptToken(encrypted, this.encryptionKey);
      const url = new URL("/waitlist/verify", this.publicWebUrl);
      url.searchParams.set("token", token);

      await this.emailProvider.sendVerification({
        to: email,
        verificationUrl: url.toString(),
      });

      await this.pool.query(
        `update acquisition.waitlist_email_outbox
            set status = 'SENT', sent_at = now(), payload = '{}'::jsonb,
                last_error_code = null
          where id = $1 and status = 'PROCESSING'`,
        [message.id],
      );
    } catch (error: unknown) {
      const code = error instanceof Error && /^[A-Z0-9_]+$/.test(error.message)
        ? error.message.slice(0, 80)
        : "DELIVERY_FAILED";
      const nextAttempt = message.attempts + 1;
      const delaySeconds = Math.min(3600, 30 * (2 ** Math.max(0, nextAttempt - 1)));
      await this.pool.query(
        `update acquisition.waitlist_email_outbox
            set status = case when attempts >= 5 then 'FAILED' else 'PENDING' end,
                available_at = now() + ($2::text || ' seconds')::interval,
                last_error_code = $3
          where id = $1 and status = 'PROCESSING'`,
        [message.id, delaySeconds, code],
      );
    }
  }
}
