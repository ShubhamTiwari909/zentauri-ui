import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { AlertCodeExamplesSection } from "./sections/alert-code-examples-section";
import { AlertExamplesSection } from "./sections/alert-examples-section";
import { AlertHeroSection } from "./sections/alert-hero-section";

export default function AlertPreviewPage() {
  return (
    <PreviewPageShell>
      <AlertHeroSection />
      <AlertExamplesSection />
      <AlertCodeExamplesSection />
    </PreviewPageShell>
  );
}
