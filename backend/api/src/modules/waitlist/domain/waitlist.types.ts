export const WAITLIST_CONSENT_PURPOSE = "WAITLIST_UPDATES" as const;
export const WAITLIST_CONSENT_VERSION = "2026-11-06" as const;

export type WaitlistStatus =
  | "PENDING_VERIFICATION"
  | "CONFIRMED"
  | "INVITED"
  | "UNSUBSCRIBED"
  | "DELETED";

export interface CreateWaitlistEntry {
  email: string;
  marketCode: string;
  isAdultConfirmed: true;
  consentPurpose: typeof WAITLIST_CONSENT_PURPOSE;
  consentVersion: typeof WAITLIST_CONSENT_VERSION;
  consentedAt: Date;
  verificationTokenHash: string;
  verificationExpiresAt: Date;
}

export interface WaitlistRepository {
  createWithVerification(entry: CreateWaitlistEntry): Promise<"created" | "already_registered">;
}
