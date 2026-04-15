import { Toggle } from "@repo/components/ui";

export function ToggleHeroSection() {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
      <div className="max-w-2xl space-y-6">
        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-cyan-200">
          Form
        </span>
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Toggle switches with motion presets.
          </h1>
          <p className="max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
            Accessible switch semantics, multiple appearances, and spring or smooth
            thumb transitions.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6 rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <Toggle defaultChecked aria-label="Enable notifications" />
        <Toggle appearance="success" defaultChecked aria-label="Auto-save drafts" />
        <Toggle appearance="destructive" size="lg" aria-label="Danger mode" />
      </div>
    </section>
  );
}
