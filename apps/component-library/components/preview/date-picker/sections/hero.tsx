import { Section } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { DatePicker } from "@zentauri-ui/zentauri-components/ui/date-picker";

// Fixed dates keep the server-rendered trigger text deterministic.
const DEMO_TODAY = new Date(2026, 6, 7);

export function DatePickerHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />

      <div className="rounded-3xl border border-slate-900/10 dark:border-white/10 bg-slate-100 dark:bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <div className="flex flex-wrap items-start gap-6">
          <div className="w-56">
            <DatePicker today={DEMO_TODAY} locale="en-US" />
          </div>
          <div className="w-56">
            <DatePicker
              today={DEMO_TODAY}
              locale="en-US"
              defaultValue={new Date(2026, 6, 7)}
              clearable
            />
          </div>
          <div className="w-72">
            <DatePicker
              mode="range"
              appearance="blue"
              today={DEMO_TODAY}
              locale="en-US"
              defaultValue={{
                from: new Date(2026, 6, 14),
                to: new Date(2026, 6, 18),
              }}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
