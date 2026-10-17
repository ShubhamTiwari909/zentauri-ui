"use client";
import { useState } from "react";
import { MaskedHeading } from "@zentauri-ui/zentauri-components/ui/masked-heading";
import { Section } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { demoImage } from "../components/masked-heading-code-examples.data";

export function MaskedHeadingHero({ seo }: { seo: PreviewSeoDocument }) {
  const [run, setRun] = useState(0);
  return (
    <Section variant="plain">
      <PreviewHeroSeoBlock seo={seo} />
      <div
        data-theme="dark"
        className="relative isolate mt-10 overflow-hidden rounded-3xl border border-white/10 bg-[#07080f] px-6 py-16 sm:px-12 sm:py-24"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,#4338ca33,transparent_60%)]"
        />
        <div className="relative mx-auto max-w-4xl">
          <p className="text-center text-xs uppercase tracking-[0.3em] text-slate-400">
            Type studies / 002
          </p>
          <MaskedHeading
            key={run}
            level={2}
            size="lg"
            align="center"
            src={demoImage}
            trigger="mount"
            outline
            className="mt-6"
          >
            Designed in the details
          </MaskedHeading>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-slate-400">
            <span>Real heading text</span>
            <span>SVG clip, no canvas</span>
            <span>Motion-aware</span>
            <button
              type="button"
              onClick={() => setRun((value) => value + 1)}
              className="rounded-full border border-white/15 px-4 py-1.5 font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
            >
              Replay entrance
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}
