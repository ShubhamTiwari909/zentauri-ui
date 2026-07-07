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

import {
  WORLD_CLOCK_APPEARANCES,
  WORLD_CLOCK_LAYOUTS,
  WORLD_CLOCK_SIZES,
} from "./data";
import { WorldClockDemo } from "./demo";
import { worldClockSnippet } from "./snippets";
import type {
  WorldClockAppearance,
  WorldClockLayout,
  WorldClockSize,
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
          if (next) onChange(next as T);
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

function ToggleControl({
  label,
  pressed,
  onChange,
}: {
  label: string;
  pressed: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold text-slate-900 dark:text-white">
        {label}
      </span>
      <button
        type="button"
        aria-pressed={pressed}
        onClick={() => onChange(!pressed)}
        className={`rounded-xl border px-4 py-2 text-sm transition-colors ${
          pressed
            ? "border-sky-500 bg-sky-500/10 text-sky-300"
            : "border-slate-300 bg-white text-slate-600 dark:border-white/10 dark:bg-transparent dark:text-slate-400"
        }`}
      >
        {pressed ? "On" : "Off"}
      </button>
    </label>
  );
}

export function WorldClockPlayground() {
  const [cardAppearance, setCardAppearance] =
    useState<WorldClockAppearance>("default");
  const [cardSize, setCardSize] = useState<WorldClockSize>("md");
  const [layout, setLayout] = useState<WorldClockLayout>("grid");
  const [showDate, setShowDate] = useState(true);
  const [showSeconds, setShowSeconds] = useState(false);
  const [showDayNight, setShowDayNight] = useState(true);
  const [showOffsetFromLocal, setShowOffsetFromLocal] = useState(true);

  const code = worldClockSnippet({
    cardAppearance,
    cardSize,
    layout,
    showDate,
    showSeconds,
    showDayNight,
    showOffsetFromLocal,
  });

  return (
    <div className="mt-6 rounded-xl">
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <VariantSelect
          label="Card appearance"
          value={cardAppearance}
          options={WORLD_CLOCK_APPEARANCES}
          onChange={setCardAppearance}
        />
        <VariantSelect
          label="Card size"
          value={cardSize}
          options={WORLD_CLOCK_SIZES}
          onChange={setCardSize}
        />
        <VariantSelect
          label="Layout"
          value={layout}
          options={WORLD_CLOCK_LAYOUTS}
          onChange={setLayout}
        />
        <ToggleControl
          label="Show seconds"
          pressed={showSeconds}
          onChange={setShowSeconds}
        />
        <ToggleControl
          label="Show date"
          pressed={showDate}
          onChange={setShowDate}
        />
        <ToggleControl
          label="Show day/night"
          pressed={showDayNight}
          onChange={setShowDayNight}
        />
        <ToggleControl
          label="Show offset"
          pressed={showOffsetFromLocal}
          onChange={setShowOffsetFromLocal}
        />
      </div>
      <PreviewCodeShowcase code={code}>
        <WorldClockDemo
          cardAppearance={cardAppearance}
          cardSize={cardSize}
          layout={layout}
          showDate={showDate}
          showSeconds={showSeconds}
          showDayNight={showDayNight}
          showOffsetFromLocal={showOffsetFromLocal}
        />
      </PreviewCodeShowcase>
    </div>
  );
}
