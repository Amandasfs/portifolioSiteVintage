import { useState, useEffect } from "react";
import { Settings, Save } from "lucide-react";
import { supabase } from "../../config/supabase";

interface SettingsTabProps {
  initialPix: string;
}

export default function SettingsTab({ initialPix }: SettingsTabProps) {
  const [couplePix, setCouplePix] = useState(initialPix);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setCouplePix(initialPix);
  }, [initialPix]);

  const handleSaveConfig = async () => {
    setSaving(true);
    try {
      const coupleId = localStorage.getItem('couple_id');
      const { error } = await supabase.from('vw_couples').update({
        pix_key: couplePix.trim()
      }).eq('id', coupleId);
      
      if (error) throw error;
      alert("Configurações atualizadas com sucesso!");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      alert("Erro ao salvar configurações.");
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

        <div className="flex justify-end pt-4 border-t border-[#DE9B72]/30">
          <button onClick={handleSaveConfig} disabled={saving} className="px-8 py-3 bg-gradient-to-r from-details to-highlight text-[#f5deb3] rounded-lg font-sans font-bold text-sm hover:scale-105 flex items-center gap-2 uppercase tracking-widest shadow-lg transition-transform">
            <Save size={18} /> {saving ? "Salvando..." : "Salvar Configurações"}
          </button>
        </div>
      </div>
    </div>
  );
}