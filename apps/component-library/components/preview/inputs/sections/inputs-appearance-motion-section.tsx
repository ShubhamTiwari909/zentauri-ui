import { Input } from "@zentauri-ui/zentauri-components/ui";
import { animationPresets, appearanceInputs } from "../variants";

export function InputsAppearanceMotionSection() {
  return (
    <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <article className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/30 backdrop-blur">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-200">
          Appearance
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-white">
          Default, error, and success appearances
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-400">
          Use `appearance` for validation styling. Error sets `aria-invalid` unless
          you override it.
        </p>
        <div className="mt-6 grid gap-4">
          {appearanceInputs.map((row) => (
            <div key={row.label} className="grid gap-2">
              <span className="text-xs text-slate-400">{row.label}</span>
              <Input
                appearance={row.appearance}
                placeholder={`${row.label} field`}
                aria-label={`${row.label} demo`}
              />
            </div>
          ))}
        </div>
      </article>

      <article className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-slate-950/30 backdrop-blur">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-200">
          Motion presets
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-white">
          Optional focus and hover motion
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          Same preset names as the button: `lift`, `press`, `glow`, `tilt`,
          `bounce`, or `none`.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {animationPresets.map(([label, animation]) => (
            <div key={label} className="grid gap-2">
              <span className="text-xs text-slate-400">{label}</span>
              <Input
                animation={animation}
                placeholder="Focus me"
                aria-label={`${label} motion demo`}
              />
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
