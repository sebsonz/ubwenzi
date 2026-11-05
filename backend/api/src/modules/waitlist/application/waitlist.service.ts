import {
  BadRequestException,
  ConflictException,
  Injectable,
  ServiceUnavailableException,
} from "@nestjs/common";
import { createHash, randomBytes, randomUUID } from "node:crypto";
import { WAITLIST_CONSENT_PURPOSE, WAITLIST_CONSENT_VERSION } from "../domain/waitlist.types";
import { WaitlistPostgresRepository } from "../infrastructure/waitlist-postgres.repository";

export interface RegisterWaitlistInput {
  email: string;
  marketCode: string;
  isAdultConfirmed: boolean;
  consentToWaitlistUpdates: boolean;
}

@Injectable()
export class WaitlistService {
  constructor(private readonly repository: WaitlistPostgresRepository) {}

  async register(input: RegisterWaitlistInput): Promise<{ status: "PENDING_VERIFICATION" }> {
    const email = input.email.trim().toLowerCase();
    const marketCode = input.marketCode.trim().toUpperCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
      throw new BadRequestException("A valid email address is required.");
    }
    if (!/^[A-Z]{2}$/.test(marketCode)) {
      throw new BadRequestException("A valid two-letter market code is required.");
    }
    if (input.isAdultConfirmed !== true) {
      throw new BadRequestException("You must confirm that you are at least 18.");
    }
    if (input.consentToWaitlistUpdates !== true) {
      throw new BadRequestException("Consent to waitlist updates is required.");
    }

    const token = randomBytes(32).toString("base64url");
    const tokenHash = createHash("sha256").update(token).digest("hex");
    const result = await this.repository.createWithVerification({
      email,
      marketCode,
      isAdultConfirmed: true,
      consentPurpose: WAITLIST_CONSENT_PURPOSE,
      consentVersion: WAITLIST_CONSENT_VERSION,
      consentedAt: new Date(),
      verificationTokenHash: tokenHash,
      verificationExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    if (result === "already_registered") {
      // Do not disclose whether an address is already on the list.
      return { status: "PENDING_VERIFICATION" };
    }
    if (!result) {
      throw new ServiceUnavailableException("Waitlist registration is temporarily unavailable.");
    }

    // The raw token is never returned to the browser. The D02 outbox worker
    // delivers the verification message using the stored payload.
    return { status: "PENDING_VERIFICATION" };
  }
}
