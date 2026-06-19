import { useState, useEffect } from "react";
import { supabase } from "../config/supabase";
import cornerImage from "../assets/img/cornerImage.png";
import { Users, Gift, TrendingUp, Plus, Edit2, Trash2, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

// --- Tipagens baseadas no nosso Banco de Dados ---
interface Guest {
  id: string;
  name: string;
  status: 'pending' | 'confirmed' | 'declined';
}

interface GuestGroup {
  id: string;
  name: string;
  token: string;
  guests: Guest[];
}

interface GiftItem {
  id: string;
  title: string;
  suggested_value: number;
}

type TabType = 'geral' | 'convidados' | 'presentes';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<TabType>('geral');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  // Estados de Dados
  const [groups, setGroups] = useState<GuestGroup[]>([]);
  const [gifts, setGifts] = useState<GiftItem[]>([]);
  const [stats, setStats] = useState({ confirmados: 0, pendentes: 0, totalArrecadado: 0 });

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Busca Grupos e Convidados atrelados
        const { data: groupsData } = await supabase.from('guest_groups').select('*, guests(*)');
        
        // Busca Presentes
        const { data: giftsData } = await supabase.from('gifts').select('*');
        
        // Busca Contribuições Pagas (Pix)
        const { data: contributionsData } = await supabase.from('contributions').select('amount').eq('payment_status', 'paid');

        if (groupsData) {
          setGroups(groupsData as GuestGroup[]);
          
          let conf = 0;
          let pend = 0;
          groupsData.forEach(group => {
            group.guests?.forEach((g: Guest) => {
              if (g.status === 'confirmed') conf++;
              if (g.status === 'pending') pend++;
            });
          });
          
          const totalDinheiro = contributionsData?.reduce((acc, curr) => acc + Number(curr.amount), 0) || 0;
          setStats({ confirmados: conf, pendentes: pend, totalArrecadado: totalDinheiro });
        }
        
        if (giftsData) setGifts(giftsData);

      } catch (error) {
        console.error("Erro ao carregar painel:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // --- Estilos Baseados no Seu Design ---
  const vintageBackground = {
    backgroundColor: "#301905",
    backgroundImage: `
      url('https://www.transparenttextures.com/patterns/snow.png'),
      radial-gradient(circle, rgba(255,217,182,0.15) 0%, rgba(46, 23, 14, 0.85) 100%)
    `,
    backgroundBlendMode: "multiply" as const,
    backgroundSize: "cover",
  };

  const cardStyle = {
    backgroundColor: "#4d6648", // Sua cor 'details'
    backgroundImage: "url('https://www.transparenttextures.com/patterns/old-wall.png')",
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 md:p-8 relative overflow-hidden" style={vintageBackground}>
      
      {/* Botão de Sair */}
      <button 
        onClick={() => navigate('/')} 
        className="absolute top-6 right-6 flex items-center gap-2 text-background/70 hover:text-background transition-colors font-sans"
      >
        <LogOut size={20} /> Sair
      </button>

      {/* Cabeçalho do Painel */}
      <div className="w-full max-w-6xl z-10 mb-8 text-center mt-8">
        <h1 className="text-5xl md:text-6xl font-romantic text-background drop-shadow-md mb-2">
          Painel dos Noivos
        </h1>
        <p className="text-background/80 font-sans italic">Gerencie seu grande dia com facilidade e privacidade.</p>
      </div>

      {/* Navegação por Abas */}
      <div className="w-full max-w-6xl z-10 flex flex-wrap justify-center gap-4 mb-8">
        {[
          { id: 'geral', label: 'Visão Geral', icon: <TrendingUp size={18} /> },
          { id: 'convidados', label: 'Convidados', icon: <Users size={18} /> },
          { id: 'presentes', label: 'Lista de Presentes', icon: <Gift size={18} /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl border-2 transition-all font-sans font-bold ${
              activeTab === tab.id 
                ? 'bg-[#DE9B72] border-[#DE9B72] text-highlight3 shadow-[0_0_15px_rgba(222,155,114,0.4)] scale-105' 
                : 'bg-details/60 border-[#DE9B72]/40 text-background hover:bg-details'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Área de Conteúdo */}
      <div className="w-full max-w-6xl z-10">
        {loading ? (
          <div className="text-center text-[#DE9B72] animate-pulse py-20 font-sans">Carregando seus dados...</div>
        ) : (
          <>
            {/* ================= ABA: VISÃO GERAL ================= */}
            {activeTab === 'geral' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in zoom-in duration-500">
                
                {/* Card 1: Confirmados */}
                <div className="relative rounded-2xl p-6 border-2 border-[#DE9B72] shadow-xl overflow-hidden" style={cardStyle}>
                  <img src={cornerImage} className="absolute top-0 left-0 w-10 h-10 opacity-50" alt="corner" />
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <Users className="text-[#DE9B72] w-12 h-12 mb-4 opacity-80" />
                    <h3 className="text-5xl font-romantic text-background mb-2">{stats.confirmados}</h3>
                    <p className="text-[#DE9B72] text-sm uppercase tracking-widest font-sans font-bold">Presenças Confirmadas</p>
                  </div>
                </div>

                {/* Card 2: Pendentes */}
                <div className="relative rounded-2xl p-6 border-2 border-[#DE9B72] shadow-xl overflow-hidden" style={cardStyle}>
                  <img src={cornerImage} className="absolute top-0 right-0 w-10 h-10 scale-x-[-1] opacity-50" alt="corner" />
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-12 h-12 flex items-center justify-center border-2 border-[#DE9B72] rounded-full text-[#DE9B72] mb-4 opacity-80 font-bold text-xl font-sans">?</div>
                    <h3 className="text-5xl font-romantic text-background mb-2">{stats.pendentes}</h3>
                    <p className="text-[#DE9B72] text-sm uppercase tracking-widest font-sans font-bold">Aguardando Resposta</p>
                  </div>
                </div>

                {/* Card 3: Arrecadação */}
                <div className="relative rounded-2xl p-6 border-2 border-[#DE9B72] shadow-xl overflow-hidden" style={cardStyle}>
                  <img src={cornerImage} className="absolute bottom-0 right-0 w-10 h-10 scale-[-1] opacity-50" alt="corner" />
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <TrendingUp className="text-[#DE9B72] w-12 h-12 mb-4 opacity-80" />
                    <h3 className="text-4xl font-romantic text-background mb-2 mt-2">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(stats.totalArrecadado)}
                    </h3>
                    <p className="text-[#DE9B72] text-sm uppercase tracking-widest font-sans font-bold">Presentes em Pix</p>
                  </div>
                </div>

              </div>
            )}

            {/* ================= ABA: CONVIDADOS ================= */}
            {activeTab === 'convidados' && (
              <div className="animate-in fade-in duration-500 rounded-2xl border-2 border-[#DE9B72]/60 bg-details/40 p-6 backdrop-blur-md shadow-2xl">
                <div className="flex justify-between items-center mb-6 border-b border-[#DE9B72]/30 pb-4">
                  <h2 className="text-4xl font-romantic text-background">Grupos & Famílias</h2>
                  <button className="flex items-center gap-2 bg-gradient-to-r from-highlight2 to-highlight3 text-background font-sans font-bold px-4 py-2 rounded-lg border border-[#DE9B72]/50 hover:scale-105 transition-transform">
                    <Plus size={16} /> Novo Grupo
                  </button>
                </div>

                <div className="space-y-4">
                  {groups.length === 0 ? (
                    <p className="text-center text-background/60 py-8 font-sans">Nenhum grupo cadastrado ainda.</p>
                  ) : (
                    groups.map(group => (
                      <div key={group.id} className="bg-black/30 rounded-xl p-4 border border-[#DE9B72]/20 flex flex-col md:flex-row justify-between md:items-center gap-4">
                        <div>
                          <h4 className="text-2xl font-romantic text-background">{group.name}</h4>
                          <p className="text-sm text-[#DE9B72] font-mono mt-1">Token: <span className="bg-black/50 px-2 py-1 rounded select-all font-bold tracking-wider">{group.token}</span></p>
                        </div>
                        
                        <div className="flex-1 max-w-md">
                          <div className="flex flex-wrap gap-2">
                            {group.guests?.map(guest => (
                              <span key={guest.id} className={`text-xs px-3 py-1 rounded-full border font-sans font-bold ${
                                guest.status === 'confirmed' ? 'bg-green-900/50 border-green-500/50 text-green-200' :
                                guest.status === 'declined' ? 'bg-red-900/50 border-red-500/50 text-red-200' :
                                'bg-gray-800/50 border-gray-500/50 text-gray-300'
                              }`}>
                                {guest.name}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button className="p-2 bg-details rounded border border-[#DE9B72]/40 text-background hover:bg-details/80 transition-colors"><Edit2 size={16} /></button>
                          <button className="p-2 bg-red-900/40 rounded border border-red-500/40 text-red-300 hover:bg-red-900/60 transition-colors"><Trash2 size={16} /></button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* ================= ABA: PRESENTES ================= */}
            {activeTab === 'presentes' && (
              <div className="animate-in fade-in duration-500 rounded-2xl border-2 border-[#DE9B72]/60 bg-details/40 p-6 backdrop-blur-md shadow-2xl">
                <div className="flex justify-between items-center mb-6 border-b border-[#DE9B72]/30 pb-4">
                  <h2 className="text-4xl font-romantic text-background">Lista de Presentes</h2>
                  <button className="flex items-center gap-2 bg-gradient-to-r from-highlight2 to-highlight3 text-background font-sans font-bold px-4 py-2 rounded-lg border border-[#DE9B72]/50 hover:scale-105 transition-transform">
                    <Plus size={16} /> Novo Presente
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {gifts.length === 0 ? (
                    <p className="text-center text-background/60 py-8 col-span-full font-sans">Nenhum presente cadastrado.</p>
                  ) : (
                    gifts.map(gift => (
                      <div key={gift.id} className="bg-black/30 rounded-xl p-5 border border-[#DE9B72]/30 text-center relative shadow-lg" style={cardStyle}>
                        <h4 className="text-lg font-sans font-bold text-background mb-2">{gift.title}</h4>
                        <p className="text-[#DE9B72] text-3xl font-romantic mb-6">
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(gift.suggested_value)}
                        </p>
                        <div className="flex justify-center gap-3">
                          <button className="p-2 bg-black/20 text-background rounded hover:bg-black/40 transition-colors"><Edit2 size={16} /></button>
                          <button className="p-2 bg-red-900/20 text-red-300 rounded hover:bg-red-900/40 transition-colors"><Trash2 size={16} /></button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}