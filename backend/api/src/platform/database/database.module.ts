import { Module } from "@nestjs/common";
import { DatabaseService } from "./database.service";
import { DATABASE_POOL } from "./database.tokens";

@Module({
  providers: [
    { provide: DATABASE_POOL, useValue: null },
    DatabaseService,
  ],
  exports: [DatabaseService],
})
export class DatabaseModule {}
