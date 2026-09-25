import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewApiSection } from "@/components/preview/api-section";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { GlassCardHero } from "./sections/hero";
import { GlassCardPlayground } from "./sections/playground";
import { GlassCardExamples } from "./sections/snippet-sections";

export default function GlassCardPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <GlassCardHero seo={seo} />
      <GlassCardPlayground />
      <GlassCardExamples />
      <section
        id="glass-card-details"
        className="scroll-mt-24 rounded-2xl border border-white/10 p-6 text-sm leading-7 text-slate-300"
      >
        <h2 className="mb-3 text-xl font-semibold text-white">
          Movement is optional. Content is not.
        </h2>
        <p>
          Touch and coarse pointers keep the material without tilt. System
          reduced-motion settings always disable movement, even when
          reducedMotion is false. Disabled and interactive=false stop effects
          without disabling links or buttons inside the card.
        </p>
        <p className="mt-3">
          Pointer updates use CSS variables and a short, damped animation loop
          that stops when settled. Floating is opt-in, runs only while visible,
          and pauses when the tab is hidden. No canvas, WebGL, or animation
          dependency is required.
        </p>
        <p className="mt-3">
          Use ZuiGlassCard.Content to give content padding and depth. Without
          backdrop-filter support, the background, border, and shadows remain.
          Check text contrast against the background you place behind a
          translucent appearance.
        </p>
      </section>
      <PreviewApiSection slug="glass-card" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
