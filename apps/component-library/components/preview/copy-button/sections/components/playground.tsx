"use client";

import { useState } from "react";

import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { CopyButton } from "@zentauri-ui/zentauri-components/ui/copy-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@zentauri-ui/zentauri-components/ui/select";

import { CopyButtonDemo } from "./demo";
import { COPY_BUTTON_APPEARANCES, COPY_BUTTON_SIZES } from "./data";
import { copyButtonSnippet } from "./snippets";
import type { CopyButtonDemoProps } from "./types";

type CopyButtonAppearance = CopyButtonDemoProps["appearance"];
type CopyButtonSize = CopyButtonDemoProps["size"];

const ICON_ONLY_OPTIONS = ["off", "on"] as const;
type IconOnlyOption = (typeof ICON_ONLY_OPTIONS)[number];

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
  selected: CopyButtonAppearance;
  onSelect: (appearance: CopyButtonAppearance) => void;
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
        {COPY_BUTTON_APPEARANCES.map((appearance) => {
          const isActive = appearance === selected;
          return (
            <button
              key={appearance}
              type="button"
              aria-pressed={isActive}
              onClick={() => onSelect(appearance)}
              className={`flex items-center gap-3 rounded-xl p-3 text-left transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                isActive
                  ? "ring-2 ring-sky-500 ring-offset-2 ring-offset-white dark:ring-offset-slate-950"
                  : "ring-1 ring-slate-200 hover:ring-slate-300 dark:ring-white/10 dark:hover:ring-white/20"
              }`}
            >
              {/* Visual only — pointer events go to the wrapping button so the
                  swatch selects rather than triggering the copy action. */}
              <div className="pointer-events-none">
                <CopyButton
                  appearance={appearance}
                  iconOnly={false}
                  label={appearance}
                  size="sm"
                  value={`zentauri-${appearance}`}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function CopyButtonPlayground() {
  const [appearance, setAppearance] = useState<CopyButtonAppearance>("default");
  const [size, setSize] = useState<CopyButtonSize>("md");
  const [iconOnly, setIconOnly] = useState<IconOnlyOption>("on");

  const isIconOnly = iconOnly === "on";
  const code = copyButtonSnippet({ appearance, size, iconOnly: isIconOnly });

  return (
    <div className="mt-6 rounded-xl">
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <VariantSelect
          label="Appearance"
          value={appearance}
          options={COPY_BUTTON_APPEARANCES}
          onChange={setAppearance}
        />
        <VariantSelect
          label="Size"
          value={size}
          options={COPY_BUTTON_SIZES}
          onChange={setSize}
        />
        <VariantSelect
          label="Icon only"
          value={iconOnly}
          options={ICON_ONLY_OPTIONS}
          onChange={setIconOnly}
        />
      </div>
      <PreviewCodeShowcase code={code}>
        <CopyButtonDemo
          appearance={appearance}
          size={size}
          iconOnly={isIconOnly}
        />
      </PreviewCodeShowcase>
      <AppearanceGallery selected={appearance} onSelect={setAppearance} />
    </div>
  );
}
