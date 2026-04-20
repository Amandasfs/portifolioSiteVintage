import { useState } from "react";
import { useNavigate } from "react-router-dom";
import cornerImage from "../assets/img/cornerImage.png";
import { supabase } from "../lib/supabase";

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
  const [familiaCarregada, setFamiliaCarregada] = useState<any>(null);
  const navigate = useNavigate();

  const carregarFamilia = async () => {
    if (!token.trim()) return;
    setLoading(true);
    setErrorMsg("");

    try {
      // Busca direta no banco via Cliente Supabase
      const { data: familia, error } = await supabase
        .from('familias')
        .select('*, convidados(*)')
        .ilike('token', token.trim())
        .maybeSingle();

      if (error) throw error;

      if (!familia) {
        setErrorMsg("Código não encontrado. Verifique seu convite!");
        return;
      }

      // Lógica de Admin
      if (familia.is_admin) {
        // Salva no localStorage para as outras páginas saberem que é admin
        localStorage.setItem('casamento_role', 'admin');
        navigate("/admin"); 
        return;
      }

      // Lógica de Convidado
      setFamiliaCarregada(familia);
      localStorage.setItem('familia_id', familia.id);
      localStorage.setItem('casamento_role', 'guest');

      const jaConfirmados = familia.convidados
        .filter((c: any) => c.confirmado)
        .map((c: any) => c.id);
      setMembrosConfirmados(jaConfirmados);

    } catch (err: any) {
      setErrorMsg("Erro ao conectar com o banco de dados.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmar = async () => {
    setLoading(true);
    try {
      const updates = familiaCarregada.convidados.map((membro: any) => {
        // Se "naoIrei" estiver marcado, todos ficam como false.
        // Caso contrário, segue a seleção da lista.
        const isSelected = naoIrei ? false : membrosConfirmados.includes(membro.id);
        return supabase
          .from("convidados")
          .update({ confirmado: isSelected })
          .eq("id", membro.id);
      });

      await Promise.all(updates);
      navigate("/prezents");
    } catch (err) {
      alert("Erro ao salvar sua confirmação. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const toggleMembroConfirmado = (membroId: string) => {
    if (naoIrei) return; // Bloqueia seleção se marcou que não vai
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

          {/* Campo de Token sempre visível no início */}
          {!familiaCarregada && (
            <>
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Digite o código do seu convite"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#DE9B72] bg-[#3A5544]/80 text-[#F8EDEB] placeholder-[#DE9B72]/70 focus:outline-none focus:ring-2 focus:ring-[#DE9B72]"
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

          {errorMsg && <p className="text-red-300 text-sm mb-4 bg-black/20 p-2 rounded">{errorMsg}</p>}

          {/* Seção que só aparece após buscar a família */}
          {familiaCarregada && (
            <div className="animate-in fade-in zoom-in duration-300">
              <div className="mb-6 p-4 rounded-xl border-2 border-[#DE9B72]/40 bg-[#3A5544]/60">
                <h4 className="text-xl font-romantic text-[#F8EDEB] mb-4">
                  Família {familiaCarregada.nome}
                </h4>

                <div className={`space-y-2 max-h-40 overflow-y-auto pr-2 ${naoIrei ? 'opacity-40 pointer-events-none' : ''}`}>
                  {familiaCarregada.convidados.map((membro: any) => (
                    <div
                      key={membro.id}
                      onClick={() => toggleMembroConfirmado(membro.id)}
                      className="flex items-center justify-between p-3 rounded-lg border border-[#DE9B72]/30 bg-[#3A5544]/40 cursor-pointer hover:bg-[#3A5544]/80 transition-colors"
                    >
                      <span className="text-[#F8EDEB] font-medium">{membro.nome}</span>
                      <div className={`w-6 h-6 rounded flex items-center justify-center border-2 transition-all ${membrosConfirmados.includes(membro.id) ? 'bg-[#DE9B72] border-[#DE9B72]' : 'border-[#DE9B72]/60'}`}>
                        {membrosConfirmados.includes(membro.id) && <span className="text-[#3A5544] font-bold text-sm">✓</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Checkbox "Não irei" agora condicional */}
              <div className="flex items-center mb-6 justify-center gap-3 bg-black/10 p-3 rounded-lg">
                <input
                  type="checkbox"
                  id="naoIrei"
                  checked={naoIrei}
                  onChange={(e) => {
                    setNaoIrei(e.target.checked);
                    if (e.target.checked) setMembrosConfirmados([]); // Limpa se marcar que não vai
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

          {/* Botão Cancelar/Fechar */}
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