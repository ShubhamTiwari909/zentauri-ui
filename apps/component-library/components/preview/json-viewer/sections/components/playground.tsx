"use client";

import { useState } from "react";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { JsonViewer } from "@zentauri-ui/zentauri-components/ui/json-viewer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@zentauri-ui/zentauri-components/ui/select";
import { JsonViewerDemo } from "./demo";
import {
  JSON_VIEWER_ANIMATIONS,
  JSON_VIEWER_APPEARANCES,
  JSON_VIEWER_DATASET_KEYS,
  JSON_VIEWER_DATASETS,
  JSON_VIEWER_SIZES,
} from "./data";
import { jsonViewerSnippet } from "./snippets";
import type { JsonViewerAnimation } from "@zentauri-ui/zentauri-components/ui/json-viewer/animated";
import type {
  JsonViewerAppearance,
  JsonViewerDatasetKey,
  JsonViewerDemoProps,
  JsonViewerSize,
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

function AppearanceGallery({
  selected,
  onSelect,
}: {
  selected: JsonViewerAppearance;
  onSelect: (appearance: JsonViewerAppearance) => void;
}) {
  return (
    <div className="mt-12">
      <p className="text-sm font-semibold text-slate-900 dark:text-white">
        All appearances
      </p>
      <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-600 dark:text-slate-400">
        Every shipped chrome appearance over the same payload. Click any card to
        load it into the playground above.
      </p>
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {JSON_VIEWER_APPEARANCES.map((appearance) => {
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
              className={`flex cursor-pointer flex-col gap-2 rounded-xl p-3 text-left transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                isActive
                  ? "ring-2 ring-sky-500 ring-offset-2 ring-offset-white dark:ring-offset-slate-950"
                  : "ring-1 ring-slate-200 hover:ring-slate-300 dark:ring-white/10 dark:hover:ring-white/20"
              }`}
            >
              <span className="text-xs text-slate-600 dark:text-slate-400">
                {appearance}
              </span>
              <div className="pointer-events-none">
                <JsonViewer
                  data={JSON_VIEWER_DATASETS.Config}
                  appearance={appearance}
                  size="sm"
                  showToolbar={false}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function JsonViewerPlayground() {
  const [dataset, setDataset] = useState<JsonViewerDatasetKey>("API response");
  const [appearance, setAppearance] = useState<JsonViewerAppearance>("default");
  const [size, setSize] = useState<JsonViewerSize>("md");
  const [animation, setAnimation] = useState<JsonViewerAnimation>("none");
  const [showToolbar, setShowToolbar] = useState(true);

  const demoProps: JsonViewerDemoProps = {
    dataset,
    appearance,
    size,
    showToolbar,
    animation,
  };
  const code = jsonViewerSnippet(demoProps);

  return (
    <div className="mt-6 rounded-xl">
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <VariantSelect
          label="Dataset"
          value={dataset}
          options={JSON_VIEWER_DATASET_KEYS}
          onChange={setDataset}
        />
        <VariantSelect
          label="Appearance"
          value={appearance}
          options={JSON_VIEWER_APPEARANCES}
          onChange={setAppearance}
        />
        <VariantSelect
          label="Size"
          value={size}
          options={JSON_VIEWER_SIZES}
          onChange={setSize}
        />
        <VariantSelect
          label="Animation"
          value={animation}
          options={JSON_VIEWER_ANIMATIONS}
          onChange={setAnimation}
        />
      </div>
      <label className="mb-6 inline-flex items-center gap-2 text-xs font-semibold text-slate-900 dark:text-white">
        <input
          type="checkbox"
          checked={showToolbar}
          onChange={(e) => setShowToolbar(e.target.checked)}
          className="size-4 rounded border-slate-300 dark:border-white/20"
        />
        Show toolbar
      </label>
      <PreviewCodeShowcase code={code}>
        <JsonViewerDemo {...demoProps} />
      </PreviewCodeShowcase>
      <AppearanceGallery selected={appearance} onSelect={setAppearance} />
    </div>
  );
}
