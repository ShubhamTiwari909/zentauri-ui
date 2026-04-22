"use client";

import { useState } from "react";
import { FiSearch } from "react-icons/fi";

import { PreviewHeroSeoBlock } from "@/components/preview/seo/preview-hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { SearchBar } from "@zentauri-ui/zentauri-components/ui/search";

export function SearchHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  const [query, setQuery] = useState("");

  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
      <PreviewHeroSeoBlock seo={seo} />
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-slate-400">
          Controlled example
        </p>
        <SearchBar
          value={query}
          onValueChange={setQuery}
          placeholder="Type a query…"
          leadingSlot={<FiSearch aria-hidden />}
          aria-label="Demo search"
        />
        {query.trim().length > 0 ? (
          <p className="mt-3 text-sm text-slate-400">
            Current value: <span className="text-slate-200">{query}</span>
          </p>
        ) : null}
      </div>
    </section>
  );
}
