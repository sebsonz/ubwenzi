# Database infrastructure

The API uses a server-side PostgreSQL connection pool. Configure `DATABASE_URL` only in the API runtime environment. Never expose it to the browser, commit real credentials, or log connection strings.

TLS certificate verification must remain enabled in shared and production environments. The readiness endpoint executes a minimal connectivity query; it does not validate migrations or prove application-level database health.
