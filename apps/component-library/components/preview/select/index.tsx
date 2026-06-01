import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { SelectCodeExamplesSection } from "./sections/snippet-sections";
import { SelectExamplesSection } from "./sections/component-demo";
import { SelectHeroSection } from "./sections/hero";

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
