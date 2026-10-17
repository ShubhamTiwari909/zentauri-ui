import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewApiSection } from "@/components/preview/api-section";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { ScrollExpandHero } from "./sections/hero";
import { ScrollExpandPageScroll } from "./sections/page-scroll";
import { ScrollExpandPlayground } from "./sections/playground";
import { ScrollExpandExamples } from "./sections/snippet-sections";

export default function ScrollExpandPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <ScrollExpandHero seo={seo} />
      <ScrollExpandPlayground />
      <ScrollExpandExamples />
      <ScrollExpandPageScroll />
      <section
        id="scroll-expand-details"
        className="scroll-mt-24 rounded-2xl border border-white/10 p-6 text-sm leading-7 text-slate-300"
      >
        <h2 className="mb-3 text-xl font-semibold text-white">
          Scroll drives it. Layout never moves.
        </h2>
        <p>
          The section&apos;s height comes from CSS, a tall track holding a
          sticky stage, so nothing shifts after the page hydrates. As you
          scroll, one animation loop writes only the frame&apos;s clip-path, the
          media zoom, and opacity, and it stops once the frame settles.
          Smoothing is time-based, so it feels the same at 60 Hz and 120 Hz.
        </p>
        <p className="mt-3">
          The title is a real heading that labels the section. Overlay content
          stays inert until it is mostly visible, so keyboard users never tab
          into invisible links. A self-scrolling section can be focused and
          scrolled with the arrow and Page Down keys.
        </p>
        <p className="mt-3">
          With reduced motion, the section shows its expanded composition
          without pinning or scroll-linked movement, and video never plays.
          Video otherwise plays only while the section is on screen.
        </p>
      </section>
      <PreviewApiSection slug="scroll-expand" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
