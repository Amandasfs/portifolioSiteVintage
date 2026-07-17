import { useState } from "react";
import { Plus, Edit2, Trash2, Save, ExternalLink, Image as ImageIcon, Unlock } from "lucide-react";
import { supabase } from "../../config/supabase";
import type { GiftItem } from "../../types/guest";

export default function ManageGiftsTab({ gifts, onRefresh }: { gifts: GiftItem[], onRefresh: () => void }) {
  const [view, setView] = useState<'list' | 'form'>('list');
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Campos do Formulário
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [link, setLink] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const openForm = (gift?: GiftItem) => {
    if (gift) {
      setEditingId(gift.id);
      setTitle(gift.title);
      setValue(gift.suggested_value.toString());
      setLink(gift.link || "");
      setImageUrl(gift.image_url || "");
    } else {
      setEditingId(null);
      setTitle("");
      setValue("");
      setLink("");
      setImageUrl("");
    }
    setView('form');
  };

  const handleSave = async () => {
    if (!title.trim() || !value) return alert("Preencha o título e o valor do presente.");
    setSaving(true);
    try {
      const coupleId = localStorage.getItem('couple_id');
      const numericValue = parseFloat(value.toString().replace(',', '.'));
      
      const payload = { 
        couple_id: coupleId, 
        title: title.trim(), 
        suggested_value: numericValue, 
        link: link.trim() || null,
        image_url: imageUrl.trim() || null
      };

      if (editingId) {
        await supabase.from('vw_gifts').update(payload).eq('id', editingId);
      } else {
        await supabase.from('vw_gifts').insert(payload);
      }
      
      onRefresh();
      setView('list');
    } catch (err) {
      alert("Erro ao salvar o presente.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Tem certeza de que deseja excluir este presente permanentemente?")) return;
    await supabase.from('vw_gifts').delete().eq('id', id);
    onRefresh();
  };

  const handleUnlockGift = async (id: string) => {
    if (!window.confirm("Deseja remover a reserva e liberar este presente para outros convidados?")) return;
    try {
      await supabase.from('vw_gifts').update({ is_reserved: false, reservation_type: null }).eq('id', id);
      onRefresh();
    } catch (err) {
      alert("Erro ao liberar o presente.");
    }
  };

  if (view === 'form') {
    return (
      <div className="bg-white/70 backdrop-blur-sm border-2 border-[#DE9B72]/50 rounded-2xl p-6 shadow-xl max-w-lg mx-auto animate-in fade-in duration-300">
        <h2 className="text-3xl font-romantic text-highlight3 mb-6 border-b border-[#DE9B72]/30 pb-4">
          {editingId ? 'Editar Presente' : 'Novo Presente'}
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-highlight3 uppercase tracking-wider mb-1">Título do Presente</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-3 rounded-lg border-2 border-[#DE9B72]/40 focus:border-details outline-none font-bold text-highlight3" placeholder="Ex: Jogo de Panelas" />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-highlight3 uppercase tracking-wider mb-1">Valor Sugerido (R$)</label>
            <input type="number" step="0.01" value={value} onChange={(e) => setValue(e.target.value)} className="w-full p-3 rounded-lg border-2 border-[#DE9B72]/40 focus:border-details outline-none font-bold text-highlight3" placeholder="Ex: 250.00" />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-highlight3 uppercase tracking-wider mb-1 flex items-center gap-2">
              Link da Loja <span className="text-[9px] text-highlight/60">(Opcional)</span>
            </label>
            <input type="url" value={link} onChange={(e) => setLink(e.target.value)} className="w-full p-3 rounded-lg border-2 border-[#DE9B72]/40 focus:border-details outline-none text-highlight3 text-sm" placeholder="https://..." />
          </div>

          <div>
            <label className="block text-xs font-bold text-highlight3 uppercase tracking-wider mb-1 flex items-center gap-2">
              Link da Imagem <span className="text-[9px] text-highlight/60">(Opcional)</span>
            </label>
            <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full p-3 rounded-lg border-2 border-[#DE9B72]/40 focus:border-details outline-none text-highlight3 text-sm" placeholder="URL da foto do produto..." />
            {imageUrl && (
              <div className="mt-3 relative w-full h-32 rounded-lg border border-[#DE9B72]/30 overflow-hidden">
                <img src={imageUrl} alt="Preview" className="w-full h-full object-cover opacity-80" />
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-[#DE9B72]/30">
            <button onClick={() => setView('list')} className="px-6 py-2 rounded-lg font-sans font-bold text-sm text-highlight3 hover:bg-[#DE9B72]/20 uppercase transition-colors">Cancelar</button>
            <button onClick={handleSave} disabled={saving} className="px-6 py-2 bg-details text-[#f5deb3] rounded-lg font-sans font-bold text-sm hover:bg-highlight flex items-center gap-2 uppercase transition-colors">
              <Save size={16} /> Salvar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/70 backdrop-blur-sm border-2 border-[#DE9B72]/50 rounded-2xl p-6 shadow-xl">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6 border-b border-[#DE9B72]/30 pb-4">
        <h2 className="text-3xl md:text-4xl font-romantic text-highlight3">Lista de Presentes</h2>
        <button onClick={() => openForm()} className="flex items-center gap-2 bg-details text-[#f5deb3] font-sans text-xs font-bold uppercase px-4 py-2 rounded-lg hover:bg-highlight transition-all shadow-md">
          <Plus size={16} /> Novo Presente
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
        {gifts.length === 0 ? <p className="text-sm font-sans text-highlight3/60 italic col-span-full">Nenhum presente na lista.</p> : gifts.map(gift => (
          <div key={gift.id} className="bg-white rounded-xl p-5 border border-[#DE9B72]/40 text-center relative shadow-sm hover:shadow-md transition-shadow flex flex-col">
            
            {/* Imagem do Presente ou Ícone Genérico */}
            <div className="w-full h-32 rounded-lg border border-[#DE9B72]/20 mb-4 overflow-hidden bg-highlight/5 flex items-center justify-center">
              {gift.image_url ? (
                <img src={gift.image_url} alt={gift.title} className="w-full h-full object-cover" />
              ) : (
                <ImageIcon className="text-highlight3/30 w-12 h-12" />
              )}
            </div>

            <h4 className="text-sm font-sans font-bold text-highlight3 tracking-widest uppercase mb-2 truncate">{gift.title}</h4>
            <div className="h-px w-16 mx-auto bg-[#DE9B72]/40 mb-3"></div>
            
            <p className="text-details text-3xl font-romantic mb-4 drop-shadow-sm flex-1">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(gift.suggested_value)}
            </p>
            
            {/* Status de Reserva e Links */}
            <div className="flex flex-col gap-2 mb-4">
              {gift.link && (
                <p className="text-[9px] font-bold uppercase tracking-wider text-details flex items-center justify-center gap-1">
                  <ExternalLink size={10} /> Link de Loja Ativo
                </p>
              )}
              
              {gift.is_reserved ? (
                <span className="bg-red-100 border border-red-300 text-red-800 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                  Reservado via {gift.reservation_type === 'compra' ? 'Loja' : 'Pix'}
                </span>
              ) : (
                <span className="bg-green-100 border border-green-300 text-green-800 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                  Disponível
                </span>
              )}
            </div>

            {/* Ações */}
            <div className="flex justify-center gap-2 pt-3 border-t border-[#DE9B72]/20">
              <button onClick={() => openForm(gift)} className="p-2 bg-highlight/10 border border-highlight/20 text-highlight rounded hover:bg-highlight hover:text-white transition-colors" title="Editar">
                <Edit2 size={16} />
              </button>
              
              {gift.is_reserved && (
                <button onClick={() => handleUnlockGift(gift.id)} className="p-2 bg-orange-100 border border-orange-300 text-orange-600 rounded hover:bg-orange-500 hover:text-white transition-colors" title="Liberar Presente">
                  <Unlock size={16} />
                </button>
              )}

              <button onClick={() => handleDelete(gift.id)} className="p-2 bg-red-50 border border-red-200 text-red-600 rounded hover:bg-red-600 hover:text-white transition-colors" title="Excluir">
                <Trash2 size={16} />
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}