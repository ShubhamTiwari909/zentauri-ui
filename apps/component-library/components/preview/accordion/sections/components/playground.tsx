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
import type { AccordionTransition } from "@zentauri-ui/zentauri-components/ui/accordion";

import { AccordionDemo } from "./demo";
import {
  ACCORDION_APPEARANCES,
  ACCORDION_SIZES,
  ACCORDION_TRANSITIONS,
} from "./data";
import { accordionSnippet } from "./snippets";
import type {
  AccordionAppearance,
  AccordionDemoType,
  AccordionSize,
} from "./types";

const ACCORDION_TYPES = ["single", "multiple"] as const;

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
  selected: AccordionAppearance;
  onSelect: (appearance: AccordionAppearance) => void;
};

function AppearanceGallery({ selected, onSelect }: AppearanceGalleryProps) {
  const handleKeyDown =
    (appearance: AccordionAppearance) =>
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter" || event.key === " ") {
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
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {ACCORDION_APPEARANCES.map((appearance) => {
          const isActive = appearance === selected;
          return (
            <div
              key={appearance}
              role="button"
              tabIndex={0}
              aria-pressed={isActive}
              onClick={() => onSelect(appearance)}
              onKeyDown={handleKeyDown(appearance)}
              className={`rounded-xl p-2 text-left transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                isActive
                  ? "ring-2 ring-sky-500 ring-offset-2 ring-offset-white dark:ring-offset-slate-950"
                  : "ring-1 ring-slate-200 hover:ring-slate-300 dark:ring-white/10 dark:hover:ring-white/20"
              }`}
            >
              <div className="pointer-events-none">
                <AccordionDemo
                  appearance={appearance}
                  size="sm"
                  type="single"
                  transition="default"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function AccordionPlayground() {
  const [appearance, setAppearance] = useState<AccordionAppearance>("outline");
  const [size, setSize] = useState<AccordionSize>("md");
  const [type, setType] = useState<AccordionDemoType>("single");
  const [transition, setTransition] = useState<AccordionTransition>("default");

  const code = accordionSnippet(appearance, size, type, transition);

  return (
    <div className="mt-6 rounded-xl">
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <VariantSelect
          label="Appearance"
          value={appearance}
          options={ACCORDION_APPEARANCES}
          onChange={setAppearance}
        />
        <VariantSelect
          label="Size"
          value={size}
          options={ACCORDION_SIZES}
          onChange={setSize}
        />
        <VariantSelect
          label="Type"
          value={type}
          options={ACCORDION_TYPES}
          onChange={setType}
        />
        <VariantSelect
          label="Transition"
          value={transition}
          options={ACCORDION_TRANSITIONS}
          onChange={setTransition}
        />
      </div>
      <PreviewCodeShowcase code={code}>
        <AccordionDemo
          appearance={appearance}
          size={size}
          type={type}
          transition={transition}
        />
      </PreviewCodeShowcase>
      <AppearanceGallery selected={appearance} onSelect={setAppearance} />
    </div>
  );
}
