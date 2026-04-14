import { PreviewPageShell } from "@/components/preview/common/preview-page-shell";
import { TabsExamplesSection } from "./sections/tabs-examples-section";
import { TabsHeroSection } from "./sections/tabs-hero-section";

export default function TabsPreviewPage() {
  return (
    <PreviewPageShell>
      <TabsHeroSection />
      <TabsExamplesSection />
    </PreviewPageShell>
  );
}
