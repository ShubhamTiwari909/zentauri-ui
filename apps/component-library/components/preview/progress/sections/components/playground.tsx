"use client";

import { useState } from "react";

import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { Progress } from "@zentauri-ui/zentauri-components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@zentauri-ui/zentauri-components/ui/select";

import { ProgressDemo } from "./demo";
import { ProgressControlledDemo } from "./controlled";
import { PROGRESS_APPEARANCES, PROGRESS_SHAPES, PROGRESS_SIZES } from "./data";
import { progressSnippet } from "./snippets";
import type { ProgressAppearance, ProgressShape, ProgressSize } from "./types";

const BOOLEAN_OPTIONS = ["off", "on"] as const;
type BooleanOption = (typeof BOOLEAN_OPTIONS)[number];

const toBooleanOption = (value: boolean): BooleanOption =>
  value ? "on" : "off";

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

type AppearanceGalleryProps = {
  selected: ProgressAppearance;
  onSelect: (appearance: ProgressAppearance) => void;
};

function AppearanceGallery({ selected, onSelect }: AppearanceGalleryProps) {
  return (
    <div className="mt-12">
      <p className="text-sm font-semibold text-slate-900 dark:text-white">
        All appearances
      </p>
      <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-600 dark:text-slate-400">
        Every shipped appearance token at a glance. Click any swatch to load it
        into the playground above.
      </p>
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {PROGRESS_APPEARANCES.map((appearance) => {
          const isActive = appearance === selected;
          return (
            <button
              key={appearance}
              type="button"
              aria-pressed={isActive}
              onClick={() => onSelect(appearance)}
              className={`rounded-xl p-3 text-left transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                isActive
                  ? "ring-2 ring-sky-500 ring-offset-2 ring-offset-white dark:ring-offset-slate-950"
                  : "ring-1 ring-slate-200 hover:ring-slate-300 dark:ring-white/10 dark:hover:ring-white/20"
              }`}
            >
              {/* Visual only — pointer events go to the wrapping button so the
                  swatch selects rather than interacting with the progress bar. */}
              <div className="pointer-events-none">
                <p className="mb-2 text-xs font-medium text-slate-900 dark:text-slate-200">
                  {appearance}
                </p>
                <Progress appearance={appearance} size="md" value={42} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function ProgressPlayground() {
  const [appearance, setAppearance] = useState<ProgressAppearance>("default");
  const [size, setSize] = useState<ProgressSize>("md");
  const [shape, setShape] = useState<ProgressShape>("rounded");
  const [striped, setStriped] = useState(false);
  const [animated, setAnimated] = useState(false);

  const props = { appearance, size, shape, striped, animated };
  const code = progressSnippet(props);

  return (
    <div className="mt-6 rounded-xl">
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <VariantSelect
          label="Appearance"
          value={appearance}
          options={PROGRESS_APPEARANCES}
          onChange={setAppearance}
        />
        <VariantSelect
          label="Size"
          value={size}
          options={PROGRESS_SIZES}
          onChange={setSize}
        />
        <VariantSelect
          label="Shape"
          value={shape}
          options={PROGRESS_SHAPES}
          onChange={setShape}
        />
        <VariantSelect
          label="Striped"
          value={toBooleanOption(striped)}
          options={BOOLEAN_OPTIONS}
          onChange={(value) => setStriped(value === "on")}
        />
        <VariantSelect
          label="Animated"
          value={toBooleanOption(animated)}
          options={BOOLEAN_OPTIONS}
          onChange={(value) => setAnimated(value === "on")}
        />
      </div>
      <PreviewCodeShowcase code={code}>
        <ProgressDemo {...props} />
      </PreviewCodeShowcase>
      <AppearanceGallery selected={appearance} onSelect={setAppearance} />
      <div className="mt-10">
        <p className="text-sm font-semibold text-slate-900 dark:text-white">
          Controlled value
        </p>
        <p className="mt-1 mb-4 max-w-2xl text-xs leading-5 text-slate-600 dark:text-slate-400">
          A live example driving the value from state, using the currently
          selected appearance, size, and shape.
        </p>
        <PreviewCodeShowcase
          code={progressSnippet({ ...props, animated: true })}
        >
          <ProgressControlledDemo {...props} />
        </PreviewCodeShowcase>
      </div>
    </div>
  );
}
