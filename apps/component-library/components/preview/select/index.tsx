import { PreviewPageShell } from "@/components/preview/common/preview-page-shell";
import { SelectExamplesSection } from "./sections/select-examples-section";
import { SelectHeroSection } from "./sections/select-hero-section";

export default function SelectPreviewPage() {
  return (
    <PreviewPageShell>
      <SelectHeroSection />
      <SelectExamplesSection />
    </PreviewPageShell>
  );
}
