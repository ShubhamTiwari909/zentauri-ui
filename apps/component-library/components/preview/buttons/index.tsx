import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import { PreviewApiSection } from "@/components/preview/api-section";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { ButtonCodeExamplesSection } from "./sections/snippet-sections";
import { ButtonHeroSection } from "./sections/hero";

export default function ButtonsPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <ButtonHeroSection seo={seo} />
      <ButtonCodeExamplesSection />
      <PreviewApiSection slug="buttons" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
