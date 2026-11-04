import {
  Controller,
  Get,
  Inject,
  ServiceUnavailableException,
} from "@nestjs/common";
import { DatabaseService } from "../database/database.service";

@Controller("health")
export class HealthController {
  constructor(
    @Inject(DatabaseService)
    private readonly database: DatabaseService,
  ) {}

  @Get("live")
  getLiveness(): {
    status: "ok";
    service: "ubwenzi-api";
    timestamp: string;
  } {
    return {
      status: "ok",
      service: "ubwenzi-api",
      timestamp: new Date().toISOString(),
    };
  }

  @Get("ready")
  async getReadiness(): Promise<{
    status: "ready";
    database: "connected";
    timestamp: string;
  }> {
    const connected = await this.database.checkConnection();
    if (!connected) {
      throw new ServiceUnavailableException({
        status: "not_ready",
        database: "unavailable",
      });
    }

    return {
      status: "ready",
      database: "connected",
      timestamp: new Date().toISOString(),
    };
  }
}
