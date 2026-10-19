import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewApiSection } from "@/components/preview/api-section";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { DecryptedTextHero } from "./sections/hero";
import { DecryptedTextPlayground } from "./sections/playground";
import { DecryptedTextExamples } from "./sections/snippet-sections";

export default function DecryptedTextPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <DecryptedTextHero seo={seo} />
      <DecryptedTextPlayground />
      <DecryptedTextExamples />
      <section
        id="decrypted-text-details"
        className="scroll-mt-24 rounded-2xl border border-white/10 p-6 text-sm leading-7 text-slate-300"
      >
        <h2 className="mb-3 text-xl font-semibold text-white">
          Noise for the eyes. Words for everyone else.
        </h2>
        <p>
          The real text sits in a visually hidden copy, and the animated letters
          are hidden from assistive tech, so screen readers never hear the
          noise. With reduced motion or with scripts off, the final text shows
          straight away.
        </p>
        <p className="mt-3">
          A scrambled glyph floats over its hidden real letter and is squeezed
          to that letter&apos;s width, so the line never reflows while it
          decodes. Resolved letters stay inline and keep the font&apos;s
          kerning.
        </p>
        <p className="mt-3">
          One animation loop advances a step every speed milliseconds and only
          touches the letters that changed, with no React render per step. With
          trigger hover, keyboard focus also starts decoding, and inside a link
          or button the text follows that control&apos;s hover and focus.
        </p>
      </section>
      <PreviewApiSection slug="decrypted-text" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
