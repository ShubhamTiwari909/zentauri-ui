import { PreviewPageShell } from "@/components/preview/common/preview-page-shell";
import { PopoverExamplesSection } from "./sections/popover-examples-section";
import { PopoverHeroSection } from "./sections/popover-hero-section";

export default function PopoverPreviewPage() {
  return (
    <PreviewPageShell>
      <PopoverHeroSection />
      <PopoverExamplesSection />
    </PreviewPageShell>
  );
}
