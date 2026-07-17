import { supabase } from "../config/supabase";
import type { GuestGroup } from "../types/guest";

export class GuestConfirmationService {
  async carregarFamilia(
    token: string
  ): Promise<GuestGroup | null> {
    const tokenFormatado =
      token.trim().toUpperCase();

    const { data, error } = await supabase
      .from("vw_guest_groups")
      .select(`
        *,
        guests:vw_guests(*)
      `)
      .eq("token", tokenFormatado)
      .maybeSingle();

    if (error) {
      throw new Error(
        "Erro ao localizar convite."
      );
    }

    if (!data) {
      return null;
    }

    const group: GuestGroup = {
      id: data.id,
      name: data.name,
      token: data.token,
      guests: data.guests ?? [],
    };

    return group;
  }

  async salvarConfirmacao(
    grupo: GuestGroup,
    membrosConfirmados: string[],
    naoIrei: boolean
  ) {
    const updates = grupo.guests.map(
      (membro) => {
        const status =
          naoIrei
            ? "declined"
            : membrosConfirmados.includes(
                membro.id
              )
            ? "confirmed"
            : "declined";

        return supabase
          .from("vw_guests")
          .update({
            status,
          })
          .eq("id", membro.id);
      }
    );

    const result =
      await Promise.all(updates);

    const error =
      result.find((r) => r.error);

    if (error?.error) {
      throw error.error;
    }
  }
}

export const guestConfirmationService =
  new GuestConfirmationService();