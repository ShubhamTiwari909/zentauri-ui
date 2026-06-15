"use client";

import { useState } from "react";
import { FaStar } from "react-icons/fa";

import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@zentauri-ui/zentauri-components/ui/select";
import { ratingIconVariants } from "@zentauri-ui/zentauri-components/ui/rating";
import type { RatingProps } from "@zentauri-ui/zentauri-components/ui/rating";

import { RatingDemo } from "./demo";
import { RATING_APPEARANCES, RATING_ICONS, RATING_SIZES } from "./data";
import { ratingSnippet } from "./snippets";
import type { RatingDemoProps } from "./types";

type RatingAppearance = NonNullable<RatingProps["appearance"]>;
type RatingSize = NonNullable<RatingProps["size"]>;
type RatingIcon = (typeof RATING_ICONS)[number];

const TOGGLE_OPTIONS = ["off", "on"] as const;
type ToggleOption = (typeof TOGGLE_OPTIONS)[number];

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
  selected: RatingAppearance;
  onSelect: (appearance: RatingAppearance) => void;
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
        {RATING_APPEARANCES.map((appearance) => {
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
              <div className="flex items-center justify-between gap-3">
                <span className="truncate text-xs font-semibold text-slate-900 dark:text-white">
                  {appearance}
                </span>
                <span className="flex gap-1" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <FaStar
                      key={index}
                      className={`h-2.5 w-2.5 rounded-full ${
                        index < 4
                          ? ratingIconVariants({ appearance })
                          : "text-slate-200 dark:text-white/20"
                      }`}
                    />
                  ))}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function RatingPlayground() {
  const [appearance, setAppearance] = useState<RatingAppearance>("amber");
  const [size, setSize] = useState<RatingSize>("md");
  const [icon, setIcon] = useState<RatingIcon>("star");
  const [allowHalf, setAllowHalf] = useState<ToggleOption>("off");
  const [allowClear, setAllowClear] = useState<ToggleOption>("off");
  const allowClearEnabled = allowClear === "on";
  const allowHalfEnabled = allowHalf === "on";

  const props: RatingDemoProps = {
    allowClear: allowClearEnabled,
    allowHalf: allowHalfEnabled,
    appearance,
    icon,
    size,
  };

  const code = ratingSnippet(props);

  return (
    <div className="mt-6 rounded-xl">
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <VariantSelect
          label="Appearance"
          value={appearance}
          options={RATING_APPEARANCES}
          onChange={setAppearance}
        />
        <VariantSelect
          label="Size"
          value={size}
          options={RATING_SIZES}
          onChange={setSize}
        />
        <VariantSelect
          label="Icon"
          value={icon}
          options={RATING_ICONS}
          onChange={setIcon}
        />
        <VariantSelect
          label="Allow half"
          value={allowHalf}
          options={TOGGLE_OPTIONS}
          onChange={setAllowHalf}
        />
        <VariantSelect
          label="Allow clear"
          value={allowClear}
          options={TOGGLE_OPTIONS}
          onChange={setAllowClear}
        />
      </div>
      <PreviewCodeShowcase code={code}>
        <RatingDemo
          allowClear={allowClearEnabled}
          allowHalf={allowHalfEnabled}
          appearance={appearance}
          icon={icon}
          size={size}
        />
      </PreviewCodeShowcase>
      <AppearanceGallery selected={appearance} onSelect={setAppearance} />
    </div>
  );
}
