import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import { PreviewApiSection } from "@/components/preview/api-section";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { CodeDiffCodeExamplesSection } from "./sections/snippet-sections";
import { CodeDiffHeroSection } from "./sections/hero";

export default function CodeDiffPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <CodeDiffHeroSection seo={seo} />
      <CodeDiffCodeExamplesSection />
      <PreviewApiSection slug="code-diff" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
