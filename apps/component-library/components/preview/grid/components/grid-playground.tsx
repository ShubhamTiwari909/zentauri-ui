"use client";
import { useState } from "react";
import { Grid, GridItem } from "@zentauri-ui/zentauri-components/ui/grid";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@zentauri-ui/zentauri-components/ui/select";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import {
  GRID_APPEARANCES,
  GRID_DEFAULT_OPTIONS,
  GRID_GAPS,
  type GridPlaygroundOptions,
} from "./grid-code-examples.data";
import { GridPlaygroundDemo } from "./grid-code-examples-demo";
import { gridPlaygroundSnippet } from "./grid-code-examples.snippets";

const controlClass =
  "rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 disabled:opacity-50";
function OptionSelect<T extends string>({
  label,
  value,
  options,
  onChange,
  disabled,
}: {
  label: string;
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
  disabled?: boolean;
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
          const next = values[0];
          if (next) onChange(next as T);
        }}
      >
        <SelectTrigger
          variant="outline"
          size="sm"
          className="w-full"
          disabled={disabled}
          aria-label={label}
        >
          {/* Options register on open; show the current value until then. */}
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

export function GridPlayground() {
  const [options, setOptions] =
    useState<GridPlaygroundOptions>(GRID_DEFAULT_OPTIONS);
  const [ids, setIds] = useState([1, 2, 3, 4, 5, 6]);
  const [width, setWidth] = useState(900);
  const [filtered, setFiltered] = useState(false);
  const patch = <K extends keyof GridPlaygroundOptions>(
    key: K,
    value: GridPlaygroundOptions[K],
  ) => setOptions((current) => ({ ...current, [key]: value }));
  const visibleIds = filtered ? ids.filter((id) => id % 2 === 1) : ids;
  const auto =
    options.preset === "none" &&
    (options.mode === "fit" || options.mode === "fill");
  const custom = options.preset === "none" && options.mode === "custom";
  return (
    <div className="mt-6 space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <label className="flex items-center gap-2 text-sm font-medium">
          <input
            type="checkbox"
            checked={options.stackOnMobile}
            onChange={(event) => patch("stackOnMobile", event.target.checked)}
          />
          Stack on mobile
        </label>
        <OptionSelect
          label="Layout mode"
          value={options.mode}
          options={["fixed", "fit", "fill", "custom"]}
          disabled={options.preset !== "none"}
          onChange={(value) => {
            setOptions((current) => ({
              ...current,
              mode: value,
              span: value === "fit" || value === "fill" ? 1 : current.span,
              columnStart: "auto",
            }));
          }}
        />
        <OptionSelect
          label="Responsive preset"
          value={options.preset}
          options={["none", "dashboard", "collection"]}
          onChange={(value) =>
            setOptions((current) => ({
              ...current,
              preset: value,
              span:
                value === "none" &&
                (current.mode === "fit" || current.mode === "fill") &&
                current.span !== "full"
                  ? 1
                  : current.span,
              columnStart:
                value === "none" &&
                (current.mode === "fit" || current.mode === "fill")
                  ? "auto"
                  : current.columnStart,
            }))
          }
        />
        <label className="flex flex-col gap-1.5 text-xs font-medium">
          Columns
          <input
            className={controlClass}
            type="number"
            min={1}
            max={12}
            value={options.columns}
            disabled={options.preset !== "none" || options.mode !== "fixed"}
            onChange={(event) =>
              patch(
                "columns",
                Math.max(1, Math.min(12, Number(event.target.value) || 1)),
              )
            }
          />
        </label>
        <label className="flex flex-col gap-1.5 text-xs font-medium">
          Minimum item width (px)
          <input
            className={controlClass}
            type="number"
            min={80}
            max={600}
            value={options.minWidth}
            disabled={!auto}
            onChange={(event) =>
              patch(
                "minWidth",
                Math.max(80, Math.min(600, Number(event.target.value) || 80)),
              )
            }
          />
        </label>
        <OptionSelect
          label="Gap"
          value={options.gap}
          options={GRID_GAPS}
          onChange={(value) => patch("gap", value)}
        />
        <OptionSelect
          label="Row gap"
          value={options.rowGap}
          options={["inherit", ...GRID_GAPS]}
          onChange={(value) => patch("rowGap", value)}
        />
        <OptionSelect
          label="Column gap"
          value={options.columnGap}
          options={["inherit", ...GRID_GAPS]}
          onChange={(value) => patch("columnGap", value)}
        />
        <OptionSelect
          label="Appearance"
          value={options.appearance}
          options={GRID_APPEARANCES}
          onChange={(value) => patch("appearance", value)}
        />
        <OptionSelect
          label="Padding"
          value={options.padding}
          options={["none", "sm", "md", "lg"]}
          onChange={(value) => patch("padding", value)}
        />
        <OptionSelect
          label="First item column span"
          value={String(options.span)}
          options={auto ? ["1", "full"] : ["1", "2", "3", "4", "full"]}
          disabled={custom}
          onChange={(value) =>
            patch("span", value === "full" ? "full" : Number(value))
          }
        />
        <OptionSelect
          label="First item column start"
          value={String(options.columnStart)}
          options={["auto", "1", "2", "3"]}
          disabled={auto || custom || options.span === "full"}
          onChange={(value) =>
            patch("columnStart", value === "auto" ? "auto" : Number(value))
          }
        />
        <OptionSelect
          label="First item row span"
          value={String(options.rowSpan)}
          options={["1", "2", "3"]}
          disabled={custom}
          onChange={(value) => patch("rowSpan", Number(value))}
        />
        <OptionSelect
          label="Align items"
          value={options.alignItems}
          options={["start", "center", "end", "stretch"]}
          onChange={(value) => patch("alignItems", value)}
        />
        <label className="flex flex-col gap-1.5 text-xs font-medium">
          Preview width: {width}px
          <input
            type="range"
            min={240}
            max={1100}
            step={20}
            value={width}
            onChange={(event) => setWidth(Number(event.target.value))}
          />
        </label>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-400">
        The width slider demonstrates intrinsic fit/fill behavior. Responsive
        presets follow the viewport. Below sm, items stack one per row by
        default; turn off Stack on mobile to use the configured layout at every
        width. Custom areas control the first three items, and fixed layouts
        clamp spans to the available columns from sm upward.
      </p>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          className={controlClass}
          onClick={() =>
            setIds((current) => [...current, (current.at(-1) ?? 0) + 1])
          }
        >
          Add item
        </button>
        <button
          type="button"
          className={controlClass}
          disabled={!ids.length}
          onClick={() => setIds((current) => current.slice(0, -1))}
        >
          Remove last item
        </button>
        <button
          type="button"
          className={controlClass}
          aria-pressed={filtered}
          onClick={() => setFiltered((current) => !current)}
        >
          Filter odd items
        </button>
        <button
          type="button"
          className={controlClass}
          onClick={() => {
            setOptions(GRID_DEFAULT_OPTIONS);
            setIds([1, 2, 3, 4, 5, 6]);
            setFiltered(false);
            setWidth(900);
          }}
        >
          Reset
        </button>
      </div>
      <p className="text-sm font-medium">Live layout</p>
      <PreviewCodeShowcase code={gridPlaygroundSnippet(options, visibleIds)}>
        <div data-grid-playground style={{ width, maxWidth: "100%" }}>
          <GridPlaygroundDemo options={options} ids={visibleIds} />
        </div>
      </PreviewCodeShowcase>
      <h3 className="text-lg font-semibold">Appearance gallery</h3>
      <Grid
        layout={{ mode: "auto", minItemWidth: 170 }}
        gap="sm"
        className="text-slate-900 dark:text-slate-100"
      >
        {GRID_APPEARANCES.map((appearance) => (
          <GridItem key={appearance} appearance={appearance} padding="md">
            <button
              type="button"
              aria-pressed={options.appearance === appearance}
              onClick={() => patch("appearance", appearance)}
              className="min-h-20 w-full rounded-md text-left outline-offset-4 focus-visible:outline-2"
            >
              <span className="block text-sm font-semibold">{appearance}</span>
              <span className="mt-2 block text-xs">
                {options.appearance === appearance
                  ? "Selected"
                  : "Select surface"}
              </span>
            </button>
          </GridItem>
        ))}
      </Grid>
    </div>
  );
}
