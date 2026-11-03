import {
  Inject,
  Injectable,
  OnModuleDestroy,
} from "@nestjs/common";
import type { Pool } from "pg";
import { DATABASE_POOL } from "./database.tokens";

@Injectable()
export class DatabaseService implements OnModuleDestroy {
  constructor(
    @Inject(DATABASE_POOL)
    private readonly pool: Pool | null,
  ) {}

  async checkConnection(): Promise<boolean> {
    if (!this.pool) {
      return false;
    }

    try {
      await this.pool.query("SELECT 1");
      return true;
    } catch {
      return false;
    }
  }

  async onModuleDestroy(): Promise<void> {
    await this.pool?.end();
  }
}
