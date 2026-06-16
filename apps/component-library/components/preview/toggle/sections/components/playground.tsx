"use client";

import { useState } from "react";
import type { KeyboardEvent } from "react";

import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@zentauri-ui/zentauri-components/ui/select";

import { TOGGLE_APPEARANCES, TOGGLE_SIZES, TOGGLE_THUMB_COLORS } from "./data";
import { ToggleDemo } from "./demo";
import { toggleSnippet } from "./snippets";
import type { ToggleAppearance, ToggleDemoProps, ToggleSize } from "./types";

type ToggleThumbColor = NonNullable<ToggleDemoProps["thumbColor"]>;

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

type AppearanceGalleryProps = {
  selected: ToggleAppearance;
  onSelect: (appearance: ToggleAppearance) => void;
};

function AppearanceGallery({ selected, onSelect }: AppearanceGalleryProps) {
  const handleKeyDown =
    (appearance: ToggleAppearance) =>
    (event: KeyboardEvent<HTMLDivElement>) => {
      // Enter activates on keydown; Space activates on keyup to match the
      // native button / WAI-ARIA button pattern (allows cancel-by-move).
      if (event.key === "Enter") {
        event.preventDefault();
        onSelect(appearance);
      } else if (event.key === " ") {
        event.preventDefault();
      }
    };

  const handleKeyUp =
    (appearance: ToggleAppearance) =>
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === " ") {
        event.preventDefault();
        onSelect(appearance);
      }
    };

  return (
    <div className="mt-12">
      <p className="text-sm font-semibold text-slate-900 dark:text-white">
        All appearances
      </p>
      <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-600 dark:text-slate-400">
        Every shipped appearance token at a glance. Click any swatch to load it
        into the playground above.
      </p>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {TOGGLE_APPEARANCES.map((itemAppearance) => {
          const isActive = itemAppearance === selected;
          return (
            <div
              key={itemAppearance}
              role="button"
              tabIndex={0}
              aria-pressed={isActive}
              onClick={() => onSelect(itemAppearance)}
              onKeyDown={handleKeyDown(itemAppearance)}
              onKeyUp={handleKeyUp(itemAppearance)}
              className={`rounded-xl p-3 text-left transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                isActive
                  ? "ring-2 ring-sky-500 ring-offset-2 ring-offset-white dark:ring-offset-slate-950"
                  : "ring-1 ring-slate-200 hover:ring-slate-300 dark:ring-white/10 dark:hover:ring-white/20"
              }`}
            >
              <span className="mb-2 block wrap-break-word text-xs text-slate-600 dark:text-slate-400">
                {itemAppearance}
              </span>
              <div className="pointer-events-none" inert>
                <ToggleDemo
                  appearance={itemAppearance}
                  size="md"
                  thumbColor="default"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function TogglePlayground() {
  const [appearance, setAppearance] = useState<ToggleAppearance>("default");
  const [size, setSize] = useState<ToggleSize>("md");
  const [thumbColor, setThumbColor] = useState<ToggleThumbColor>("default");

  const code = toggleSnippet({ appearance, size, thumbColor });

  return (
    <div className="mt-6 rounded-xl">
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <VariantSelect
          label="Appearance"
          value={appearance}
          options={TOGGLE_APPEARANCES}
          onChange={setAppearance}
        />
        <VariantSelect
          label="Size"
          value={size}
          options={TOGGLE_SIZES}
          onChange={setSize}
        />
        <VariantSelect
          label="Thumb color"
          value={thumbColor}
          options={TOGGLE_THUMB_COLORS}
          onChange={setThumbColor}
        />
      </div>
      <PreviewCodeShowcase code={code}>
        <ToggleDemo
          appearance={appearance}
          size={size}
          thumbColor={thumbColor}
        />
      </PreviewCodeShowcase>
      <AppearanceGallery selected={appearance} onSelect={setAppearance} />
    </div>
  );
}
