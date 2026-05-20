import { Section } from "@/components/common/Section";
import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperTitle,
} from "@zentauri-ui/zentauri-components/ui/stepper";

export function StepperExamplesSection() {
  return (
    <Section variant="plain" className="space-y-6">
      <h2 className="text-2xl font-semibold text-white">Vertical</h2>
      <div className="max-w-xl rounded-2xl border border-slate-900/10 dark:border-white/10 bg-white dark:bg-white/5 p-5">
        <Stepper orientation="vertical" size="sm">
          <StepperItem>
            <div className="flex gap-3">
              <StepperIndicator />
              <div>
                <StepperTitle>Draft</StepperTitle>
                <StepperDescription>Autosaved</StepperDescription>
              </div>
            </div>
          </StepperItem>
          <StepperItem>
            <div className="flex gap-3">
              <StepperIndicator />
              <div>
                <StepperTitle>Review</StepperTitle>
                <StepperDescription>Awaiting approval</StepperDescription>
              </div>
            </div>
          </StepperItem>
          <StepperItem>
            <div className="flex gap-3">
              <StepperIndicator />
              <div>
                <StepperTitle>Published</StepperTitle>
                <StepperDescription>Live to readers</StepperDescription>
              </div>
            </div>
          </StepperItem>
        </Stepper>
      </div>
    </Section>
  );
}
