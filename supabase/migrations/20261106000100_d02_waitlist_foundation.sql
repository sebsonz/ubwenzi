-- D02 — Waitlist & Acquisition
-- Private domain schema: never expose these tables through the Supabase Data API.
begin;

create schema if not exists acquisition;

create table acquisition.waitlist_entries (
  id uuid primary key,
  email_normalized text not null,
  email_display text not null,
  market_code char(2) not null,
  is_adult_confirmed boolean not null,
  consent_purpose text not null,
  consent_version text not null,
  consented_at timestamptz not null,
  status text not null default 'PENDING_VERIFICATION'
    check (status in ('PENDING_VERIFICATION', 'CONFIRMED', 'INVITED', 'UNSUBSCRIBED', 'DELETED')),
  -- Nullable after confirmation so the bearer token is permanently invalidated.
  verification_token_hash text,
  verification_expires_at timestamptz not null,
  verified_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint waitlist_email_unique unique (email_normalized),
  constraint waitlist_email_format check (email_normalized = lower(btrim(email_normalized))),
  constraint waitlist_market_code check (market_code ~ '^[A-Z]{2}$'),
  constraint waitlist_adult_only check (is_adult_confirmed = true),
  constraint waitlist_consent_purpose check (consent_purpose = 'WAITLIST_UPDATES')
);

create index waitlist_entries_status_created_idx
  on acquisition.waitlist_entries (status, created_at desc);

create table acquisition.waitlist_email_outbox (
  id uuid primary key,
  waitlist_entry_id uuid not null references acquisition.waitlist_entries(id) on delete cascade,
  message_type text not null check (message_type in ('VERIFY_EMAIL')),
  payload jsonb not null,
  status text not null default 'PENDING'
    check (status in ('PENDING', 'PROCESSING', 'SENT', 'FAILED')),
  attempts integer not null default 0 check (attempts >= 0),
  available_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  sent_at timestamptz,
  last_error_code text
);

create index waitlist_email_outbox_pending_idx
  on acquisition.waitlist_email_outbox (available_at, created_at)
  where status in ('PENDING', 'FAILED', 'PROCESSING');

alter table acquisition.waitlist_entries enable row level security;
alter table acquisition.waitlist_entries force row level security;
alter table acquisition.waitlist_email_outbox enable row level security;
alter table acquisition.waitlist_email_outbox force row level security;

-- Access is granted later to a dedicated least-privilege API role.
-- No anon/authenticated grants or policies are created.
revoke all on schema acquisition from public, anon, authenticated;
revoke all on all tables in schema acquisition from public, anon, authenticated;

commit;
