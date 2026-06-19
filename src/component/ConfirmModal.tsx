import { useState } from "react";
import { useNavigate } from "react-router-dom";
import cornerImage from "../assets/img/cornerImage.png";
import { supabase } from "../config/supabase"; // Verifique se esse caminho está correto na sua nova estrutura

// --- 1. Tipagens do Supabase ---
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

  // --- 2. Busca no Supabase ---
  const carregarFamilia = async () => {
    if (!token.trim()) return;
    setLoading(true);
    setErrorMsg("");

    try {
      // Usando os novos nomes das tabelas que criamos no Supabase
      const { data: familia, error } = await supabase
        .from('guest_groups')
        .select('*, guests(*)')
        .ilike('token', token.trim())
        .maybeSingle();

      if (error) throw error;

      if (!familia) {
        setErrorMsg("Código não encontrado. Verifique seu convite impresso!");
        return;
      }

      setFamiliaCarregada(familia as GuestGroup);
      
      // Armazena no LocalStorage para que a página de presentes (se usar) saiba quem está logado
      localStorage.setItem('guest_group_id', familia.id);
      localStorage.setItem('casamento_role', 'guest');

      // Mapeia quem já estava confirmado no banco para deixar o checkbox pré-marcado
      const jaConfirmados = (familia.guests as Guest[])
        .filter((c) => c.status === 'confirmed')
        .map((c) => c.id);
        
      setMembrosConfirmados(jaConfirmados);

    } catch (err) {
      console.error("Erro no Supabase:", err);
      setErrorMsg("Erro de conexão. Tente novamente em alguns segundos.");
    } finally {
      setLoading(false);
    }
  };

  // --- 3. Salvando Confirmação no Supabase ---
  const handleConfirmar = async () => {
    if (!familiaCarregada) return;
    setLoading(true);
    
    try {
      // Cria um array de promessas para atualizar todos os convidados do grupo
      const updates = familiaCarregada.guests.map((membro) => {
        // Lógica do Status: Se marcou "Não irei", todos ficam declined. Senão, vê quem foi selecionado.
        const novoStatus = naoIrei 
          ? 'declined' 
          : (membrosConfirmados.includes(membro.id) ? 'confirmed' : 'declined');

        return supabase
          .from("guests")
          .update({ 
            status: novoStatus,
            updated_at: new Date().toISOString()
          })
          .eq("id", membro.id);
      });

      // Dispara todas as atualizações simultaneamente
      const results = await Promise.all(updates);
      
      // Verifica se alguma atualização falhou
      const hasError = results.some(res => res.error);
      if (hasError) throw new Error("Erro parcial na atualização");

      // Sucesso! Redireciona para a página de presentes
      navigate("/prezents");
      
    } catch (err) {
      console.error("Erro ao salvar:", err);
      alert("Tivemos um problema ao salvar sua confirmação. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const toggleMembroConfirmado = (membroId: string) => {
    if (naoIrei) return; // Se a pessoa marcou que não vai, bloqueia a seleção individual
    
    setMembrosConfirmados((prev) =>
      prev.includes(membroId)
        ? prev.filter((id) => id !== membroId)
        : [...prev, membroId]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm p-4">
      <div
        className="relative w-full max-w-[480px] rounded-2xl p-6 md:p-8 shadow-2xl text-center border-2 border-[#DE9B72] overflow-hidden"
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

          {!familiaCarregada && (
            <>
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Digite o código do seu convite"
                  value={token}
                  onChange={(e) => setToken(e.target.value.toUpperCase())} // Força maiúsculo no token
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#DE9B72] bg-[#3A5544]/80 text-[#F8EDEB] placeholder-[#DE9B72]/70 focus:outline-none focus:ring-2 focus:ring-[#DE9B72] text-center tracking-widest font-bold"
                />
              </div>
              <button
                onClick={carregarFamilia}
                disabled={loading || !token.trim()}
                className="mb-4 bg-gradient-to-r from-[#442D1C] to-[#5A3A24] text-[#F8EDEB] px-8 py-2 rounded-xl border-2 border-[#DE9B72]/40 disabled:opacity-50 transition-all hover:scale-105"
              >
                {loading ? "Buscando..." : "Buscar Convite"}
              </button>
            </>
          )}

          {errorMsg && <p className="text-red-300 text-sm mb-4 bg-black/40 p-2 rounded border border-red-500/30">{errorMsg}</p>}

          {familiaCarregada && (
            <div className="animate-in fade-in zoom-in duration-300">
              <div className="mb-6 p-4 rounded-xl border-2 border-[#DE9B72]/40 bg-[#3A5544]/60">
                <h4 className="text-xl font-romantic text-[#F8EDEB] mb-4">
                  Grupo: {familiaCarregada.name}
                </h4>

                <div className={`space-y-2 max-h-40 overflow-y-auto pr-2 ${naoIrei ? 'opacity-40 pointer-events-none' : ''}`}>
                  {familiaCarregada.guests.map((membro) => (
                    <div
                      key={membro.id}
                      onClick={() => toggleMembroConfirmado(membro.id)}
                      className="flex items-center justify-between p-3 rounded-lg border border-[#DE9B72]/30 bg-[#3A5544]/40 cursor-pointer hover:bg-[#3A5544]/80 transition-colors"
                    >
                      <span className="text-[#F8EDEB] font-medium">{membro.name}</span>
                      <div className={`w-6 h-6 rounded flex items-center justify-center border-2 transition-all ${membrosConfirmados.includes(membro.id) ? 'bg-[#DE9B72] border-[#DE9B72]' : 'border-[#DE9B72]/60'}`}>
                        {membrosConfirmados.includes(membro.id) && <span className="text-[#3A5544] font-bold text-sm">✓</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center mb-6 justify-center gap-3 bg-black/10 p-3 rounded-lg">
                <input
                  type="checkbox"
                  id="naoIrei"
                  checked={naoIrei}
                  onChange={(e) => {
                    setNaoIrei(e.target.checked);
                    if (e.target.checked) setMembrosConfirmados([]); // Limpa as seleções se ele disser que não vai
                  }}
                  className="w-5 h-5 accent-[#DE9B72] cursor-pointer"
                />
                <label htmlFor="naoIrei" className="text-[#F8EDEB] cursor-pointer font-medium">
                  Infelizmente não poderemos ir
                </label>
              </div>

              <div className="flex gap-3 justify-center">
                <button
                  disabled={loading || (!naoIrei && membrosConfirmados.length === 0)}
                  onClick={handleConfirmar}
                  className="bg-gradient-to-r from-[#442D1C] to-[#5A3A24] text-[#F8EDEB] font-bold px-6 py-3 rounded-xl border-2 border-[#DE9B72]/40 disabled:opacity-50 hover:scale-105 transition-transform"
                >
                  {loading ? "Salvando..." : (naoIrei ? 'Confirmar Ausência' : `Confirmar Presença`)}
                </button>
                <button 
                  onClick={() => setFamiliaCarregada(null)} 
                  className="text-[#F8EDEB]/70 text-sm hover:underline"
                >
                  Trocar código
                </button>
              </div>
            </div>
          )}

          {!familiaCarregada && (
             <button onClick={onClose} className="text-[#F8EDEB]/60 hover:text-[#F8EDEB] transition-colors mt-2">
                Voltar ao site
             </button>
          )}
        </div>
      </div>
    </div>
  );
}