import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewApiSection } from "@/components/preview/api-section";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { MaskedHeadingHero } from "./sections/hero";
import { MaskedHeadingPlayground } from "./sections/playground";
import { MaskedHeadingExamples } from "./sections/snippet-sections";

export default function MaskedHeadingPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <MaskedHeadingHero seo={seo} />
      <MaskedHeadingPlayground />
      <MaskedHeadingExamples />
      <section
        id="masked-heading-details"
        className="scroll-mt-24 rounded-2xl border border-white/10 p-6 text-sm leading-7 text-slate-300"
      >
        <h2 className="mb-3 text-xl font-semibold text-white">
          The words stay words.
        </h2>
        <p>
          The copy is ordinary text in a real heading element, so its accessible
          name, selection, and translation all work. The media, the SVG mask,
          and the outline are decorative: they are hidden from assistive tech
          and never intercept the pointer.
        </p>
        <p className="mt-3">
          System reduced-motion settings show the final heading at once, keep
          the media still, and never start video. Touch input does not move the
          media. With scripts off or forced colors on, the heading renders as
          plain readable text.
        </p>
        <p className="mt-3">
          One damped animation loop drives the entrance, drift, and parallax. It
          writes SVG attributes and styles directly, with no React state per
          frame. It pauses while the heading is off-screen or the tab is hidden,
          and stops once the media is still. Video plays only while the heading
          is visible.
        </p>
      </section>
      <PreviewApiSection slug="masked-heading" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
