import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { SelectCodeExamplesSection } from "./sections/select-code-examples-section";
import { SelectExamplesSection } from "./sections/select-examples-section";
import { SelectHeroSection } from "./sections/select-hero-section";

export default function SelectPreviewPage() {
  return (
    <PreviewPageShell>
      <SelectHeroSection />
      <SelectExamplesSection />
      <SelectCodeExamplesSection />
    </PreviewPageShell>
  );
}
