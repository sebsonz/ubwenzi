import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../platform/database/database.module";
import { WaitlistService } from "./application/waitlist.service";
import { WaitlistController } from "./http/waitlist.controller";
import { WaitlistPostgresRepository } from "./infrastructure/waitlist-postgres.repository";

@Module({
  imports: [DatabaseModule],
  controllers: [WaitlistController],
  providers: [WaitlistService, WaitlistPostgresRepository],
})
export class WaitlistModule {}
