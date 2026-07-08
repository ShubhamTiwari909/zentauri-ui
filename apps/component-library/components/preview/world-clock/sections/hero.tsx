"use client";

import { Section } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import { WorldClock } from "@zentauri-ui/zentauri-components/ui/world-clock";
import type { PreviewSeoDocument } from "@/lib/preview-seo";

export function WorldClockHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />
      <div className="rounded-3xl border border-slate-900/10 dark:border-white/10 bg-slate-100 dark:bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <WorldClock
          zones={["America/New_York", "Europe/London", "Asia/Tokyo"]}
          locale="en-US"
          cardAppearance="default"
          showDate
          showDayNight
          showOffsetFromLocal
        />
      </div>
    </Section>
  );
}
