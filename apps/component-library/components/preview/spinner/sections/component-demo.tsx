import { Section } from "@/components/common/Section";
import { variantLeadComment } from "@/components/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { Spinner } from "@zentauri-ui/zentauri-components/ui/spinner/animated";

export function SpinnerExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-900 dark:text-slate-400">
        Pulse variant uses a Framer Motion opacity and scale loop on the track.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        <PreviewCodeShowcase
          code={`${variantLeadComment(`variant · pulse, appearance · gradient-indigo, size · xl`)}<SpinnerAnimated variant="pulse" appearance="gradient-indigo" size="xl" />`}
        >
          <Spinner variant="pulse" appearance="gradient-indigo" size="xl" />
        </PreviewCodeShowcase>
      </div>
    </Section>
  );
}
