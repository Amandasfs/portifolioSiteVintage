import type { Presente } from "../../types/Presente";

interface Props {
  presente: Presente;
  onReservarCompra: (id: number) => void;
  onReservarPix: (id: number) => void;
  onCopiarPix: (valor: number) => void;
}

export default function PresenteCard/*({ presente, onReservarCompra, onReservarPix, onCopiarPix }: Props) */(

) {
  //const { id, nome, valor, link, reservado, tipoReserva } = presente;
  return (
   <>
      <p>Cards Presentes</p>
   </>
  );
}
