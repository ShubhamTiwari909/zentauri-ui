import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { BadgeCodeExamplesSection } from "./sections/snippet-sections";
import { BadgeExamplesSection } from "./sections/component-demo";
import { BadgeHeroSection } from "./sections/hero";

export default function BadgePreviewPage({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <PreviewPageShell>
      <BadgeHeroSection seo={seo} />
      <BadgeExamplesSection />
      <BadgeCodeExamplesSection />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
