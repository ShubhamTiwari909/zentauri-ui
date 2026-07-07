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

import { TIMEZONE_SELECT_APPEARANCES, TIMEZONE_SELECT_SIZES } from "./data";
import { TimezoneSelectDemo } from "./demo";
import { timezoneSelectSnippet } from "./snippets";
import type { TimezoneSelectAppearance, TimezoneSelectSize } from "./types";

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

export function TimezoneSelectPlayground() {
  const [appearance, setAppearance] =
    useState<TimezoneSelectAppearance>("default");
  const [size, setSize] = useState<TimezoneSelectSize>("md");
  const [showTime, setShowTime] = useState(true);
  const [showOffset, setShowOffset] = useState(true);
  const [groupByRegion, setGroupByRegion] = useState(true);

  const code = timezoneSelectSnippet({
    appearance,
    size,
    showTime,
    showOffset,
    groupByRegion,
  });

  return (
    <div className="mt-6 rounded-xl">
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <VariantSelect
          label="Appearance"
          value={appearance}
          options={TIMEZONE_SELECT_APPEARANCES}
          onChange={setAppearance}
        />
        <VariantSelect
          label="Size"
          value={size}
          options={TIMEZONE_SELECT_SIZES}
          onChange={setSize}
        />
        <ToggleControl
          label="Show time"
          pressed={showTime}
          onChange={setShowTime}
        />
        <ToggleControl
          label="Show offset"
          pressed={showOffset}
          onChange={setShowOffset}
        />
        <ToggleControl
          label="Group by region"
          pressed={groupByRegion}
          onChange={setGroupByRegion}
        />
      </div>
      <PreviewCodeShowcase code={code}>
        <TimezoneSelectDemo
          appearance={appearance}
          size={size}
          showTime={showTime}
          showOffset={showOffset}
          groupByRegion={groupByRegion}
        />
      </PreviewCodeShowcase>
    </div>
  );
}
