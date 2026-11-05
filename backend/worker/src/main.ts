import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import dotenv from "dotenv";
import { Pool } from "pg";
import { ResendEmailProvider } from "./waitlist/email-provider";
import { WaitlistOutboxWorker } from "./waitlist/outbox-worker";

dotenv.config({ path: resolve(__dirname, "../.env") });

async function main(): Promise<void> {
  const databaseUrl = process.env["DATABASE_URL"];
  const encryptionKey = process.env["WAITLIST_OUTBOX_ENCRYPTION_KEY"];
  const resendApiKey = process.env["RESEND_API_KEY"];
  const emailFrom = process.env["EMAIL_FROM"];
  const publicWebUrl = process.env["PUBLIC_WEB_URL"];

  if (!databaseUrl || !encryptionKey || !resendApiKey || !emailFrom || !publicWebUrl) {
    throw new Error("Worker configuration incomplete: DATABASE_URL, WAITLIST_OUTBOX_ENCRYPTION_KEY, RESEND_API_KEY, EMAIL_FROM and PUBLIC_WEB_URL are required.");
  }

  const sslEnabled = process.env["DATABASE_SSL"] !== "false";
  const caPath = process.env["DATABASE_CA_CERT_PATH"];
  const pool = new Pool({
    connectionString: databaseUrl,
    max: Number(process.env["DATABASE_POOL_MAX"] ?? 5),
    connectionTimeoutMillis: 5000,
    ...(sslEnabled
      ? {
          ssl: {
            ...(caPath ? { ca: readFileSync(resolve(caPath), "utf8") } : {}),
            rejectUnauthorized: true,
          },
        }
      : {}),
  });

  const worker = new WaitlistOutboxWorker(
    pool,
    new ResendEmailProvider(resendApiKey, emailFrom),
    encryptionKey,
    publicWebUrl,
  );

  let stopping = false;
  const stop = (): void => { stopping = true; };
  process.once("SIGINT", stop);
  process.once("SIGTERM", stop);

  try {
    while (!stopping) {
      const count = await worker.processBatch();
      if (count === 0) {
        await new Promise((resolveDelay) => setTimeout(resolveDelay, 3000));
      }
    }
  } finally {
    await pool.end();
  }
}

void main().catch((error: unknown) => {
  const code = error instanceof Error ? error.message : "WORKER_START_FAILED";
  process.stderr.write(`UBWENZI worker stopped: ${code}\n`);
  process.exitCode = 1;
});
