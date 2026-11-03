# P00 — UBWENZI waitlist implementation scope

**Status:** implementation baseline, subject to product/security review.  
**Market:** Lagos, Nigeria. **Audience:** adults 18+.  
**Launch sequence:** waitlist → closed beta → public launch.

## Public experience
- Branded landing page consistent with the approved visual baseline.
- Waitlist signup, distinct from full member registration.
- Minimal data collection: email, 18+ eligibility confirmation, broad market eligibility, and optional broad research fields only where justified.
- Explicit purpose-specific consent and privacy notice.
- Email verification before counting a record as a confirmed candidate.
- Clear unsubscribe and deletion request paths.

## Administrative experience
- Role- and permission-protected waitlist administration.
- Search, filtering and aggregate analytics.
- Campaign/referral attribution.
- Closed-beta invitation workflow.
- Audit trail for sensitive administrative actions.
- Export restrictions and access logging.

## Data and security boundaries
- Client-side validation is never the security boundary.
- Verify eligibility and consent state server-side.
- Store consent text/version, purpose and timestamp.
- Prevent duplicate signups and abuse with rate limits and bot protection.
- Do not collect exact residential address, full date of birth or unnecessary sensitive data.
- Do not expose individual email addresses in analytics views.
- Keep waitlist identity data separate from aggregate statistics.
- Define retention and deletion rules before public collection begins.
- Obtain Nigeria-specific privacy/legal review before opening the form publicly.

## Current implementation status
- Repository initialized and feature branch created.
- Landing-page visual foundation in progress.
- No live persistence, email verification, admin dashboard or active public signup should be claimed until built and tested.
