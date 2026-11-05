import { BadRequestException, Injectable } from "@nestjs/common";
import { createHash, randomBytes } from "node:crypto";
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
    await this.repository.createWithVerification({
      email,
      marketCode,
      isAdultConfirmed: true,
      consentPurpose: WAITLIST_CONSENT_PURPOSE,
      consentVersion: WAITLIST_CONSENT_VERSION,
      consentedAt: new Date(),
      verificationToken: token,
      verificationTokenHash: tokenHash,
      verificationExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    // The endpoint never returns the secret. Only the private D02 delivery
    // worker may read it from the outbox and must erase it after delivery.
    return { status: "PENDING_VERIFICATION" };
  }
}
