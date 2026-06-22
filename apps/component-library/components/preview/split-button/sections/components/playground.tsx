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
import { SplitButton } from "@zentauri-ui/zentauri-components/ui/split-button";

import {
  SPLIT_BUTTON_APPEARANCES,
  SPLIT_BUTTON_SIZES,
  SPLIT_BUTTON_TRIGGER_ON,
} from "./data";
import { SplitButtonDemo } from "./demo";
import { splitButtonSnippet } from "./snippets";
import type {
  SplitButtonAppearance,
  SplitButtonSize,
  SplitButtonTriggerOn,
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

type ToggleChipProps = {
  label: string;
  active: boolean;
  onToggle: () => void;
};

function ToggleChip({ label, active, onToggle }: ToggleChipProps) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold text-slate-900 dark:text-white">
        {label}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={active}
        onClick={onToggle}
        className={`flex h-9 items-center justify-center rounded-lg border px-3 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
          active
            ? "border-sky-500 bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300"
            : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-white/10 dark:bg-white/5 dark:text-slate-400 dark:hover:border-white/20"
        }`}
      >
        {active ? "on" : "off"}
      </button>
    </label>
  );
}

type AppearanceGalleryProps = {
  selected: SplitButtonAppearance;
  onSelect: (appearance: SplitButtonAppearance) => void;
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
        {SPLIT_BUTTON_APPEARANCES.map((itemAppearance) => {
          const isActive = itemAppearance === selected;
          return (
            <button
              key={itemAppearance}
              type="button"
              aria-pressed={isActive}
              onClick={() => onSelect(itemAppearance)}
              className={`flex items-center justify-between gap-3 rounded-xl p-3 text-left transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                isActive
                  ? "ring-2 ring-sky-500 ring-offset-2 ring-offset-white dark:ring-offset-slate-950"
                  : "ring-1 ring-slate-200 hover:ring-slate-300 dark:ring-white/10 dark:hover:ring-white/20"
              }`}
            >
              <span className="text-xs text-slate-600 dark:text-slate-400">
                {itemAppearance}
              </span>
              <div className="pointer-events-none">
                <SplitButton
                  label="Save"
                  appearance={itemAppearance}
                  size="sm"
                  items={[
                    { id: "save-as", label: "Save As" },
                    { id: "export", label: "Export" },
                  ]}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function SplitButtonPlayground() {
  const [appearance, setAppearance] =
    useState<SplitButtonAppearance>("default");
  const [size, setSize] = useState<SplitButtonSize>("md");
  const [triggerOn, setTriggerOn] = useState<SplitButtonTriggerOn>("click");
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const code = splitButtonSnippet({
    appearance,
    size,
    triggerOn,
    disabled,
    loading,
  });

  return (
    <div className="mt-6 rounded-xl">
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-5">
        <VariantSelect
          label="Appearance"
          value={appearance}
          options={SPLIT_BUTTON_APPEARANCES}
          onChange={setAppearance}
        />
        <VariantSelect
          label="Size"
          value={size}
          options={SPLIT_BUTTON_SIZES}
          onChange={setSize}
        />
        <VariantSelect
          label="Trigger on"
          value={triggerOn}
          options={SPLIT_BUTTON_TRIGGER_ON}
          onChange={setTriggerOn}
        />
        <ToggleChip
          label="Disabled"
          active={disabled}
          onToggle={() => {
            setDisabled((prev) => !prev);
            if (!disabled) setLoading(false);
          }}
        />
        <ToggleChip
          label="Loading"
          active={loading}
          onToggle={() => {
            setLoading((prev) => !prev);
            if (!loading) setDisabled(false);
          }}
        />
      </div>
      <PreviewCodeShowcase code={code}>
        <SplitButtonDemo
          appearance={appearance}
          size={size}
          triggerOn={triggerOn}
          disabled={disabled}
          loading={loading}
        />
      </PreviewCodeShowcase>
      <AppearanceGallery selected={appearance} onSelect={setAppearance} />
    </div>
  );
}
