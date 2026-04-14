import { PreviewPageShell } from "@/components/preview/common/preview-page-shell";
import { DividerExamplesSection } from "./sections/divider-examples-section";
import { DividerHeroSection } from "./sections/divider-hero-section";

export default function DividerPreviewPage() {
  return (
    <PreviewPageShell>
      <DividerHeroSection />
      <DividerExamplesSection />
    </PreviewPageShell>
  );
}
