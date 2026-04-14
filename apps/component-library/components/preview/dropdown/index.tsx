import { PreviewPageShell } from "@/components/preview/common/preview-page-shell";
import { DropdownExamplesSection } from "./sections/dropdown-examples-section";
import { DropdownHeroSection } from "./sections/dropdown-hero-section";

export default function DropdownPreviewPage() {
  return (
    <PreviewPageShell>
      <DropdownHeroSection />
      <DropdownExamplesSection />
    </PreviewPageShell>
  );
}
