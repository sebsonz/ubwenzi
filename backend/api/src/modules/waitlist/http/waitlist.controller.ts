import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { RegisterWaitlistDto } from "./register-waitlist.dto";
import { VerifyWaitlistDto } from "./verify-waitlist.dto";
import { WaitlistService } from "../application/waitlist.service";

@Controller("waitlist")
export class WaitlistController {
  constructor(private readonly waitlist: WaitlistService) {}

  @Post("registrations")
  @HttpCode(HttpStatus.ACCEPTED)
  register(@Body() body: RegisterWaitlistDto): Promise<{ status: "PENDING_VERIFICATION" }> {
    return this.waitlist.register(body);
  }

  @Post("verifications")
  @HttpCode(HttpStatus.OK)
  verify(@Body() body: VerifyWaitlistDto): Promise<{ status: "CONFIRMED" }> {
    return this.waitlist.verify(body.token);
  }
}
