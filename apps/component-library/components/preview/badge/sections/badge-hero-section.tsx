import { Badge } from "@/components/ui/badge";

export function BadgeHeroSection() {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
      <div className="max-w-2xl space-y-6">
        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-cyan-200">
          Display
        </span>
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Badges for labels, counts, and status.
          </h1>
          <p className="max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
            Share the same appearance vocabulary as buttons, with optional close
            affordances and subtle motion.
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <div className="flex flex-wrap gap-2">
          <Badge appearance="sky">Beta</Badge>
          <Badge appearance="outline">Outline</Badge>
          <Badge appearance="emerald" animation="bounce">
            Live
          </Badge>
          <Badge appearance="rose" closable closeLabel="Remove tag">
            Blocking
          </Badge>
        </div>
      </div>
    </section>
  );
}
