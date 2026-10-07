"use client";
import { useId, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@zentauri-ui/zentauri-components/ui/select";
import {
  ResizablePanels,
  ResizablePanel,
  ResizableHandle,
} from "@zentauri-ui/zentauri-components/ui/resizable-panels";
import type { ResizablePanelsAppearance } from "@zentauri-ui/zentauri-components/ui/resizable-panels";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import {
  PANEL_APPEARANCES,
  PANELS_DEFAULT_OPTIONS,
  type PanelsOptions,
} from "./resizable-panels-code-examples.data";
import { PanelsPlaygroundDemo } from "./resizable-panels-code-examples-demo";
import { panelsPlaygroundSnippet } from "./resizable-panels-code-examples.snippets";

const controlClass =
  "rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 disabled:opacity-50";
function OptionSelect<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold text-slate-900 dark:text-white">
        {label}
      </span>
      <Select
        multiple={false}
        value={[value]}
        onChange={(values) => {
          if (values[0]) onChange(values[0] as T);
        }}
      >
        <SelectTrigger
          variant="outline"
          size="sm"
          className="w-full"
          aria-label={label}
        >
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
function AppearanceCard({
  appearance,
  selected,
  onSelect,
}: {
  appearance: ResizablePanelsAppearance;
  selected: boolean;
  onSelect: () => void;
}) {
  const id = useId();
  return (
    <div className="space-y-3 rounded-xl border border-slate-900/10 p-3 dark:border-white/10">
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={selected}
        className="w-full rounded-md px-2 py-1 text-start text-sm font-semibold outline-offset-4 focus-visible:outline-2"
      >
        {appearance}
        <span className="ms-2 text-xs font-normal">
          {selected ? "Selected" : "Select"}
        </span>
      </button>
      <ResizablePanels
        className="h-32"
        aria-label={`${appearance} appearance sample`}
      >
        <ResizablePanel
          id={`${id}-left`}
          minSize={20}
          appearance={appearance}
          padding="sm"
        >
          <p className="break-words text-xs">Panel A</p>
        </ResizablePanel>
        <ResizableHandle
          aria-label={`Resize ${appearance} sample`}
          appearance={appearance}
        />
        <ResizablePanel
          id={`${id}-right`}
          minSize={20}
          appearance={appearance}
          padding="sm"
        >
          <p className="break-words text-xs">Panel B</p>
        </ResizablePanel>
      </ResizablePanels>
    </div>
  );
}
export function ResizablePanelsPlayground() {
  const [options, setOptions] = useState<PanelsOptions>(PANELS_DEFAULT_OPTIONS);
  const [sizes, setSizes] = useState([35, 65]);
  const [expandedSize, setExpandedSize] = useState(35);
  const [minDraft, setMinDraft] = useState(
    String(PANELS_DEFAULT_OPTIONS.minSize),
  );
  const [maxDraft, setMaxDraft] = useState(
    String(PANELS_DEFAULT_OPTIONS.maxSize),
  );
  const [completed, setCompleted] = useState<number[] | null>(null);
  const changeSizes = (next: number[]) => {
    if (sizes[0]! > 0) setExpandedSize(sizes[0]!);
    if (next[0]! > 0) setExpandedSize(next[0]!);
    setSizes(next);
  };
  const patch = <K extends keyof PanelsOptions>(
    key: K,
    value: PanelsOptions[K],
  ) => {
    const next = { ...options, [key]: value };
    setOptions(next);
    setSizes((current) => {
      const first =
        next.collapsible && current[0] === 0
          ? 0
          : Math.max(next.minSize, Math.min(next.maxSize, current[0] ?? 35));
      return [first, 100 - first];
    });
  };
  const commitLimit = (key: "minSize" | "maxSize", draft: string) => {
    const parsed = draft.trim() === "" ? NaN : Number(draft);
    const value = Number.isFinite(parsed)
      ? Math.max(
          key === "minSize" ? 5 : 50,
          Math.min(key === "minSize" ? 45 : 90, parsed),
        )
      : options[key];
    if (key === "minSize") setMinDraft(String(value));
    else setMaxDraft(String(value));
    patch(key, value);
  };
  return (
    <div className="mt-6 space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <OptionSelect
          label="Orientation"
          value={options.orientation}
          options={["horizontal", "vertical"]}
          onChange={(value) => patch("orientation", value)}
        />
        <OptionSelect
          label="Panel appearance"
          value={options.appearance}
          options={PANEL_APPEARANCES}
          onChange={(value) => patch("appearance", value)}
        />
        <OptionSelect
          label="Handle appearance"
          value={options.handleAppearance}
          options={PANEL_APPEARANCES}
          onChange={(value) => patch("handleAppearance", value)}
        />
        <OptionSelect
          label="Handle size"
          value={options.handleSize}
          options={["sm", "md", "lg"]}
          onChange={(value) => patch("handleSize", value)}
        />
        <OptionSelect
          label="Content padding"
          value={options.padding}
          options={["none", "sm", "md", "lg"]}
          onChange={(value) => patch("padding", value)}
        />
        <OptionSelect
          label="Direction"
          value={options.direction}
          options={["ltr", "rtl"]}
          onChange={(value) => patch("direction", value)}
        />
        <label className="flex flex-col gap-1.5 text-xs font-semibold">
          Navigation minimum (%)
          <input
            className={controlClass}
            type="number"
            min={5}
            max={45}
            value={minDraft}
            onChange={(e) => setMinDraft(e.target.value)}
            onBlur={() => commitLimit("minSize", minDraft)}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.currentTarget.blur();
            }}
          />
        </label>
        <label className="flex flex-col gap-1.5 text-xs font-semibold">
          Navigation maximum (%)
          <input
            className={controlClass}
            type="number"
            min={50}
            max={90}
            value={maxDraft}
            onChange={(e) => setMaxDraft(e.target.value)}
            onBlur={() => commitLimit("maxSize", maxDraft)}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.currentTarget.blur();
            }}
          />
        </label>
        <OptionSelect
          label="Keyboard step (%)"
          value={String(options.keyboardStep)}
          options={["1", "2", "5"]}
          onChange={(value) => patch("keyboardStep", Number(value))}
        />
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={options.collapsible}
            onChange={(e) => patch("collapsible", e.target.checked)}
          />
          Collapsible navigation
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={options.disabled}
            onChange={(e) => patch("disabled", e.target.checked)}
          />
          Disable resizing
        </label>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-400">
        Drag the handle, or focus it and use arrow keys. Shift accelerates
        movement; Home/End use the available bounds. Enter collapses or restores
        the navigation pane when its neighbour can absorb the space.
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <button
          className={controlClass}
          type="button"
          disabled={!options.collapsible || options.disabled}
          onClick={() =>
            changeSizes(
              sizes[0] === 0
                ? [
                    Math.max(
                      options.minSize,
                      Math.min(options.maxSize, expandedSize),
                    ),
                    100 -
                      Math.max(
                        options.minSize,
                        Math.min(options.maxSize, expandedSize),
                      ),
                  ]
                : [0, 100],
            )
          }
        >
          {sizes[0] === 0 ? "Restore navigation" : "Collapse navigation"}
        </button>
        <button
          className={controlClass}
          type="button"
          onClick={() => {
            setOptions(PANELS_DEFAULT_OPTIONS);
            setSizes([35, 65]);
            setExpandedSize(35);
            setMinDraft(String(PANELS_DEFAULT_OPTIONS.minSize));
            setMaxDraft(String(PANELS_DEFAULT_OPTIONS.maxSize));
            setCompleted(null);
          }}
        >
          Reset
        </button>
        <p className="text-sm tabular-nums" data-panel-sizes>
          Sizes: {sizes.map((n) => `${n.toFixed(1)}%`).join(" / ")}
        </p>
      </div>
      <p className="text-xs text-slate-600 dark:text-slate-400">
        Last completed resize:{" "}
        {completed
          ? completed.map((n) => `${n.toFixed(1)}%`).join(" / ")
          : "Resize a handle to see the callback"}
      </p>
      <PreviewCodeShowcase code={panelsPlaygroundSnippet(options, sizes)}>
        <div data-panels-playground className="w-full">
          <PanelsPlaygroundDemo
            options={options}
            sizes={sizes}
            onSizesChange={changeSizes}
            onResizeEnd={setCompleted}
          />
        </div>
      </PreviewCodeShowcase>
      <h3 className="text-lg font-semibold">Appearance gallery</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PANEL_APPEARANCES.map((appearance) => (
          <AppearanceCard
            key={appearance}
            appearance={appearance}
            selected={options.appearance === appearance}
            onSelect={() =>
              setOptions((current) => ({
                ...current,
                appearance,
                handleAppearance: appearance,
              }))
            }
          />
        ))}
      </div>
    </div>
  );
}
