"use client";

import { useState } from "react";

import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { Marquee } from "@zentauri-ui/zentauri-components/ui/marquee";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@zentauri-ui/zentauri-components/ui/select";
import { FiCloud } from "react-icons/fi";

import { MarqueeDemo } from "./demo";
import {
  MARQUEE_APPEARANCES,
  MARQUEE_DIRECTIONS,
  MARQUEE_ORIENTATIONS,
  MARQUEE_SIZES,
} from "./data";
import { marqueeSnippet } from "./snippets";
import type { MarqueeDemoProps } from "./types";

type MarqueeAppearance = NonNullable<MarqueeDemoProps["appearance"]>;
type MarqueeSize = NonNullable<MarqueeDemoProps["size"]>;
type MarqueeOrientation = NonNullable<MarqueeDemoProps["orientation"]>;
type MarqueeDirection = NonNullable<MarqueeDemoProps["direction"]>;

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
          <SelectValue placeholder={String(value)} />
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
  selected: MarqueeAppearance;
  onSelect: (appearance: MarqueeAppearance) => void;
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
        {MARQUEE_APPEARANCES.map((appearance) => {
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
              {/* Visual only — pointer events go to the wrapping button so the
                  swatch selects rather than interacting with the marquee. */}
              <div className="pointer-events-none">
                <p className="mb-2 text-xs font-semibold text-slate-900 dark:text-white">
                  {appearance}
                </p>
                <Marquee appearance={appearance} gap={12} size="sm" speed={30}>
                  {["Synced", "Cleared", "Ready"].map((label) => (
                    <span
                      key={label}
                      className="inline-flex items-center gap-1.5 rounded-full bg-slate-950 px-3 py-1.5 text-xs font-semibold text-white ring-1 ring-white/10"
                    >
                      <FiCloud className="h-3 w-3 text-cyan-200" aria-hidden />
                      {label}
                    </span>
                  ))}
                </Marquee>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function MarqueePlayground() {
  const [appearance, setAppearance] = useState<MarqueeAppearance>("default");
  const [size, setSize] = useState<MarqueeSize>("md");
  const [orientation, setOrientation] =
    useState<MarqueeOrientation>("horizontal");
  const [direction, setDirection] = useState<MarqueeDirection>("left");
  const [fade, setFade] = useState<boolean>(true);
  const [pauseOnHover, setPauseOnHover] = useState<boolean>(true);

  const props: MarqueeDemoProps = {
    appearance,
    direction,
    fade,
    orientation,
    pauseOnHover,
    size,
  };

  const code = marqueeSnippet(props);

  return (
    <div className="mt-6 rounded-xl">
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        <VariantSelect
          label="Appearance"
          value={appearance}
          options={MARQUEE_APPEARANCES}
          onChange={setAppearance}
        />
        <VariantSelect
          label="Size"
          value={size}
          options={MARQUEE_SIZES}
          onChange={setSize}
        />
        <VariantSelect
          label="Orientation"
          value={orientation}
          options={MARQUEE_ORIENTATIONS}
          onChange={setOrientation}
        />
        <VariantSelect
          label="Direction"
          value={direction}
          options={MARQUEE_DIRECTIONS}
          onChange={setDirection}
        />
        <VariantSelect
          label="Fade"
          value={toBooleanOption(fade)}
          options={BOOLEAN_OPTIONS}
          onChange={(value) => setFade(value === "on")}
        />
        <VariantSelect
          label="Pause on hover"
          value={toBooleanOption(pauseOnHover)}
          options={BOOLEAN_OPTIONS}
          onChange={(value) => setPauseOnHover(value === "on")}
        />
      </div>
      <PreviewCodeShowcase code={code}>
        <MarqueeDemo {...props} />
      </PreviewCodeShowcase>
      <AppearanceGallery selected={appearance} onSelect={setAppearance} />
    </div>
  );
}
