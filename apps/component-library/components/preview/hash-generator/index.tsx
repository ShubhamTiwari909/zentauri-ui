import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import { PreviewApiSection } from "@/components/preview/api-section";
import type { PreviewSeoDocument } from "@/lib/preview-seo";

import { HashGeneratorCodeExamplesSection } from "./sections/snippet-sections";
import { HashGeneratorHeroSection } from "./sections/hero";

export default function HashGeneratorPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <HashGeneratorHeroSection seo={seo} />
      <HashGeneratorCodeExamplesSection />
      <PreviewApiSection slug="hash-generator" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
