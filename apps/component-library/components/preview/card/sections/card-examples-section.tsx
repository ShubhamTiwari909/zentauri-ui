import { variantLeadComment } from "@/components/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import {
  CardAnimated,
  CardBody,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@zentauri-ui/zentauri-components/ui/card/animated";

export function CardExamplesSection() {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40">
      <h2 className="mt-3 text-2xl font-semibold text-white">Examples</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Outline appearance with tilt animation on hover-capable devices.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        <PreviewCodeShowcase
          code={`${variantLeadComment(`appearance · outline, animation · tilt, rounded · md`)}
<CardAnimated appearance="outline" animation="tilt" rounded="md">
  <CardHeader>
    <CardTitle>Note</CardTitle>
    <CardDescription>Autosaved</CardDescription>
  </CardHeader>
  <CardBody>Draft content…</CardBody>
</CardAnimated>`}
        >
          <CardAnimated
            appearance="outline"
            animation="tilt"
            rounded="md"
            className="max-w-md"
          >
            <CardHeader>
              <CardTitle>Note</CardTitle>
              <CardDescription>Autosaved</CardDescription>
            </CardHeader>
            <CardBody>
              <p className="text-sm text-slate-300">
                Draft content for this preview.
              </p>
            </CardBody>
          </CardAnimated>
        </PreviewCodeShowcase>
      </div>
    </section>
  );
}
