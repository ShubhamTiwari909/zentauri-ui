import { Button } from "@/components/ui/button";

const showcaseButtons = [
  {
    label: "Primary",
    variant: "default",
    animation: "lift",
  },
  {
    label: "Secondary",
    variant: "secondary",
    animation: "bounce",
  },
  {
    label: "Outline",
    variant: "outline",
    animation: "press",
  },
  {
    label: "Ghost",
    variant: "ghost",
    animation: "none",
  },
  {
    label: "Destructive",
    variant: "destructive",
    animation: "glow",
  },
  {
    label: "Glass",
    variant: "glass",
    animation: "tilt",
  },
] as const;

const sizeButtons = [
  { label: "Small", size: "sm" },
  { label: "Medium", size: "md" },
  { label: "Large", size: "lg" },
  { label: "Icon", size: "icon" },
] as const;

export default function ButtonsPreviewPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_30%),radial-gradient(circle_at_top_right,rgba(14,165,233,0.16),transparent_25%),linear-gradient(180deg,#020617_0%,#020617_100%)] text-slate-50">
      <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-12 px-6 py-12 sm:px-10 lg:px-12">
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
                variants, a `cn` helper for class composition, and motion presets
                you can switch on with a single prop.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
            <div className="grid gap-3 sm:grid-cols-2">
              <Button animation="lift" className="w-full">
                Launch
              </Button>
              <Button variant="outline" animation="press" className="w-full">
                Outline
              </Button>
              <Button variant="glass" animation="glow" className="w-full">
                Glass
              </Button>
              <Button variant="destructive" animation="bounce" className="w-full">
                Delete
              </Button>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/30 backdrop-blur">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-200">
              Variants
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white">
              One component, multiple visual styles
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              You can use the `variant` and `size` props to switch the button
              between polished defaults, outlines, ghost actions, destructive
              actions, and glass surfaces.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {showcaseButtons.map((button) => (
                <Button
                  key={button.label}
                  variant={button.variant}
                  animation={button.animation}
                >
                  {button.label}
                </Button>
              ))}
            </div>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-slate-950/30 backdrop-blur">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-200">
              Motion presets
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white">
              Animation options through a prop
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Pick a preset like `lift`, `press`, `glow`, `tilt`, or `bounce`
              to give each button a different feel without rewriting the
              component.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                ["Lift", "lift"],
                ["Press", "press"],
                ["Glow", "glow"],
                ["Tilt", "tilt"],
                ["Bounce", "bounce"],
                ["None", "none"],
              ].map(([label, animation]) => (
                <Button
                  key={label}
                  animation={animation as (typeof showcaseButtons)[number]["animation"]}
                  variant="secondary"
                  className="w-full"
                >
                  {label}
                </Button>
              ))}
            </div>
          </article>
        </section>

        <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-200">
                Sizes
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-white">
                Default button sizes
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-400">
              The component keeps the native button API, so you can still pass
              `type`, `disabled`, `onClick`, ARIA attributes, and any other
              standard button props alongside the library variants.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {sizeButtons.map((button) => (
              <Button key={button.label} size={button.size} variant="outline">
                {button.label}
              </Button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
