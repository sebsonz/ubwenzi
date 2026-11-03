# UBWENZI

**Real connections. Meaningful relationships.**

UBWENZI is a trust-first dating and social discovery platform for adults (18+), designed for international reach with an initial controlled launch in Lagos, Nigeria.

## Product direction

- Serious relationships, friendship and intentional discovery.
- Trust, privacy and safety are core product capabilities, never premium-only.
- Launch sequence: waitlist → closed beta → public launch in Lagos.
- English is the primary launch language; French is also supported.
- The initial public acquisition experience is the waitlist, not full member registration.

## Repository architecture

The repository is an npm workspaces + Nx monorepo:

- `backend/api`: NestJS + Fastify HTTP API and modular monolith.
- `backend/worker`: asynchronous processing and transactional Outbox consumers.
- `frontend/web`: React + TypeScript + Vite; public, waitlist, member, platform admin, Trust & Safety and partner surfaces.
- `frontend/mobile`: React Native + Expo shared Android/iOS source.
- `packages/*`: cross-cutting shared libraries.
- `supabase/`: versioned migrations, seeds and database tests.
- `releases/`: compiled mobile deliverables; never committed to Git.

See [official monorepo structure](docs/architecture/UBWENZI-MONOREPO-STRUCTURE-V1.md).

## Requirements

- Node.js 22.x
- npm 10+
- Git

## Install

From the repository root:

```bash
npm install
```

## Run the existing Web visual foundation

```bash
npm run dev
```

Vite listens on `http://localhost:3000`.

## Quality checks

```bash
npm run typecheck
npm run build
```

## Important implementation boundary

The current waitlist form remains a non-submitting visual preview. It does not collect or persist personal data. Do not publish it as a live signup flow until the server-side waitlist endpoint, consent persistence, email verification, rate limiting/bot protection, unsubscribe/deletion workflows and protected admin tools have been implemented and tested.

The approved visual identity must be preserved. The hero portrait and mobile screen artwork are currently CSS placeholders; replace them only with approved and licensed assets matching `docs/design/visual-baseline.md` before public launch.
