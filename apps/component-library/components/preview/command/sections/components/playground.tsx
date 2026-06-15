"use client";

import { useState } from "react";

import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@zentauri-ui/zentauri-components/ui/select";

import { COMMAND_APPEARANCES, COMMAND_SIZES } from "./data";
import { CommandDemo } from "./demo";
import { commandSnippet } from "./snippets";
import type { CommandDemoProps } from "./types";

type CommandAppearance = CommandDemoProps["appearance"];
type CommandSize = CommandDemoProps["size"];

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
          {/* options register lazily on open, so the placeholder doubles as the
              current value (option label === value) until then. */}
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

export function CommandPlayground() {
  const [appearance, setAppearance] = useState<CommandAppearance>("default");
  const [size, setSize] = useState<CommandSize>("md");

  const code = commandSnippet({ appearance, size });

  return (
    <div className="mt-6 rounded-xl">
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <VariantSelect
          label="Appearance"
          value={appearance}
          options={COMMAND_APPEARANCES}
          onChange={setAppearance}
        />
        <VariantSelect
          label="Size"
          value={size}
          options={COMMAND_SIZES}
          onChange={setSize}
        />
      </div>
      <PreviewCodeShowcase code={code}>
        <CommandDemo appearance={appearance} size={size} />
      </PreviewCodeShowcase>
    </div>
  );
}
