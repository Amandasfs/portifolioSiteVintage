import { useState, useEffect } from "react";
import { Settings, Save } from "lucide-react";
import { supabase } from "../../config/supabase";

interface SettingsTabProps {
  initialPix: string;
  initialToken: string;
}

export default function SettingsTab({ initialPix, initialToken }: SettingsTabProps) {
  const [couplePix, setCouplePix] = useState(initialPix);
  const [coupleToken, setCoupleToken] = useState(initialToken);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setCouplePix(initialPix);
    setCoupleToken(initialToken);
  }, [initialPix, initialToken]);

  const handleSaveConfig = async () => {
    if (!coupleToken.trim()) return alert("O token de acesso não pode ficar vazio.");
    setSaving(true);
    try {
      const coupleId = localStorage.getItem('couple_id');
      const { error } = await supabase.from('vw_couples').update({
        access_token: coupleToken.trim().toUpperCase(),
        pix_key: couplePix.trim()
      }).eq('id', coupleId);
      
      if (error) throw error;
      alert("Configurações atualizadas com sucesso!");
    } catch (err) {
      alert("Erro ao salvar configurações. Verifique se o token já existe.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm border-2 border-[#DE9B72]/50 rounded-2xl p-6 shadow-xl max-w-2xl mx-auto animate-in fade-in duration-500">
      <h2 className="text-3xl md:text-4xl font-romantic text-highlight3 mb-6 border-b border-[#DE9B72]/30 pb-4 flex items-center gap-3">
        <Settings className="text-details" /> Configurações do Casal
      </h2>

      <div className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-highlight3 uppercase tracking-wider mb-2">Chave PIX (Para receber os presentes)</label>
          <input type="text" value={couplePix} onChange={(e) => setCouplePix(e.target.value)} className="w-full p-4 rounded-lg border-2 border-[#DE9B72]/40 focus:border-details outline-none font-bold text-highlight3 text-lg" placeholder="E-mail, CPF, Telefone ou Chave Aleatória" />
          <p className="text-[10px] text-highlight/80 mt-1 uppercase tracking-widest font-bold">Usada para gerar o QR Code na tela de presentes.</p>
        </div>

        <div>
          <label className="block text-xs font-bold text-highlight3 uppercase tracking-wider mb-2">Senha / Token de Acesso do Painel</label>
          <input type="text" value={coupleToken} onChange={(e) => setCoupleToken(e.target.value.toUpperCase())} className="w-full p-4 rounded-lg border-2 border-[#DE9B72]/40 focus:border-details outline-none font-bold tracking-[0.3em] text-highlight3 text-lg uppercase" />
        </div>

        <div className="flex justify-end pt-4 border-t border-[#DE9B72]/30">
          <button onClick={handleSaveConfig} disabled={saving} className="px-8 py-3 bg-gradient-to-r from-details to-highlight text-[#f5deb3] rounded-lg font-sans font-bold text-sm hover:scale-105 flex items-center gap-2 uppercase tracking-widest shadow-lg transition-transform">
            <Save size={18} /> {saving ? "Salvando..." : "Salvar Configurações"}
          </button>
        </div>
      </div>
    </div>
  );
}