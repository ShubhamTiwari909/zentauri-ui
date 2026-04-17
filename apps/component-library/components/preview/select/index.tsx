import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/preview-seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { SelectCodeExamplesSection } from "./sections/select-code-examples-section";
import { SelectExamplesSection } from "./sections/select-examples-section";
import { SelectHeroSection } from "./sections/select-hero-section";

export default function SelectPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <SelectHeroSection seo={seo} />
      <SelectExamplesSection />
      <SelectCodeExamplesSection />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
