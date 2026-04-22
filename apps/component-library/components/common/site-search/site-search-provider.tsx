"use client";

import { useMemo, useState, type ReactNode } from "react";

import { SiteSearchContext } from "./site-search-context";
import { SiteSearchModal } from "./site-search-modal";

export function SiteSearchProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const value = useMemo(() => ({ open, setOpen }), [open]);

  return (
    <SiteSearchContext.Provider value={value}>
      {children}
      <SiteSearchModal open={open} onOpenChange={setOpen} />
    </SiteSearchContext.Provider>
  );
}
