import { Section, SectionCard } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/preview-hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { ScrollArea } from "@zentauri-ui/zentauri-components/ui/scroll-area";

const activityItems = [
  "Webhook received from billing service",
  "Customer profile merged with workspace identity",
  "Invoice draft generated for approval",
  "Payment method validated through risk checks",
  "Receipt queued for transactional email",
  "Usage counters synchronized to analytics",
  "Admin notification posted to the audit stream",
  "Workspace limits recalculated for the next cycle",
];

export function ScrollAreaHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />

      <SectionCard className="max-w-xl">
        <div className="grid gap-6">
          <ScrollArea
            aria-label="Recent workspace activity"
            appearance="glass"
            className="h-72 p-4"
            scrollbar="hover"
            shadow
          >
            <div className="space-y-3">
              {activityItems.map((item, index) => (
                <article
                  key={item}
                  className="rounded-2xl border border-white/10 bg-slate-950/60 p-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
                    Step {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-100">
                    {item}
                  </p>
                </article>
              ))}
            </div>
          </ScrollArea>

          <ScrollArea
            aria-label="Deployment pipeline stages"
            appearance="sky"
            className="max-w-full p-3"
            orientation="horizontal"
            viewportClassName="flex min-w-max gap-3"
          >
            {["Queued", "Building", "Preview", "Checks", "Promote"].map(
              (stage) => (
                <span
                  key={stage}
                  className="rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/10"
                >
                  {stage}
                </span>
              ),
            )}
          </ScrollArea>
        </div>
      </SectionCard>
    </Section>
  );
}
