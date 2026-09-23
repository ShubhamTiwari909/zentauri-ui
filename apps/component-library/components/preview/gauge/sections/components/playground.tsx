"use client";

import { useState } from "react";

import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { Gauge } from "@zentauri-ui/zentauri-components/ui/gauge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@zentauri-ui/zentauri-components/ui/select";

import {
  GAUGE_APPEARANCES,
  GAUGE_SIZES,
  GAUGE_THICKNESSES,
  GAUGE_VARIANTS,
} from "./data";
import { GaugeDemo } from "./demo";
import { gaugeSnippet } from "./snippets";
import type {
  GaugeAppearance,
  GaugeSize,
  GaugeThickness,
  GaugeVariant,
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

export function GaugePlayground() {
  const [appearance, setAppearance] = useState<GaugeAppearance>("default");
  const [size, setSize] = useState<GaugeSize>("md");
  const [thickness, setThickness] = useState<GaugeThickness>("medium");
  const [variant, setVariant] = useState<GaugeVariant>("radial");
  const [value, setValue] = useState(64);
  const props = { appearance, size, thickness, variant, value };

  return (
    <div className="mt-6 rounded-xl">
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <VariantSelect
          label="Appearance"
          value={appearance}
          options={GAUGE_APPEARANCES}
          onChange={setAppearance}
        />
        <VariantSelect
          label="Size"
          value={size}
          options={GAUGE_SIZES}
          onChange={setSize}
        />
        <VariantSelect
          label="Thickness"
          value={thickness}
          options={GAUGE_THICKNESSES}
          onChange={setThickness}
        />
        <VariantSelect
          label="Variant"
          value={variant}
          options={GAUGE_VARIANTS}
          onChange={setVariant}
        />
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-slate-900 dark:text-white">
            Value · {value}
          </span>
          <input
            type="range"
            min="0"
            max="100"
            value={value}
            onChange={(event) => setValue(Number(event.currentTarget.value))}
            className="h-8 accent-sky-600"
          />
        </label>
      </div>

      <PreviewCodeShowcase code={gaugeSnippet(props)}>
        <GaugeDemo {...props} />
      </PreviewCodeShowcase>

      <div className="mt-12">
        <p className="text-sm font-semibold text-slate-900 dark:text-white">
          All appearances
        </p>
        <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-600 dark:text-slate-400">
          Select a gauge to load its appearance into the playground.
        </p>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {GAUGE_APPEARANCES.map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={option === appearance}
              onClick={() => setAppearance(option)}
              className={`flex flex-col items-center gap-2 rounded-xl p-4 transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                option === appearance
                  ? "ring-2 ring-sky-500 ring-offset-2 dark:ring-offset-slate-950"
                  : "ring-1 ring-slate-200 dark:ring-white/10"
              }`}
            >
              <Gauge
                appearance={option}
                value={64}
                size="sm"
                aria-label={`${option} gauge`}
              />
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                {option}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
