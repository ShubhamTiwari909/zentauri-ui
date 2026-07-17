import { Section } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { Calendar } from "@zentauri-ui/zentauri-components/ui/calendar";

// Fixed dates keep the server-rendered grid deterministic (no hydration drift).
const DEMO_MONTH = new Date(2026, 6, 1);
const DEMO_TODAY = new Date(2026, 6, 7);

export function CalendarHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />

      <div className="rounded-3xl border border-slate-900/10 dark:border-white/10 bg-slate-100 dark:bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <div className="flex flex-wrap items-start gap-6">
          <Calendar
            defaultMonth={DEMO_MONTH}
            today={DEMO_TODAY}
            locale="en-US"
            defaultValue={new Date(2026, 6, 7)}
          />
          <Calendar
            mode="range"
            appearance="blue"
            defaultMonth={DEMO_MONTH}
            today={DEMO_TODAY}
            locale="en-US"
            defaultValue={{
              from: new Date(2026, 6, 14),
              to: new Date(2026, 6, 18),
            }}
          />
        </div>
      </div>
    </Section>
  );
}
