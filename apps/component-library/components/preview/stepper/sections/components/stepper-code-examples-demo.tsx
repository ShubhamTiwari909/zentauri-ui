import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperTitle,
} from "@zentauri-ui/zentauri-components/ui/stepper";

import type { StepperDemoProps } from "./stepper-code-examples.types";

export function StepperDemo({
  orientation,
  appearance,
  size = "md",
}: StepperDemoProps) {
  if (orientation === "vertical") {
    return (
      <Stepper orientation="vertical" size={size}>
        <StepperItem>
          <div className="flex gap-3">
            <StepperIndicator appearance={appearance} />
            <div>
              <StepperTitle>Draft</StepperTitle>
              <StepperDescription>Autosaved</StepperDescription>
            </div>
          </div>
        </StepperItem>
        <StepperItem>
          <div className="flex gap-3">
            <StepperIndicator appearance={appearance} />
            <div>
              <StepperTitle>Review</StepperTitle>
              <StepperDescription>Awaiting approval</StepperDescription>
            </div>
          </div>
        </StepperItem>
        <StepperItem>
          <div className="flex gap-3">
            <StepperIndicator appearance={appearance} />
            <div>
              <StepperTitle>Published</StepperTitle>
              <StepperDescription>Live to readers</StepperDescription>
            </div>
          </div>
        </StepperItem>
      </Stepper>
    );
  }
  return (
    <Stepper orientation="horizontal" size={size} className="gap-10">
      <StepperItem>
        <StepperIndicator appearance={appearance} />
        <StepperTitle>Details</StepperTitle>
        <StepperDescription>Confirm items</StepperDescription>
      </StepperItem>
      <StepperItem>
        <StepperIndicator appearance={appearance} />
        <StepperTitle>Payment</StepperTitle>
        <StepperDescription>Billing method</StepperDescription>
      </StepperItem>
      <StepperItem>
        <StepperIndicator appearance={appearance} />
        <StepperTitle>Review</StepperTitle>
        <StepperDescription>Submit order</StepperDescription>
      </StepperItem>
      <StepperItem>
        <StepperIndicator appearance={appearance} />
        <StepperTitle>Details</StepperTitle>
        <StepperDescription>Confirm items</StepperDescription>
      </StepperItem>
      <StepperItem>
        <StepperIndicator appearance={appearance} />
        <StepperTitle>Payment</StepperTitle>
        <StepperDescription>Billing method</StepperDescription>
      </StepperItem>
      <StepperItem>
        <StepperIndicator appearance={appearance} />
        <StepperTitle>Review</StepperTitle>
        <StepperDescription>Submit order</StepperDescription>
      </StepperItem>
      <StepperItem>
        <StepperIndicator appearance={appearance} />
        <StepperTitle>Details</StepperTitle>
        <StepperDescription>Confirm items</StepperDescription>
      </StepperItem>
      <StepperItem>
        <StepperIndicator appearance={appearance} />
        <StepperTitle>Payment</StepperTitle>
        <StepperDescription>Billing method</StepperDescription>
      </StepperItem>
      <StepperItem>
        <StepperIndicator appearance={appearance} />
        <StepperTitle>Review</StepperTitle>
        <StepperDescription>Submit order</StepperDescription>
      </StepperItem>
    </Stepper>
  );
}
