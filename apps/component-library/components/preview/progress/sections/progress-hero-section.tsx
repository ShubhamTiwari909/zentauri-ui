import { Progress } from "@repo/components/ui";

export function ProgressHeroSection() {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
      <div className="max-w-2xl space-y-6">
        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-cyan-200">
          Feedback
        </span>
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Progress for determinate tasks.
          </h1>
          <p className="max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
            Rich appearance options shared with buttons, optional shimmer motion,
            and accessible progressbar semantics.
          </p>
        </div>
      </div>

      <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <Progress value={42} appearance="sky" label="Upload progress" />
        <Progress value={78} appearance="gradient-indigo" animation="shimmer" />
      </div>
    </section>
  );
}
