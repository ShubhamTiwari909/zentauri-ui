"use client";
import { useState } from "react";
import { DecryptedText } from "@zentauri-ui/zentauri-components/ui/decrypted-text";
import { Section } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";

export function DecryptedTextHero({ seo }: { seo: PreviewSeoDocument }) {
  const [run, setRun] = useState(0);
  return (
    <Section variant="plain">
      <PreviewHeroSeoBlock seo={seo} />
      <div
        data-theme="dark"
        className="relative isolate mt-10 overflow-hidden rounded-3xl border border-white/10 bg-[#05070d] px-6 py-16 text-white sm:px-12 sm:py-20"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,#14532d55,transparent_60%)]"
        />
        <div className="relative mx-auto max-w-3xl space-y-8">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-emerald-300/80">
            <DecryptedText key={`label-${run}`} trigger="mount" speed={35}>
              Secure channel / 003
            </DecryptedText>
          </p>
          <DecryptedText
            key={run}
            as="h2"
            trigger="mount"
            appearance="matrix"
            delay={250}
            className="text-4xl font-semibold leading-tight tracking-tight sm:text-6xl"
          >
            Access granted to the mainframe
          </DecryptedText>
          <p className="max-w-xl text-sm leading-7 text-slate-300">
            Each letter cycles through random glyphs before it lands. The line
            never changes width, and screen readers hear the real text.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <a
              href="#decrypted-text-details"
              className="rounded-full border border-white/15 px-4 py-2 font-medium transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
            >
              <DecryptedText trigger="hover" appearance="matrix" speed={30}>
                Hover or focus me
              </DecryptedText>
            </a>
            <button
              type="button"
              onClick={() => setRun((value) => value + 1)}
              className="rounded-full border border-white/15 px-4 py-2 font-medium transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
            >
              Replay
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}
