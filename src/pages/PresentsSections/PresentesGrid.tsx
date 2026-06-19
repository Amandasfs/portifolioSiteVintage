import { useState, useEffect } from "react";
import MensagemSucessoModal from "../../component/MensagemSucessoModal"; // Ajuste o caminho se necessário
import { supabase } from "../../config/supabase";

import type { GiftItem as Presente } from "../../types/Guest";

interface PresenteCardProps {
  presente: Presente;
  disabled: boolean;
  onReservar: () => void;
  onReservarPix: () => void;
  onCopiarPix: () => void;
}

function PresenteCard({
  presente,
  disabled,
  onReservar,
  onReservarPix,
}: PresenteCardProps) {
  const { title: nome, suggested_value: valor, image_url: imagem, is_reserved: reservado, link } = presente;

  return (
    <div
      className={`bg-white border border-[#d4af37] rounded-xl p-6 flex flex-col items-center transition-all duration-300 hover:shadow-lg ${
        disabled && !reservado ? "opacity-40 cursor-not-allowed" : "opacity-100"
      } ${reservado ? "bg-[#f8f9fa] border-2 border-green-500" : ""}`}
    >
      <div className="w-full h-48 rounded-lg overflow-hidden mb-4 border border-[#e8d9c5]">
        <img
          src={imagem || "https://via.placeholder.com/300x300/f3e6d0/5b3a29?text=Presente"}
          alt={nome}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      <h3 className="text-lg font-serif font-semibold text-[#5b3a29] mb-2 text-center leading-tight">
        {nome}
      </h3>
      <p className="text-[#8b7355] font-medium mb-4 font-serif">R$ {valor}</p>

      <div className="flex flex-col gap-3 w-full">
        <button
          onClick={onReservar}
          disabled={disabled || reservado}
          className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
            reservado || disabled
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-[#5b3a29] text-white hover:bg-[#3f2a1f] hover:shadow-md"
          }`}
        >
          {reservado ? "Presente Reservado" : "Reservar Presente"}
        </button>

        <a
          href={link || "#"}
          target={link ? "_blank" : "_self"}
          rel="noopener noreferrer"
          className={`px-4 py-3 rounded-lg font-medium text-center border transition-colors duration-300 ${
            reservado
              ? "border-gray-300 text-gray-400 cursor-not-allowed"
              : "border-[#5b3a29] text-[#5b3a29] hover:bg-[#5b3a29] hover:text-white"
          }`}
          onClick={(e) => (!link || reservado) && e.preventDefault()}
        >
          Ver Link
        </a>

        <button
          onClick={onReservarPix}
          disabled={reservado}
          className={`px-4 py-3 rounded-lg font-medium border transition-colors duration-300 ${
            reservado
              ? "border-gray-300 text-gray-400 cursor-not-allowed"
              : "border-[#8b7355] text-[#8b7355] hover:bg-[#8b7355] hover:text-white"
          }`}
        >
          Contribuir com PIX
        </button>
      </div>

      {reservado && (
        <div className="mt-3 flex items-center gap-2 text-green-600 font-medium">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Reservado
        </div>
      )}
    </div>
  );
}

export default function PresentesGrid() {
  const [presenteSelecionado, setPresenteSelecionado] = useState<string | null>(null);
  const [mensagemSucesso, setMensagemSucesso] = useState("");
  
  const [presentes, setPresentes] = useState<Presente[]>([]);
  const [chavePixCasal, setChavePixCasal] = useState("");

  // --- ESTADOS DO MODAL DE MENSAGEM ---
  // Adicionado o tipo 'skip' para quando o usuário apenas confirmar presença
  const [reservaPendente, setReservaPendente] = useState<{ id: string, tipo: 'compra' | 'pix' | 'skip', valor: number, nome: string } | null>(null);
  const [mensagemConvidado, setMensagemConvidado] = useState("");
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    const carregarDados = async () => {
      const coupleId = localStorage.getItem('couple_id');
      if (coupleId) {
        const { data: coupleData } = await supabase.from('vw_couples').select('pix_key').eq('id', coupleId).single();
        if (coupleData) setChavePixCasal(coupleData.pix_key || "");
      }

      const { data: giftsData } = await supabase
        .from('vw_gifts')
        .select('*')
        .order('is_reserved', { ascending: true })
        .order('suggested_value', { ascending: true });

      if (giftsData) setPresentes(giftsData as Presente[]);
    };

    carregarDados();
  }, []);

  // Abre o modal de mensagem para Compra
  const iniciarReservaCompra = (id: string, nome: string) => {
    if (presenteSelecionado !== null) return;
    setReservaPendente({ id, tipo: 'compra', valor: 0, nome });
    setMensagemConvidado("");
  };

  // Abre o modal de mensagem para PIX
  const iniciarReservaPix = (id: string, valor: number, nome: string) => {
    if (presenteSelecionado !== null) return;
    setReservaPendente({ id, tipo: 'pix', valor, nome });
    setMensagemConvidado("");
  };

  // Abre o modal de mensagem para Não Presentear
  const iniciarNaoPresentear = () => {
    if (presenteSelecionado !== null) return;
    setReservaPendente({ id: 'skip', tipo: 'skip', valor: 0, nome: 'Apenas Confirmar Presença' });
    setMensagemConvidado("");
  };

  // Confirma a reserva (ou presença) e envia pro Supabase
  const confirmarReservaComMensagem = async () => {
    if (!reservaPendente) return;
    setSalvando(true);

    try {
      if (reservaPendente.tipo === 'skip') {
        // Se for "skip", tentamos salvar a mensagem no Grupo do convidado logado
        const groupId = localStorage.getItem('guest_group_id');
        if (groupId && mensagemConvidado.trim()) {
          await supabase.from('vw_guest_groups').update({ 
            guest_message: mensagemConvidado.trim() 
          }).eq('id', groupId);
        }

        setPresenteSelecionado("skip");
        setMensagemSucesso("Presença confirmada com sucesso!");

      } else {
        // Se for compra ou PIX, salva a mensagem direto no presente
        await supabase.from('vw_gifts').update({ 
          is_reserved: true, 
          reservation_type: reservaPendente.tipo,
          guest_message: mensagemConvidado.trim() || null 
        }).eq('id', reservaPendente.id);

        setPresenteSelecionado(reservaPendente.id);
        setPresentes(prev => prev.map(p => p.id === reservaPendente.id ? { ...p, is_reserved: true } : p));
        
        if (reservaPendente.tipo === 'pix') {
          const pix = chavePixCasal || "casal@casamento.com";
          navigator.clipboard.writeText(pix);
          alert(`Chave PIX: ${pix}\nValor: R$ ${reservaPendente.valor}\n\nA chave PIX foi copiada para sua área de transferência!`);
        }

        setMensagemSucesso("Presente reservado com sucesso!");
      }

    } catch (error) {
      console.error(error);
      alert("Houve um erro ao completar a ação. Tente novamente.");
    } finally {
      setSalvando(false);
      setReservaPendente(null); // Fecha o modal de mensagem
    }
  };

  return (
    <section
      className="w-full min-h-screen py-16 px-6 relative"
      style={{
        backgroundImage:
          'radial-gradient(circle at center, #f3e6d0 0%, #442d1c 100%), url("https://www.transparenttextures.com/patterns/snow.png")',
        backgroundSize: "cover",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-Romantc text-highlight3 mb-4">
            Lista de Presentes
          </h1>
        </div>

        <div className="rounded-xl p-6 mb-10 text-center max-w-3xl mx-auto transition-all"
         style={{
                backgroundColor: "#4d6648ff",
                backgroundImage: "url('https://www.transparenttextures.com/patterns/xv.png')",
                backgroundSize: "cover",
                border: "2px solid #DE9B72",
                opacity: presenteSelecionado !== null ? 0.5 : 1,
                cursor: presenteSelecionado !== null ? "not-allowed" : "pointer",
              }}
            >
          <div className="flex items-center justify-center gap-3 mb-3">
            <svg className="w-6 h-6 text-[#d4af37]" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <h3 className="text-2xl font-texts font-semibold text-background">
              Informação Importante
            </h3>
          </div>
          <p className="text-background">
            Sua presença é o nosso maior presente, mas se desejar nos mimos, adoraríamos receber uma mensagem sua. Por favor, ao selecionar um item, preencha o campo do cartão para que possamos ler seu carinho!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {presentes.map((presente) => (
            <PresenteCard
              key={presente.id}
              presente={presente}
              disabled={presenteSelecionado !== null && presenteSelecionado !== presente.id}
              onReservar={() => iniciarReservaCompra(presente.id, presente.title)}
              onReservarPix={() => iniciarReservaPix(presente.id, presente.suggested_value, presente.title)}
              onCopiarPix={() => {
                navigator.clipboard.writeText(chavePixCasal || "casal@casamento.com");
                alert("Chave PIX copiada!");
              }}
            />
          ))}
        </div>

        <div className="text-center">
          <div className="w-full flex justify-center mt-6">
            <button
              onClick={iniciarNaoPresentear}
              disabled={presenteSelecionado !== null}
              className="px-8 py-4 font-semibold rounded-lg shadow-lg text-white text-base transition-all transform hover:scale-105"
              style={{
                backgroundColor: "#4d6648ff",
                backgroundImage: "url('https://www.transparenttextures.com/patterns/xv.png')",
                backgroundSize: "cover",
                border: "2px solid #DE9B72",
                opacity: presenteSelecionado !== null ? 0.5 : 1,
                cursor: presenteSelecionado !== null ? "not-allowed" : "pointer",
              }}
            >
              Não quero presentear, apenas confirmar presença
            </button>
          </div>

        {/* Mensagem de sucesso Final */}
        {mensagemSucesso && (
          <MensagemSucessoModal
            mensagemPrincipal={mensagemSucesso}
            citaBiblica={`"Ninguém jamais viu a Deus; se nos amarmos uns aos outros, Deus permanece em nós, e o seu amor é aperfeiçoado em nós" 1 João 4:12`}
          />
        )}
      </div>
      </div>

      {/* ============================================================== */}
      {/* MODAL INTERMEDIÁRIO DE MENSAGEM AOS NOIVOS                     */}
      {/* ============================================================== */}
      {reservaPendente && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div 
            className="w-full max-w-md bg-white rounded-xl shadow-2xl p-6 border-2 border-[#d4af37]"
            style={{
              backgroundImage: "url('https://www.transparenttextures.com/patterns/snow.png')",
            }}
          >
            <h3 className="text-2xl font-serif font-semibold text-[#5b3a29] mb-2 text-center">
              Deixe sua mensagem
            </h3>
            
            {/* Texto dinâmico dependendo da escolha */}
            <p className="text-center text-[#8b7355] mb-6 text-sm">
              {reservaPendente.tipo === 'skip' 
                ? "Ficamos muito felizes em confirmar a sua presença!" 
                : <span>Você está reservando: <strong>{reservaPendente.nome}</strong></span>
              }
            </p>

            <textarea
              value={mensagemConvidado}
              onChange={(e) => setMensagemConvidado(e.target.value)}
              placeholder="Escreva aqui uma mensagem carinhosa para os noivos... (Opcional)"
              className="w-full h-32 p-3 border border-[#d4af37] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5b3a29] resize-none mb-6 text-[#5b3a29] bg-[#f8f9fa]"
            />

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setReservaPendente(null)}
                disabled={salvando}
                className="px-5 py-2 font-medium text-[#8b7355] hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={confirmarReservaComMensagem}
                disabled={salvando}
                className="px-5 py-2 bg-[#5b3a29] text-white font-medium rounded-lg hover:bg-[#3f2a1f] transition-colors shadow-md disabled:opacity-50"
              >
                {salvando ? "Aguarde..." : "Confirmar e Enviar"}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translate(0, 20px); }
          100% { opacity: 1; transform: translate(0, 0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </section>
  );
}