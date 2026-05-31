import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/preview-seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";

import { CopyButtonCodeExamplesSection } from "./sections/copy-button-code-examples-section";
import { CopyButtonExamplesSection } from "./sections/copy-button-examples-section";
import { CopyButtonHeroSection } from "./sections/copy-button-hero-section";

export default function CopyButtonPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <CopyButtonHeroSection seo={seo} />
      <CopyButtonExamplesSection />
      <CopyButtonCodeExamplesSection />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
