import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import { PreviewApiSection } from "@/components/preview/api-section";
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
      <PreviewApiSection slug="command" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
