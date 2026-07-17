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
import type { CalendarAnimation } from "@zentauri-ui/zentauri-components/ui/calendar/animated";

import { CalendarDemo } from "./demo";
import {
  CALENDAR_ANIMATIONS,
  CALENDAR_APPEARANCES,
  CALENDAR_CAPTION_LAYOUTS,
  CALENDAR_MODES,
  CALENDAR_SIZES,
} from "./data";
import { calendarSnippet } from "./snippets";
import type {
  CalendarAppearance,
  CalendarCaptionLayout,
  CalendarDemoProps,
  CalendarMode,
  CalendarSize,
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

export function CalendarPlayground() {
  const [mode, setMode] = useState<CalendarMode>("single");
  const [appearance, setAppearance] = useState<CalendarAppearance>("default");
  const [size, setSize] = useState<CalendarSize>("md");
  const [captionLayout, setCaptionLayout] =
    useState<CalendarCaptionLayout>("label");
  const [weekNumbers, setWeekNumbers] = useState<"off" | "on">("off");
  const [animation, setAnimation] = useState<CalendarAnimation>("none");

  const demoProps: CalendarDemoProps = {
    mode,
    appearance,
    size,
    captionLayout,
    showWeekNumbers: weekNumbers === "on",
    animation,
  };

  const code = calendarSnippet(demoProps);

  return (
    <div className="mt-6 rounded-xl">
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        <VariantSelect
          label="Mode"
          value={mode}
          options={CALENDAR_MODES}
          onChange={setMode}
        />
        <VariantSelect
          label="Appearance"
          value={appearance}
          options={CALENDAR_APPEARANCES}
          onChange={setAppearance}
        />
        <VariantSelect
          label="Size"
          value={size}
          options={CALENDAR_SIZES}
          onChange={setSize}
        />
        <VariantSelect
          label="Caption"
          value={captionLayout}
          options={CALENDAR_CAPTION_LAYOUTS}
          onChange={setCaptionLayout}
        />
        <VariantSelect
          label="Week numbers"
          value={weekNumbers}
          options={["off", "on"] as const}
          onChange={setWeekNumbers}
        />
        <VariantSelect
          label="Animation"
          value={animation}
          options={CALENDAR_ANIMATIONS}
          onChange={setAnimation}
        />
      </div>
      <PreviewCodeShowcase code={code}>
        <CalendarDemo {...demoProps} />
      </PreviewCodeShowcase>
    </div>
  );
}
