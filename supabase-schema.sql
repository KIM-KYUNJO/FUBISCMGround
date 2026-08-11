create table if not exists public.lunch_choices (
  id uuid primary key default gen_random_uuid(),
  menu_name text not null,
  menu_emoji text,
  choice_source text not null default 'recommendation',
  session_id text not null,
  created_at timestamptz not null default now()
);

alter table public.lunch_choices enable row level security;
grant insert on table public.lunch_choices to anon, authenticated;

drop policy if exists "Anyone can save a lunch choice" on public.lunch_choices;
create policy "Anyone can save a lunch choice"
  on public.lunch_choices
  for insert
  to anon, authenticated
  with check (char_length(menu_name) between 1 and 100 and char_length(session_id) between 1 and 100);

create table if not exists public.lunch_favorites (
  id uuid primary key default gen_random_uuid(),
  menu_name text not null,
  menu_emoji text,
  session_id text not null,
  created_at timestamptz not null default now()
);

alter table public.lunch_favorites enable row level security;
grant insert on table public.lunch_favorites to anon, authenticated;

drop policy if exists "Anyone can save a lunch favorite" on public.lunch_favorites;
create policy "Anyone can save a lunch favorite"
  on public.lunch_favorites
  for insert
  to anon, authenticated
  with check (char_length(menu_name) between 1 and 100 and char_length(session_id) between 1 and 100);
