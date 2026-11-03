# UBWENZI

**Real connections. Meaningful relationships.**

UBWENZI is a trust-first dating and social discovery platform for adults (18+), designed for international reach with an initial controlled launch in Lagos, Nigeria.

## Product direction

- Serious relationships, friendship and intentional discovery.
- Trust, privacy and safety are core product capabilities, never premium-only.
- Launch sequence: waitlist → closed beta → public launch in Lagos.
- English is the primary launch language; French is also supported in the product direction.
- The first public acquisition experience is the waitlist, not full member registration.

## Visual direction

The approved UBWENZI visual reference is the user-validated mockup: warm blush/peach background, deep plum typography, vivid fuchsia actions, heart-inspired brand mark, editorial hero composition, and mobile product previews. Implementations must preserve this visual identity rather than substitute a generic dating-app template.

## Technical direction

Initial frontend foundation: React, TypeScript and Vite. Backend and waitlist persistence must be implemented separately with server-side validation, consent records, email verification, abuse prevention, and role-protected administration. A browser-only form must never be presented as a working registration system.

## Current phase

P00 — Waitlist and field validation. Build the branded public landing experience first, then connect it to the secure waitlist API and administrative analytics. The repository is being initialized; no existing application code is being overwritten.

## Run the frontend locally

Requirements: Node.js 22+ and npm.

```bash
npm install
npm run dev
```

The Vite development server listens on `http://localhost:3000`.

Quality checks:

```bash
npm run typecheck
npm run build
```

## Important implementation boundary

The current waitlist form is intentionally a non-submitting visual preview. It does not collect or persist personal data. Do not publish it as a live signup flow until the server-side waitlist endpoint, consent persistence, email verification, rate limiting/bot protection, unsubscribe/deletion workflows and protected admin tools have been implemented and tested.

The hero portrait and mobile screen artwork are currently CSS placeholders. Replace them with approved and licensed image assets matching `docs/design/visual-baseline.md` before public launch.
