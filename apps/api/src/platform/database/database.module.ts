import { Module } from "@nestjs/common";
import { Pool } from "pg";
import { DatabaseService } from "./database.service";
import { DATABASE_POOL } from "./database.tokens";

@Module({
  providers: [
    {
      provide: DATABASE_POOL,
      useFactory: (): Pool | null => {
        const connectionString = process.env.DATABASE_URL;
        if (!connectionString) {
          return null;
        }

        const ssl =
          process.env.DATABASE_SSL === "true"
            ? {
                rejectUnauthorized:
                  process.env.DATABASE_SSL_REJECT_UNAUTHORIZED !== "false",
              }
            : undefined;

        return new Pool({
          connectionString,
          max: Number(process.env.DATABASE_POOL_MAX ?? 10),
          connectionTimeoutMillis: 5_000,
          idleTimeoutMillis: 30_000,
          ssl,
        });
      },
    },
    DatabaseService,
  ],
  exports: [DatabaseService],
})
export class DatabaseModule {}