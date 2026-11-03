import { Module } from "@nestjs/common";
import { DatabaseModule } from "./platform/database/database.module";
import { HealthModule } from "./platform/health/health.module";

@Module({
  imports: [DatabaseModule, HealthModule],
})
export class AppModule {}
