"use client";

import { useState } from "react";

import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import {
  Card,
  CardBody,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@zentauri-ui/zentauri-components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@zentauri-ui/zentauri-components/ui/select";

import { CardDemo } from "./demo";
import {
  CARD_APPEARANCES,
  CARD_BG_APPEARANCES,
  CARD_ROUNDED,
  CARD_SIZES,
} from "./data";
import { cardSnippet } from "./snippets";
import type {
  CardAppearance,
  CardBgAppearance,
  CardRounded,
  CardSize,
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
  selected: CardAppearance;
  onSelect: (appearance: CardAppearance) => void;
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
        {CARD_APPEARANCES.map((appearance) => {
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
                  swatch selects rather than interacting with the card. */}
              <div className="pointer-events-none">
                <Card appearance={appearance} size="sm" rounded="md">
                  <CardHeader>
                    <CardTitle className="text-xs">{appearance}</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <CardDescription className="text-xs">
                      Sample content.
                    </CardDescription>
                  </CardBody>
                </Card>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function CardPlayground() {
  const [appearance, setAppearance] = useState<CardAppearance>("default");
  const [bg, setBg] = useState<CardBgAppearance | undefined>(undefined);
  const [size, setSize] = useState<CardSize>("md");
  const [rounded, setRounded] = useState<CardRounded>("md");

  const code = cardSnippet({ appearance, bg, size, rounded });

  return (
    <div className="mt-6 rounded-xl">
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <VariantSelect
          label="Appearance"
          value={appearance}
          options={CARD_APPEARANCES}
          onChange={setAppearance}
        />
        <VariantSelect
          label="Background"
          value={bg ?? "none"}
          options={CARD_BG_APPEARANCES}
          onChange={(v) => setBg(v === "none" ? undefined : v)}
        />
        <VariantSelect
          label="Size"
          value={size}
          options={CARD_SIZES}
          onChange={setSize}
        />
        <VariantSelect
          label="Rounded"
          value={rounded}
          options={CARD_ROUNDED}
          onChange={setRounded}
        />
      </div>
      <PreviewCodeShowcase code={code}>
        <CardDemo
          appearance={appearance}
          bg={bg}
          size={size}
          rounded={rounded}
        />
      </PreviewCodeShowcase>
      <AppearanceGallery selected={appearance} onSelect={setAppearance} />
    </div>
  );
}
