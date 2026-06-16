"use client";

import { useState } from "react";
import type { KeyboardEvent } from "react";

import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { cn } from "@/lib/utils";
import {
  commandContentVariants,
  commandItemVariants,
} from "@zentauri-ui/zentauri-components/ui/command";
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

type AppearanceGalleryProps = {
  selected: CommandAppearance;
  onSelect: (appearance: CommandAppearance) => void;
};

function AppearanceGallery({ selected, onSelect }: AppearanceGalleryProps) {
  const handleKeyDown =
    (appearance: CommandAppearance) =>
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onSelect(appearance);
      }
    };

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
        {COMMAND_APPEARANCES.map((itemAppearance) => {
          const isActive = itemAppearance === selected;
          return (
            <div
              key={itemAppearance}
              role="button"
              tabIndex={0}
              aria-pressed={isActive}
              onClick={() => onSelect(itemAppearance)}
              onKeyDown={handleKeyDown(itemAppearance)}
              className={`rounded-xl p-3 text-left transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                isActive
                  ? "ring-2 ring-sky-500 ring-offset-2 ring-offset-white dark:ring-offset-slate-950"
                  : "ring-1 ring-slate-200 hover:ring-slate-300 dark:ring-white/10 dark:hover:ring-white/20"
              }`}
            >
              <div
                className={cn(
                  commandContentVariants({
                    appearance: itemAppearance,
                    size: "sm",
                  }),
                  "pointer-events-none relative left-auto top-auto z-auto w-full max-w-none translate-x-0 rounded-lg shadow-none",
                )}
              >
                <div className="border-b border-black/10 px-3 py-2 text-xs opacity-70 dark:border-white/10">
                  Search {itemAppearance}
                </div>
                <div className="space-y-1 p-2">
                  <div className={commandItemVariants()} data-active="true">
                    Open command
                  </div>
                  <div className={commandItemVariants()}>Create project</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
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
      <AppearanceGallery selected={appearance} onSelect={setAppearance} />
    </div>
  );
}
