import { Section } from "@/components/common/Section";
import { variantLeadComment } from "@/components/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import {
  RadioGroupAnimated,
  RadioGroupItemAnimated,
} from "@zentauri-ui/zentauri-components/ui/radio-group/animated";

export function RadioGroupExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-900 dark:text-slate-400">
        The animated entrypoint adds a small spring to the selected radio
        indicator while keeping native radio inputs underneath.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        <PreviewCodeShowcase
          code={`${variantLeadComment("appearance · info, orientation · horizontal, animation · pop")}<RadioGroupAnimated defaultValue="weekly" appearance="info" orientation="horizontal">
  <RadioGroupItemAnimated value="daily">Daily</RadioGroupItemAnimated>
  <RadioGroupItemAnimated value="weekly">Weekly</RadioGroupItemAnimated>
  <RadioGroupItemAnimated value="monthly">Monthly</RadioGroupItemAnimated>
</RadioGroupAnimated>`}
        >
          <RadioGroupAnimated
            defaultValue="weekly"
            appearance="info"
            orientation="horizontal"
          >
            <RadioGroupItemAnimated value="daily">Daily</RadioGroupItemAnimated>
            <RadioGroupItemAnimated value="weekly">
              Weekly
            </RadioGroupItemAnimated>
            <RadioGroupItemAnimated value="monthly">
              Monthly
            </RadioGroupItemAnimated>
          </RadioGroupAnimated>
        </PreviewCodeShowcase>
      </div>
    </Section>
  );
}
