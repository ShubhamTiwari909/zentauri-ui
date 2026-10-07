"use client";
import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@zentauri-ui/zentauri-components/ui/select";
import { Field, FieldControl } from "@zentauri-ui/zentauri-components/ui/field";
import { Input } from "@zentauri-ui/zentauri-components/ui/inputs";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import {
  FIELD_APPEARANCES,
  FIELD_DEFAULT_OPTIONS,
  type FieldOptions,
} from "./field-code-examples.data";
import { FieldPlaygroundDemo } from "./field-code-examples-demo";
import { fieldPlaygroundSnippet } from "./field-code-examples.snippets";

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
export function FieldPlayground() {
  const [options, setOptions] = useState<FieldOptions>(FIELD_DEFAULT_OPTIONS);
  const patch = <K extends keyof FieldOptions>(
    key: K,
    value: FieldOptions[K],
  ) => setOptions((current) => ({ ...current, [key]: value }));
  return (
    <div className="mt-6 space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <OptionSelect
          label="Appearance"
          value={options.appearance}
          options={FIELD_APPEARANCES}
          onChange={(value) => patch("appearance", value)}
        />
        <OptionSelect
          label="Orientation"
          value={options.orientation}
          options={["vertical", "responsive", "horizontal"]}
          onChange={(value) => patch("orientation", value)}
        />
        <OptionSelect
          label="Size"
          value={options.size}
          options={["sm", "md", "lg"]}
          onChange={(value) => patch("size", value)}
        />
        <OptionSelect
          label="Control"
          value={options.control}
          options={["input", "textarea", "select"]}
          onChange={(value) => patch("control", value)}
        />
      </div>
      <div className="flex flex-wrap items-center gap-5 text-sm">
        {(["required", "disabled", "invalid"] as const).map((key) => (
          <label key={key} className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={options[key]}
              onChange={(e) => patch(key, e.target.checked)}
            />
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </label>
        ))}
        <button
          type="button"
          onClick={() => setOptions(FIELD_DEFAULT_OPTIONS)}
          className="rounded-lg border border-slate-300 px-3 py-1.5 dark:border-slate-600"
        >
          Reset
        </button>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-400">
        Responsive orientation stacks the label above the control below 640px.
        Horizontal keeps both side by side. Field size changes spacing and text;
        Input size is configured separately.
      </p>
      <PreviewCodeShowcase code={fieldPlaygroundSnippet(options)}>
        <div data-field-playground>
          <FieldPlaygroundDemo key={options.control} options={options} />
        </div>
      </PreviewCodeShowcase>
      <h3 className="text-lg font-semibold">Appearance gallery</h3>
      <div
        data-field-gallery
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {FIELD_APPEARANCES.map((appearance) => (
          <div
            key={appearance}
            data-field-appearance={appearance}
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
            <Field
              label="Workspace"
              description="Your project home."
              appearance={appearance}
              required
            >
              <FieldControl>
                <Input placeholder="Studio workspace" />
              </FieldControl>
            </Field>
          </div>
        ))}
      </div>
    </div>
  );
}
