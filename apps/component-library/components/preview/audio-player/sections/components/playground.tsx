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
import { AudioPlayer } from "@zentauri-ui/zentauri-components/ui/audio-player";

import { AudioPlayerDemo } from "./demo";
import {
  AUDIO_PLAYER_APPEARANCES,
  AUDIO_PLAYER_SHAPES,
  AUDIO_PLAYER_SIZES,
  DEMO_AUDIO_SRC,
} from "./data";
import { audioPlayerSnippet } from "./snippets";
import type {
  AudioPlayerAppearance,
  AudioPlayerShape,
  AudioPlayerSize,
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
  selected: AudioPlayerAppearance;
  onSelect: (appearance: AudioPlayerAppearance) => void;
};

function AppearanceGallery({ selected, onSelect }: AppearanceGalleryProps) {
  return (
    <div className="mt-12">
      <p className="text-sm font-semibold text-slate-900 dark:text-white">
        All appearances
      </p>
      <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-600 dark:text-slate-400">
        Every shipped appearance token at a glance. Click any card to load it
        into the playground above.
      </p>
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {AUDIO_PLAYER_APPEARANCES.map((itemAppearance) => {
          const isActive = itemAppearance === selected;
          return (
            <button
              key={itemAppearance}
              type="button"
              aria-pressed={isActive}
              onClick={() => onSelect(itemAppearance)}
              className={`flex items-center gap-3 rounded-xl p-3 text-left transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                isActive
                  ? "ring-2 ring-sky-500 ring-offset-2 ring-offset-white dark:ring-offset-slate-950"
                  : "ring-1 ring-slate-200 hover:ring-slate-300 dark:ring-white/10 dark:hover:ring-white/20"
              }`}
            >
              <div className="pointer-events-none flex-1" inert>
                <AudioPlayer
                  src=""
                  appearance={itemAppearance}
                  size="sm"
                  shape="rounded"
                  className="pointer-events-none"
                >
                  <div className="flex flex-col gap-2">
                    <div className="h-1 w-full overflow-hidden rounded-full bg-current/10">
                      <div
                        className="h-full origin-left rounded-full [background:var(--audio-fill)]"
                        style={{ transform: "scaleX(0.4)" }}
                      />
                    </div>
                    <span className="font-mono text-[0.6rem] opacity-60">
                      {itemAppearance}
                    </span>
                  </div>
                </AudioPlayer>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function AudioPlayerPlayground() {
  const [appearance, setAppearance] =
    useState<AudioPlayerAppearance>("default");
  const [size, setSize] = useState<AudioPlayerSize>("md");
  const [shape, setShape] = useState<AudioPlayerShape>("rounded");

  const code = audioPlayerSnippet({
    appearance,
    size,
    shape,
    src: DEMO_AUDIO_SRC,
  });

  return (
    <div className="mt-6 rounded-xl">
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <VariantSelect
          label="Appearance"
          value={appearance}
          options={AUDIO_PLAYER_APPEARANCES}
          onChange={setAppearance}
        />
        <VariantSelect
          label="Size"
          value={size}
          options={AUDIO_PLAYER_SIZES}
          onChange={setSize}
        />
        <VariantSelect
          label="Shape"
          value={shape}
          options={AUDIO_PLAYER_SHAPES}
          onChange={setShape}
        />
      </div>
      <PreviewCodeShowcase code={code}>
        <AudioPlayerDemo
          appearance={appearance}
          size={size}
          shape={shape}
          src={DEMO_AUDIO_SRC}
        />
      </PreviewCodeShowcase>
      <AppearanceGallery selected={appearance} onSelect={setAppearance} />
    </div>
  );
}
