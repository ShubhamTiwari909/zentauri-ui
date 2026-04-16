import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@zentauri-ui/zentauri-components/ui";

const TRIGGER_CLASS =
  "rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white outline-none transition hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-cyan-400/50";

export function TooltipHeroSection() {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
      <div className="max-w-2xl space-y-6">
        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-cyan-200">
          Overlay
        </span>
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Tooltips for hints on hover or focus.
          </h1>
          <p className="max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
            Delayed open on hover, immediate open on focus, and content styled
            with variant, size, intent, and animation presets. Placement is set on
            the root <code className="text-cyan-200/90">Tooltip</code>.
          </p>
        </div>
      </div>

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
