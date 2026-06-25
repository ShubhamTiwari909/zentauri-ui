"use client";

import { useState } from "react";

import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { TypingIndicator } from "@zentauri-ui/zentauri-components/ui/typing-indicator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@zentauri-ui/zentauri-components/ui/select";

import { TypingIndicatorDemo } from "./demo";
import {
  TYPING_INDICATOR_ANIMATIONS,
  TYPING_INDICATOR_APPEARANCES,
  TYPING_INDICATOR_SIZES,
} from "./data";
import { typingIndicatorSnippet } from "./snippets";
import type { TypingIndicatorAnimation } from "@zentauri-ui/zentauri-components/ui/typing-indicator/animated";
import type {
  TypingIndicatorAppearance,
  TypingIndicatorDemoProps,
  TypingIndicatorSize,
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
  selected: TypingIndicatorAppearance;
  onSelect: (appearance: TypingIndicatorAppearance) => void;
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
        {TYPING_INDICATOR_APPEARANCES.map((appearance) => {
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
                <TypingIndicator appearance={appearance} size="sm" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function TypingIndicatorPlayground() {
  const [appearance, setAppearance] =
    useState<TypingIndicatorAppearance>("default");
  const [size, setSize] = useState<TypingIndicatorSize>("md");
  const [dots, setDots] = useState<3 | 4 | 5>(3);
  const [label, setLabel] = useState<string>("");
  const [animation, setAnimation] = useState<TypingIndicatorAnimation>("none");

  const demoProps: TypingIndicatorDemoProps = {
    appearance,
    size,
    dots,
    label: label || undefined,
    animation,
  };

  const code = typingIndicatorSnippet(demoProps);

  return (
    <div className="mt-6 rounded-xl">
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-5">
        <VariantSelect
          label="Appearance"
          value={appearance}
          options={TYPING_INDICATOR_APPEARANCES}
          onChange={setAppearance}
        />
        <VariantSelect
          label="Size"
          value={size}
          options={TYPING_INDICATOR_SIZES}
          onChange={setSize}
        />
        <VariantSelect
          label="Dots"
          value={String(dots)}
          options={["3", "4", "5"]}
          onChange={(v) => setDots(Number(v) as 3 | 4 | 5)}
        />
        <VariantSelect
          label="Label"
          value={label || "none"}
          options={["none", "Typing", "is typing", "typing..."]}
          onChange={(v) => setLabel(v === "none" ? "" : v)}
        />
        <VariantSelect
          label="Animation"
          value={animation}
          options={TYPING_INDICATOR_ANIMATIONS}
          onChange={setAnimation}
        />
      </div>
      <PreviewCodeShowcase code={code}>
        <TypingIndicatorDemo {...demoProps} />
      </PreviewCodeShowcase>
      <AppearanceGallery selected={appearance} onSelect={setAppearance} />
    </div>
  );
}
