# Database foundation

The API connects to Supabase-managed PostgreSQL through the server-side
`DATABASE_URL`. Never expose this connection string to the web application
or commit real credentials.

For Supabase Session Pooler or another TLS-required endpoint:

- Set `DATABASE_SSL=true`.
- Keep certificate verification enabled.
- Do not use `rejectUnauthorized=false` in production.

The pool is created only when `DATABASE_URL` is configured. Liveness remains
available without a database connection; readiness returns HTTP 503 until
PostgreSQL is reachable.

Domain schemas remain private. The API is the business access layer; do not
add domain schemas to the Supabase Data API exposed-schema list.
