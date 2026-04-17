import { PreviewHeroSeoBlock } from "@/components/preview/seo/preview-hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@zentauri-ui/zentauri-components/ui/tooltip";

const TRIGGER_CLASS =
  "rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white outline-none transition hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-cyan-400/50";

export function TooltipHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
      <PreviewHeroSeoBlock seo={seo} />

      <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <Tooltip position="top" delay={150}>
          <TooltipTrigger className={TRIGGER_CLASS}>
            Hover or focus me
          </TooltipTrigger>
          <TooltipContent variant="ghost" size="md">
            Shortcuts: ⌘S to save, ⌘K to search.
          </TooltipContent>
        </Tooltip>
      </div>
    </section>
  );
}
