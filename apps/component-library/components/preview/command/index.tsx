import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/preview-seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";

import { CommandCodeExamplesSection } from "./sections/command-code-examples-section";
import { CommandExamplesSection } from "./sections/command-examples-section";
import { CommandHeroSection } from "./sections/command-hero-section";

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
