export interface Guest {
  id: string;
  name: string;
  status: 'pending' | 'confirmed' | 'declined';
  groupName?: string;
}

export interface GuestGroup {
  id: string;
  name: string;
  token: string;
  guests: Guest[];
}

// === TIPO DE PRESENTE UNIFICADO E ATUALIZADO ===
export interface GiftItem {
  id: string;
  title: string;             // Antigo "nome"
  suggested_value: number;   // Antigo "valor"
  link?: string;             // Link da loja
  image_url?: string;        // Antiga "imagem"
  is_reserved: boolean;      // Antigo "reservado"
  reservation_type: 'compra' | 'pix' | null; // Antigo "tipoReserva"
}

export type TabType = 'geral' | 'familias' | 'presentes' | 'config';