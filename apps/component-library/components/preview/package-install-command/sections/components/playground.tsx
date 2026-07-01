"use client";

import { useState } from "react";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { PackageInstallCommand } from "@zentauri-ui/zentauri-components/ui/package-install-command";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@zentauri-ui/zentauri-components/ui/select";
import { PackageInstallCommandDemo } from "./demo";
import {
  PACKAGE_INSTALL_COMMAND_ANIMATIONS,
  PACKAGE_INSTALL_COMMAND_APPEARANCES,
  PACKAGE_INSTALL_COMMAND_DATASET_KEYS,
  PACKAGE_INSTALL_COMMAND_DATASETS,
  PACKAGE_INSTALL_COMMAND_SIZES,
} from "./data";
import { packageInstallCommandSnippet } from "./snippets";
import type { PackageInstallCommandAnimation } from "@zentauri-ui/zentauri-components/ui/package-install-command/animated";
import type {
  PackageInstallCommandAppearance,
  PackageInstallCommandDatasetKey,
  PackageInstallCommandDemoProps,
  PackageInstallCommandSize,
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
          if (next) onChange(next as T);
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

function AppearanceGallery({
  selected,
  onSelect,
}: {
  selected: PackageInstallCommandAppearance;
  onSelect: (appearance: PackageInstallCommandAppearance) => void;
}) {
  return (
    <div className="mt-12">
      <p className="text-sm font-semibold text-slate-900 dark:text-white">
        All appearances
      </p>
      <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-600 dark:text-slate-400">
        Every shipped chrome appearance over the same command. Click any card to
        load it into the playground above.
      </p>
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {PACKAGE_INSTALL_COMMAND_APPEARANCES.map((appearance) => {
          const isActive = appearance === selected;
          return (
            <button
              key={appearance}
              type="button"
              aria-pressed={isActive}
              onClick={() => onSelect(appearance)}
              className={`flex cursor-pointer flex-col gap-2 rounded-xl p-3 text-left transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                isActive
                  ? "ring-2 ring-sky-500 ring-offset-2 ring-offset-white dark:ring-offset-slate-950"
                  : "ring-1 ring-slate-200 hover:ring-slate-300 dark:ring-white/10 dark:hover:ring-white/20"
              }`}
            >
              <span className="text-xs text-slate-600 dark:text-slate-400">
                {appearance}
              </span>
              <div className="pointer-events-none">
                <PackageInstallCommand
                  packageName={
                    PACKAGE_INSTALL_COMMAND_DATASETS["zentauri-components"]
                      .package
                  }
                  appearance={appearance}
                  size="sm"
                  enableClipboard={false}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function PackageInstallCommandPlayground() {
  const [dataset, setDataset] = useState<PackageInstallCommandDatasetKey>(
    "zentauri-components",
  );
  const [appearance, setAppearance] =
    useState<PackageInstallCommandAppearance>("default");
  const [size, setSize] = useState<PackageInstallCommandSize>("md");
  const [animation, setAnimation] =
    useState<PackageInstallCommandAnimation>("none");
  const [enableClipboard, setEnableClipboard] = useState(true);

  const demoProps: PackageInstallCommandDemoProps = {
    dataset,
    appearance,
    size,
    enableClipboard,
    animation,
  };
  const code = packageInstallCommandSnippet(demoProps);

  return (
    <div className="mt-6 rounded-xl">
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <VariantSelect
          label="Package"
          value={dataset}
          options={PACKAGE_INSTALL_COMMAND_DATASET_KEYS}
          onChange={setDataset}
        />
        <VariantSelect
          label="Appearance"
          value={appearance}
          options={PACKAGE_INSTALL_COMMAND_APPEARANCES}
          onChange={setAppearance}
        />
        <VariantSelect
          label="Size"
          value={size}
          options={PACKAGE_INSTALL_COMMAND_SIZES}
          onChange={setSize}
        />
        <VariantSelect
          label="Animation"
          value={animation}
          options={PACKAGE_INSTALL_COMMAND_ANIMATIONS}
          onChange={setAnimation}
        />
      </div>
      <div className="mb-6 flex flex-wrap gap-6">
        <label className="inline-flex items-center gap-2 text-xs font-semibold text-slate-900 dark:text-white">
          <input
            type="checkbox"
            checked={enableClipboard}
            onChange={(e) => setEnableClipboard(e.target.checked)}
            className="size-4 rounded border-slate-300 dark:border-white/20"
          />
          Enable clipboard
        </label>
      </div>
      <PreviewCodeShowcase code={code}>
        <PackageInstallCommandDemo {...demoProps} />
      </PreviewCodeShowcase>
      <AppearanceGallery selected={appearance} onSelect={setAppearance} />
    </div>
  );
}
