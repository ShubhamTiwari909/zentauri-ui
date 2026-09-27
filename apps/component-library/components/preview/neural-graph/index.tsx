import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewApiSection } from "@/components/preview/api-section";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { NeuralGraphHeroSection } from "./sections/hero";
import { NeuralGraphCodeExamplesSection } from "./sections/code-examples";

export default function NeuralGraphPreviewPage({ seo }: { seo: PreviewSeoDocument }) {
  return <PreviewPageShell>
    <NeuralGraphHeroSection seo={seo} />
    <NeuralGraphCodeExamplesSection />
    <PreviewApiSection slug="neural-graph" />
    <PreviewSeoDoc doc={seo} />
  </PreviewPageShell>;
}
