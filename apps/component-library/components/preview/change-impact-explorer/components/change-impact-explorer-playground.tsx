"use client";
import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@zentauri-ui/zentauri-components/ui/select";
import { Field, FieldControl } from "@zentauri-ui/zentauri-components/ui/field";
import { ChangeImpactExplorer } from "@zentauri-ui/zentauri-components/ui/change-impact-explorer";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import {
  IMPACT_DEFAULT_OPTIONS,
  IMPACT_APPEARANCES,
  IMPACT_NODES,
  IMPACT_EDGES,
  IMPACT_CHANGES,
  type ImpactOptions,
} from "./change-impact-explorer-code-examples.data";
import { ImpactPlaygroundDemo } from "./change-impact-explorer-code-examples-demo";
import { impactPlaygroundSnippet } from "./change-impact-explorer-code-examples.snippets";
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
    <Field label={label} size="sm" className="p-0">
      {({ id }) => (
        <Select
          triggerId={id}
          multiple={false}
          value={[value]}
          onChange={(values) => {
            if (values[0]) onChange(values[0] as T);
          }}
        >
          <FieldControl native={false}>
            <SelectTrigger
              role="combobox"
              variant="outline"
              size="sm"
              className="w-full"
            >
              <SelectValue placeholder={value} />
            </SelectTrigger>
          </FieldControl>
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
      )}
    </Field>
  );
}

export function ImpactPlayground() {
  const [options, setOptions] = useState<ImpactOptions>(IMPACT_DEFAULT_OPTIONS);
  const [version, setVersion] = useState(0);
  const patch = <K extends keyof ImpactOptions>(
    key: K,
    value: ImpactOptions[K],
  ) => setOptions((current) => ({ ...current, [key]: value }));
  return (
    <div className="mt-6 space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <OptionSelect
          label="Appearance"
          value={options.appearance}
          options={IMPACT_APPEARANCES}
          onChange={(value) => patch("appearance", value)}
        />
        <OptionSelect
          label="Size"
          value={options.size}
          options={["sm", "md", "lg"]}
          onChange={(value) => patch("size", value)}
        />
        <OptionSelect
          label="Direction"
          value={options.direction}
          options={["downstream", "upstream"]}
          onChange={(value) => patch("direction", value)}
        />
        <OptionSelect
          label="Depth"
          value={options.depth}
          options={["all", "1", "2"]}
          onChange={(value) => patch("depth", value)}
        />
        <OptionSelect
          label="Dataset"
          value={options.dataset}
          options={["example", "10000"]}
          onChange={(value) => patch("dataset", value)}
        />
        <OptionSelect
          label="State"
          value={options.state}
          options={["ready", "loading", "error", "empty"]}
          onChange={(value) => patch("state", value)}
        />
        <OptionSelect
          label="Reading direction"
          value={options.dir}
          options={["ltr", "rtl"]}
          onChange={(value) => patch("dir", value)}
        />
      </div>
      <div className="flex flex-wrap items-center gap-5 text-sm">
        {(
          [
            ["showMap", "Show dependency map"],
            ["showOutsideAnalysis", "Include outside analysis"],
            ["virtualize", "Virtualize large results"],
          ] as const
        ).map(([key, label]) => (
          <label key={key} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={options[key]}
              onChange={(event) => patch(key, event.target.checked)}
            />
            {label}
          </label>
        ))}
        <button
          type="button"
          onClick={() => {
            setOptions(IMPACT_DEFAULT_OPTIONS);
            setVersion((current) => current + 1);
          }}
          className="rounded-md border border-slate-300 px-3 py-2 dark:border-slate-700"
        >
          Reset
        </button>
      </div>
      <PreviewCodeShowcase code={impactPlaygroundSnippet(options)}>
        <ImpactPlaygroundDemo key={version} options={options} />
      </PreviewCodeShowcase>
      <p className="text-sm text-slate-600 dark:text-slate-400">
        The 10,000-item fixture exercises bounded map rendering and windowed
        results. Priority, reasons, and comparisons are supplied by the
        application. No changes are executed.
      </p>
      <h3 className="text-lg font-semibold">Appearance gallery</h3>
      <div className="grid gap-4 xl:grid-cols-2" data-impact-gallery>
        {IMPACT_APPEARANCES.map((appearance) => (
          <div
            key={appearance}
            className="min-w-0 space-y-3 rounded-xl border border-slate-900/10 p-3 dark:border-white/10"
          >
            <button
              type="button"
              aria-label={`Select ${appearance} appearance`}
              aria-pressed={options.appearance === appearance}
              onClick={() => patch("appearance", appearance)}
              className="w-full rounded-md text-start text-sm font-semibold outline-offset-4 focus-visible:outline-2"
            >
              {appearance}
              <span className="ms-2 text-xs font-normal">
                {options.appearance === appearance ? "Selected" : "Select"}
              </span>
            </button>
            <div inert className="pointer-events-none">
              <ChangeImpactExplorer
                nodes={IMPACT_NODES.slice(0, 2)}
                edges={[IMPACT_EDGES[0]!]}
                changes={[IMPACT_CHANGES[0]!]}
                appearance={appearance}
                size="sm"
                showMap={false}
                listHeight={128}
                renderDetails={({ node }) => (
                  <p className="text-xs">{node.label}</p>
                )}
                title="Impact preview"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
