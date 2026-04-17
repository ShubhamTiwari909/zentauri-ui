import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/preview-seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { SpinnerCodeExamplesSection } from "./sections/spinner-code-examples-section";
import { SpinnerExamplesSection } from "./sections/spinner-examples-section";
import { SpinnerHeroSection } from "./sections/spinner-hero-section";

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
