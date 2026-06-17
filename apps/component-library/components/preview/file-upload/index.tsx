import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import { PreviewApiSection } from "@/components/preview/api-section";
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
      <PreviewApiSection slug="file-upload" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
