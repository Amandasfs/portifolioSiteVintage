import { useState, useEffect } from "react";
import MensagemSucessoModal from "../../component/MensagemSucessoModal"; // Ajuste o caminho se necessário
import { supabase } from "../../config/supabase";

import type { GiftItem as Presente } from "../../types/Guest";

// =========================================================
// FUNÇÃO MATEMÁTICA PARA GERAR O "PIX COPIA E COLA" OFICIAL
// =========================================================
const gerarPayloadPix = (chave: string, valor: number) => {
  const chaveLimpa = chave.trim();
  if (!chaveLimpa) return "";
  
  const val = valor.toFixed(2);
  const nome = "Casamento".substring(0, 25);
  const cidade = "Brasil".substring(0, 15);

  const padLength = (str: string) => String(str.length).padStart(2, '0');

  const idChavePix = `0014br.gov.bcb.pix01${padLength(chaveLimpa)}${chaveLimpa}`;
  const payloadBase = [
    "000201",
    `26${padLength(idChavePix)}${idChavePix}`,
    "52040000",
    "5303986",
    `54${padLength(val)}${val}`,
    "5802BR",
    `59${padLength(nome)}${nome}`,
    `60${padLength(cidade)}${cidade}`,
    "62070503***", 
    "6304"
  ].join('');

  let crc = 0xffff;
  for (let i = 0; i < payloadBase.length; i++) {
    crc ^= payloadBase.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) > 0) {
        crc = (crc << 1) ^ 0x1021;
      } else {
        crc = crc << 1;
      }
    }
  }
  const crcHex = (crc & 0xffff).toString(16).toUpperCase().padStart(4, '0');
  return payloadBase + crcHex;
};


