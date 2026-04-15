import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { SpinnerCodeExamplesSection } from "./sections/spinner-code-examples-section";
import { SpinnerExamplesSection } from "./sections/spinner-examples-section";
import { SpinnerHeroSection } from "./sections/spinner-hero-section";

export default function SpinnerPreviewPage() {
  return (
    <PreviewPageShell>
      <SpinnerHeroSection />
      <SpinnerExamplesSection />
      <SpinnerCodeExamplesSection />
    </PreviewPageShell>
  );
}
