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

import { RELATIVE_TIME_APPEARANCES, RELATIVE_TIME_SIZES } from "./data";
import { RelativeTimeDemo } from "./demo";
import { relativeTimeSnippet } from "./snippets";
import type { RelativeTimeAppearance, RelativeTimeSize } from "./types";

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

export function RelativeTimePlayground() {
  const [appearance, setAppearance] =
    useState<RelativeTimeAppearance>("default");
  const [size, setSize] = useState<RelativeTimeSize>("md");
  const [live, setLive] = useState(false);

  const code = relativeTimeSnippet({ appearance, size, live });

  return (
    <div className="mt-6 rounded-xl">
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <VariantSelect
          label="Appearance"
          value={appearance}
          options={RELATIVE_TIME_APPEARANCES}
          onChange={setAppearance}
        />
        <VariantSelect
          label="Size"
          value={size}
          options={RELATIVE_TIME_SIZES}
          onChange={setSize}
        />
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-slate-900 dark:text-white">
            Live ticking
          </span>
          <button
            type="button"
            aria-pressed={live}
            onClick={() => setLive(!live)}
            className={`rounded-xl border px-4 py-2 text-sm transition-colors ${
              live
                ? "border-sky-500 bg-sky-500/10 text-sky-300"
                : "border-slate-300 bg-white text-slate-600 dark:border-white/10 dark:bg-transparent dark:text-slate-400"
            }`}
          >
            {live ? "On" : "Off"}
          </button>
        </label>
      </div>
      <PreviewCodeShowcase code={code}>
        <RelativeTimeDemo appearance={appearance} size={size} live={live} />
      </PreviewCodeShowcase>
    </div>
  );
}
