import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { RegisterWaitlistDto } from "./register-waitlist.dto";
import { WaitlistService } from "../application/waitlist.service";

@Controller("waitlist")
export class WaitlistController {
  constructor(private readonly waitlist: WaitlistService) {}

  @Post("registrations")
  @HttpCode(HttpStatus.ACCEPTED)
  register(@Body() body: RegisterWaitlistDto): Promise<{ status: "PENDING_VERIFICATION" }> {
    return this.waitlist.register(body);
  }
}