interface PresenteCardProps {
  presente: Presente;
  disabled: boolean;
  onReservar: () => void;
  onReservarPix: () => void;
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
        disabled ? "opacity-40 cursor-not-allowed" : "opacity-100"
      } ${reservado ? "bg-[#f8f9fa] border-2 border-[#d4af37]/50" : ""}`}
    >
      <div className="w-full h-48 rounded-lg overflow-hidden mb-4 border border-[#e8d9c5] relative">
        <img
          src={imagem || "https://via.placeholder.com/300x300/f3e6d0/5b3a29?text=Presente"}
          alt={nome}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {reservado && (
          <div className="absolute top-2 right-2 bg-black/70 text-white text-[10px] font-bold px-2 py-1 rounded tracking-widest uppercase backdrop-blur-sm">
            Comprado na Loja
          </div>
        )}
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
          {reservado ? "Já Reservado" : "Reservar Presente"}
        </button>

        <a
          href={link || "#"}
          target={link ? "_blank" : "_self"}
          rel="noopener noreferrer"
          className={`px-4 py-3 rounded-lg font-medium text-center border transition-colors duration-300 ${
            reservado || disabled
              ? "border-gray-300 text-gray-400 cursor-not-allowed"
              : "border-[#5b3a29] text-[#5b3a29] hover:bg-[#5b3a29] hover:text-white"
          }`}
          onClick={(e) => (!link || reservado || disabled) && e.preventDefault()}
        >
          Ver Link
        </a>

        <button
          onClick={onReservarPix}
          disabled={disabled}
          className={`px-4 py-3 rounded-lg font-medium border transition-colors duration-300 ${
            disabled
              ? "border-gray-300 text-gray-400 cursor-not-allowed"
              : "border-[#8b7355] text-[#8b7355] hover:bg-[#8b7355] hover:text-white"
          }`}
        >
          Contribuir com PIX
        </button>
      </div>
    </div>
  );
}

export default function PresentesGrid() {
  const [presenteSelecionado, setPresenteSelecionado] = useState<string | null>(null);
  const [mensagemSucesso, setMensagemSucesso] = useState("");
  
  const [presentes, setPresentes] = useState<Presente[]>([]);
  const [chavePixCasal, setChavePixCasal] = useState("");

  const [reservaPendente, setReservaPendente] = useState<{ id: string, tipo: 'compra' | 'pix' | 'skip', valor: number, nome: string } | null>(null);
  const [mensagemConvidado, setMensagemConvidado] = useState("");
  const [nomeConvidado, setNomeConvidado] = useState(""); 
  const [salvando, setSalvando] = useState(false);
  
  const [mostrarPixModal, setMostrarPixModal] = useState<{ chave: string, valor: number, nomePresente: string, payload: string } | null>(null);

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

  const iniciarReservaCompra = (id: string, nome: string) => {
    if (presenteSelecionado !== null) return;
    setReservaPendente({ id, tipo: 'compra', valor: 0, nome });
    setMensagemConvidado("");
    setNomeConvidado("");
  };

  const iniciarReservaPix = (id: string, valor: number, nome: string) => {
    if (presenteSelecionado !== null) return;
    setReservaPendente({ id, tipo: 'pix', valor, nome });
    setMensagemConvidado("");
    setNomeConvidado("");
  };

  const iniciarNaoPresentear = () => {
    if (presenteSelecionado !== null) return;
    setReservaPendente({ id: 'skip', tipo: 'skip', valor: 0, nome: 'Apenas Confirmar Presença' });
    setMensagemConvidado("");
    setNomeConvidado("");
  };

  const confirmarReservaComMensagem = async () => {
    if (!reservaPendente) return;
    setSalvando(true);

    try {
      const textoMensagem = mensagemConvidado.trim();
      let mensagemFinal = textoMensagem;
      if (textoMensagem && nomeConvidado.trim()) {
        mensagemFinal = `${textoMensagem}\n\n- Com carinho, ${nomeConvidado.trim()}`;
      } else if (textoMensagem) {
        mensagemFinal = `${textoMensagem}\n\n- (Enviado anonimamente)`;
      }

      const groupId = localStorage.getItem('guest_group_id');

      if (reservaPendente.tipo === 'skip') {
        if (groupId && mensagemFinal) {
          await supabase.from('vw_guest_groups').update({ guest_message: mensagemFinal }).eq('id', groupId);
        }
        setPresenteSelecionado("skip");
        setMensagemSucesso("Presença confirmada com sucesso!");
        setReservaPendente(null);

      } else if (reservaPendente.tipo === 'pix') {
        if (groupId && mensagemFinal) {
          await supabase.from('vw_guest_groups').update({ guest_message: `Presente PIX (${reservaPendente.nome}): ${mensagemFinal}` }).eq('id', groupId);
        }
        
        const pix = chavePixCasal || "Não configurada";
        const codigoCopiaECola = gerarPayloadPix(pix, reservaPendente.valor);

        setMostrarPixModal({
          chave: pix,
          valor: reservaPendente.valor,
          nomePresente: reservaPendente.nome,
          payload: codigoCopiaECola
        });
        
        setReservaPendente(null);

      } else {
        await supabase.from('vw_gifts').update({ 
          is_reserved: true, 
          reservation_type: 'compra',
          guest_message: mensajeFinal || null 
        }).eq('id', reservaPendente.id);

        setPresenteSelecionado(reservaPendente.id);
        setPresentes(prev => prev.map(p => p.id === reservaPendente.id ? { ...p, is_reserved: true } : p));
        setMensagemSucesso("Presente reservado com sucesso na loja!");
        setReservaPendente(null);
      }

    } catch (error) {
      console.error(error);
      alert("Houve um erro ao completar a ação. Tente novamente.");
      setReservaPendente(null);
    } finally {
      setSalvando(false);
    }
  };

  return (
    <section
      className="w-full min-h-screen py-16 px-6 relative"
      style={{
        backgroundImage: 'radial-gradient(circle at center, #f3e6d0 0%, #442d1c 100%), url("https://www.transparenttextures.com/patterns/snow.png")',
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

        {mensagemSucesso && (
          <MensagemSucessoModal
            mensagemPrincipal={mensagemSucesso}
            citaBiblica={`"Ninguém jamais viu a Deus; se nos amarmos uns aos outros, Deus permanece em nós, e o seu amor é aperfeiçoado em nós" 1 João 4:12`}
          />
        )}
      </div>
      </div>

      {/* ============================================================== */}
      {/* MODAL 1: MENSAGEM AOS NOIVOS E IDENTIFICAÇÃO                   */}
      {/* ============================================================== */}
      {reservaPendente && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div 
            className="w-full max-w-md bg-white rounded-xl shadow-2xl p-6 border-2 border-[#d4af37]"
            style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/snow.png')" }}
          >
            <h3 className="text-2xl font-serif font-semibold text-[#5b3a29] mb-2 text-center">
              Deixe sua mensagem
            </h3>
            
            <p className="text-center text-[#8b7355] mb-6 text-sm">
              {reservaPendente.tipo === 'skip' 
                ? "Ficamos muito felizes em confirmar a sua presença!" 
                : <span>Você selecionou: <strong>{reservaPendente.nome}</strong></span>
              }
            </p>

            <textarea
              value={mensagemConvidado}
              onChange={(e) => setMensagemConvidado(e.target.value)}
              placeholder="Escreva aqui uma mensagem carinhosa para os noivos... (Opcional)"
              className="w-full h-28 p-3 border border-[#d4af37] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5b3a29] resize-none mb-4 text-[#5b3a29] bg-[#f8f9fa]"
            />

            <div className="mb-6">
              <label className="block text-sm font-semibold text-[#5b3a29] mb-1">Quem está enviando? (Opcional)</label>
              <input
                type="text"
                value={nomeConvidado}
                onChange={(e) => setNomeConvidado(e.target.value)}
                placeholder="Ex: Tio João ou deixe em branco para anônimo"
                className="w-full p-3 border border-[#d4af37] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5b3a29] text-[#5b3a29] bg-[#f8f9fa]"
              />
            </div>

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
                {salvando ? "Aguarde..." : (reservaPendente.tipo === 'pix' ? "Gerar PIX" : "Confirmar e Enviar")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 2: TELA DO QR CODE DO PIX (COM CHAVE ADICIONADA ABAIXO)  */}
      {/* ============================================================== */}
      {mostrarPixModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
          <div 
            className="w-full max-w-sm bg-white rounded-xl shadow-2xl p-8 border-2 border-[#d4af37] flex flex-col items-center"
            style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/snow.png')" }}
          >
            <h3 className="text-2xl font-serif font-semibold text-[#5b3a29] mb-1 text-center">
              Contribuição via PIX
            </h3>
            <p className="text-[#8b7355] text-center text-sm mb-6">
              Para o presente: <strong>{mostrarPixModal.nomePresente}</strong>
            </p>

            <div className="w-48 h-48 bg-white p-2 rounded-lg shadow-inner border-2 border-[#e8d9c5] mb-2">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(mostrarPixModal.payload)}`}
                alt="QR Code PIX Válido" 
                className="w-full h-full object-contain"
              />
            </div>

            {/* Nova linha: Exibe a chave PIX original textual logo abaixo do QR Code */}
            <p className="text-[11px] text-[#8b7355] font-sans text-center mb-4 tracking-wide">
              Chave PIX: <span className="font-bold text-[#5b3a29] select-all">{mostrarPixModal.chave}</span>
            </p>

            <p className="text-[#5b3a29] text-2xl font-bold font-serif mb-6">
              R$ {mostrarPixModal.valor.toFixed(2).replace('.', ',')}
            </p>

            <div className="w-full bg-[#f8f9fa] border border-[#d4af37]/50 rounded-lg p-3 mb-6 text-center overflow-hidden">
              <p className="text-xs text-[#8b7355] uppercase tracking-wider mb-1 font-bold">Pix Copia e Cola</p>
              
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(mostrarPixModal.payload);
                  alert("PIX Copia e Cola salvo na sua área de transferência!\n\nAbra o aplicativo do seu banco e escolha a opção 'Pix Copia e Cola' para efetuar o pagamento.");
                }}
                className="w-full bg-[#5b3a29] text-white py-2 rounded font-semibold hover:bg-[#3f2a1f] transition-colors shadow"
              >
                Copiar Código PIX
              </button>
            </div>

            <button
              onClick={() => {
                setMostrarPixModal(null);
                setMensagemSucesso("Muito obrigado! Agradecemos de coração a sua contribuição.");
              }}
              className="text-[#8b7355] hover:underline text-sm font-medium"
            >
              Concluir e Fechar
            </button>
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