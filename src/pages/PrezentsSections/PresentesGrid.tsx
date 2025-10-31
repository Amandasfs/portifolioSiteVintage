import type { Presente } from "../../types/Presente";
interface Props {
  presentes: Presente[];
  onReservarCompra: (id: number) => void;
  onReservarPix: (id: number) => void;
  onCopiarPix: (valor: number) => void;
}

export default function PresentesGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <p>presentes</p>
    </div>
  );
}
