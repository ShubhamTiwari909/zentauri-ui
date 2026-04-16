import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/preview-seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { CardCodeExamplesSection } from "./sections/card-code-examples-section";
import { CardExamplesSection } from "./sections/card-examples-section";
import { CardHeroSection } from "./sections/card-hero-section";

export default function CardPreviewPage({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <PreviewPageShell>
      <CardHeroSection seo={seo} />
      <CardExamplesSection />
      <CardCodeExamplesSection />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
