"use client";

import { useState } from "react";

import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { BentoGrid } from "@zentauri-ui/zentauri-components/ui/bento-grid";
import type {
  BentoGridAnimation,
  BentoGridSpan,
} from "@zentauri-ui/zentauri-components/ui/bento-grid";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@zentauri-ui/zentauri-components/ui/select";

import { BentoGridDemo } from "./demo";
import {
  BENTO_GRID_ANIMATIONS,
  BENTO_GRID_APPEARANCES,
  BENTO_GRID_COLS,
  BENTO_GRID_GAPS,
  BENTO_GRID_SPANS,
} from "./data";
import { bentoGridSnippet } from "./snippets";
import type {
  BentoGridAppearance,
  BentoGridDemoProps,
  BentoGridGap,
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

type AppearanceGalleryProps = {
  selected: BentoGridAppearance;
  onSelect: (appearance: BentoGridAppearance) => void;
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
        {BENTO_GRID_APPEARANCES.map((appearance) => {
          const isActive = appearance === selected;
          return (
            <button
              key={appearance}
              type="button"
              aria-pressed={isActive}
              onClick={() => onSelect(appearance)}
              className={`flex items-center justify-between gap-3 rounded-xl p-3 text-left transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                isActive
                  ? "ring-2 ring-sky-500 ring-offset-2 ring-offset-white dark:ring-offset-slate-950"
                  : "ring-1 ring-slate-200 hover:ring-slate-300 dark:ring-white/10 dark:hover:ring-white/20"
              }`}
            >
              <span className="text-xs text-slate-600 dark:text-slate-400">
                {appearance}
              </span>
              <div className="pointer-events-none">
                <BentoGrid cols={1} className="w-16 auto-rows-[2rem]">
                  <BentoGrid.Item
                    id={`swatch-${appearance}`}
                    appearance={appearance}
                  >
                    <span className="sr-only">{appearance}</span>
                  </BentoGrid.Item>
                </BentoGrid>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function BentoGridPlayground() {
  const [cols, setCols] = useState<number>(4);
  const [gap, setGap] = useState<BentoGridGap>("md");
  const [animation, setAnimation] = useState<BentoGridAnimation>("bento");
  const [span, setSpan] = useState<BentoGridSpan>("2x2");
  const [appearance, setAppearance] =
    useState<BentoGridAppearance>("gradient-blue");

  const demoProps: BentoGridDemoProps = {
    cols,
    gap,
    animation,
    span,
    appearance,
  };

  const code = bentoGridSnippet(demoProps);

  return (
    <div className="mt-6 rounded-xl">
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-5">
        <VariantSelect
          label="Columns"
          value={String(cols)}
          options={BENTO_GRID_COLS}
          onChange={(v) => setCols(Number(v))}
        />
        <VariantSelect
          label="Gap"
          value={gap}
          options={BENTO_GRID_GAPS}
          onChange={setGap}
        />
        <VariantSelect
          label="Animation"
          value={animation}
          options={BENTO_GRID_ANIMATIONS}
          onChange={setAnimation}
        />
        <VariantSelect
          label="Featured span"
          value={span}
          options={BENTO_GRID_SPANS}
          onChange={setSpan}
        />
        <VariantSelect
          label="Appearance"
          value={appearance}
          options={BENTO_GRID_APPEARANCES}
          onChange={setAppearance}
        />
      </div>
      <PreviewCodeShowcase code={code}>
        <BentoGridDemo {...demoProps} />
      </PreviewCodeShowcase>
      <AppearanceGallery selected={appearance} onSelect={setAppearance} />
    </div>
  );
}
