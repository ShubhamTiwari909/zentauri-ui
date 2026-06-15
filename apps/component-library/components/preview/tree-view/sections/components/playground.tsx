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

import { TreeViewDemo } from "./demo";
import {
  TREE_VIEW_APPEARANCES,
  TREE_VIEW_SIZES,
  TREE_VIEW_TRANSITIONS,
} from "./data";
import { treeViewSnippet } from "./snippets";
import type { TreeViewDemoProps } from "./types";

type TreeViewAppearance = NonNullable<TreeViewDemoProps["appearance"]>;
type TreeViewSize = NonNullable<TreeViewDemoProps["size"]>;
type TreeViewTransition = NonNullable<TreeViewDemoProps["transition"]>;

const GUIDE_OPTIONS = ["off", "on"] as const;
const ANIMATED_OPTIONS = ["off", "on"] as const;
type GuideOption = (typeof GUIDE_OPTIONS)[number];
type AnimatedOption = (typeof ANIMATED_OPTIONS)[number];

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
  selected: TreeViewAppearance;
  onSelect: (appearance: TreeViewAppearance) => void;
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
        {TREE_VIEW_APPEARANCES.map((appearance) => {
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
              <div className="pointer-events-none">
                <TreeViewDemo appearance={appearance} size="sm" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function TreeViewPlayground() {
  const [appearance, setAppearance] = useState<TreeViewAppearance>("outline");
  const [size, setSize] = useState<TreeViewSize>("md");
  const [guides, setGuides] = useState<GuideOption>("off");
  const [animated, setAnimated] = useState<AnimatedOption>("off");
  const [transition, setTransition] = useState<TreeViewTransition>("default");

  const showGuides = guides === "on";
  const isAnimated = animated === "on";
  const code = treeViewSnippet({
    appearance,
    size,
    showGuides,
    animated: isAnimated,
    transition,
  });

  return (
    <div className="mt-6 rounded-xl">
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-5">
        <VariantSelect
          label="Appearance"
          value={appearance}
          options={TREE_VIEW_APPEARANCES}
          onChange={setAppearance}
        />
        <VariantSelect
          label="Size"
          value={size}
          options={TREE_VIEW_SIZES}
          onChange={setSize}
        />
        <VariantSelect
          label="Guides"
          value={guides}
          options={GUIDE_OPTIONS}
          onChange={setGuides}
        />
        <VariantSelect
          label="Animated"
          value={animated}
          options={ANIMATED_OPTIONS}
          onChange={setAnimated}
        />
        <VariantSelect
          label="Transition"
          value={transition}
          options={TREE_VIEW_TRANSITIONS}
          onChange={setTransition}
        />
      </div>
      <PreviewCodeShowcase code={code}>
        <TreeViewDemo
          appearance={appearance}
          size={size}
          showGuides={showGuides}
          animated={isAnimated}
          transition={transition}
        />
      </PreviewCodeShowcase>
      <AppearanceGallery selected={appearance} onSelect={setAppearance} />
    </div>
  );
}
