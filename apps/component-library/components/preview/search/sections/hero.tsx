"use client";

import { Section, SectionCard } from "@/components/common/Section";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";

import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { SearchBar } from "@zentauri-ui/zentauri-components/ui/search";

export function SearchHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  const [query, setQuery] = useState("");

  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />
      <SectionCard className="p-6">
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-slate-800 dark:text-slate-400">
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
          <p className="mt-3 text-sm text-slate-800 dark:text-slate-400">
            Current value:{" "}
            <span className="text-slate-800 dark:text-slate-200">{query}</span>
          </p>
        ) : null}
      </SectionCard>
    </Section>
  );
}
