import { createContext } from "react";

import type { GuestGroup } from "../types/guest";

export interface GuestContextData {
  guestGroup: GuestGroup | null;

  setGuestGroup: (
    guestGroup: GuestGroup | null
  ) => void;

  clearGuest: () => void;
}

export const GuestContext =
  createContext<GuestContextData | null>(
    null
  );