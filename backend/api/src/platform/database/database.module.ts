import { Module } from "@nestjs/common";
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
        return new Pool({
          connectionString: url,
          max: Number(process.env["DATABASE_POOL_MAX"] ?? 10),
          connectionTimeoutMillis: 5000,
          idleTimeoutMillis: 30000,
          ...(sslEnabled ? { ssl: { rejectUnauthorized: true } } : {}),
        });
      },
    },
    DatabaseService,
  ],
  exports: [DatabaseService],
})
export class DatabaseModule {}
