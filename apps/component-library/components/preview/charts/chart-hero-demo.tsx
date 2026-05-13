"use client";

import type { ChartPreviewSlug } from "@/lib/charts-preview-registry";

import { ChartBySlug } from "./chart-by-slug";

export function ChartHeroDemo({ slug }: { slug: ChartPreviewSlug }) {
  return (
    <div className="min-w-0 space-y-3 rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
      <ChartBySlug slug={slug} appearance="glass" height={340} showLegend />
    </div>
  );
}
