import { Module } from "@nestjs/common";
import { HealthModule } from "./platform/health/health.module";
import { WaitlistModule } from "./modules/waitlist/waitlist.module";

@Module({
  imports: [HealthModule, WaitlistModule],
})
export class AppModule {}
