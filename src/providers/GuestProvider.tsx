import {
  useCallback,
  useMemo,
  useState,
} from "react";

import type {
  ReactNode,
} from "react";

import type {
  GuestGroup,
} from "../types/guest";

import {
  GuestContext,
} from "../contexts/GuestContext";

interface Props {
  children: ReactNode;
}

export default function GuestProvider({
  children,
}: Props) {
  const [
    guestGroup,
    setGuestGroup,
  ] = useState<GuestGroup | null>(
    null
  );

  const clearGuest =
    useCallback(() => {
      setGuestGroup(null);
    }, []);

  const value =
    useMemo(
      () => ({
        guestGroup,
        setGuestGroup,
        clearGuest,
      }),
      [
        guestGroup,
        clearGuest,
      ]
    );

  return (
    <GuestContext.Provider
      value={value}
    >
      {children}
    </GuestContext.Provider>
  );
}