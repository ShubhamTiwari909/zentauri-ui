"use client";

import { useState } from "react";

import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { CodeDiff } from "@zentauri-ui/zentauri-components/ui/code-diff";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@zentauri-ui/zentauri-components/ui/select";

import { CODE_DIFF_SIZES, CODE_DIFF_VIEW_TYPES } from "./data";
import { CodeDiffDemo } from "./demo";
import { codeDiffSnippet } from "./snippets";
import type { CodeDiffSize, CodeDiffViewType } from "./types";

const playgroundOldCode = `import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`;

const playgroundNewCode = `import { useState, useCallback } from "react";

export function Counter() {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <p>Parity: {count % 2 === 0 ? "even" : "odd"}</p>
      <button onClick={increment}>
        Increment
      </button>
    </div>
  );
}`;

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

export function CodeDiffPlayground() {
  const [viewType, setViewType] = useState<CodeDiffViewType>("unified");
  const [size, setSize] = useState<CodeDiffSize>("md");
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [showGutterMarkers, setShowGutterMarkers] = useState(true);

  const code = codeDiffSnippet({
    oldCode: playgroundOldCode,
    newCode: playgroundNewCode,
    viewType,
    size,
    showLineNumbers,
    showGutterMarkers,
  });

  return (
    <div className="mt-6 rounded-xl">
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <VariantSelect
          label="View type"
          value={viewType}
          options={CODE_DIFF_VIEW_TYPES}
          onChange={setViewType}
        />
        <VariantSelect
          label="Size"
          value={size}
          options={CODE_DIFF_SIZES}
          onChange={setSize}
        />
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-slate-900 dark:text-white">
            Line numbers
          </span>
          <button
            type="button"
            aria-pressed={showLineNumbers}
            onClick={() => setShowLineNumbers((v) => !v)}
            className={`rounded-xl border px-4 py-2 text-sm transition-colors ${
              showLineNumbers
                ? "border-sky-500 bg-sky-500/10 text-sky-300"
                : "border-slate-700 bg-slate-800 text-slate-400 hover:border-slate-600"
            }`}
          >
            {showLineNumbers ? "On" : "Off"}
          </button>
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-slate-900 dark:text-white">
            Gutter markers
          </span>
          <button
            type="button"
            aria-pressed={showGutterMarkers}
            onClick={() => setShowGutterMarkers((v) => !v)}
            className={`rounded-xl border px-4 py-2 text-sm transition-colors ${
              showGutterMarkers
                ? "border-sky-500 bg-sky-500/10 text-sky-300"
                : "border-slate-700 bg-slate-800 text-slate-400 hover:border-slate-600"
            }`}
          >
            {showGutterMarkers ? "On" : "Off"}
          </button>
        </label>
      </div>
      <PreviewCodeShowcase code={code}>
        <CodeDiffDemo
          oldCode={playgroundOldCode}
          newCode={playgroundNewCode}
          viewType={viewType}
          size={size}
          showLineNumbers={showLineNumbers}
          showGutterMarkers={showGutterMarkers}
        />
      </PreviewCodeShowcase>
    </div>
  );
}
