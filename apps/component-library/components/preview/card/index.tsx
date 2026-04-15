import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { CardCodeExamplesSection } from "./sections/card-code-examples-section";
import { CardExamplesSection } from "./sections/card-examples-section";
import { CardHeroSection } from "./sections/card-hero-section";

export default function CardPreviewPage() {
  return (
    <PreviewPageShell>
      <CardHeroSection />
      <CardExamplesSection />
      <CardCodeExamplesSection />
    </PreviewPageShell>
  );
}
