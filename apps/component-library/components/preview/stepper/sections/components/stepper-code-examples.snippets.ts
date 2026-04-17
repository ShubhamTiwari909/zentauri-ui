import { variantLeadComment } from "@/components/common/variant-code-prefix";

import type { StepperDemoProps } from "./stepper-code-examples.types";

export function stepperSnippet({
  orientation,
  appearance,
  size = "md",
}: StepperDemoProps): string {
  const sizeAttr = ` size="${size}"`;
  const orientationNote = `orientation · ${orientation}, appearance · ${appearance}, size · ${size}`;
  if (orientation === "vertical") {
    return `${variantLeadComment(orientationNote)}<Stepper orientation="vertical"${sizeAttr}>
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
</Stepper>`;
  }
  return `${variantLeadComment(orientationNote)}<Stepper orientation="horizontal"${sizeAttr} className="gap-10">
  <StepperItem>
    <StepperIndicator />
    <StepperTitle>Details</StepperTitle>
    <StepperDescription>Confirm items</StepperDescription>
  </StepperItem>
  <StepperItem>
    <StepperIndicator />
    <StepperTitle>Payment</StepperTitle>
    <StepperDescription>Billing method</StepperDescription>
  </StepperItem>
  <StepperItem>
    <StepperIndicator />
    <StepperTitle>Review</StepperTitle>
    <StepperDescription>Submit order</StepperDescription>
  </StepperItem>
</Stepper>`;
}
