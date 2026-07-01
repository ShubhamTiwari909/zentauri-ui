import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import { PreviewApiSection } from "@/components/preview/api-section";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { CodeBlockCodeExamplesSection } from "./sections/snippet-sections";
import { CodeBlockHeroSection } from "./sections/hero";

export default function CodeBlockPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <CodeBlockHeroSection seo={seo} />
      <CodeBlockCodeExamplesSection />
      <PreviewApiSection slug="code-block" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
