import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/preview-seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { ButtonCodeExamplesSection } from "./sections/button-code-examples-section";
import { ButtonHeroSection } from "./sections/button-hero-section";
import { ButtonVariantsMotionSection } from "./sections/button-variants-motion-section";

export default function ButtonsPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <ButtonHeroSection seo={seo} />
      <ButtonVariantsMotionSection />
      <ButtonCodeExamplesSection />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
