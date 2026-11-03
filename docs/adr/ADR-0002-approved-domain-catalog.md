# ADR-0002 — Approved UBWENZI domain catalog

- **Status:** Accepted
- **Date:** 2026-11-03
- **Supersedes:** domain numbering in section 3 of `UBWENZI-ARCHITECTURE-BASELINE-V1.md`
- **Scope:** product and backend bounded-context ownership

## Decision

The authoritative catalog contains 17 domains:

| ID | Domain | Ownership |
|---|---|---|
| D00 | Platform Foundation | Global configuration, markets, geography, languages, currencies, feature flags and platform operations |
| D01 | Identity & Access | Identity, registration, authentication, sessions, devices and authorization integration |
| D02 | Waitlist & Acquisition | Candidates, cohorts, invitations, referrals, campaigns and acquisition attribution |
| D03 | Members & Profiles | Member registry, profiles, profile media and visibility |
| D04 | Preferences | Relationship intent, preferences, criteria and privacy |
| D05 | Discovery Engine | Eligibility, recommendation, ranking and discovery feed |
| D06 | Matching | Likes, passes, mutual interest, matches and match lifecycle |
| D07 | Messaging | Conversations, messages, delivery, media, devices, encryption interfaces and messaging privacy |
| D08 | Trust & Verification | Identity/profile verification, verification evidence and review |
| D09 | Safety & Moderation | Reports, blocks, moderation cases, sanctions, appeals and abuse prevention |
| D10 | Subscriptions & Entitlements | Plans, subscriptions, features, limits and entitlements |
| D11 | Payments & Billing | Payment intents, transactions, refunds, invoices, webhooks and reconciliation |
| D12 | Notifications | Email, SMS, push, in-app delivery and notification preferences |
| D13 | Platform Administration | Internal users, roles, permissions, settings and administrative audit |
| D14 | Analytics & Experimentation | Product analytics, acquisition metrics, experiments and aggregated reporting |
| D15 | Events & Partners | Events, venues, partners and partner operations |
| D16 | Media & Content | Platform-managed content, editorial assets and content lifecycle |

## Boundary rules

- Identity is not a member profile.
- Discovery is not matching.
- Matching is not messaging.
- Trust & Verification is not Safety & Moderation.
- Subscriptions & Entitlements are not Payments & Billing.
- Each domain owns its data and writes only to its own schema.
- Cross-domain operations use explicit application interfaces or versioned events.
- D07 does not own block records, moderation cases or sanctions; those belong to D09.
- D07 does not own notification delivery; that belongs to D12.
- D07 does not own administrative identities, permissions or audit governance; those belong to D13 and shared audit infrastructure.

## Migration rule

The old numbering in the initial architecture baseline is historical. New code, migrations, API contracts and documentation must use this approved catalog. Existing documents must be updated progressively; do not rename already implemented resources without a migration plan.

## Consequences

- D07 is Messaging.
- D08 is Trust & Verification.
- D09 is Safety & Moderation.
- The architecture baseline must be reconciled against this ADR during the monorepo foundation work.
