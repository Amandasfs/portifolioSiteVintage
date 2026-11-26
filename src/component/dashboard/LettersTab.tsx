import { useEffect, useState, useCallback } from "react";
import { supabase } from "../../config/supabase";
import corner from "../../assets/img/cornerImage.png";

type Letter = { id: string; kind: 'compra' | 'pix' | 'skip'; gift_title: string | null; author: string | null; message: string; created_at: string | null };
const labels = { compra: 'Presente reservado', pix: 'Mensagem via Pix', skip: 'Mensagem de presença' };

export default function LettersTab() {
  const [letters, setLetters] = useState<Letter[]>([]);
  const [filter, setFilter] = useState('all');
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState('');
  const load = useCallback(async () => {
    setBusy(true); setError(''); setLetters([]);
    try {
      const { data, error } = await supabase.rpc('read_guest_letters', { p_couple: localStorage.getItem('couple_id') });
      if (error) throw error;
      setLetters((data ?? []) as Letter[]);
    } catch { setError('Não foi possível acessar as cartas. Verifique o vínculo da conta com o casal.'); }
    finally { setBusy(false); }
  }, []);
  useEffect(() => { void load(); }, [load]);
  const filtered = letters.filter(l => filter === 'all' || l.kind === filter);
  return <section className="rounded-2xl border-2 border-[#DE9B72] bg-details p-4 sm:p-8 shadow-xl" style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/old-wall.png')"}}>
    <header className="text-center text-[#f5deb3] mb-7">
      <h2 className="font-romantic text-5xl sm:text-6xl">Cartas dos Convidados</h2>
      <p className="font-serif italic mt-3">Palavras de carinho para guardar para sempre.</p>
    </header>
    {error && <p role="alert" className="bg-[#f5deb3] text-red-900 rounded p-3 mb-4">{error}</p>}
    {busy && <p role="status" className="text-[#f5deb3] text-center">Carregando cartas...</p>}
    {!busy && <>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 text-[#f5deb3]">
        <label>Filtrar cartas <select value={filter} onChange={e=>setFilter(e.target.value)} className="ml-2 rounded bg-[#F3EADA] text-highlight3 p-2"><option value="all">Todas ({letters.length})</option>{Object.entries(labels).map(([k,v])=><option key={k} value={k}>{v}</option>)}</select></label>
        <button onClick={()=>void load()} className="border border-[#DE9B72] rounded px-4 py-2">Atualizar</button>
      </div>
      {!error && !filtered.length && <p className="text-center text-[#f5deb3] py-8">Nenhuma carta encontrada.</p>}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filtered.map(l=><article key={`${l.kind}-${l.id}`} className="relative overflow-hidden border border-[#DE9B72] bg-[#F3EADA] text-highlight3 p-8 sm:p-10 shadow-xl" style={{backgroundImage:"url('https://www.transparenttextures.com/patterns/project-paper.png')"}}>
          <img src={corner} alt="" className="absolute top-0 left-0 w-12 pointer-events-none"/><img src={corner} alt="" className="absolute bottom-0 right-0 w-12 rotate-180 pointer-events-none"/>
          <p className="text-xs tracking-widest uppercase text-highlight font-bold">{labels[l.kind]}</p>
          {l.gift_title && <h3 className="font-serif text-xl mt-2">{l.gift_title}</h3>}
          <div className="my-4 border-t border-[#DE9B72]/70"/>
          <p className="font-serif italic text-lg leading-relaxed whitespace-pre-wrap break-words">{l.message}</p>
          {l.author && <p className="font-romantic text-3xl text-right mt-6 break-words">Com carinho, {l.author}</p>}
          <p className="text-xs text-highlight mt-5 text-right">{l.created_at ? new Date(l.created_at).toLocaleDateString('pt-BR') : 'Carta anterior · data não registrada'}</p>
        </article>)}
      </div>
    </>}
  </section>;
}
