import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { DividerCodeExamplesSection } from "./sections/divider-code-examples-section";
import { DividerExamplesSection } from "./sections/divider-examples-section";
import { DividerHeroSection } from "./sections/divider-hero-section";

export default function DividerPreviewPage() {
  return (
    <PreviewPageShell>
      <DividerHeroSection />
      <DividerExamplesSection />
      <DividerCodeExamplesSection />
    </PreviewPageShell>
  );
}
