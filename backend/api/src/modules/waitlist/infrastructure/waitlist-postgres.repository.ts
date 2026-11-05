import { Inject, Injectable, ServiceUnavailableException } from "@nestjs/common";
import type { Pool } from "pg";
import { randomUUID } from "node:crypto";
import { DATABASE_POOL } from "../../../platform/database/database.tokens";
import type { CreateWaitlistEntry, WaitlistRepository } from "../domain/waitlist.types";

@Injectable()
export class WaitlistPostgresRepository implements WaitlistRepository {
  constructor(@Inject(DATABASE_POOL) private readonly pool: Pool | null) {}

  async createWithVerification(entry: CreateWaitlistEntry): Promise<"created" | "already_registered"> {
    if (!this.pool) {
      throw new ServiceUnavailableException("Waitlist persistence is not configured.");
    }

    const client = await this.pool.connect();
    const entryId = randomUUID();
    const outboxId = randomUUID();
    try {
      await client.query("BEGIN");
      const inserted = await client.query(
        `insert into acquisition.waitlist_entries
          (id, email_normalized, email_display, market_code, is_adult_confirmed,
           consent_purpose, consent_version, consented_at, verification_token_hash,
           verification_expires_at)
         values ($1, $2, $2, $3, $4, $5, $6, $7, $8, $9)
         on conflict (email_normalized) do nothing
         returning id`,
        [entryId, entry.email, entry.email, entry.marketCode, entry.isAdultConfirmed,
          entry.consentPurpose, entry.consentVersion, entry.consentedAt,
          entry.verificationTokenHash, entry.verificationExpiresAt],
      );

      if (inserted.rowCount === 0) {
        await client.query("ROLLBACK");
        return "already_registered";
      }

      await client.query(
        `insert into acquisition.waitlist_email_outbox
          (id, waitlist_entry_id, message_type, payload)
         values ($1, $2, 'VERIFY_EMAIL', $3::jsonb)`,
        [outboxId, entryId, JSON.stringify({
          email: entry.email,
          verificationTokenEncrypted: entry.verificationTokenEncrypted,
        })],
      );
      await client.query("COMMIT");
      return "created";
    } catch (error: unknown) {
      await client.query("ROLLBACK").catch(() => undefined);
      const code = typeof error === "object" && error !== null && "code" in error
        ? String(error.code) : "unknown";
      throw new ServiceUnavailableException(`Waitlist persistence failed (database code: ${code}).`);
    } finally {
      client.release();
    }
  }

  async confirmByTokenHash(tokenHash: string): Promise<boolean> {
    if (!this.pool) {
      throw new ServiceUnavailableException("Waitlist persistence is not configured.");
    }

    const result = await this.pool.query(
      `update acquisition.waitlist_entries
          set status = 'CONFIRMED',
              verified_at = now(),
              verification_token_hash = null,
              updated_at = now()
        where verification_token_hash = $1
          and status = 'PENDING_VERIFICATION'
          and verification_expires_at > now()
        returning id`,
      [tokenHash],
    );

    return result.rowCount === 1;
  }
}
