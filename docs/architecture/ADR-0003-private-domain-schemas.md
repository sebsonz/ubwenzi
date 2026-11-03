# ADR-0003 — Private PostgreSQL domain schemas

- Status: Accepted
- Date: 2026-11-03
- Scope: Supabase PostgreSQL access for UBWENZI bounded contexts

## Decision

1. PostgreSQL is the transactional source of truth.
2. Domain schemas are not exposed through the Supabase Data API.
3. The Supabase API exposed-schema list remains limited to platform schemas explicitly approved for exposure.
4. Business operations are performed by the NestJS API using a server-side PostgreSQL connection.
5. Domain authorization is enforced in the backend for every operation.
6. PostgreSQL grants and RLS provide defense in depth; neither replaces backend authorization.
7. Service credentials and database connection strings are server-side secrets and must never enter browser bundles, source control or logs.
8. New domain tables must include an explicit RLS and grants review in their migration.

## D07 application

The `messaging` schema is created as private. Its initial migration creates no business tables. Conversation, participant, message, media and device tables are added in reviewed incremental migrations after their constraints and access policies are specified.

## Operational rules

- Use separate Supabase projects and credentials per environment.
- Apply migrations to TEST first, then STAGING, and production only through an approved deployment.
- Do not use a production database for local development or tests.
- Never grant `anon` or `authenticated` direct access to private domain tables.
- Keep database TLS certificate verification enabled in production.
