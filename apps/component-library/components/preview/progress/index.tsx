import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import { PreviewApiSection } from "@/components/preview/api-section";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { ProgressCodeExamplesSection } from "./sections/snippet-sections";
import { ProgressHeroSection } from "./sections/hero";

export default function ProgressPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <ProgressHeroSection seo={seo} />
      <ProgressCodeExamplesSection />
      <PreviewApiSection slug="progress" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
