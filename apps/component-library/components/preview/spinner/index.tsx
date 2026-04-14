import { PreviewPageShell } from "@/components/preview/common/preview-page-shell";
import { SpinnerExamplesSection } from "./sections/spinner-examples-section";
import { SpinnerHeroSection } from "./sections/spinner-hero-section";

export default function SpinnerPreviewPage() {
  return (
    <PreviewPageShell>
      <SpinnerHeroSection />
      <SpinnerExamplesSection />
    </PreviewPageShell>
  );
}
