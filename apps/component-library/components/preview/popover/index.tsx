import { PreviewPageShell } from "@/components/preview/common/preview-page-shell";
import { PopoverCodeExamplesSection } from "./sections/popover-code-examples-section";
import { PopoverExamplesSection } from "./sections/popover-examples-section";
import { PopoverHeroSection } from "./sections/popover-hero-section";

export default function PopoverPreviewPage() {
  return (
    <PreviewPageShell>
      <PopoverHeroSection />
      <PopoverExamplesSection />
      <PopoverCodeExamplesSection />
    </PreviewPageShell>
  );
}
