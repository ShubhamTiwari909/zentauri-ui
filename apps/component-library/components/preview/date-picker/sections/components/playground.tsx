"use client";

import { useState } from "react";

import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@zentauri-ui/zentauri-components/ui/select";
import type { DatePickerAnimation } from "@zentauri-ui/zentauri-components/ui/date-picker/animated";

import { DatePickerDemo } from "./demo";
import {
  DATE_PICKER_ANIMATIONS,
  DATE_PICKER_APPEARANCES,
  DATE_PICKER_MODES,
  DATE_PICKER_SIZES,
} from "./data";
import { datePickerSnippet } from "./snippets";
import type {
  DatePickerAppearance,
  DatePickerDemoProps,
  DatePickerMode,
  DatePickerSize,
} from "./types";

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

export function DatePickerPlayground() {
  const [mode, setMode] = useState<DatePickerMode>("single");
  const [appearance, setAppearance] = useState<DatePickerAppearance>("default");
  const [size, setSize] = useState<DatePickerSize>("md");
  const [clearable, setClearable] = useState<"off" | "on">("off");
  const [animation, setAnimation] = useState<DatePickerAnimation>("none");

  const demoProps: DatePickerDemoProps = {
    mode,
    appearance,
    size,
    clearable: clearable === "on",
    animation,
  };

  const code = datePickerSnippet(demoProps);

  return (
    <div className="mt-6 rounded-xl">
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-5">
        <VariantSelect
          label="Mode"
          value={mode}
          options={DATE_PICKER_MODES}
          onChange={setMode}
        />
        <VariantSelect
          label="Appearance"
          value={appearance}
          options={DATE_PICKER_APPEARANCES}
          onChange={setAppearance}
        />
        <VariantSelect
          label="Size"
          value={size}
          options={DATE_PICKER_SIZES}
          onChange={setSize}
        />
        <VariantSelect
          label="Clearable"
          value={clearable}
          options={["off", "on"] as const}
          onChange={setClearable}
        />
        <VariantSelect
          label="Animation"
          value={animation}
          options={DATE_PICKER_ANIMATIONS}
          onChange={setAnimation}
        />
      </div>
      <PreviewCodeShowcase code={code}>
        <DatePickerDemo {...demoProps} />
      </PreviewCodeShowcase>
    </div>
  );
}
