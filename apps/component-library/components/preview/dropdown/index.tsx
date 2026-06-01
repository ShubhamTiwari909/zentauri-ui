import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { DropdownCodeExamplesSection } from "./sections/snippet-sections";
import { DropdownExamplesSection } from "./sections/component-demo";
import { DropdownHeroSection } from "./sections/hero";

export default function DropdownPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <DropdownHeroSection seo={seo} />
      <DropdownExamplesSection />
      <DropdownCodeExamplesSection />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
