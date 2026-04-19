import { PreviewHeroSeoBlock } from "@/components/preview/seo/preview-hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { Tabs } from "@zentauri-ui/zentauri-components/ui/tabs";
import { TabsContentAnimated } from "@zentauri-ui/zentauri-components/ui/tabs/animated";
import TabsListComponent from "./tabs-list";

export function TabsHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
      <PreviewHeroSeoBlock seo={seo} />

      <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <Tabs defaultValue="overview">
          <TabsListComponent />
          <TabsContentAnimated
            value="overview"
            animation="fade"
            className="mt-4 text-sm text-slate-300"
          >
            High-level metrics and health for this service.
          </TabsContentAnimated>
          <TabsContentAnimated
            value="activity"
            animation="fade"
            className="mt-4 text-sm text-slate-300"
          >
            Recent events and audit entries appear here.
          </TabsContentAnimated>
        </Tabs>
      </div>
    </section>
  );
}
