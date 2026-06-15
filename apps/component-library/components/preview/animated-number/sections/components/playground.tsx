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

import { AnimatedNumberDemo } from "./demo";
import {
  ANIMATED_NUMBER_APPEARANCES,
  ANIMATED_NUMBER_SIZES,
  ANIMATED_NUMBER_TYPES,
} from "./data";
import { animatedNumberSnippet } from "./snippets";
import type {
  AnimatedNumberDemoAppearance,
  AnimatedNumberDemoSize,
  AnimatedNumberDemoType,
} from "./types";

const ANIMATED_NUMBER_COUNTER_OPTIONS = ["off", "on"] as const;
type CounterOption = (typeof ANIMATED_NUMBER_COUNTER_OPTIONS)[number];

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
  selected: AnimatedNumberDemoAppearance;
  onSelect: (appearance: AnimatedNumberDemoAppearance) => void;
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
        {ANIMATED_NUMBER_APPEARANCES.map((appearance) => {
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
                  swatch selects rather than re-triggering the animation. */}
              <div className="pointer-events-none flex flex-col gap-1">
                <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                  {appearance}
                </span>
                <AnimatedNumberDemo appearance={appearance} size="sm" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function AnimatedNumberPlayground() {
  const [appearance, setAppearance] =
    useState<AnimatedNumberDemoAppearance>("default");
  const [size, setSize] = useState<AnimatedNumberDemoSize>("md");
  const [type, setType] = useState<AnimatedNumberDemoType>("up");
  const [counter, setCounter] = useState<CounterOption>("off");

  const isCounter = counter === "on";
  const code = animatedNumberSnippet({
    appearance,
    size,
    type,
    counter: isCounter,
  });

  return (
    <div className="mt-6 rounded-xl">
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <VariantSelect
          label="Appearance"
          value={appearance}
          options={ANIMATED_NUMBER_APPEARANCES}
          onChange={setAppearance}
        />
        <VariantSelect
          label="Size"
          value={size}
          options={ANIMATED_NUMBER_SIZES}
          onChange={setSize}
        />
        <VariantSelect
          label="Type"
          value={type}
          options={ANIMATED_NUMBER_TYPES}
          onChange={setType}
        />
        <VariantSelect
          label="Counter"
          value={counter}
          options={ANIMATED_NUMBER_COUNTER_OPTIONS}
          onChange={setCounter}
        />
      </div>
      <PreviewCodeShowcase code={code}>
        <AnimatedNumberDemo
          appearance={appearance}
          size={size}
          type={type}
          counter={isCounter}
        />
      </PreviewCodeShowcase>
      <AppearanceGallery selected={appearance} onSelect={setAppearance} />
    </div>
  );
}
