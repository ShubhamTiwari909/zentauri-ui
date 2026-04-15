import { Input } from "@repo/components/ui";

export function InputsHeroSection() {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
      <div className="max-w-2xl space-y-6">
        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-cyan-200">
          Component library
        </span>
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Input with appearance, size, and motion presets.
          </h1>
          <p className="max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
            Built like the button: CVA variants, Framer Motion presets, full native
            input props, and{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-cyan-100/90">
              {'data-slot="input"'}
            </code>{" "}
            for stable targeting.
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <div className="grid gap-3">
          <label className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Email
          </label>
          <Input
            animation="lift"
            placeholder="you@example.com"
            aria-label="Email"
          />
          <label className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Password
          </label>
          <Input
            type="password"
            animation="glow"
            placeholder="••••••••"
            aria-label="Password"
          />
          <label className="text-xs font-medium uppercase tracking-wide text-rose-200/90">
            Error state
          </label>
          <Input
            appearance="error"
            defaultValue="invalid@"
            animation="none"
            aria-label="Invalid email example"
          />
        </div>
      </div>
    </section>
  );
}
