import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { ButtonCodeExamplesSection } from "./sections/snippet-sections";
import { ButtonHeroSection } from "./sections/hero";
import { ButtonVariantsMotionSection } from "./sections/variants-motion";

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
