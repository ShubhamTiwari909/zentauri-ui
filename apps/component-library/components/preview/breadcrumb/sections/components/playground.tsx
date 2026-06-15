"use client";

import { useState } from "react";

import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { variantLeadComment } from "@/components/common/variant-code-prefix";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@zentauri-ui/zentauri-components/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@zentauri-ui/zentauri-components/ui/select";
import type { BreadcrumbAppearance } from "@zentauri-ui/zentauri-components/ui/breadcrumb";

import { BreadcrumbDemo } from "./demo";
import { BREADCRUMB_APPEARANCES, BREADCRUMB_SCENARIOS } from "./data";
import type { BreadcrumbScenario } from "./types";

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

// Mirrors BreadcrumbDemo's markup so the live code string tracks the rendered
// demo for both the scenario and the selected appearance.
function breadcrumbPlaygroundSnippet(
  scenario: BreadcrumbScenario,
  appearance: BreadcrumbAppearance,
): string {
  const appearanceAttr = appearance ? ` appearance="${appearance}"` : "";

  if (scenario === "dots") {
    return `${variantLeadComment(`scenario · dots · appearance ${appearance ?? "default"}`)}<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="#"${appearanceAttr}>Docs</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator>·</BreadcrumbSeparator>
    <BreadcrumbItem>
      <BreadcrumbPage${appearanceAttr}>API</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`;
  }
  if (scenario === "smallSeparator") {
    return `${variantLeadComment(`scenario · smallSeparator · appearance ${appearance ?? "default"}`)}<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="#"${appearanceAttr}>Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator size="sm" />
    <BreadcrumbItem>
      <BreadcrumbPage${appearanceAttr}>Settings</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`;
  }
  return `${variantLeadComment(`scenario · default · appearance ${appearance ?? "default"}`)}<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="#"${appearanceAttr}>Library</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage${appearanceAttr}>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage${appearanceAttr}>Code Examples</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`;
}

type AppearanceGalleryProps = {
  selected: BreadcrumbAppearance;
  onSelect: (appearance: BreadcrumbAppearance) => void;
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
        {BREADCRUMB_APPEARANCES.map((appearance) => {
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
              {/* Visual only — pointer events go to the wrapping button so the
                  swatch selects rather than following the breadcrumb link. */}
              <div className="pointer-events-none">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="#" appearance={appearance}>
                        {appearance}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage appearance={appearance}>
                        Page
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function BreadcrumbPlayground() {
  const [scenario, setScenario] = useState<BreadcrumbScenario>("default");
  const [appearance, setAppearance] = useState<BreadcrumbAppearance>("default");

  const code = breadcrumbPlaygroundSnippet(scenario, appearance);

  return (
    <div className="mt-6 rounded-xl">
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <VariantSelect
          label="Scenario"
          value={scenario}
          options={BREADCRUMB_SCENARIOS}
          onChange={setScenario}
        />
        <VariantSelect
          label="Appearance"
          value={(appearance ?? "default") as NonNullable<BreadcrumbAppearance>}
          options={BREADCRUMB_APPEARANCES}
          onChange={setAppearance}
        />
      </div>
      <PreviewCodeShowcase code={code}>
        <BreadcrumbDemo scenario={scenario} appearance={appearance} />
      </PreviewCodeShowcase>
      <AppearanceGallery selected={appearance} onSelect={setAppearance} />
    </div>
  );
}
