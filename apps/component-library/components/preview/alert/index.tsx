import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/preview-seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { AlertCodeExamplesSection } from "./sections/alert-code-examples-section";
import { AlertExamplesSection } from "./sections/alert-examples-section";
import { AlertHeroSection } from "./sections/alert-hero-section";

export default function AlertPreviewPage({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <PreviewPageShell>
      <AlertHeroSection seo={seo} />
      <AlertExamplesSection />
      <AlertCodeExamplesSection />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
