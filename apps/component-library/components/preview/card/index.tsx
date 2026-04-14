import { PreviewPageShell } from "@/components/preview/common/preview-page-shell";
import { CardExamplesSection } from "./sections/card-examples-section";
import { CardHeroSection } from "./sections/card-hero-section";

export default function CardPreviewPage() {
  return (
    <PreviewPageShell>
      <CardHeroSection />
      <CardExamplesSection />
    </PreviewPageShell>
  );
}
