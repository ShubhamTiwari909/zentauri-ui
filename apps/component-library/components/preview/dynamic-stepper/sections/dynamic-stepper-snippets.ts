const stepsSnippet = `[
  { id: "cart", title: "Cart", description: "Review items" },
  { id: "pay", title: "Payment", description: "Enter details" },
  { id: "done", title: "Confirm", description: "Place order" },
]`;

export function dynamicStepperUncontrolledSnippet(): string {
  return `import { DynamicStepper } from "@zentauri-ui/zentauri-components/ui/dynamic-stepper";

const steps = ${stepsSnippet};

export function Example() {
  return (
    <DynamicStepper
      steps={steps}
      defaultActiveStep={1}
      buttonAppearance="outline"
    />
  );
}
`;
}

export function dynamicStepperControlledSnippet(): string {
  return `"use client";

import { useState } from "react";
import { DynamicStepper } from "@zentauri-ui/zentauri-components/ui/dynamic-stepper";

const steps = ${stepsSnippet};

export function Example() {
  const [activeStep, setActiveStep] = useState(0);
  return (
    <DynamicStepper
      steps={steps}
      activeStep={activeStep}
      onActiveStepChange={setActiveStep}
      buttonAppearance="outline"
    />
  );
}
`;
}

export function dynamicStepperCallbacksSnippet(): string {
  return `"use client";

import { DynamicStepper } from "@zentauri-ui/zentauri-components/ui/dynamic-stepper";

const steps = ${stepsSnippet};

export function Example() {
  return (
    <DynamicStepper
      steps={steps}
      buttonAppearance="outline"
      onActiveStepChange={(step) => console.log("step", step)}
      onPrevious={(step) => console.log("prev", step)}
      onNext={(step) => console.log("next", step)}
    />
  );
}
`;
}

export function dynamicStepperVerticalSnippet(): string {
  return `import { DynamicStepper } from "@zentauri-ui/zentauri-components/ui/dynamic-stepper";

const steps = ${stepsSnippet};

export function Example() {
  return (
    <DynamicStepper steps={steps} orientation="vertical" buttonAppearance="outline" />
  );
}
`;
}

export function dynamicStepperAppearanceSnippet(
  appearance: "default" | "ghost" | "secondary",
): string {
  return `import { DynamicStepper } from "@zentauri-ui/zentauri-components/ui/dynamic-stepper";

const steps = ${stepsSnippet};

export function Example() {
  return (
    <DynamicStepper steps={steps} buttonAppearance="${appearance}" defaultActiveStep={0} />
  );
}
`;
}

export function dynamicStepperSizesSnippet(): string {
  return `import { DynamicStepper } from "@zentauri-ui/zentauri-components/ui/dynamic-stepper";

const steps = ${stepsSnippet};

export function Example() {
  return (
    <DynamicStepper
      steps={steps}
      buttonAppearance="outline"
      buttonSize="sm"
      indicatorSize="lg"
      defaultActiveStep={0}
    />
  );
}
`;
}

export function dynamicStepperIdsSnippet(): string {
  return `/* Tailwind: targets rely on React useId() — suffixes are stable per mount. */
[id$="-previous"] { /* Previous Button */ }
[id$="-next"] { /* Next Button */ }
[id$="-mapper"] { /* Ordered step list */ }

/* Or use data-slot: */
[data-slot="dynamic-stepper-previous"] { }
[data-slot="dynamic-stepper-next"] { }
[data-slot="dynamic-stepper-mapper"] { }
`;
}

export function dynamicStepperIndicatorTonesSnippet(): string {
  return `import { DynamicStepper } from "@zentauri-ui/zentauri-components/ui/dynamic-stepper";

const steps = ${stepsSnippet};

export function Example() {
  return (
    <DynamicStepper
      steps={steps}
      defaultActiveStep={1}
      buttonAppearance="outline"
      indicatorCompleteAppearance="sky"
      indicatorCurrentAppearance="rose"
      indicatorUpcomingAppearance="amber"
    />
  );
}
`;
}
