import { PreviewPageShell } from "@/components/preview/common/preview-page-shell";
import { ToggleExamplesSection } from "./sections/toggle-examples-section";
import { ToggleHeroSection } from "./sections/toggle-hero-section";

export default function TogglePreviewPage() {
  return (
    <PreviewPageShell>
      <ToggleHeroSection />
      <ToggleExamplesSection />
    </PreviewPageShell>
  );
}
