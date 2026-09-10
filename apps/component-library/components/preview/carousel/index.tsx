import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import { PreviewApiSection } from "@/components/preview/api-section";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { CarouselCodeExamplesSection } from "./sections/snippet-sections";
import { CarouselHeroSection } from "./sections/hero";

export default function CarouselPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <CarouselHeroSection seo={seo} />
      <CarouselCodeExamplesSection />
      <PreviewApiSection slug="carousel" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
