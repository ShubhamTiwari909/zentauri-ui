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
import { SkeletonAnimated } from "@zentauri-ui/zentauri-components/ui/skeleton/animated";

import { SkeletonDemo } from "./demo";
import {
  SKELETON_ANIMATIONS,
  SKELETON_APPEARANCES,
  SKELETON_ROUNDED,
  SKELETON_SHIMMER_TONES,
  SKELETON_SIZES,
} from "./data";
import { skeletonSnippet } from "./snippets";
import type {
  SkeletonAnimation,
  SkeletonAppearance,
  SkeletonRounded,
  SkeletonShimmerTone,
  SkeletonSize,
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
  selected: SkeletonAppearance;
  onSelect: (appearance: SkeletonAppearance) => void;
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
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {SKELETON_APPEARANCES.map((appearance) => {
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
              <span className="mb-2 block break-words text-xs text-slate-600 dark:text-slate-400">
                {appearance}
              </span>
              <div className="pointer-events-none">
                <SkeletonAnimated
                  appearance={appearance}
                  animation="shimmer"
                  className="h-8 w-full"
                  rounded="md"
                  shimmerTone={appearance}
                  size="md"
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function SkeletonPlayground() {
  const [appearance, setAppearance] = useState<SkeletonAppearance>("default");
  const [size, setSize] = useState<SkeletonSize>("md");
  const [rounded, setRounded] = useState<SkeletonRounded>("md");
  const [animation, setAnimation] = useState<SkeletonAnimation>("shimmer");
  const [shimmerTone, setShimmerTone] =
    useState<SkeletonShimmerTone>("default");

  const code = skeletonSnippet({
    appearance,
    size,
    rounded,
    animation,
    shimmerTone,
  });

  return (
    <div className="mt-6 rounded-xl">
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-5">
        <VariantSelect
          label="Appearance"
          value={appearance}
          options={SKELETON_APPEARANCES}
          onChange={setAppearance}
        />
        <VariantSelect
          label="Size"
          value={size}
          options={SKELETON_SIZES}
          onChange={setSize}
        />
        <VariantSelect
          label="Rounded"
          value={rounded}
          options={SKELETON_ROUNDED}
          onChange={setRounded}
        />
        <VariantSelect
          label="Animation"
          value={animation}
          options={SKELETON_ANIMATIONS}
          onChange={setAnimation}
        />
        <VariantSelect
          label="Shimmer tone"
          value={shimmerTone}
          options={SKELETON_SHIMMER_TONES}
          onChange={setShimmerTone}
        />
      </div>
      <PreviewCodeShowcase code={code}>
        <SkeletonDemo
          appearance={appearance}
          size={size}
          rounded={rounded}
          animation={animation}
          shimmerTone={shimmerTone}
        />
      </PreviewCodeShowcase>
      <AppearanceGallery selected={appearance} onSelect={setAppearance} />
    </div>
  );
}
