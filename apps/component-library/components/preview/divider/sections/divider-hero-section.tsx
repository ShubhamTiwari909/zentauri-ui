import { Divider } from "@repo/components/ui";

export function DividerHeroSection() {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
      <div className="max-w-2xl space-y-6">
        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-cyan-200">
          Layout
        </span>
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Dividers for sections and labeled breaks.
          </h1>
          <p className="max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
            Horizontal or vertical orientation with tone variants and optional
            inline labels between lines.
          </p>
        </div>
      </div>

      <div className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <Divider appearance="primary" animation="expand" label="Primary" />
        <Divider appearance="muted" size="sm" />
      </div>
    </section>
  );
}
