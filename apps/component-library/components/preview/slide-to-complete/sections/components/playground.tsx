"use client";

import { useState } from "react";

import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { SlideToComplete } from "@zentauri-ui/zentauri-components/ui/slide-to-complete";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@zentauri-ui/zentauri-components/ui/select";

import { SlideToCompleteDemo } from "./demo";
import {
  SLIDE_TO_COMPLETE_APPEARANCES,
  SLIDE_TO_COMPLETE_SIZES,
  SLIDE_TO_COMPLETE_THRESHOLDS,
} from "./data";
import { slideToCompleteSnippet } from "./snippets";
import type {
  SlideToCompleteAppearance,
  SlideToCompleteDemoProps,
  SlideToCompleteSizeOption,
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

type ToggleChipProps = {
  label: string;
  active: boolean;
  onToggle: () => void;
};

function ToggleChip({ label, active, onToggle }: ToggleChipProps) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold text-slate-900 dark:text-white">
        {label}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={active}
        onClick={onToggle}
        className={`flex h-9 items-center justify-center rounded-lg border px-3 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
          active
            ? "border-sky-500 bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300"
            : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-white/10 dark:bg-white/5 dark:text-slate-400 dark:hover:border-white/20"
        }`}
      >
        {active ? "on" : "off"}
      </button>
    </label>
  );
}

type AppearanceGalleryProps = {
  selected: SlideToCompleteAppearance;
  onSelect: (appearance: SlideToCompleteAppearance) => void;
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
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {SLIDE_TO_COMPLETE_APPEARANCES.map((appearance) => {
          const isActive = appearance === selected;
          return (
            // A native <button> can't be used here since SlideToComplete
            // renders its own <button> thumb, and <button> cannot nest
            // inside <button> in HTML.
            <div
              key={appearance}
              role="button"
              tabIndex={0}
              aria-pressed={isActive}
              onClick={() => onSelect(appearance)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onSelect(appearance);
                }
              }}
              className={`flex cursor-pointer flex-col gap-2 rounded-xl p-3 text-left transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                isActive
                  ? "ring-2 ring-sky-500 ring-offset-2 ring-offset-white dark:ring-offset-slate-950"
                  : "ring-1 ring-slate-200 hover:ring-slate-300 dark:ring-white/10 dark:hover:ring-white/20"
              }`}
            >
              <span className="text-xs text-slate-600 dark:text-slate-400">
                {appearance}
              </span>
              {/* inert removes the nested thumb button from the tab order and
                  click/keyboard handling entirely, so only the tile itself
                  (not the live SlideToComplete it previews) is interactive. */}
              <div className="pointer-events-none" inert>
                <SlideToComplete appearance={appearance} size="sm" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function SlideToCompletePlayground() {
  const [appearance, setAppearance] =
    useState<SlideToCompleteAppearance>("default");
  const [size, setSize] = useState<SlideToCompleteSizeOption>("md");
  const [threshold, setThreshold] = useState<string>("0.9");
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const demoProps: SlideToCompleteDemoProps = {
    appearance,
    size,
    threshold: Number(threshold),
    disabled,
    loading,
  };

  const code = slideToCompleteSnippet(demoProps);

  return (
    <div className="mt-6 rounded-xl">
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-5">
        <VariantSelect
          label="Appearance"
          value={appearance}
          options={SLIDE_TO_COMPLETE_APPEARANCES}
          onChange={setAppearance}
        />
        <VariantSelect
          label="Size"
          value={size}
          options={SLIDE_TO_COMPLETE_SIZES}
          onChange={setSize}
        />
        <VariantSelect
          label="Threshold"
          value={threshold}
          options={SLIDE_TO_COMPLETE_THRESHOLDS}
          onChange={setThreshold}
        />
        <ToggleChip
          label="Disabled"
          active={disabled}
          onToggle={() => setDisabled((value) => !value)}
        />
        <ToggleChip
          label="Loading"
          active={loading}
          onToggle={() => setLoading((value) => !value)}
        />
      </div>
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Drag the thumb to the end, or focus it and press Enter / Space.
        </p>
        <button
          type="button"
          onClick={() => setResetKey((value) => value + 1)}
          className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:border-slate-300 dark:border-white/10 dark:text-slate-300 dark:hover:border-white/20"
        >
          Reset demo
        </button>
      </div>
      <PreviewCodeShowcase code={code}>
        <SlideToCompleteDemo key={resetKey} {...demoProps} />
      </PreviewCodeShowcase>
      <AppearanceGallery selected={appearance} onSelect={setAppearance} />
    </div>
  );
}
