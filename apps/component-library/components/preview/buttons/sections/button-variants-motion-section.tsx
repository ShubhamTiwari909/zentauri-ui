import { Button } from "@repo/components/ui";
import {
  showcaseButtons,
  buttonAnimationPresets,
} from "../variants";

export function ButtonVariantsMotionSection() {
  return (
    <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <article className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/30 backdrop-blur">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-200">
          Variants
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-white">
          One component, multiple visual styles
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-400">
          You can use the `variant` and `size` props to switch the button between
          polished defaults, outlines, ghost actions, destructive actions, and
          glass surfaces.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          {showcaseButtons.map((button) => (
            <Button
              key={button.label}
              appearance={button.appearance}
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
          Pick a preset like `lift`, `press`, `glow`, `tilt`, or `bounce` to give
          each button a different feel without rewriting the component.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {buttonAnimationPresets.map(([label, animation]) => (
            <Button
              key={label}
              animation={
                animation as (typeof showcaseButtons)[number]["animation"]
              }
              appearance="secondary"
              className="w-full"
            >
              {label}
            </Button>
          ))}
        </div>
      </article>
    </section>
  );
}
