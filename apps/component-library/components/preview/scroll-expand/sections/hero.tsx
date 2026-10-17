"use client";
import { ScrollExpand } from "@zentauri-ui/zentauri-components/ui/scroll-expand";
import { Section } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { photo } from "../components/scroll-expand-code-examples.data";

export function ScrollExpandHero({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <Section variant="plain">
      <PreviewHeroSeoBlock seo={seo} />
      <div
        data-theme="dark"
        className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-[#05070d]"
      >
        <ScrollExpand
          scroller="self"
          src={photo}
          alt="Mountains under a starry sky"
          title="Built to scale"
          hint="Scroll inside the frame"
          className="h-[min(78vh,640px)]"
        >
          <h3 className="text-3xl font-semibold tracking-tight sm:text-5xl">
            Every pixel, everywhere
          </h3>
          <p className="max-w-md text-sm leading-6 opacity-85 sm:text-base">
            The frame opens as you scroll and hands the whole stage to your
            media.
          </p>
          <a
            href="#scroll-expand-details"
            className="mt-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            How it works
          </a>
        </ScrollExpand>
      </div>
    </Section>
  );
}
