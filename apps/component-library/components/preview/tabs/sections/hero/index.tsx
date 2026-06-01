import { Section, SectionCard } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { Tabs } from "@zentauri-ui/zentauri-components/ui/tabs";
import { TabsContentAnimated } from "@zentauri-ui/zentauri-components/ui/tabs/animated";
import TabsListComponent from "./list";

export function TabsHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />

      <SectionCard>
        <Tabs defaultValue="overview">
          <TabsListComponent />
          <TabsContentAnimated
            value="overview"
            animation="fade"
            className="mt-4 text-sm text-slate-800 dark:text-slate-300"
          >
            High-level metrics and health for this service.
          </TabsContentAnimated>
          <TabsContentAnimated
            value="activity"
            animation="fade"
            className="mt-4 text-sm text-slate-800 dark:text-slate-300"
          >
            Recent events and audit entries appear here.
          </TabsContentAnimated>
        </Tabs>
      </SectionCard>
    </Section>
  );
}
