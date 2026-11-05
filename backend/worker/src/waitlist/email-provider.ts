export interface VerificationEmail {
  to: string;
  verificationUrl: string;
}

export interface EmailProvider {
  sendVerification(message: VerificationEmail): Promise<void>;
}

export class ResendEmailProvider implements EmailProvider {
  constructor(
    private readonly apiKey: string,
    private readonly from: string,
  ) {}

  async sendVerification(message: VerificationEmail): Promise<void> {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: this.from,
        to: [message.to],
        subject: "Confirm your UBWENZI waitlist email",
        text: [
          "Thank you for joining the UBWENZI waitlist.",
          "",
          "Confirm your email address using this secure link:",
          message.verificationUrl,
          "",
          "This link expires in 24 hours. If you did not request this, ignore this email.",
        ].join("\n"),
      }),
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      // Do not persist provider response bodies: they may contain personal data.
      throw new Error(`EMAIL_PROVIDER_HTTP_${response.status}`);
    }
  }
}
