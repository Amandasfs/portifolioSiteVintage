begin;
create table if not exists public.guest_letters (
 id uuid primary key default gen_random_uuid(),
 couple_id uuid not null references public.couples(id) on delete cascade,
 gift_id uuid references public.gifts(id) on delete set null,
 group_id uuid references public.guest_groups(id) on delete set null,
 kind text not null check (kind in ('compra','pix','skip')),
 gift_title text,
 author text,
 message text not null check (char_length(message) between 1 and 3000),
 created_at timestamptz not null default now()
);
create index if not exists guest_letters_couple_date_idx on public.guest_letters(couple_id,created_at desc);
create table if not exists public.letter_admins (
 user_id uuid not null references auth.users(id) on delete cascade,
 couple_id uuid not null references public.couples(id) on delete cascade,
 primary key(user_id,couple_id)
);
alter table public.guest_letters enable row level security;
alter table public.letter_admins enable row level security;
revoke all on public.guest_letters, public.letter_admins from anon, authenticated;
-- Operação atômica: reserva e carta são gravadas juntas. PIX não comprova pagamento.
create or replace function public.send_guest_letter(p_kind text,p_gift uuid,p_group uuid,p_message text,p_author text)
returns void language plpgsql security definer set search_path = '' as $$
declare v_couple uuid; v_group_couple uuid; v_title text;
begin
 if p_kind is null or p_kind not in ('compra','pix','skip') then raise exception 'Tipo inválido'; end if;
 if char_length(coalesce(p_message,'')) > 3000 or char_length(coalesce(p_author,'')) > 255 then raise exception 'Mensagem ou assinatura muito longa'; end if;
 if p_group is not null then
   select couple_id into v_group_couple from public.guest_groups where id=p_group;
   if v_group_couple is null then raise exception 'Grupo inválido'; end if;
 end if;
 if p_kind='skip' then
   v_couple := v_group_couple;
   if p_gift is not null then raise exception 'Presente inválido'; end if;
 else
   select couple_id,title into v_couple,v_title from public.gifts where id=p_gift;
 end if;
 if v_couple is null or (v_group_couple is not null and v_group_couple <> v_couple) then raise exception 'Vínculo inválido'; end if;
 if p_kind='compra' then
   update public.gifts set is_reserved=true,reservation_type='compra' where id=p_gift and coalesce(is_reserved,false)=false;
   if not found then raise exception 'Presente já reservado'; end if;
 end if;
 if nullif(btrim(p_message),'') is not null then
   insert into public.guest_letters(couple_id,gift_id,group_id,kind,gift_title,author,message)
   values(v_couple,p_gift,p_group,p_kind,v_title,nullif(btrim(p_author),''),btrim(p_message));
 end if;
end; $$;
revoke all on function public.send_guest_letter(text,uuid,uuid,text,text) from public;
grant execute on function public.send_guest_letter(text,uuid,uuid,text,text) to anon,authenticated;
-- A leitura exige uma conta Supabase Auth vinculada ao casal, não o papel do localStorage.
create or replace function public.read_guest_letters(p_couple uuid)
returns table(id uuid,kind text,gift_title text,author text,message text,created_at timestamptz)
language plpgsql security definer set search_path = '' as $$
begin
 if not exists(select 1 from public.letter_admins a where a.user_id=auth.uid() and a.couple_id=p_couple) then raise exception 'Acesso não autorizado'; end if;
 return query
 select l.id,l.kind,l.gift_title,coalesce(l.author,g.name),l.message,l.created_at from public.guest_letters l left join public.guest_groups g on g.id=l.group_id where l.couple_id=p_couple
 union all
 select f.id,case when f.reservation_type='pix' then 'pix' else 'compra' end,f.title::text,null::text,f.guest_message,null::timestamptz from public.gifts f where f.couple_id=p_couple and nullif(btrim(f.guest_message),'') is not null
 union all
 select g.id,'skip'::text,null::text,g.name::text,g.guest_message,null::timestamptz from public.guest_groups g where g.couple_id=p_couple and nullif(btrim(g.guest_message),'') is not null
 order by 6 desc nulls last;
end; $$;
revoke all on function public.read_guest_letters(uuid) from public,anon;
grant execute on function public.read_guest_letters(uuid) to authenticated;
commit;
-- Após criar a conta em Authentication > Users, execute separadamente:
-- insert into public.letter_admins(user_id,couple_id) values ('UUID_AUTH','UUID_CASAL');
