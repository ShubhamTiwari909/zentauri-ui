import { variantLeadComment } from "@/components/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { SkeletonButton } from "@zentauri-ui/zentauri-components/ui/skeleton";

export function SkeletonExamplesSection() {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40">
      <h2 className="mt-3 text-2xl font-semibold text-white">Examples</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Button-shaped skeleton for toolbar placeholders.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        <PreviewCodeShowcase
          code={`${variantLeadComment(`SkeletonButton · buttonSize · md, animation · shimmer`)}
<SkeletonButton buttonSize="md" className="w-32" animation="shimmer" />`}
        >
          <SkeletonButton
            buttonSize="md"
            className="w-32"
            animation="shimmer"
          />
        </PreviewCodeShowcase>
      </div>
    </section>
  );
}
