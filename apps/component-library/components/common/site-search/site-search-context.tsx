"use client";

import { createContext, useContext } from "react";

export type SiteSearchContextValue = {
  open: boolean;
  setOpen: (next: boolean) => void;
};

export const SiteSearchContext = createContext<SiteSearchContextValue | null>(null);

export function useSiteSearch(): SiteSearchContextValue {
  const ctx = useContext(SiteSearchContext);
  if (!ctx) {
    throw new Error("useSiteSearch must be used within SiteSearchProvider");
  }
  return ctx;
}
