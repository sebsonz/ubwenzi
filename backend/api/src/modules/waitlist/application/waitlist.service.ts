import { BadRequestException, Injectable, ServiceUnavailableException } from "@nestjs/common";
import { createCipheriv, createHash, randomBytes } from "node:crypto";
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

    const encryptionKey = process.env["WAITLIST_OUTBOX_ENCRYPTION_KEY"];
    if (!encryptionKey) {
      throw new ServiceUnavailableException("Waitlist verification is not configured.");
    }
    const key = Buffer.from(encryptionKey, "base64");
    if (key.length !== 32) {
      throw new ServiceUnavailableException("Waitlist verification is not configured.");
    }

    const token = randomBytes(32).toString("base64url");
    const iv = randomBytes(12);
    const cipher = createCipheriv("aes-256-gcm", key, iv);
    const ciphertext = Buffer.concat([cipher.update(token, "utf8"), cipher.final()]);
    const encryptedToken = [
      "v1",
      iv.toString("base64url"),
      cipher.getAuthTag().toString("base64url"),
      ciphertext.toString("base64url"),
    ].join(":");
    const tokenHash = createHash("sha256").update(token).digest("hex");

    await this.repository.createWithVerification({
      email,
      marketCode,
      isAdultConfirmed: true,
      consentPurpose: WAITLIST_CONSENT_PURPOSE,
      consentVersion: WAITLIST_CONSENT_VERSION,
      consentedAt: new Date(),
      verificationTokenEncrypted: encryptedToken,
      verificationTokenHash: tokenHash,
      verificationExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    return { status: "PENDING_VERIFICATION" };
  }
}
