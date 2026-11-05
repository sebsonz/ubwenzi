import { Module } from "@nestjs/common";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { Pool } from "pg";
import { DatabaseService } from "./database.service";
import { DATABASE_POOL } from "./database.tokens";

@Module({
  providers: [
    {
      provide: DATABASE_POOL,
      useFactory: () => {
        const url = process.env["DATABASE_URL"];
        if (!url) return null;

        const sslEnabled = process.env["DATABASE_SSL"] !== "false";
        const rejectUnauthorized =
          process.env["DATABASE_SSL_REJECT_UNAUTHORIZED"] !== "false";
        const poolMax = Number(process.env["DATABASE_POOL_MAX"] ?? 10);

        if (!Number.isInteger(poolMax) || poolMax < 1) {
          throw new Error("DATABASE_POOL_MAX must be a positive integer.");
        }

        if (sslEnabled && !rejectUnauthorized) {
          throw new Error(
            "DATABASE_SSL_REJECT_UNAUTHORIZED must be true when DATABASE_SSL is enabled.",
          );
        }

        const caPath = resolve(
          process.env["DATABASE_CA_CERT_PATH"] ??
            resolve(__dirname, "../../../certs/prod-ca-2021.crt"),
        );

        return new Pool({
          connectionString: url,
          max: poolMax,
          connectionTimeoutMillis: 5000,
          idleTimeoutMillis: 30000,
          ...(sslEnabled
            ? {
                ssl: {
                  ca: readFileSync(caPath, "utf8"),
                  rejectUnauthorized: true,
                },
              }
            : {}),
        });
      },
    },
    DatabaseService,
  ],
  exports: [DatabaseService, DATABASE_POOL],
})
export class DatabaseModule {}
