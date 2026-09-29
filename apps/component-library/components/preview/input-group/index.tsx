import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewApiSection } from "@/components/preview/api-section";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import { InputGroupHeroSection } from "./sections/hero";
import { InputGroupCodeExamplesSection } from "./sections/snippet-sections";

export default function InputGroupPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <InputGroupHeroSection seo={seo} />
      <InputGroupCodeExamplesSection />
      <PreviewApiSection slug="input-group" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
