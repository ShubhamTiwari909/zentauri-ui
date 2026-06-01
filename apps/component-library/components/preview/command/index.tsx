import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";

import { CommandCodeExamplesSection } from "./sections/snippet-sections";
import { CommandExamplesSection } from "./sections/component-demo";
import { CommandHeroSection } from "./sections/hero";

export default function CommandPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <CommandHeroSection seo={seo} />
      <CommandExamplesSection />
      <CommandCodeExamplesSection />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
