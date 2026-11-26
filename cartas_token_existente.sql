begin;
create or replace function public.read_guest_letters_by_token(p_token text)
returns table(id uuid,kind text,gift_title text,author text,message text,created_at timestamptz)
language plpgsql security definer set search_path = '' as $$
declare p_couple uuid;
begin
 if nullif(btrim(p_token),'') is null then raise exception 'Acesso não autorizado'; end if;
 select c.id into p_couple from public.couples c where c.access_token = btrim(p_token);
 if p_couple is null then raise exception 'Acesso não autorizado'; end if;
 return query
 select l.id,l.kind,l.gift_title,coalesce(l.author,g.name),l.message,l.created_at from public.guest_letters l left join public.guest_groups g on g.id=l.group_id where l.couple_id=p_couple
 union all
 select f.id,case when f.reservation_type='pix' then 'pix' else 'compra' end,f.title::text,null::text,f.guest_message,null::timestamptz from public.gifts f where f.couple_id=p_couple and nullif(btrim(f.guest_message),'') is not null
 union all
 select g.id,'skip'::text,null::text,g.name::text,g.guest_message,null::timestamptz from public.guest_groups g where g.couple_id=p_couple and nullif(btrim(g.guest_message),'') is not null
 order by 6 desc nulls last;
end; $$;
revoke all on function public.read_guest_letters_by_token(text) from public;
grant execute on function public.read_guest_letters_by_token(text) to anon, authenticated;
commit;
