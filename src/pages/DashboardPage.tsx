import { useState, useEffect } from "react";
import { supabase } from "../config/supabase";
import { Users, Gift, TrendingUp, LogOut, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Importação das Tipagens Compartilhadas e Abas Separadas
import type { Guest, GuestGroup, GiftItem, TabType } from "../types/guest";
import GuestListTab from "../component/dashboard/GuestListTab";
import ManageGroupsTab from "../component/dashboard/ManageGroupsTab";
import ManageGiftsTab from "../component/dashboard/ManageGiftsTab";
import SettingsTab from "../component/dashboard/SettingsTab";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<TabType>('geral');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  // Estados de Dados Compartilhados
  const [groups, setGroups] = useState<GuestGroup[]>([]);
  const [gifts, setGifts] = useState<GiftItem[]>([]);
  const [allGuests, setAllGuests] = useState<Guest[]>([]);
  const [couplePix, setCouplePix] = useState("");
  const [coupleToken, setCoupleToken] = useState("");

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const coupleId = localStorage.getItem('couple_id');

      if (coupleId) {
        const { data: coupleData } = await supabase.from('vw_couples').select('*').eq('id', coupleId).single();
        if (coupleData) {
          setCouplePix(coupleData.pix_key || "");
          setCoupleToken(coupleData.access_token || "");
        }
      }

      const { data: groupsData } = await supabase.from('vw_guest_groups').select('*, guests:vw_guests(*)');
      const { data: giftsData } = await supabase.from('vw_gifts').select('*');

      if (groupsData) {
        setGroups(groupsData as GuestGroup[]);
        const guestsList: Guest[] = [];
        groupsData.forEach(group => {
          group.guests?.forEach((g: Guest) => {
            guestsList.push({ ...g, groupName: group.name });
          });
        });
        setAllGuests(guestsList);
      }
      
      if (giftsData) setGifts(giftsData);

    } catch (error) {
      console.error("Erro ao carregar painel:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const confirmados = allGuests.filter(g => g.status === 'confirmed');
  const pendentes = allGuests.filter(g => g.status === 'pending');

  return (
    <div 
      className="min-h-screen p-4 md:p-6 flex flex-col items-center" 
      style={{
        backgroundColor: "#F3EADA",
        backgroundImage: "url('https://www.transparenttextures.com/patterns/project-paper.png')",
        backgroundBlendMode: "multiply"
      }}
    >
      {/* ========================================== */}
      {/* CABEÇALHO */}
      {/* ========================================== */}
      <div className="w-full max-w-6xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 animate-in fade-in slide-in-from-top-8 duration-700">
        
        {/* Plaquinha Unificada com Efeito Rústico */}
        <div className="flex flex-col items-start">
          <div 
            className="relative px-10 py-5 md:px-12 md:py-6 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.45)] inline-block bg-cover bg-center text-center md:text-left overflow-hidden border border-amber-950/20"
            style={{ backgroundImage: "url('https://images.pexels.com/photos/172289/pexels-photo-172289.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')" }}
          >
            {/* Sombra interna e escuridão suave para destacar as letras */}
            <div className="absolute inset-0 bg-black/35 shadow-[inset_0_0_30px_rgba(0,0,0,0.6)] rounded-xl pointer-events-none"></div>
            
            {/* Elementos decorativos (Parafusos rústicos com sombra) */}
            <div className="absolute top-1/2 left-3.5 -translate-y-1/2 w-3 h-3 rounded-full bg-amber-950/90 shadow-[inset_0_1px_3px_rgba(0,0,0,0.8),_0_2px_4px_rgba(0,0,0,0.4)]"></div>
            <div className="absolute top-1/2 right-3.5 -translate-y-1/2 w-3 h-3 rounded-full bg-amber-950/90 shadow-[inset_0_1px_3px_rgba(0,0,0,0.8),_0_2px_4px_rgba(0,0,0,0.4)]"></div>
            
            {/* Conteúdo Interno da Placa */}
            <div className="relative z-10 flex flex-col gap-1.5 px-4">
              <h1 className="text-3xl md:text-5xl font-serif text-amber-100 drop-shadow-[0_4px_6px_rgba(0,0,0,0.9)] tracking-wider font-bold">
                Painel dos Noivos
              </h1>
              <h2 className="text-lg md:text-xl font-serif text-amber-200/95 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] font-medium italic tracking-wide">
                Bem-vindos Milene & Gabriel
              </h2>
            </div>
          </div>
        </div>

        {/* Botão de Sair Alinhado à Direita */}
        <div className="flex items-center bg-white/50 backdrop-blur-sm border border-[#DE9B72]/30 rounded-xl p-2.5 shadow-md self-end md:self-center">
          <button 
            onClick={() => {
              localStorage.removeItem('casamento_role');
              localStorage.removeItem('couple_id');
              navigate('/');
            }} 
            className="flex items-center gap-2 text-red-700/80 hover:text-red-800 transition-colors font-sans text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg hover:bg-red-50/50"
          >
            <LogOut size={16} /> <span>Sair</span>
          </button>
        </div>
      </div>

      {/* ========================================== */}
      {/* MENU DE ABAS */}
      {/* ========================================== */}
      <div className="w-full max-w-6xl mt-6">
        <div className="bg-white/60 backdrop-blur-sm border-2 border-[#DE9B72]/40 rounded-xl p-2 md:p-3 shadow-lg flex flex-wrap gap-2">
          {[
            { id: 'geral', label: 'Lista de Presença', icon: <TrendingUp size={16} /> },
            { id: 'familias', label: 'Gerenciar Grupos', icon: <Users size={16} /> },
            { id: 'presentes', label: 'Lista de Presentes', icon: <Gift size={16} /> },
            { id: 'config', label: 'Configurações', icon: <Settings size={16} /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex-1 flex justify-center items-center gap-2 px-3 py-2.5 rounded-lg border transition-all font-sans text-xs md:text-sm font-bold shadow-sm min-w-[140px] ${
                activeTab === tab.id 
                  ? 'bg-details border-details text-[#f5deb3]' 
                  : 'bg-transparent border-[#DE9B72]/40 text-highlight3 hover:bg-white hover:border-[#DE9B72]'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================== */}
      {/* RENDERIZAÇÃO DOS COMPONENTES (ABAS) */}
      {/* ========================================== */}
      <div className="w-full max-w-6xl mt-6">
        {loading ? (
          <div className="bg-white/50 border-2 border-[#DE9B72]/30 rounded-xl p-12 text-center text-highlight3 animate-pulse font-sans font-bold">
            Carregando informações da fazenda...
          </div>
        ) : (
          <div className="animate-in fade-in duration-500">
            {activeTab === 'geral' && <GuestListTab confirmados={confirmados} pendentes={pendentes} />}
            {activeTab === 'familias' && <ManageGroupsTab groups={groups} onRefresh={fetchDashboardData} />}
            {activeTab === 'presentes' && <ManageGiftsTab gifts={gifts} onRefresh={fetchDashboardData} />}
            {activeTab === 'config' && <SettingsTab initialPix={couplePix} initialToken={coupleToken} />}
          </div>
        )}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(222, 155, 114, 0.1); border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(132, 89, 43, 0.4); border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(132, 89, 43, 0.7); }
      `}</style>
    </div>
  );
}