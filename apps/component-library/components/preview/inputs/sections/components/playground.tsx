"use client";

import { useState } from "react";

import { variantLeadComment } from "@/components/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { InputAnimated } from "@zentauri-ui/zentauri-components/ui/inputs/animated";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@zentauri-ui/zentauri-components/ui/select";
import type { InputAnimation } from "@zentauri-ui/zentauri-components/ui/inputs/animated";

import { animationPresets, appearanceInputsExtended, sizeInputs } from "./data";

const INPUT_APPEARANCES = appearanceInputsExtended.map(
  (row) => row.appearance,
) as readonly InputAppearance[];
const INPUT_SIZES = sizeInputs.map((row) => row.size) as readonly InputSize[];
const INPUT_ANIMATIONS = animationPresets.map(
  (preset) => preset[1],
) as readonly InputAnimation[];
const RING_OPTIONS = ["on", "off"] as const;

type InputAppearance = (typeof appearanceInputsExtended)[number]["appearance"];
type InputSize = (typeof sizeInputs)[number]["size"];
type RingOption = (typeof RING_OPTIONS)[number];

type VariantSelectProps<T extends string> = {
  label: string;
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
};

function VariantSelect<T extends string>({
  label,
  value,
  options,
  onChange,
}: VariantSelectProps<T>) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold text-slate-900 dark:text-white">
        {label}
      </span>
      <Select
        multiple={false}
        value={[value]}
        onChange={(values) => {
          const next = values[0];
          if (next) {
            onChange(next as T);
          }
        }}
      >
        <SelectTrigger variant="outline" size="sm" className="w-full">
          {/* options register lazily on open, so the placeholder doubles as the
              current value (option label === value) until then. */}
          <SelectValue placeholder={value} />
        </SelectTrigger>
        <SelectContent
          appearance="default"
          size="sm"
          className="max-h-72 overflow-y-auto"
        >
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </label>
  );
}

function inputPlaygroundSnippet(
  appearance: InputAppearance,
  size: InputSize,
  animation: InputAnimation,
  ring: RingOption,
): string {
  const appearanceProp =
    appearance === "default" ? "" : ` appearance="${appearance}"`;
  const ringProp = ring === "off" ? " ring={false}" : "";
  return `${variantLeadComment(
    `appearance · ${appearance}, size · ${size}, animation · ${animation}, ring · ${ring === "on"}`,
  )}<InputAnimated${appearanceProp} size="${size}" animation="${animation}"${ringProp} placeholder="Playground field" aria-label="Playground field" className="w-full" />`;
}

export function InputsPlayground() {
  const [appearance, setAppearance] = useState<InputAppearance>("default");
  const [size, setSize] = useState<InputSize>("md");
  const [animation, setAnimation] = useState<InputAnimation>("glow");
  const [ring, setRing] = useState<RingOption>("on");

  const code = inputPlaygroundSnippet(appearance, size, animation, ring);

  return (
    <div className="mt-6 rounded-xl">
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <VariantSelect
          label="Appearance"
          value={appearance}
          options={INPUT_APPEARANCES}
          onChange={setAppearance}
        />
        <VariantSelect
          label="Size"
          value={size}
          options={INPUT_SIZES}
          onChange={setSize}
        />
        <VariantSelect
          label="Animation"
          value={animation}
          options={INPUT_ANIMATIONS}
          onChange={setAnimation}
        />
        <VariantSelect
          label="Ring"
          value={ring}
          options={RING_OPTIONS}
          onChange={setRing}
        />
      </div>
      <PreviewCodeShowcase code={code}>
        <InputAnimated
          appearance={appearance === "default" ? undefined : appearance}
          size={size}
          animation={animation}
          ring={ring === "on"}
          placeholder="Playground field"
          aria-label="Playground field"
          className="w-full"
        />
      </PreviewCodeShowcase>
    </div>
  );
}
