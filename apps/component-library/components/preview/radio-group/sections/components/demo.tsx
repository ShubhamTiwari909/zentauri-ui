"use client";

import { useState } from "react";
import {
  RadioGroup,
  RadioGroupItem,
} from "@zentauri-ui/zentauri-components/ui/radio-group";

import type { RadioGroupDemoProps } from "./types";

const options = ["Starter", "Pro", "Enterprise"] as const;

export function RadioGroupDemoControlled({
  appearance,
  size,
  orientation,
}: RadioGroupDemoProps) {
  const [value, setValue] = useState("pro");

  return (
    <>
      <p className="mb-5 text-xs font-semibold text-slate-900 dark:text-white md:text-sm">
        Value: {value}
      </p>
      <RadioGroup
        appearance={appearance}
        size={size}
        orientation={orientation}
        value={value}
        onValueChange={setValue}
        aria-label={`${appearance} plan selector`}
      >
        {options.map((option) => (
          <RadioGroupItem key={option} value={option.toLowerCase()}>
            {option}
          </RadioGroupItem>
        ))}
      </RadioGroup>
    </>
  );
}

export function RadioGroupDemoUnControlled({
  appearance,
  size,
  orientation,
}: RadioGroupDemoProps) {
  return (
    <RadioGroup
      appearance={appearance}
      size={size}
      orientation={orientation}
      defaultValue="pro"
      aria-label={`${appearance} plan selector`}
    >
      {options.map((option) => (
        <RadioGroupItem key={option} value={option.toLowerCase()}>
          {option}
        </RadioGroupItem>
      ))}
    </RadioGroup>
  );
}
