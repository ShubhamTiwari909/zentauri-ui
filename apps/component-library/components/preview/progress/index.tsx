import { PreviewPageShell } from "@/components/preview/common/preview-page-shell";
import { ProgressCodeExamplesSection } from "./sections/progress-code-examples-section";
import { ProgressExamplesSection } from "./sections/progress-examples-section";
import { ProgressHeroSection } from "./sections/progress-hero-section";

export default function ProgressPreviewPage() {
  return (
    <PreviewPageShell>
      <ProgressHeroSection />
      <ProgressExamplesSection />
      <ProgressCodeExamplesSection />
    </PreviewPageShell>
  );
}
