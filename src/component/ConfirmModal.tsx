import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Ajuste o caminho da imagem se necessário na sua estrutura
import cornerImage from "../assets/img/cornerImage.png"; 
import { supabase } from "../config/supabase"; 

// --- 1. Importação das Tipagens Corretas ---
// Assumindo que criamos o arquivo unificado em src/types/Guest.ts
import type { Guest, GuestGroup } from "../types/Guest";

export default function ConfirmModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [naoIrei, setNaoIrei] = useState(false);
  const [membrosConfirmados, setMembrosConfirmados] = useState<string[]>([]);
  const [familiaCarregada, setFamiliaCarregada] = useState<GuestGroup | null>(null);
  
  const navigate = useNavigate();

  // --- 2. Busca no Supabase via VIEW (Ajustado) ---
  const carregarFamilia = async () => {
    const tokenFormatado = token.trim().toUpperCase();
    if (!tokenFormatado) return;
    
    setLoading(true);
    setErrorMsg("");
    setFamiliaCarregada(null); // Limpa busca anterior

    try {
      // AJUSTE: Apontando para a VIEW 'vw_guest_groups' e 'vw_guests'
      const { data: familia, error } = await supabase
        .from('vw_guest_groups')
        .select('*, guests:vw_guests(*)') // Puxa os integrantes usando a view de convidados
        .eq('token', tokenFormatado) // Usamos .eq pois já formatamos para Maiúsculo
        .maybeSingle();

      if (error) throw error;

      if (!familia) {
        setErrorMsg("Código não encontrado. Verifique seu convite impresso!");
        return;
      }

      // Tipagem manual necessária devido ao rename 'guests:vw_guests(*)' na query
      const familiaFormatada = familia as unknown as GuestGroup;

      setFamiliaCarregada(familiaFormatada);
      
      // Armazena dados para a página de presentes
      localStorage.setItem('guest_group_id', familiaFormatada.id);
      localStorage.setItem('guest_token', familiaFormatada.token); // Útil para garantir acesso na prox tela
      localStorage.setItem('casamento_role', 'guest');

      // Pré-marca quem já estava confirmado
      const jaConfirmados = familiaFormatada.guests
        .filter((c) => c.status === 'confirmed')
        .map((c) => c.id);
        
      setMembrosConfirmados(jaConfirmados);
      // Se todos estavam declined, marca o 'Não irei' automaticamente
      if (familiaFormatada.guests.length > 0 && familiaFormatada.guests.every(g => g.status === 'declined')) {
          setNaoIrei(true);
      } else {
          setNaoIrei(false);
      }

    } catch (err) {
      console.error("Erro ao buscar convite:", err);
      setErrorMsg("Erro de conexão. Tente novamente em alguns segundos.");
    } finally {
      setLoading(false);
    }
  };

  // --- 3. Salvando Confirmação via VIEW (Ajustado) ---
  const handleConfirmar = async () => {
    if (!familiaCarregada) return;
    setLoading(true);
    
    try {
      // Cria um array de promessas para atualizar os convidados usando a VIEW
      const updates = familiaCarregada.guests.map((membro) => {
        // Lógica do Status
        const novoStatus = naoIrei 
          ? 'declined' 
          : (membrosConfirmados.includes(membro.id) ? 'confirmed' : 'declined');

        // AJUSTE: Atualizando via VIEW 'vw_guests' para ignorar RLS
        return supabase
          .from("vw_guests")
          .update({ 
            status: novoStatus,
            // updated_at é opcional, mas bom se tiver a coluna
          })
          .eq("id", membro.id);
      });

      // Dispara todas as atualizações simultaneamente
      const results = await Promise.all(updates);
      
      // Verifica falhas
      const firstError = results.find(res => res.error);
      if (firstError) throw firstError.error;

      // Sucesso! Redireciona para a página de presentes (Ajustado o nome da rota)
      navigate("/presentes"); 
      onClose(); // Fecha o modal
      
    } catch (err: any) {
      console.error("Erro ao salvar confirmação:", err);
      alert(`Tivemos um problema: ${err.message || "Tente novamente."}`);
    } finally {
      setLoading(false);
    }
  };

  const toggleMembroConfirmado = (membroId: string) => {
    if (naoIrei) return; 
    
    setMembrosConfirmados((prev) =>
      prev.includes(membroId)
        ? prev.filter((id) => id !== membroId)
        : [...prev, membroId]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div
        className="relative w-full max-w-[480px] rounded-2xl p-6 md:p-8 shadow-2xl text-center border-2 border-[#DE9B72] overflow-hidden animate-in zoom-in duration-500"
        style={{
          backgroundColor: "#4d6648",
          backgroundImage: "url('https://www.transparenttextures.com/patterns/old-wall.png')",
        }}
      >
        <img src={cornerImage} className="absolute top-0 left-0 w-12 h-12 opacity-80" alt="corner" />
        <img src={cornerImage} className="absolute top-0 right-0 w-12 h-12 scale-x-[-1] opacity-80" alt="corner" />

        <div className="relative z-10 text-background">
          <h3 className="text-3xl font-romantic mb-6 text-[#F8EDEB] drop-shadow-md">
            Confirmar Presença
          </h3>

          {/* FASE 1: Digitar o Token */}
          {!familiaCarregada && (
            <>
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="DIGITE O CÓDIGO DO CONVITE"
                  value={token}
                  onChange={(e) => setToken(e.target.value.toUpperCase())} 
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#DE9B72] bg-[#3A5544]/80 text-[#F8EDEB] placeholder-[#DE9B72]/70 focus:outline-none focus:ring-2 focus:ring-[#DE9B72] text-center tracking-[0.2em] font-bold uppercase"
                />
              </div>
              <button
                onClick={carregarFamilia}
                disabled={loading || !token.trim()}
                className="mb-4 bg-gradient-to-r from-[#442D1C] to-[#5A3A24] text-[#F8EDEB] px-8 py-3 rounded-xl border-2 border-[#DE9B72]/40 disabled:opacity-50 transition-all hover:scale-105 font-bold uppercase tracking-widest text-xs shadow-md"
              >
                {loading ? "Buscando..." : "Buscar Convite"}
              </button>
            </>
          )}

          {errorMsg && <p className="text-red-200 text-xs mb-4 bg-red-950/60 p-3 rounded border border-red-500/30 animate-pulse">{errorMsg}</p>}

          {/* FASE 2: Selecionar Membros */}
          {familiaCarregada && (
            <div className="animate-in fade-in zoom-in duration-300">
              <div className="mb-6 p-4 rounded-xl border-2 border-[#DE9B72]/40 bg-[#3A5544]/60 shadow-inner overflow-hidden relative">
                 {/* Papel de parede de fundo só nessa área */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/project-paper.png')" }}></div>
                
                <div className="relative z-10">
                    <h4 className="text-xl font-romantic text-[#F8EDEB] mb-1">
                      Família
                    </h4>
                    <p className="text-2xl font-bold text-[#DE9B72] mb-4 tracking-tight drop-shadow-sm">{familiaCarregada.name}</p>

                    <div className={`space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar ${naoIrei ? 'opacity-30 pointer-events-none' : ''}`}>
                      {familiaCarregada.guests.map((membro) => (
                        <div
                          key={membro.id}
                          onClick={() => toggleMembroConfirmado(membro.id)}
                          className="flex items-center justify-between p-3 rounded-lg border border-[#DE9B72]/30 bg-[#3A5544]/60 cursor-pointer hover:bg-[#DE9B72]/20 transition-colors group"
                        >
                          <span className="text-[#F8EDEB] font-medium group-hover:text-white">{membro.name}</span>
                          <div className={`w-6 h-6 rounded flex items-center justify-center border-2 transition-all ${membrosConfirmados.includes(membro.id) ? 'bg-[#DE9B72] border-[#DE9B72]' : 'border-[#DE9B72]/60'}`}>
                            {membrosConfirmados.includes(membro.id) && <span className="text-[#3A5544] font-bold text-sm">✓</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                </div>
              </div>

              {/* Checkbox "Não irei" */}
              <div className="flex items-center mb-6 justify-center gap-3 bg-black/20 p-4 rounded-lg border border-[#DE9B72]/20">
                <input
                  type="checkbox"
                  id="naoIrei"
                  checked={naoIrei}
                  onChange={(e) => {
                    setNaoIrei(e.target.checked);
                    if (e.target.checked) setMembrosConfirmados([]); 
                  }}
                  className="w-5 h-5 accent-[#DE9B72] cursor-pointer"
                />
                <label htmlFor="naoIrei" className="text-[#F8EDEB] cursor-pointer font-medium hover:text-white">
                  Infelizmente não poderemos comparecer
                </label>
              </div>

              {/* Botões Finais */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <button
                  disabled={loading || (!naoIrei && membrosConfirmados.length === 0)}
                  onClick={handleConfirmar}
                  className="w-full sm:w-auto bg-gradient-to-r from-[#442D1C] to-[#5A3A24] text-[#F8EDEB] font-bold px-8 py-3 rounded-xl border-2 border-[#DE9B72]/40 disabled:opacity-50 hover:scale-105 transition-transform uppercase tracking-widest text-xs shadow-md"
                >
                  {loading ? "Salvando..." : (naoIrei ? 'Confirmar Ausência' : `Confirmar Presença`)}
                </button>
                <button 
                  onClick={() => {
                      setFamiliaCarregada(null);
                      setToken("");
                  }} 
                  className="text-[#F8EDEB]/70 text-xs hover:text-white hover:underline transition-colors mt-2 sm:mt-0"
                >
                  Trocar código
                </button>
              </div>
            </div>
          )}

          {/* Botão Voltar */}
          {!familiaCarregada && (
             <button onClick={onClose} className="text-[#F8EDEB]/60 hover:text-[#F8EDEB] transition-colors mt-4 text-sm font-medium hover:underline">
               Voltar ao site
             </button>
          )}
        </div>
      </div>
      
      {/* Estilo para a scrollbar customizada rústica */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(222, 155, 114, 0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(222, 155, 114, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #DE9B72;
        }
      `}</style>
    </div>
  );
}