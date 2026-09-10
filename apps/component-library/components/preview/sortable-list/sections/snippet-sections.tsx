"use client";

import { useState } from "react";

import { Section } from "@/components/common/Section";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@zentauri-ui/zentauri-components/ui/select";

import { SortableListDemo } from "./components/demo";
import {
  SORTABLE_LIST_APPEARANCES,
  SORTABLE_LIST_ITEM_SETS,
  SORTABLE_LIST_SIZES,
} from "./components/data";
import { sortableListSnippet } from "./components/snippets";
import type {
  SortableListAppearance,
  SortableListSize,
} from "./components/types";

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
        <SelectContent appearance="default" size="sm">
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

export function SortableListPlaygroundSection() {
  const [appearance, setAppearance] =
    useState<SortableListAppearance>("default");
  const [size, setSize] = useState<SortableListSize>("md");
  const [showMoveButtons, setShowMoveButtons] = useState(true);
  const [itemSet, setItemSet] =
    useState<keyof typeof SORTABLE_LIST_ITEM_SETS>("tasks");

  const items = SORTABLE_LIST_ITEM_SETS[itemSet];
  const demoProps = { appearance, size, showMoveButtons, items };
  const code = sortableListSnippet(demoProps);

  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Sortable list playground
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        Choose a visual variant and item set, then drag rows or use the move
        buttons to reorder the list. The generated snippet updates with every
        selection.
      </p>
      <div className="mt-6 rounded-xl">
        <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <VariantSelect
            label="Appearance"
            value={appearance}
            options={SORTABLE_LIST_APPEARANCES}
            onChange={setAppearance}
          />
          <VariantSelect
            label="Size"
            value={size}
            options={SORTABLE_LIST_SIZES}
            onChange={setSize}
          />
          <VariantSelect
            label="Items"
            value={itemSet}
            options={["tasks", "launch"]}
            onChange={setItemSet}
          />
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-slate-900 dark:text-white">
              Move buttons
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={showMoveButtons}
              onClick={() => setShowMoveButtons((value) => !value)}
              className="h-9 rounded-lg border border-slate-200 text-sm text-slate-700 transition-colors hover:border-slate-300 dark:border-white/10 dark:text-slate-300 dark:hover:border-white/20"
            >
              {showMoveButtons ? "on" : "off"}
            </button>
          </label>
        </div>
        <PreviewCodeShowcase code={code}>
          <SortableListDemo
            key={`${itemSet}-${appearance}-${size}`}
            {...demoProps}
          />
        </PreviewCodeShowcase>
      </div>
    </Section>
  );
}
