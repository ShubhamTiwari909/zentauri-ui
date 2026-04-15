import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  tabsListVariants,
  tabsTriggerVariants,
} from "@repo/components/ui";

export function TabsHeroSection() {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
      <div className="max-w-2xl space-y-6">
        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-cyan-200">
          Navigation
        </span>
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Tabs for switching related views.
          </h1>
          <p className="max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
            Controlled or uncontrolled selection, list and trigger styling via
            variants, and panel motion on{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-sm text-white">
              TabsContent
            </code>{" "}
            (<code className="text-sm text-cyan-200">fade</code>,{" "}
            <code className="text-sm text-cyan-200">slide</code>, or{" "}
            <code className="text-sm text-cyan-200">none</code>) with
            orientation-aware slide and reduced-motion support.
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <Tabs defaultValue="overview">
          <TabsList
            className={tabsListVariants({
              variant: "pills",
              size: "md",
              orientation: "horizontal",
            })}
          >
            <TabsTrigger
              value="overview"
              className={tabsTriggerVariants({ variant: "pills", size: "md", appearance:"rose" })}
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="activity"
              className={tabsTriggerVariants({ variant: "pills", size: "md", appearance:"sky" })}
            >
              Activity
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="overview"
            animation="fade"
            className="mt-4 text-sm text-slate-300"
          >
            High-level metrics and health for this service.
          </TabsContent>
          <TabsContent
            value="activity"
            animation="fade"
            className="mt-4 text-sm text-slate-300"
          >
            Recent events and audit entries appear here.
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
