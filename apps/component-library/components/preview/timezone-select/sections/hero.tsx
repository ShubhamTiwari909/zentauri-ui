"use client";

import { Section } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import { TimezoneSelect } from "@zentauri-ui/zentauri-components/ui/timezone-select";
import type { PreviewSeoDocument } from "@/lib/preview-seo";

export function TimezoneSelectHeroSection({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />
      <div className="rounded-3xl border border-slate-900/10 dark:border-white/10 bg-slate-100 dark:bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <div className="w-full max-w-sm">
          <TimezoneSelect
            placeholder="Pick a timezone…"
            showTime
            showOffset
            groupByRegion
          />
        </div>
      </div>
    </Section>
  );
}
