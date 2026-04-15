import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PaginationCodeExamplesSection } from "./sections/pagination-code-examples-section";
import { PaginationHeroSection } from "./sections/pagination-hero-section";
import { PaginationExamplesSection } from "./sections/pagination-examples-section";

export default function PaginationPreviewPage() {
  return (
    <PreviewPageShell>
      <PaginationHeroSection />
      <PaginationExamplesSection />
      <PaginationCodeExamplesSection />
    </PreviewPageShell>
  );
}
