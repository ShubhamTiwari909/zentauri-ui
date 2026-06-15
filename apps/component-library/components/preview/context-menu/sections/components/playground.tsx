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

import { ContextMenuDemo } from "./demo";
import {
  CONTEXT_MENU_ITEM_VARIANTS,
  CONTEXT_MENU_PATTERNS,
  CONTEXT_MENU_SPACINGS,
} from "./data";
import { contextMenuSnippet } from "./snippets";
import type { ContextMenuDemoProps } from "./types";

type ContextMenuItemVariant = NonNullable<ContextMenuDemoProps["itemVariant"]>;
type ContextMenuSpacing = NonNullable<ContextMenuDemoProps["spacing"]>;
type ContextMenuPattern = NonNullable<ContextMenuDemoProps["pattern"]>;

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

export function ContextMenuPlayground() {
  const [itemVariant, setItemVariant] =
    useState<ContextMenuItemVariant>("default");
  const [spacing, setSpacing] = useState<ContextMenuSpacing>("default");
  const [pattern, setPattern] = useState<ContextMenuPattern>("basic");

  const code = contextMenuSnippet({ itemVariant, spacing, pattern });

  return (
    <div className="mt-6 rounded-xl">
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <VariantSelect
          label="Item variant"
          value={itemVariant}
          options={CONTEXT_MENU_ITEM_VARIANTS}
          onChange={setItemVariant}
        />
        <VariantSelect
          label="Spacing"
          value={spacing}
          options={CONTEXT_MENU_SPACINGS}
          onChange={setSpacing}
        />
        <VariantSelect
          label="Pattern"
          value={pattern}
          options={CONTEXT_MENU_PATTERNS}
          onChange={setPattern}
        />
      </div>
      <PreviewCodeShowcase code={code}>
        <ContextMenuDemo
          itemVariant={itemVariant}
          spacing={spacing}
          pattern={pattern}
        />
      </PreviewCodeShowcase>
    </div>
  );
}
