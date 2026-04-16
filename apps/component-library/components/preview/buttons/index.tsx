import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { ButtonCodeExamplesSection } from "./sections/button-code-examples-section";
import { ButtonHeroSection } from "./sections/button-hero-section";
import { ButtonVariantsMotionSection } from "./sections/button-variants-motion-section";

export default function ButtonsPreviewPage() {
  return (
    <PreviewPageShell>
      <ButtonHeroSection />
      <ButtonVariantsMotionSection />
      <ButtonCodeExamplesSection />
    </PreviewPageShell>
  );
}
