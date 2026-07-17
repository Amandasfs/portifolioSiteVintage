import { useState } from "react";
import { Plus, Edit2, Trash2, Save } from "lucide-react";
import { supabase } from "../../config/supabase";
import type { GuestGroup } from "../../types/guest";

export default function ManageGroupsTab({ groups, onRefresh }: { groups: GuestGroup[], onRefresh: () => void }) {
  const [view, setView] = useState<'list' | 'form'>('list');
  const [saving, setSaving] = useState(false);
  const [editingGroupId, setEditingGroupId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [guests, setGuests] = useState<{ localId: number; id?: string; name: string }[]>([]);
  const [deletedIds, setDeletedIds] = useState<string[]>([]);

  const openForm = (group?: GuestGroup) => {
    if (group) {
      setEditingGroupId(group.id);
      setName(group.name);
      setToken(group.token);
      setGuests(group.guests.length > 0 ? group.guests.map((g, i) => ({ localId: Date.now() + i, id: g.id, name: g.name })) : [{ localId: Date.now(), name: "" }]);
    } else {
      setEditingGroupId(null);
      setName("");
      setToken(Math.random().toString(36).substring(2, 8).toUpperCase());
      setGuests([{ localId: Date.now(), name: "" }]);
    }
    setDeletedIds([]);
    setView('form');
  };

  const handleSave = async () => {
    if (!name.trim() || !token.trim() || guests.every(g => !g.name.trim())) return alert("Preencha o nome do grupo e adicione convidados.");
    setSaving(true);
    try {
      const coupleId = localStorage.getItem('couple_id');
      let groupId = editingGroupId;

      if (groupId) {
        await supabase.from('vw_guest_groups').update({ name: name.trim() }).eq('id', groupId);
        if (deletedIds.length > 0) await supabase.from('vw_guests').delete().in('id', deletedIds);
      } else {
        const { data: newGroup, error } = await supabase.from('vw_guest_groups').insert({ couple_id: coupleId, name: name.trim(), token: token.trim().toUpperCase() }).select().single();
        if (error) throw error;
        groupId = newGroup.id;
      }

      const operations = guests.filter(g => g.name.trim() !== "").map(g => {
        if (g.id) return supabase.from('vw_guests').update({ name: g.name.trim() }).eq('id', g.id);
        else return supabase.from('vw_guests').insert({ group_id: groupId, name: g.name.trim(), status: 'pending' });
      });

      await Promise.all(operations);
      onRefresh();
      setView('list');
    } catch (err) {
      console.error("Erro ao salvar grupo:", err);
      alert("Erro ao salvar grupo.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, groupName: string) => {
    if (!window.confirm(`Excluir grupo "${groupName}"?`)) return;
    await supabase.from('vw_guests').delete().eq('group_id', id);
    await supabase.from('vw_guest_groups').delete().eq('id', id);
    onRefresh();
  };

  if (view === 'form') {
    return (
      <div className="bg-white/70 backdrop-blur-sm border-2 border-[#DE9B72]/50 rounded-2xl p-6 shadow-xl max-w-2xl mx-auto animate-in fade-in duration-300">
        <h2 className="text-3xl font-romantic text-highlight3 mb-6 border-b border-[#DE9B72]/30 pb-4">{editingGroupId ? 'Editar Grupo' : 'Novo Grupo'}</h2>
        <div className="space-y-4">
          <div><label className="block text-xs font-bold text-highlight3 uppercase tracking-wider mb-1">Nome do Grupo</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 rounded-lg border-2 border-[#DE9B72]/40 focus:border-details outline-none font-bold text-highlight3" placeholder="Ex: Família Silva" /></div>
          <div><label className="block text-xs font-bold text-highlight3 uppercase tracking-wider mb-1">Token de Acesso</label><input type="text" value={token} onChange={(e) => setToken(e.target.value.toUpperCase())} disabled={!!editingGroupId} className="w-full p-3 rounded-lg border-2 border-[#DE9B72]/40 bg-gray-50 focus:border-details outline-none font-bold tracking-widest text-highlight3 disabled:opacity-60" /></div>
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-highlight3 uppercase tracking-wider">Integrantes</label>
              <button onClick={() => setGuests([...guests, { localId: Date.now(), name: "" }])} className="text-xs font-bold text-details flex items-center gap-1 uppercase hover:underline"><Plus size={14}/> Adicionar</button>
            </div>
            {guests.map((g, i) => (
              <div key={g.localId} className="flex gap-2 mb-2">
                <input type="text" value={g.name} onChange={(e) => setGuests(guests.map(xg => xg.localId === g.localId ? { ...xg, name: e.target.value } : xg))} className="flex-1 p-3 rounded-lg border-2 border-[#DE9B72]/40 focus:border-details outline-none text-highlight3 font-medium" placeholder={`Convidado ${i+1}`} />
                <button onClick={() => { if(guests.length > 1) { setGuests(guests.filter(xg => xg.localId !== g.localId)); if (g.id) setDeletedIds([...deletedIds, g.id]); } }} disabled={guests.length === 1} className="p-3 bg-red-50 text-red-500 rounded-lg border-2 border-red-200 disabled:opacity-50"><Trash2 size={18}/></button>
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-[#DE9B72]/30">
            <button onClick={() => setView('list')} className="px-6 py-2 rounded-lg font-sans font-bold text-sm text-highlight3 hover:bg-[#DE9B72]/20 uppercase transition-colors">Cancelar</button>
            <button onClick={handleSave} disabled={saving} className="px-6 py-2 bg-details text-[#f5deb3] rounded-lg font-sans font-bold text-sm hover:bg-highlight flex items-center gap-2 uppercase transition-colors"><Save size={16} /> Salvar</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/70 backdrop-blur-sm border-2 border-[#DE9B72]/50 rounded-2xl p-6 shadow-xl">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6 border-b border-[#DE9B72]/30 pb-4">
        <h2 className="text-3xl md:text-4xl font-romantic text-highlight3">Grupos de Convidados</h2>
        <button onClick={() => openForm()} className="flex items-center gap-2 bg-details text-[#f5deb3] font-sans text-xs font-bold uppercase px-4 py-2 rounded-lg hover:bg-highlight transition-all shadow-md"><Plus size={16} /> Novo Grupo</button>
      </div>
      <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
        {groups.length === 0 ? <p className="text-sm font-sans text-highlight3/60 italic">Nenhum grupo cadastrado.</p> : groups.map(group => (
          <div key={group.id} className="bg-white rounded-xl p-5 border border-[#DE9B72]/40 flex flex-col md:flex-row justify-between md:items-center gap-4 shadow-sm">
            <div className="min-w-[120px]">
              <h4 className="text-xl md:text-2xl font-romantic text-details">{group.name}</h4>
              <p className="text-[10px] text-highlight3 font-sans uppercase mt-1">Token: <span className="bg-highlight/10 text-highlight border border-highlight/20 px-2 py-0.5 rounded font-bold">{group.token}</span></p>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap gap-1.5">
                {group.guests?.map(guest => (
                  <span key={guest.id} className={`text-[9px] px-2 py-0.5 rounded border font-sans uppercase font-bold ${guest.status === 'confirmed' ? 'bg-green-100 border-green-300 text-green-800' : guest.status === 'declined' ? 'bg-red-100 border-red-300 text-red-800' : 'bg-gray-100 border-gray-300 text-gray-600'}`}>{guest.name}</span>
                ))}
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => openForm(group)} className="p-2 bg-highlight/10 rounded border border-highlight/30 text-highlight hover:bg-highlight hover:text-white transition-colors"><Edit2 size={16} /></button>
              <button onClick={() => handleDelete(group.id, group.name)} className="p-2 bg-red-50 rounded border border-red-200 text-red-600 hover:bg-red-600 hover:text-white transition-colors"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}