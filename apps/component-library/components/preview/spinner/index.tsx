import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { SpinnerCodeExamplesSection } from "./sections/snippet-sections";
import { SpinnerExamplesSection } from "./sections/component-demo";
import { SpinnerHeroSection } from "./sections/hero";

export default function SpinnerPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <SpinnerHeroSection seo={seo} />
      <SpinnerExamplesSection />
      <SpinnerCodeExamplesSection />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
