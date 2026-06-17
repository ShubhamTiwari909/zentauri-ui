import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import { PreviewApiSection } from "@/components/preview/api-section";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { CardCodeExamplesSection } from "./sections/snippet-sections";
import { CardExamplesSection } from "./sections/component-demo";
import { CardHeroSection } from "./sections/hero";

export default function CardPreviewPage({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <PreviewPageShell>
      <CardHeroSection seo={seo} />
      <CardExamplesSection />
      <CardCodeExamplesSection />
      <PreviewApiSection slug="card" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
