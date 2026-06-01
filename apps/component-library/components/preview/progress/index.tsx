import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { ProgressCodeExamplesSection } from "./sections/snippet-sections";
import { ProgressExamplesSection } from "./sections/component-demo";
import { ProgressHeroSection } from "./sections/hero";

export default function ProgressPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <ProgressHeroSection seo={seo} />
      <ProgressExamplesSection />
      <ProgressCodeExamplesSection />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
