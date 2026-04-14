import { PreviewPageShell } from "@/components/preview/common/preview-page-shell";
import { BadgeExamplesSection } from "./sections/badge-examples-section";
import { BadgeHeroSection } from "./sections/badge-hero-section";

export default function BadgePreviewPage() {
  return (
    <PreviewPageShell>
      <BadgeHeroSection />
      <BadgeExamplesSection />
    </PreviewPageShell>
  );
}
