import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/preview-seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { AnimatedNumberCodeExamplesSection } from "./sections/animated-number-code-examples-section";
import { AnimatedNumberExamplesSection } from "./sections/animated-number-examples-section";
import { AnimatedNumberHeroSection } from "./sections/animated-number-hero-section";

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
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
