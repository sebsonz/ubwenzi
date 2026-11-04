import {
  Inject,
  Injectable,
  Logger,
  OnModuleDestroy,
} from "@nestjs/common";
import type { Pool } from "pg";
import { DATABASE_POOL } from "./database.tokens";

@Injectable()
export class DatabaseService implements OnModuleDestroy {
  private readonly logger = new Logger(DatabaseService.name);

  constructor(
    @Inject(DATABASE_POOL)
    private readonly pool: Pool | null,
  ) {}

  async checkConnection(): Promise<boolean> {
    if (!this.pool) {
      this.logger.warn("PostgreSQL readiness check failed: DATABASE_URL is not configured.");
      return false;
    }

    try {
      await this.pool.query("SELECT 1");
      return true;
    } catch (error: unknown) {
      const code =
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        typeof error.code === "string"
          ? error.code
          : "unknown";

      // Never log the connection string, credentials, or raw driver error.
      this.logger.warn(
        `PostgreSQL readiness check failed (database error code: ${code}).`,
      );
      return false;
    }
  }

  async onModuleDestroy(): Promise<void> {
    await this.pool?.end();
  }
}
