import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/preview-seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { FileUploadCodeExamplesSection } from "./sections/file-upload-code-examples-section";
import { FileUploadExamplesSection } from "./sections/file-upload-examples-section";
import { FileUploadHeroSection } from "./sections/file-upload-hero-section";

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
