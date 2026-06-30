"use client";

import { useState } from "react";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { RequestTimelineViewer } from "@zentauri-ui/zentauri-components/ui/request-timeline-viewer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@zentauri-ui/zentauri-components/ui/select";
import { RequestTimelineViewerDemo } from "./demo";
import {
  REQUEST_TIMELINE_VIEWER_ANIMATIONS,
  REQUEST_TIMELINE_VIEWER_APPEARANCES,
  REQUEST_TIMELINE_VIEWER_DATASET_KEYS,
  REQUEST_TIMELINE_VIEWER_DATASETS,
  REQUEST_TIMELINE_VIEWER_SIZES,
} from "./data";
import { requestTimelineViewerSnippet } from "./snippets";
import type { RequestTimelineViewerAnimation } from "@zentauri-ui/zentauri-components/ui/request-timeline-viewer/animated";
import type {
  RequestTimelineViewerAppearance,
  RequestTimelineViewerDatasetKey,
  RequestTimelineViewerDemoProps,
  RequestTimelineViewerSize,
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
  selected: RequestTimelineViewerAppearance;
  onSelect: (appearance: RequestTimelineViewerAppearance) => void;
}) {
  return (
    <div className="mt-12">
      <p className="text-sm font-semibold text-slate-900 dark:text-white">
        All appearances
      </p>
      <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-600 dark:text-slate-400">
        Every shipped chrome appearance over the same timeline. Click any card
        to load it into the playground above.
      </p>
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {REQUEST_TIMELINE_VIEWER_APPEARANCES.map((appearance) => {
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
                <RequestTimelineViewer
                  phases={REQUEST_TIMELINE_VIEWER_DATASETS.Fast}
                  appearance={appearance}
                  size="sm"
                  showLegend={false}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function RequestTimelineViewerPlayground() {
  const [dataset, setDataset] =
    useState<RequestTimelineViewerDatasetKey>("Slow API");
  const [appearance, setAppearance] =
    useState<RequestTimelineViewerAppearance>("default");
  const [size, setSize] = useState<RequestTimelineViewerSize>("md");
  const [animation, setAnimation] =
    useState<RequestTimelineViewerAnimation>("none");
  const [showLegend, setShowLegend] = useState(true);

  const demoProps: RequestTimelineViewerDemoProps = {
    dataset,
    appearance,
    size,
    showLegend,
    animation,
  };
  const code = requestTimelineViewerSnippet(demoProps);

  return (
    <div className="mt-6 rounded-xl">
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <VariantSelect
          label="Dataset"
          value={dataset}
          options={REQUEST_TIMELINE_VIEWER_DATASET_KEYS}
          onChange={setDataset}
        />
        <VariantSelect
          label="Appearance"
          value={appearance}
          options={REQUEST_TIMELINE_VIEWER_APPEARANCES}
          onChange={setAppearance}
        />
        <VariantSelect
          label="Size"
          value={size}
          options={REQUEST_TIMELINE_VIEWER_SIZES}
          onChange={setSize}
        />
        <VariantSelect
          label="Animation"
          value={animation}
          options={REQUEST_TIMELINE_VIEWER_ANIMATIONS}
          onChange={setAnimation}
        />
      </div>
      <label className="mb-6 inline-flex items-center gap-2 text-xs font-semibold text-slate-900 dark:text-white">
        <input
          type="checkbox"
          checked={showLegend}
          onChange={(e) => setShowLegend(e.target.checked)}
          className="size-4 rounded border-slate-300 dark:border-white/20"
        />
        Show legend
      </label>
      <PreviewCodeShowcase code={code}>
        <RequestTimelineViewerDemo {...demoProps} />
      </PreviewCodeShowcase>
      <AppearanceGallery selected={appearance} onSelect={setAppearance} />
    </div>
  );
}
