import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { ComboboxCodeExamplesSection } from "./sections/snippet-sections";
import { ComboboxExamplesSection } from "./sections/component-demo";
import { ComboboxHeroSection } from "./sections/hero";

export default function ComboboxPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <ComboboxHeroSection seo={seo} />
      <ComboboxExamplesSection />
      <ComboboxCodeExamplesSection />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
