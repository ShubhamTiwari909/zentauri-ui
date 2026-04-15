import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { BadgeCodeExamplesSection } from "./sections/badge-code-examples-section";
import { BadgeExamplesSection } from "./sections/badge-examples-section";
import { BadgeHeroSection } from "./sections/badge-hero-section";

export default function BadgePreviewPage() {
  return (
    <PreviewPageShell>
      <BadgeHeroSection />
      <BadgeExamplesSection />
      <BadgeCodeExamplesSection />
    </PreviewPageShell>
  );
}
