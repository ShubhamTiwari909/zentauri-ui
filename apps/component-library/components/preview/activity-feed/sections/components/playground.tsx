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

import { ActivityFeedDemo } from "./demo";
import {
  ACTIVITY_FEED_APPEARANCES,
  ACTIVITY_FEED_GROUPING,
  ACTIVITY_FEED_SIZES,
} from "./data";
import { activityFeedSnippet } from "./snippets";
import type {
  ActivityFeedAppearance,
  ActivityFeedDemoProps,
  ActivityFeedGrouping,
  ActivityFeedSize,
} from "./types";

function VariantSelect<T extends string>({
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
        onChange={(values) => values[0] && onChange(values[0] as T)}
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

function AppearanceGallery({
  selected,
  onSelect,
}: {
  selected: ActivityFeedAppearance;
  onSelect: (appearance: ActivityFeedAppearance) => void;
}) {
  return (
    <div className="mt-12">
      <p className="text-sm font-semibold text-slate-900 dark:text-white">
        All appearances
      </p>
      <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-600 dark:text-slate-400">
        Every shipped Activity Feed appearance at a glance. Select a card to
        load it into the playground above.
      </p>
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {ACTIVITY_FEED_APPEARANCES.map((appearance) => {
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
              <span className="mb-3 block text-xs text-slate-600 dark:text-slate-400">
                {appearance}
              </span>
              <span className="pointer-events-none block">
                <ActivityFeedDemo
                  appearance={appearance}
                  size="sm"
                  grouping="consecutive"
                />
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function ActivityFeedPlayground() {
  const [appearance, setAppearance] =
    useState<ActivityFeedAppearance>("default");
  const [size, setSize] = useState<ActivityFeedSize>("md");
  const [grouping, setGrouping] = useState<ActivityFeedGrouping>("consecutive");
  const props: ActivityFeedDemoProps = { appearance, size, grouping };

  return (
    <div className="mt-6 rounded-xl">
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <VariantSelect
          label="Appearance"
          value={appearance}
          options={ACTIVITY_FEED_APPEARANCES}
          onChange={setAppearance}
        />
        <VariantSelect
          label="Size"
          value={size}
          options={ACTIVITY_FEED_SIZES}
          onChange={setSize}
        />
        <VariantSelect
          label="Grouping"
          value={grouping}
          options={ACTIVITY_FEED_GROUPING}
          onChange={setGrouping}
        />
      </div>
      <PreviewCodeShowcase code={activityFeedSnippet(props)}>
        <ActivityFeedDemo {...props} />
      </PreviewCodeShowcase>
      <AppearanceGallery selected={appearance} onSelect={setAppearance} />
    </div>
  );
}
