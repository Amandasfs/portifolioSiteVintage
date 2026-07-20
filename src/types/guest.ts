// src/types/Guest.ts

export type GuestStatus =
  | "pending"
  | "confirmed"
  | "declined";

export type ReservationType =
  | "compra"
  | "pix"
  | null;

export interface Guest {
  id: string;
  name: string;
  status: GuestStatus;
  groupName?: string;
}

export interface GuestGroup {
  id: string;
  name: string;
  token: string;
  guests: Guest[];
}

export interface GiftItem {
  id: string;

  // Nome do presente
  title: string;

  // Valor sugerido pelos noivos
  suggested_value: number;

  // Link externo para compra
  link?: string;

  // URL da imagem do presente
  image_url?: string;

  // Indica se foi reservado
  is_reserved: boolean;

  // Forma de reserva
  reservation_type: ReservationType;
}

export type TabType =
  | "geral"
  | "familias"
  | "presentes"
  | "config";
