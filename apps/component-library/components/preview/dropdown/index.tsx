import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/preview-seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { DropdownCodeExamplesSection } from "./sections/dropdown-code-examples-section";
import { DropdownExamplesSection } from "./sections/dropdown-examples-section";
import { DropdownHeroSection } from "./sections/dropdown-hero-section";

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
