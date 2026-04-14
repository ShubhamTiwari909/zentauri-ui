import { PreviewPageShell } from "@/components/preview/common/preview-page-shell";
import { AlertExamplesSection } from "./sections/alert-examples-section";
import { AlertHeroSection } from "./sections/alert-hero-section";

export default function AlertPreviewPage() {
  return (
    <PreviewPageShell>
      <AlertHeroSection />
      <AlertExamplesSection />
    </PreviewPageShell>
  );
}
