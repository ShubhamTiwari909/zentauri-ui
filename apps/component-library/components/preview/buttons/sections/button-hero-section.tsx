import { Button } from "@zentauri-ui/zentauri-components/ui";

export function ButtonHeroSection() {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
      <div className="max-w-2xl space-y-6">
        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-cyan-200">
          Component library starter
        </span>
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            A customizable button built for React, Tailwind, and motion.
          </h1>
          <p className="max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
            This button supports native button props, `class-variance-authority`
            variants, a `cn` helper for class composition, and motion presets you can
            switch on with a single prop.
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <div className="grid gap-3 sm:grid-cols-2">
          <Button appearance="outline" animation="lift" className="w-full">
            Launch
          </Button>
          <Button appearance="outline" animation="press" className="w-full">
            Outline
          </Button>
          <Button appearance="glass" animation="glow" className="w-full">
            Glass
          </Button>
          <Button
            appearance="destructive"
            animation="bounce"
            className="w-full"
          >
            Delete
          </Button>
          <Button
            appearance="gradient-blue"
            animation="none"
            className="w-full"
          >
            Gradient
          </Button>
          <Button
            appearance="sky"
            animation="lift"
            className="w-full"
            as="link"
            target="_blank"
            href="https://www.google.com"
          >
            Link
          </Button>
        </div>
      </div>
    </section>
  );
}
