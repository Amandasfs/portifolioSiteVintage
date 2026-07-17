import type { GiftItem } from "../../types/guest";
import PresenteCard from "./PresenteCard";

interface Props {
  presentes: GiftItem[];
  presenteSelecionado: string | null;
  onReservar: (
    id: string,
    nome: string,
  ) => void;
  onPix: (
    id: string,
    valor: number,
    nome: string,
  ) => void;
}

export default function GiftGrid({
  presentes,
  presenteSelecionado,
  onReservar,
  onPix,
}: Props) {
  return (
    <div
      className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        gap-8
      "
    >
      {presentes.map((presente) => (
        <PresenteCard
          key={presente.id}
          presente={presente}
          disabled={
            presenteSelecionado !== null &&
            presenteSelecionado !==
              presente.id
          }
          onReservar={() =>
            onReservar(
              presente.id,
              presente.title,
            )
          }
          onReservarPix={() =>
            onPix(
              presente.id,
              presente.suggested_value,
              presente.title,
            )
          }
        />
      ))}
    </div>
  );
}