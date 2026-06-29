"use client";

import { useState } from "react";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { SpeechRecognition } from "@zentauri-ui/zentauri-components/ui/speech-recognition";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@zentauri-ui/zentauri-components/ui/select";
import { SpeechRecognitionDemo } from "./demo";
import {
  SPEECH_RECOGNITION_ANIMATIONS,
  SPEECH_RECOGNITION_APPEARANCES,
  SPEECH_RECOGNITION_SIZES,
} from "./data";
import { speechRecognitionSnippet } from "./snippets";
import type { SpeechRecognitionAnimation } from "@zentauri-ui/zentauri-components/ui/speech-recognition/animated";
import type {
  SpeechRecognitionAppearance,
  SpeechRecognitionDemoProps,
  SpeechRecognitionSize,
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
          if (next) onChange(next as T);
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
  selected: SpeechRecognitionAppearance;
  onSelect: (appearance: SpeechRecognitionAppearance) => void;
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
        {SPEECH_RECOGNITION_APPEARANCES.map((appearance) => {
          const isActive = appearance === selected;
          return (
            <div
              key={appearance}
              role="button"
              tabIndex={0}
              aria-pressed={isActive}
              onClick={() => onSelect(appearance)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(appearance);
                }
              }}
              className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl p-3 text-left transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                isActive
                  ? "ring-2 ring-sky-500 ring-offset-2 ring-offset-white dark:ring-offset-slate-950"
                  : "ring-1 ring-slate-200 hover:ring-slate-300 dark:ring-white/10 dark:hover:ring-white/20"
              }`}
            >
              <span className="text-xs text-slate-600 dark:text-slate-400">
                {appearance}
              </span>
              <div className="pointer-events-none">
                <SpeechRecognition appearance={appearance} size="sm" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function SpeechRecognitionPlayground() {
  const [appearance, setAppearance] =
    useState<SpeechRecognitionAppearance>("default");
  const [size, setSize] = useState<SpeechRecognitionSize>("md");
  const [animation, setAnimation] =
    useState<SpeechRecognitionAnimation>("none");

  const demoProps: SpeechRecognitionDemoProps = { appearance, size, animation };
  const code = speechRecognitionSnippet(demoProps);

  return (
    <div className="mt-6 rounded-xl">
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <VariantSelect
          label="Appearance"
          value={appearance}
          options={SPEECH_RECOGNITION_APPEARANCES}
          onChange={setAppearance}
        />
        <VariantSelect
          label="Size"
          value={size}
          options={SPEECH_RECOGNITION_SIZES}
          onChange={setSize}
        />
        <VariantSelect
          label="Animation"
          value={animation}
          options={SPEECH_RECOGNITION_ANIMATIONS}
          onChange={setAnimation}
        />
      </div>
      <PreviewCodeShowcase code={code}>
        <SpeechRecognitionDemo {...demoProps} />
      </PreviewCodeShowcase>
      <AppearanceGallery selected={appearance} onSelect={setAppearance} />
    </div>
  );
}
