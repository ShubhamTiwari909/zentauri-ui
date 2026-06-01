import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { AlertCodeExamplesSection } from "./sections/snippet-sections";
import { AlertExamplesSection } from "./sections/component-demo";
import { AlertHeroSection } from "./sections/hero";

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
