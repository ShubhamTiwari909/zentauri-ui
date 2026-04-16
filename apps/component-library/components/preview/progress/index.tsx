import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/preview-seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { ProgressCodeExamplesSection } from "./sections/progress-code-examples-section";
import { ProgressExamplesSection } from "./sections/progress-examples-section";
import { ProgressHeroSection } from "./sections/progress-hero-section";

export default function ProgressPreviewPage({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <PreviewPageShell>
      <ProgressHeroSection seo={seo} />
      <ProgressExamplesSection />
      <ProgressCodeExamplesSection />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
