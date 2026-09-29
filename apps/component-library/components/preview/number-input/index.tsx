import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewApiSection } from "@/components/preview/api-section";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import { NumberInputHeroSection } from "./sections/hero";
import { NumberInputCodeExamplesSection } from "./sections/snippet-sections";

export default function NumberInputPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <NumberInputHeroSection seo={seo} />
      <NumberInputCodeExamplesSection />
      <PreviewApiSection slug="number-input" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
