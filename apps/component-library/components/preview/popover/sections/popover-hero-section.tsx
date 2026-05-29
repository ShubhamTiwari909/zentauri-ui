import { Section, SectionCard } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/preview-hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@zentauri-ui/zentauri-components/ui/popover";

const TRIGGER_CLASS =
  "rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm outline-none transition hover:bg-slate-800 focus-visible:ring-2 focus-visible:ring-cyan-400/50 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100";

export function PopoverHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />

      <SectionCard>
        <Popover defaultOpen>
          <PopoverTrigger>
            <button type="button" className={TRIGGER_CLASS}>
              Project actions
            </button>
          </PopoverTrigger>
          <PopoverContent align="start" variant="outline" width="sm" className="min-w-75">
            <div className="space-y-3">
              <p className="text-sm font-semibold">Ship checklist</p>
              <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                Confirm owner, add a release note, and keep the panel open while
                the user edits.
              </p>
              <button type="button" className={TRIGGER_CLASS}>
                Mark ready
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </SectionCard>
    </Section>
  );
}
