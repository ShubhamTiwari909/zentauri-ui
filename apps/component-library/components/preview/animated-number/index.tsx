import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import { PreviewApiSection } from "@/components/preview/api-section";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { AnimatedNumberCodeExamplesSection } from "./sections/snippet-sections";
import { AnimatedNumberExamplesSection } from "./sections/component-demo";
import { AnimatedNumberHeroSection } from "./sections/hero";

export default function AnimatedNumberPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <AnimatedNumberHeroSection seo={seo} />
      <AnimatedNumberExamplesSection />
      <AnimatedNumberCodeExamplesSection />
      <PreviewApiSection slug="animated-number" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
