import { Spinner } from "@zentauri-ui/zentauri-components/ui/spinner";

export function SpinnerHeroSection() {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
      <div className="max-w-2xl space-y-6">
        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-cyan-200">
          Loading
        </span>
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Spinners for inline busy states.
          </h1>
          <p className="max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
            Ring, dots, pulse, and bars variants with the same appearance scale as
            buttons and badges.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6 rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <Spinner appearance="sky" size="lg" variant="ring" />
        <Spinner appearance="secondary" size="md" variant="dots" />
        <Spinner appearance="emerald" size="md" variant="bars" />
      </div>
    </section>
  );
}
