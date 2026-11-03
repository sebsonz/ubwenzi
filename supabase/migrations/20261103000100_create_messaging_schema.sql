-- D07 Messaging foundation.
-- Domain data is accessed through the NestJS API, not the Supabase Data API.

begin;

create schema if not exists messaging;

comment on schema messaging is
  'D07 Messaging bounded context. Private schema; access through the UBWENZI API.';

revoke all on schema messaging from public;
revoke all on schema messaging from anon;
revoke all on schema messaging from authenticated;

commit;
