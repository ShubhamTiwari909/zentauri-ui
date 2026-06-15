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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@zentauri-ui/zentauri-components/ui/tabs";

import { TabsDemo } from "./demo";
import {
  TABS_LIST_APPEARANCES,
  TABS_LIST_SIZES,
  TABS_LIST_VARIANTS,
} from "./data";
import { tabsSnippet } from "./snippets";
import type {
  TabsListAppearance,
  TabsListSize,
  TabsListVariant,
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

type AppearanceGalleryProps = {
  selected: TabsListAppearance;
  onSelect: (appearance: TabsListAppearance) => void;
};

function AppearanceGallery({ selected, onSelect }: AppearanceGalleryProps) {
  return (
    <div className="mt-12">
      <p className="text-sm font-semibold text-slate-900 dark:text-white">
        All appearances
      </p>
      <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-600 dark:text-slate-400">
        Every shipped appearance token at a glance. Click any swatch to load it
        into the playground above.
      </p>
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {TABS_LIST_APPEARANCES.map((appearance) => {
          const isActive = appearance === selected;
          return (
            <button
              key={appearance}
              type="button"
              aria-pressed={isActive}
              onClick={() => onSelect(appearance)}
              className={`rounded-xl p-3 text-left transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                isActive
                  ? "ring-2 ring-sky-500 ring-offset-2 ring-offset-white dark:ring-offset-slate-950"
                  : "ring-1 ring-slate-200 hover:ring-slate-300 dark:ring-white/10 dark:hover:ring-white/20"
              }`}
            >
              <span className="mb-2 block text-xs text-slate-600 dark:text-slate-400">
                {appearance}
              </span>
              <div className="pointer-events-none">
                <Tabs
                  defaultValue="one"
                  appearance={appearance}
                  size="sm"
                  variant="pills"
                >
                  <TabsList>
                    <TabsTrigger value="one">One</TabsTrigger>
                    <TabsTrigger value="two">Two</TabsTrigger>
                  </TabsList>
                  <TabsContent
                    value="one"
                    className="mt-2 text-xs text-slate-600 dark:text-slate-400"
                  >
                    Sample panel.
                  </TabsContent>
                </Tabs>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function TabsPlayground() {
  const [variant, setVariant] = useState<TabsListVariant>("pills");
  const [size, setSize] = useState<TabsListSize>("md");
  const [appearance, setAppearance] = useState<TabsListAppearance>("default");

  const code = tabsSnippet({ variant, size, appearance });

  return (
    <div className="mt-6 rounded-xl">
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <VariantSelect
          label="Variant"
          value={variant}
          options={TABS_LIST_VARIANTS}
          onChange={setVariant}
        />
        <VariantSelect
          label="Size"
          value={size}
          options={TABS_LIST_SIZES}
          onChange={setSize}
        />
        <VariantSelect
          label="Appearance"
          value={appearance}
          options={TABS_LIST_APPEARANCES}
          onChange={setAppearance}
        />
      </div>
      <PreviewCodeShowcase code={code}>
        <TabsDemo variant={variant} size={size} appearance={appearance} />
      </PreviewCodeShowcase>
      <AppearanceGallery selected={appearance} onSelect={setAppearance} />
    </div>
  );
}
