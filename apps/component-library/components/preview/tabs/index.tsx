import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/preview-seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { TabsCodeExamplesSection } from "./sections/tabs-code-examples-section";
import { TabsExamplesSection } from "./sections/tabs-examples-section";
import { TabsHeroSection } from "./sections/tabs-hero-section/tabs-hero-section";

export default function TabsPreviewPage({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <PreviewPageShell>
      <TabsHeroSection seo={seo} />
      <TabsExamplesSection />
      <TabsCodeExamplesSection />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
