"use client";

import { cn } from "@/lib/utils";
import { useSiteSearch } from "./site-search-context";
import { FiSearch } from "react-icons/fi";

const buttonClassName =
  "rounded-md p-2 text-slate-400 transition hover:bg-white/5 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

export function SiteSearchOpenButton({ className }: { className?: string }) {
  const { setOpen } = useSiteSearch();

  return (
    <button
      type="button"
      className={cn(buttonClassName, className)}
      aria-label="Open site search"
      onClick={() => setOpen(true)}
    >
      <FiSearch className="h-5 w-5 shrink-0" aria-hidden />
    </button>
  );
}
