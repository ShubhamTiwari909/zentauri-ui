"use client";

import { useState } from "react";

import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { ScrollArea } from "@zentauri-ui/zentauri-components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@zentauri-ui/zentauri-components/ui/select";
import type { ScrollAreaProps } from "@zentauri-ui/zentauri-components/ui/scroll-area";

import {
  SCROLL_AREA_APPEARANCES,
  SCROLL_AREA_ORIENTATIONS,
  SCROLL_AREA_SCROLLBARS,
  SCROLL_AREA_SIZES,
} from "./data";
import { ScrollAreaDemo } from "./demo";
import { scrollAreaSnippet } from "./snippets";

type ScrollAreaAppearance = NonNullable<ScrollAreaProps["appearance"]>;
type ScrollAreaSize = NonNullable<ScrollAreaProps["size"]>;
type ScrollAreaOrientation = NonNullable<ScrollAreaProps["orientation"]>;
type ScrollAreaScrollbar = NonNullable<ScrollAreaProps["scrollbar"]>;

const SCROLL_AREA_SHADOWS = ["off", "on"] as const;
type ScrollAreaShadow = (typeof SCROLL_AREA_SHADOWS)[number];

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
  selected: ScrollAreaAppearance;
  onSelect: (appearance: ScrollAreaAppearance) => void;
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
        {SCROLL_AREA_APPEARANCES.map((appearance) => {
          const isActive = appearance === selected;
          return (
            <button
              key={appearance}
              type="button"
              aria-pressed={isActive}
              onClick={() => onSelect(appearance)}
              className={`rounded-xl p-2 text-left transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                isActive
                  ? "ring-2 ring-sky-500 ring-offset-2 ring-offset-white dark:ring-offset-slate-950"
                  : "ring-1 ring-slate-200 hover:ring-slate-300 dark:ring-white/10 dark:hover:ring-white/20"
              }`}
            >
              <p className="mb-2 text-xs font-semibold text-slate-900 dark:text-white">
                {appearance}
              </p>
              {/* Visual only — pointer events go to the wrapping button so the
                  swatch selects rather than scrolls the area. */}
              <div className="pointer-events-none">
                <ScrollArea
                  aria-label={`${appearance} scroll area swatch`}
                  appearance={appearance}
                  className="h-28 p-3"
                  size="sm"
                >
                  <div className="space-y-2">
                    {["One", "Two", "Three", "Four", "Five"].map((row) => (
                      <div
                        key={row}
                        className="rounded-lg border border-slate-900/10 bg-white px-3 py-2 text-xs text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
                      >
                        {row}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function ScrollAreaPlayground() {
  const [appearance, setAppearance] = useState<ScrollAreaAppearance>("outline");
  const [size, setSize] = useState<ScrollAreaSize>("md");
  const [orientation, setOrientation] =
    useState<ScrollAreaOrientation>("vertical");
  const [scrollbar, setScrollbar] = useState<ScrollAreaScrollbar>("auto");
  const [shadow, setShadow] = useState<ScrollAreaShadow>("off");

  const shadowEnabled = shadow === "on";

  const code = scrollAreaSnippet({
    appearance,
    orientation,
    scrollbar,
    shadow: shadowEnabled,
    size,
  });

  return (
    <div className="mt-6 rounded-xl">
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-5">
        <VariantSelect
          label="Appearance"
          value={appearance}
          options={SCROLL_AREA_APPEARANCES}
          onChange={setAppearance}
        />
        <VariantSelect
          label="Size"
          value={size}
          options={SCROLL_AREA_SIZES}
          onChange={setSize}
        />
        <VariantSelect
          label="Orientation"
          value={orientation}
          options={SCROLL_AREA_ORIENTATIONS}
          onChange={setOrientation}
        />
        <VariantSelect
          label="Scrollbar"
          value={scrollbar}
          options={SCROLL_AREA_SCROLLBARS}
          onChange={setScrollbar}
        />
        <VariantSelect
          label="Shadow"
          value={shadow}
          options={SCROLL_AREA_SHADOWS}
          onChange={setShadow}
        />
      </div>
      <PreviewCodeShowcase code={code}>
        <ScrollAreaDemo
          appearance={appearance}
          orientation={orientation}
          scrollbar={scrollbar}
          shadow={shadowEnabled}
          size={size}
        />
      </PreviewCodeShowcase>
      <AppearanceGallery selected={appearance} onSelect={setAppearance} />
    </div>
  );
}
