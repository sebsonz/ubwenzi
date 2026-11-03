import { Controller, Get } from "@nestjs/common";

@Controller("health")
export class HealthController {
  @Get()
  getHealth(): {
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
}
