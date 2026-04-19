import { variantLeadComment } from "@/components/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { ToggleAnimated } from "@zentauri-ui/zentauri-components/ui/toggle/animated";

export function ToggleExamplesSection() {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40">
      <h2 className="mt-3 text-2xl font-semibold text-white">Examples</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Neutral appearance with a spring thumb animation.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        <PreviewCodeShowcase
          code={`${variantLeadComment(`appearance · neutral, animation · spring`)}<ToggleAnimated appearance="neutral" animation="spring" aria-label="Dark mode" />`}
        >
          <ToggleAnimated
            appearance="neutral"
            animation="spring"
            aria-label="Dark mode"
          />
        </PreviewCodeShowcase>
      </div>
    </section>
  );
}
