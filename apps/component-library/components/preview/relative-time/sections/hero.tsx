"use client";

import { Section } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import { RelativeTime } from "@zentauri-ui/zentauri-components/ui/relative-time";
import type { PreviewSeoDocument } from "@/lib/preview-seo";

export function RelativeTimeHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />
      <div className="rounded-3xl border border-slate-900/10 dark:border-white/10 bg-slate-100 dark:bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <div className="flex flex-wrap gap-3">
          <RelativeTime date={Date.now() - 300000} appearance="badge" />
          <RelativeTime date={Date.now() - 7200000} appearance="primary" />
          <RelativeTime date={Date.now() - 86400000} appearance="outline" />
        </div>
      </div>
    </Section>
  );
}
