import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { ToggleCodeExamplesSection } from "./sections/toggle-code-examples-section";
import { ToggleExamplesSection } from "./sections/toggle-examples-section";
import { ToggleHeroSection } from "./sections/toggle-hero-section";

export default function TogglePreviewPage() {
  return (
    <PreviewPageShell>
      <ToggleHeroSection />
      <ToggleExamplesSection />
      <ToggleCodeExamplesSection />
    </PreviewPageShell>
  );
}
