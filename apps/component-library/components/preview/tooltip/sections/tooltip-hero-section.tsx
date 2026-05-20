import { Section, SectionCard } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/preview-hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@zentauri-ui/zentauri-components/ui/tooltip";

const TRIGGER_CLASS =
  "rounded-lg bg-slate-200 dark:bg-white/10 px-4 py-2 text-sm font-medium text-slate-900 dark:text-white outline-none transition hover:bg-slate-200 dark:hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-cyan-400/50";

export function TooltipHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />

      <SectionCard>
        <Tooltip position="top" delay={150}>
          <TooltipTrigger className={TRIGGER_CLASS}>
            Hover or focus me
          </TooltipTrigger>
          <TooltipContent variant="ghost" size="md">
            Shortcuts: ⌘S to save, ⌘K to search.
          </TooltipContent>
        </Tooltip>
      </SectionCard>
    </Section>
  );
}
