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
import {
  Toast,
  ToastDescription,
  ToastTitle,
} from "@zentauri-ui/zentauri-components/ui/toast";

import { ToastVariantDemo } from "./demo";
import { TOAST_APPEARANCES, TOAST_SIZES } from "./data";
import { toastCallSnippet } from "./snippets";
import type { ToastDemoAppearance, ToastDemoSize } from "./types";

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
  selected: ToastDemoAppearance;
  onSelect: (appearance: ToastDemoAppearance) => void;
};

function AppearanceGallery({ selected, onSelect }: AppearanceGalleryProps) {
  const handleKeyDown =
    (appearance: ToastDemoAppearance) =>
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
    (appearance: ToastDemoAppearance) =>
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
        {TOAST_APPEARANCES.map((appearance) => {
          const isActive = appearance === selected;
          return (
            <div
              key={appearance}
              role="button"
              tabIndex={0}
              aria-pressed={isActive}
              aria-label={appearance}
              onClick={() => onSelect(appearance)}
              onKeyDown={handleKeyDown(appearance)}
              onKeyUp={handleKeyUp(appearance)}
              className={`rounded-xl p-3 text-left transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                isActive
                  ? "ring-2 ring-sky-500 ring-offset-2 ring-offset-white dark:ring-offset-slate-950"
                  : "ring-1 ring-slate-200 hover:ring-slate-300 dark:ring-white/10 dark:hover:ring-white/20"
              }`}
            >
              <div className="pointer-events-none" inert>
                <Toast
                  toastId={`gallery-${appearance}`}
                  appearance={appearance}
                  size="sm"
                  className="min-h-20 w-full space-y-2"
                >
                  <ToastTitle>{appearance}</ToastTitle>
                  <ToastDescription>Sample notification.</ToastDescription>
                </Toast>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ToastPlayground() {
  const [appearance, setAppearance] = useState<ToastDemoAppearance>("info");
  const [size, setSize] = useState<ToastDemoSize>("md");

  const code = toastCallSnippet({ appearance, size });

  return (
    <div className="mt-6 rounded-xl">
      <div className="mb-6 grid grid-cols-2 gap-4">
        <VariantSelect
          label="Appearance"
          value={appearance}
          options={TOAST_APPEARANCES}
          onChange={setAppearance}
        />
        <VariantSelect
          label="Size"
          value={size}
          options={TOAST_SIZES}
          onChange={setSize}
        />
      </div>
      <PreviewCodeShowcase code={code}>
        <ToastVariantDemo appearance={appearance} size={size} />
      </PreviewCodeShowcase>
      <AppearanceGallery selected={appearance} onSelect={setAppearance} />
    </div>
  );
}
