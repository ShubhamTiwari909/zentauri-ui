"use client";

import { useState } from "react";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { LogViewer } from "@zentauri-ui/zentauri-components/ui/log-viewer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@zentauri-ui/zentauri-components/ui/select";
import { LogViewerDemo } from "./demo";
import {
  LOG_VIEWER_ANIMATIONS,
  LOG_VIEWER_APPEARANCES,
  LOG_VIEWER_DATASET_KEYS,
  LOG_VIEWER_DATASETS,
  LOG_VIEWER_SIZES,
} from "./data";
import { logViewerSnippet } from "./snippets";
import type { LogViewerAnimation } from "@zentauri-ui/zentauri-components/ui/log-viewer/animated";
import type {
  LogViewerAppearance,
  LogViewerDatasetKey,
  LogViewerDemoProps,
  LogViewerSize,
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
  selected: LogViewerAppearance;
  onSelect: (appearance: LogViewerAppearance) => void;
}) {
  return (
    <div className="mt-12">
      <p className="text-sm font-semibold text-slate-900 dark:text-white">
        All appearances
      </p>
      <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-600 dark:text-slate-400">
        Every shipped chrome appearance over the same dataset. Click any card to
        load it into the playground above.
      </p>
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {LOG_VIEWER_APPEARANCES.map((appearance) => {
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
                <LogViewer
                  entries={[...LOG_VIEWER_DATASETS.Startup]}
                  appearance={appearance}
                  size="sm"
                  showHeader={false}
                  showSummary={false}
                  enableSearch={false}
                  enableClipboard={false}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function LogViewerPlayground() {
  const [dataset, setDataset] = useState<LogViewerDatasetKey>("Startup");
  const [appearance, setAppearance] = useState<LogViewerAppearance>("default");
  const [size, setSize] = useState<LogViewerSize>("md");
  const [animation, setAnimation] = useState<LogViewerAnimation>("none");
  const [showHeader, setShowHeader] = useState(true);
  const [showSummary, setShowSummary] = useState(true);
  const [enableSearch, setEnableSearch] = useState(true);
  const [enableClipboard, setEnableClipboard] = useState(true);

  const demoProps: LogViewerDemoProps = {
    dataset,
    appearance,
    size,
    showHeader,
    showSummary,
    enableSearch,
    enableClipboard,
    animation,
  };
  const code = logViewerSnippet(demoProps);

  return (
    <div className="mt-6 rounded-xl">
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <VariantSelect
          label="Dataset"
          value={dataset}
          options={LOG_VIEWER_DATASET_KEYS}
          onChange={setDataset}
        />
        <VariantSelect
          label="Appearance"
          value={appearance}
          options={LOG_VIEWER_APPEARANCES}
          onChange={setAppearance}
        />
        <VariantSelect
          label="Size"
          value={size}
          options={LOG_VIEWER_SIZES}
          onChange={setSize}
        />
        <VariantSelect
          label="Animation"
          value={animation}
          options={LOG_VIEWER_ANIMATIONS}
          onChange={setAnimation}
        />
      </div>
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <label className="inline-flex items-center gap-2 text-xs font-semibold text-slate-900 dark:text-white">
          <input
            type="checkbox"
            checked={showHeader}
            onChange={(e) => setShowHeader(e.target.checked)}
            className="size-4 rounded border-slate-300 dark:border-white/20"
          />
          Show header
        </label>
        <label className="inline-flex items-center gap-2 text-xs font-semibold text-slate-900 dark:text-white">
          <input
            type="checkbox"
            checked={showSummary}
            onChange={(e) => setShowSummary(e.target.checked)}
            className="size-4 rounded border-slate-300 dark:border-white/20"
          />
          Show summary
        </label>
        <label className="inline-flex items-center gap-2 text-xs font-semibold text-slate-900 dark:text-white">
          <input
            type="checkbox"
            checked={enableSearch}
            onChange={(e) => setEnableSearch(e.target.checked)}
            className="size-4 rounded border-slate-300 dark:border-white/20"
          />
          Enable search
        </label>
        <label className="inline-flex items-center gap-2 text-xs font-semibold text-slate-900 dark:text-white">
          <input
            type="checkbox"
            checked={enableClipboard}
            onChange={(e) => setEnableClipboard(e.target.checked)}
            className="size-4 rounded border-slate-300 dark:border-white/20"
          />
          Enable clipboard
        </label>
      </div>
      <PreviewCodeShowcase code={code}>
        <LogViewerDemo {...demoProps} />
      </PreviewCodeShowcase>
      <AppearanceGallery selected={appearance} onSelect={setAppearance} />
    </div>
  );
}
