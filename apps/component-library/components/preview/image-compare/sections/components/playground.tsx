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

import {
  IMAGE_COMPARE_APPEARANCES,
  IMAGE_COMPARE_RADII,
  IMAGE_COMPARE_SIZES,
} from "./data";
import { ImageCompareDemo } from "./demo";
import { imageCompareSnippet } from "./snippets";
import type {
  ImageCompareAppearance,
  ImageCompareDemoProps,
  ImageCompareRadius,
  ImageCompareSize,
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

export function ImageComparePlayground() {
  const [appearance, setAppearance] =
    useState<ImageCompareAppearance>("default");
  const [size, setSize] = useState<ImageCompareSize>("md");
  const [radius, setRadius] = useState<ImageCompareRadius>("md");
  const [defaultPosition, setDefaultPosition] = useState(50);

  const demoProps: ImageCompareDemoProps = {
    appearance,
    size,
    radius,
    defaultPosition,
  };

  return (
    <div className="mt-6 rounded-xl">
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <VariantSelect
          label="Appearance"
          value={appearance}
          options={IMAGE_COMPARE_APPEARANCES}
          onChange={setAppearance}
        />
        <VariantSelect
          label="Size"
          value={size}
          options={IMAGE_COMPARE_SIZES}
          onChange={setSize}
        />
        <VariantSelect
          label="Radius"
          value={radius}
          options={IMAGE_COMPARE_RADII}
          onChange={setRadius}
        />
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-slate-900 dark:text-white">
            Initial position · {defaultPosition}%
          </span>
          <input
            type="range"
            min={0}
            max={100}
            value={defaultPosition}
            onChange={(event) => setDefaultPosition(Number(event.target.value))}
            className="h-8 accent-slate-900 dark:accent-white"
          />
        </label>
      </div>
      <PreviewCodeShowcase code={imageCompareSnippet(demoProps)}>
        <ImageCompareDemo key={defaultPosition} {...demoProps} />
      </PreviewCodeShowcase>
    </div>
  );
}
