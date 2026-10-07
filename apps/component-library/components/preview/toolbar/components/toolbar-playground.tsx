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
import {
  Toolbar,
  ToolbarToggle,
} from "@zentauri-ui/zentauri-components/ui/toolbar";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import {
  TOOLBAR_APPEARANCES,
  TOOLBAR_DEFAULT_OPTIONS,
  type ToolbarOptions,
} from "./toolbar-code-examples.data";
import { ToolbarPlaygroundDemo } from "./toolbar-code-examples-demo";
import { toolbarPlaygroundSnippet } from "./toolbar-code-examples.snippets";

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
export function ToolbarPlayground() {
  const [options, setOptions] = useState<ToolbarOptions>(
    TOOLBAR_DEFAULT_OPTIONS,
  );
  const [version, setVersion] = useState(0);
  const patch = <K extends keyof ToolbarOptions>(
    key: K,
    value: ToolbarOptions[K],
  ) => setOptions((current) => ({ ...current, [key]: value }));
  return (
    <div className="mt-6 space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <OptionSelect
          label="Appearance"
          value={options.appearance}
          options={TOOLBAR_APPEARANCES}
          onChange={(v) => patch("appearance", v)}
        />
        <OptionSelect
          label="Orientation"
          value={options.orientation}
          options={["horizontal", "vertical"]}
          onChange={(v) => patch("orientation", v)}
        />
        <OptionSelect
          label="Size"
          value={options.size}
          options={["sm", "md", "lg"]}
          onChange={(v) => patch("size", v)}
        />
        <OptionSelect
          label="Direction"
          value={options.dir}
          options={["ltr", "rtl"]}
          onChange={(v) => patch("dir", v)}
        />
      </div>
      <div className="flex flex-wrap items-center gap-5 text-sm">
        {(
          [
            ["loop", "Loop navigation"],
            ["wrap", "Wrap items"],
            ["disabled", "Disable toolbar"],
            ["disableExport", "Disable Export"],
          ] as const
        ).map(([key, label]) => (
          <label key={key} className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={options[key]}
              onChange={(e) => patch(key, e.target.checked)}
            />
            {label}
          </label>
        ))}
        <button
          type="button"
          onClick={() => {
            setOptions(TOOLBAR_DEFAULT_OPTIONS);
            setVersion((v) => v + 1);
          }}
          className="rounded-lg border border-slate-300 px-3 py-1.5 dark:border-slate-600"
        >
          Reset
        </button>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-400">
        Tab enters the toolbar once. Use Left/Right for horizontal layouts and
        Up/Down for vertical layouts. Home/End jump to the edges. Wrapping keeps
        controls visible on narrow screens; navigation follows DOM order across
        rows.
      </p>
      <PreviewCodeShowcase code={toolbarPlaygroundSnippet(options)}>
        <div data-toolbar-playground className="overflow-x-auto p-1">
          <ToolbarPlaygroundDemo key={version} options={options} />
        </div>
      </PreviewCodeShowcase>
      <h3 className="text-lg font-semibold">Appearance gallery</h3>
      <div
        data-toolbar-gallery
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {TOOLBAR_APPEARANCES.map((appearance) => (
          <div
            key={appearance}
            data-toolbar-appearance={appearance}
            className="space-y-3 rounded-xl border border-slate-900/10 p-3 dark:border-white/10"
          >
            <button
              type="button"
              aria-pressed={options.appearance === appearance}
              aria-label={`Select ${appearance} appearance`}
              onClick={() => patch("appearance", appearance)}
              className="w-full rounded-md text-start text-sm font-semibold outline-offset-4 focus-visible:outline-2"
            >
              {appearance}
              <span className="ms-2 text-xs font-normal">
                {options.appearance === appearance ? "Selected" : "Select"}
              </span>
            </button>
            <Toolbar
              inert
              aria-label={`${appearance} formatting sample`}
              appearance={appearance}
              size="sm"
            >
              <ToolbarToggle aria-label="Bold">B</ToolbarToggle>
              <ToolbarToggle aria-label="Italic">I</ToolbarToggle>
              <ToolbarToggle aria-label="Underline">U</ToolbarToggle>
            </Toolbar>
          </div>
        ))}
      </div>
    </div>
  );
}
