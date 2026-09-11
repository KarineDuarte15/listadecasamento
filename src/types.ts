export type GiftCategory =
  | 'Utensílios de cozinha'
  | 'Cama'
  | 'Banho'
  | 'Mesa'
  | 'Lavanderia'
  | 'Eletroportáteis'
  | 'Outros itens para casa';

export interface Gift {
  id: string;
  name: string;
  category: GiftCategory;
  quantity_total: number;
  quantity_available: number;
  status: 'disponivel' | 'esgotado';
  created_at?: string;
  updated_at?: string;
}

export interface GiftReservation {
  id: string;
  gift_id: string;
  gift_name: string;
  gift_category: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  message?: string;
  reserved_at: string;
  status: 'RESERVADO' | 'CANCELADO';
}

export interface ReservationPayload {
  gift_id: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  message?: string;
  confirmation: boolean;
}

export interface RegistryStats {
  total_gifts: number;
  available_gifts: number;
  reserved_gifts: number;
  total_guests: number;
}

export interface AdminAuthResponse {
  success: boolean;
  token?: string;
  message?: string;
}

export interface PhotoItem {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  caption?: string;
}
