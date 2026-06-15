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

import { SliderRangeDemo, SliderSingleDemo } from "./demo";
import { SLIDER_APPEARANCES } from "./data";
import { sliderRangeSnippet, sliderSingleSnippet } from "./snippets";
import type { SliderSnippetAppearance } from "./types";

const SLIDER_KINDS = ["single", "range"] as const;
type SliderKind = (typeof SLIDER_KINDS)[number];

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
  selected: SliderSnippetAppearance;
  onSelect: (appearance: SliderSnippetAppearance) => void;
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
        {SLIDER_APPEARANCES.map((appearance) => {
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
              <p className="mb-3 text-xs font-semibold text-slate-900 dark:text-white">
                {appearance}
              </p>
              {/* Visual only — pointer events go to the wrapping button so the
                  swatch selects rather than dragging the slider. */}
              <div className="pointer-events-none">
                <SliderSingleDemo appearance={appearance} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function SliderPlayground() {
  const [kind, setKind] = useState<SliderKind>("single");
  const [appearance, setAppearance] =
    useState<SliderSnippetAppearance>("default");

  const code =
    kind === "single"
      ? sliderSingleSnippet(appearance)
      : sliderRangeSnippet(appearance);

  const demo =
    kind === "single" ? (
      <SliderSingleDemo appearance={appearance} />
    ) : (
      <SliderRangeDemo appearance={appearance} />
    );

  return (
    <div className="mt-6 rounded-xl">
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <VariantSelect
          label="Kind"
          value={kind}
          options={SLIDER_KINDS}
          onChange={setKind}
        />
        <VariantSelect
          label="Appearance"
          value={appearance}
          options={SLIDER_APPEARANCES}
          onChange={setAppearance}
        />
      </div>
      <PreviewCodeShowcase code={code}>{demo}</PreviewCodeShowcase>
      <AppearanceGallery selected={appearance} onSelect={setAppearance} />
    </div>
  );
}
