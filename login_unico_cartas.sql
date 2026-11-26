begin;
create or replace function public.get_letter_admin_couple()
returns table(id uuid, names varchar)
language sql stable security definer set search_path = '' as $$
 select c.id,c.names from public.letter_admins a
 join public.couples c on c.id=a.couple_id
 where a.user_id=auth.uid();
$$;
revoke all on function public.get_letter_admin_couple() from public, anon;
grant execute on function public.get_letter_admin_couple() to authenticated;
commit;
