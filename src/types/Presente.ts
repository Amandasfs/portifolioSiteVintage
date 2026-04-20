export interface Presente {
  id: number;
  nome: string;
  valor: number;
  imagem: string;
  link: string;
  reservado: boolean;
  tipoReserva: "compra" | "pix" | null;
}
