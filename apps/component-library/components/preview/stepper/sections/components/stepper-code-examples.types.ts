import type { StepperAppearance, StepperProps } from "@zentauri-ui/zentauri-components/ui/stepper";

export type StepperDemoOrientation = NonNullable<StepperProps["orientation"]>;
export type StepperDemoSize = NonNullable<StepperProps["size"]>;

export type StepperDemoProps = {
  orientation: StepperDemoOrientation;
  appearance: StepperAppearance;
  size?: StepperDemoSize;
};
