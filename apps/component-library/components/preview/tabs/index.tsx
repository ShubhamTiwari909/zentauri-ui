import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import { PreviewApiSection } from "@/components/preview/api-section";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { TabsCodeExamplesSection } from "./sections/snippet-sections";
import { TabsExamplesSection } from "./sections/component-demo";
import { TabsHeroSection } from "./sections/hero";

export default function TabsPreviewPage({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <PreviewPageShell>
      <TabsHeroSection seo={seo} />
      <TabsExamplesSection />
      <TabsCodeExamplesSection />
      <PreviewApiSection slug="tabs" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
