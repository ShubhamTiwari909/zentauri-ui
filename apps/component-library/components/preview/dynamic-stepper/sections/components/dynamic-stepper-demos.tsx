"use client";

import { useState } from "react";

import { DynamicStepper } from "@zentauri-ui/zentauri-components/ui/dynamic-stepper";

import { DEMO_STEPS_FOR_PREVIEW } from "./dynamic-stepper-demo-data";

export function DynamicStepperUncontrolledDemo() {
  return (
    <DynamicStepper
      steps={DEMO_STEPS_FOR_PREVIEW}
      defaultActiveStep={1}
      buttonAppearance="outline"
    />
  );
}

export function DynamicStepperControlledDemo() {
  const [activeStep, setActiveStep] = useState(0);
  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-400">
        Controlled index:{" "}
        <span className="font-mono text-white">{activeStep}</span>
      </p>
      <DynamicStepper
        steps={DEMO_STEPS_FOR_PREVIEW}
        activeStep={activeStep}
        onActiveStepChange={setActiveStep}
        buttonAppearance="outline"
      />
    </div>
  );
}

export function DynamicStepperCallbacksDemo() {
  const [log, setLog] = useState<string[]>([]);
  const push = (line: string) => {
    setLog((prev) => [line, ...prev].slice(0, 6));
  };
  return (
    <div className="space-y-3">
      <DynamicStepper
        steps={DEMO_STEPS_FOR_PREVIEW}
        defaultActiveStep={0}
        buttonAppearance="outline"
        onActiveStepChange={(step: number) =>
          push(`onActiveStepChange → ${step}`)
        }
        onPrevious={(step: number) => push(`onPrevious → ${step}`)}
        onNext={(step: number) => push(`onNext → ${step}`)}
      />
      <div className="rounded-lg border border-white/10 bg-slate-950/60 p-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Recent callbacks
        </p>
        <ul className="mt-2 space-y-1 font-mono text-xs text-slate-300">
          {log.length === 0 ? (
            <li className="text-slate-500">Use Previous / Next…</li>
          ) : (
            log.map((line, index) => (
              <li key={`${index}-${line}`}>{line}</li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export function DynamicStepperVerticalDemo() {
  return (
    <div className="max-w-md">
      <DynamicStepper
        steps={DEMO_STEPS_FOR_PREVIEW}
        orientation="vertical"
        buttonAppearance="outline"
      />
    </div>
  );
}

export function DynamicStepperAppearanceDemo({
  appearance,
}: {
  appearance: "default" | "ghost" | "secondary";
}) {
  return (
    <DynamicStepper
      steps={DEMO_STEPS_FOR_PREVIEW}
      buttonAppearance={appearance}
      defaultActiveStep={0}
    />
  );
}

export function DynamicStepperSizesDemo() {
  return (
    <DynamicStepper
      steps={DEMO_STEPS_FOR_PREVIEW}
      buttonSize="sm"
      indicatorSize="lg"
      buttonAppearance="outline"
      defaultActiveStep={0}
    />
  );
}

export function DynamicStepperIndicatorTonesDemo() {
  return (
    <DynamicStepper
      steps={DEMO_STEPS_FOR_PREVIEW}
      defaultActiveStep={1}
      buttonAppearance="sky"
      indicatorCompleteAppearance="teal"
      indicatorCurrentAppearance="rose"
      indicatorUpcomingAppearance="amber"
    />
  );
}
