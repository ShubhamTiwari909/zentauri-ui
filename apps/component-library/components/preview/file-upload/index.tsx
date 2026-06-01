import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { FileUploadCodeExamplesSection } from "./sections/snippet-sections";
import { FileUploadExamplesSection } from "./sections/component-demo";
import { FileUploadHeroSection } from "./sections/hero";

export default function FileUploadPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <FileUploadHeroSection seo={seo} />
      <FileUploadExamplesSection />
      <FileUploadCodeExamplesSection />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
