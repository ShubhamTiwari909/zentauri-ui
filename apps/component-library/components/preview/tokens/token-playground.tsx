"use client";

import type { CSSProperties, ReactNode } from "react";
import { useState } from "react";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@zentauri-ui/zentauri-components/ui/alert";
import { Badge } from "@zentauri-ui/zentauri-components/ui/badge";
import { Button } from "@zentauri-ui/zentauri-components/ui/buttons";
import { Checkbox } from "@zentauri-ui/zentauri-components/ui/checkbox";
import { CopyButton } from "@zentauri-ui/zentauri-components/ui/copy-button";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "@zentauri-ui/zentauri-components/ui/dropdown";
import { Input } from "@zentauri-ui/zentauri-components/ui/inputs";
import { Kbd } from "@zentauri-ui/zentauri-components/ui/kbd";
import { Progress } from "@zentauri-ui/zentauri-components/ui/progress";
import {
  RadioGroup,
  RadioGroupItem,
} from "@zentauri-ui/zentauri-components/ui/radio-group";
import { Rating } from "@zentauri-ui/zentauri-components/ui/rating";
import {
  SkeletonAvatar,
  SkeletonButton,
  SkeletonText,
} from "@zentauri-ui/zentauri-components/ui/skeleton";
import {
  Toast,
  ToastDescription,
  ToastTitle,
} from "@zentauri-ui/zentauri-components/ui/toast";
import { Toggle } from "@zentauri-ui/zentauri-components/ui/toggle";

type TokenPreset = {
  name: string;
  description: string;
  swatch: string;
  variables: Record<`--zui-${string}`, string>;
};

const tokenPresets: readonly TokenPreset[] = [
  {
    name: "Ocean",
    description: "Cool product surfaces with blue focus and low-noise panels.",
    swatch: "#0ea5e9",
    variables: {
      "--zui-brand": "#0ea5e9",
      "--zui-brand-hover": "#0284c7",
      "--zui-brand-fg": "#082f49",
      "--zui-brand-dark": "#7dd3fc",
      "--zui-brand-hover-dark": "#38bdf8",
      "--zui-brand-fg-dark": "#082f49",
      "--zui-surface-muted": "#e0f2fe",
      "--zui-surface-muted-dark": "#0c4a6e",
      "--zui-surface-soft":
        "color-mix(in oklch, var(--zui-brand) 10%, transparent)",
      "--zui-surface-soft-dark":
        "color-mix(in oklch, var(--zui-brand-dark) 16%, transparent)",
      "--zui-surface-hover":
        "color-mix(in oklch, var(--zui-brand) 16%, transparent)",
      "--zui-surface-hover-dark":
        "color-mix(in oklch, var(--zui-brand-dark) 22%, transparent)",
      "--zui-border": "color-mix(in oklch, var(--zui-brand) 32%, transparent)",
      "--zui-border-dark":
        "color-mix(in oklch, var(--zui-brand-dark) 34%, transparent)",
      "--zui-focus-ring": "#0ea5e9",
      "--zui-focus-ring-dark": "#7dd3fc",
      "--zui-color-blue": "var(--zui-brand)",
      "--zui-color-blue-dark": "var(--zui-brand-dark)",
      "--zui-button-default-bg": "var(--zui-brand)",
      "--zui-button-default-bg-hover": "var(--zui-brand-hover)",
      "--zui-button-default-fg": "var(--zui-brand-fg)",
      "--zui-button-default-bg-dark": "var(--zui-brand-dark)",
      "--zui-button-default-bg-hover-dark": "var(--zui-brand-hover-dark)",
      "--zui-button-default-fg-dark": "var(--zui-brand-fg-dark)",
      "--zui-badge-default-bg": "var(--zui-surface-soft)",
      "--zui-badge-default-fg": "#075985",
      "--zui-badge-default-bg-dark": "var(--zui-surface-soft-dark)",
      "--zui-badge-default-fg-dark": "#bae6fd",
      "--zui-alert-default-border": "var(--zui-border)",
      "--zui-alert-default-bg": "var(--zui-surface-soft)",
      "--zui-alert-default-fg": "#075985",
      "--zui-alert-description-fg": "#0369a1",
      "--zui-alert-default-border-dark": "var(--zui-border-dark)",
      "--zui-alert-default-bg-dark": "var(--zui-surface-soft-dark)",
      "--zui-alert-default-fg-dark": "#e0f2fe",
      "--zui-alert-description-fg-dark": "#bae6fd",
      "--zui-input-default-border": "var(--zui-border)",
      "--zui-input-default-border-dark": "var(--zui-border-dark)",
    },
  },
  {
    name: "Emerald",
    description: "Operational, status-forward surfaces for admin workflows.",
    swatch: "#059669",
    variables: {
      "--zui-brand": "#059669",
      "--zui-brand-hover": "#047857",
      "--zui-brand-fg": "#ecfdf5",
      "--zui-brand-dark": "#6ee7b7",
      "--zui-brand-hover-dark": "#34d399",
      "--zui-brand-fg-dark": "#064e3b",
      "--zui-surface-muted": "#d1fae5",
      "--zui-surface-muted-dark": "#064e3b",
      "--zui-surface-soft":
        "color-mix(in oklch, var(--zui-brand) 11%, transparent)",
      "--zui-surface-soft-dark":
        "color-mix(in oklch, var(--zui-brand-dark) 16%, transparent)",
      "--zui-surface-hover":
        "color-mix(in oklch, var(--zui-brand) 18%, transparent)",
      "--zui-surface-hover-dark":
        "color-mix(in oklch, var(--zui-brand-dark) 23%, transparent)",
      "--zui-border": "color-mix(in oklch, var(--zui-brand) 34%, transparent)",
      "--zui-border-dark":
        "color-mix(in oklch, var(--zui-brand-dark) 36%, transparent)",
      "--zui-focus-ring": "#059669",
      "--zui-focus-ring-dark": "#6ee7b7",
      "--zui-color-emerald": "var(--zui-brand)",
      "--zui-color-emerald-dark": "var(--zui-brand-dark)",
      "--zui-button-default-bg": "var(--zui-brand)",
      "--zui-button-default-bg-hover": "var(--zui-brand-hover)",
      "--zui-button-default-fg": "var(--zui-brand-fg)",
      "--zui-button-default-bg-dark": "var(--zui-brand-dark)",
      "--zui-button-default-bg-hover-dark": "var(--zui-brand-hover-dark)",
      "--zui-button-default-fg-dark": "var(--zui-brand-fg-dark)",
      "--zui-badge-default-bg": "var(--zui-surface-soft)",
      "--zui-badge-default-fg": "#065f46",
      "--zui-badge-default-bg-dark": "var(--zui-surface-soft-dark)",
      "--zui-badge-default-fg-dark": "#a7f3d0",
      "--zui-alert-default-border": "var(--zui-border)",
      "--zui-alert-default-bg": "var(--zui-surface-soft)",
      "--zui-alert-default-fg": "#065f46",
      "--zui-alert-description-fg": "#047857",
      "--zui-alert-default-border-dark": "var(--zui-border-dark)",
      "--zui-alert-default-bg-dark": "var(--zui-surface-soft-dark)",
      "--zui-alert-default-fg-dark": "#d1fae5",
      "--zui-alert-description-fg-dark": "#a7f3d0",
      "--zui-input-default-border": "var(--zui-border)",
      "--zui-input-default-border-dark": "var(--zui-border-dark)",
    },
  },
  {
    name: "Ruby",
    description: "High-energy launch pages and dense alert-heavy tools.",
    swatch: "#be123c",
    variables: {
      "--zui-brand": "#be123c",
      "--zui-brand-hover": "#9f1239",
      "--zui-brand-fg": "#fff1f2",
      "--zui-brand-dark": "#fb7185",
      "--zui-brand-hover-dark": "#f43f5e",
      "--zui-brand-fg-dark": "#4c0519",
      "--zui-surface-muted": "#ffe4e6",
      "--zui-surface-muted-dark": "#4c0519",
      "--zui-surface-soft":
        "color-mix(in oklch, var(--zui-brand) 10%, transparent)",
      "--zui-surface-soft-dark":
        "color-mix(in oklch, var(--zui-brand-dark) 16%, transparent)",
      "--zui-surface-hover":
        "color-mix(in oklch, var(--zui-brand) 17%, transparent)",
      "--zui-surface-hover-dark":
        "color-mix(in oklch, var(--zui-brand-dark) 23%, transparent)",
      "--zui-border": "color-mix(in oklch, var(--zui-brand) 34%, transparent)",
      "--zui-border-dark":
        "color-mix(in oklch, var(--zui-brand-dark) 36%, transparent)",
      "--zui-focus-ring": "#be123c",
      "--zui-focus-ring-dark": "#fb7185",
      "--zui-color-ruby": "var(--zui-brand)",
      "--zui-color-ruby-dark": "var(--zui-brand-dark)",
      "--zui-button-default-bg": "var(--zui-brand)",
      "--zui-button-default-bg-hover": "var(--zui-brand-hover)",
      "--zui-button-default-fg": "var(--zui-brand-fg)",
      "--zui-button-default-bg-dark": "var(--zui-brand-dark)",
      "--zui-button-default-bg-hover-dark": "var(--zui-brand-hover-dark)",
      "--zui-button-default-fg-dark": "var(--zui-brand-fg-dark)",
      "--zui-badge-default-bg": "var(--zui-surface-soft)",
      "--zui-badge-default-fg": "#9f1239",
      "--zui-badge-default-bg-dark": "var(--zui-surface-soft-dark)",
      "--zui-badge-default-fg-dark": "#fecdd3",
      "--zui-alert-default-border": "var(--zui-border)",
      "--zui-alert-default-bg": "var(--zui-surface-soft)",
      "--zui-alert-default-fg": "#9f1239",
      "--zui-alert-description-fg": "#be123c",
      "--zui-alert-default-border-dark": "var(--zui-border-dark)",
      "--zui-alert-default-bg-dark": "var(--zui-surface-soft-dark)",
      "--zui-alert-default-fg-dark": "#ffe4e6",
      "--zui-alert-description-fg-dark": "#fecdd3",
      "--zui-input-default-border": "var(--zui-border)",
      "--zui-input-default-border-dark": "var(--zui-border-dark)",
    },
  },
  {
    name: "Sapphire",
    description: "Crisp blue interfaces for command centers and dashboards.",
    swatch: "#2563eb",
    variables: {
      "--zui-brand": "#2563eb",
      "--zui-brand-hover": "#1d4ed8",
      "--zui-brand-fg": "#eff6ff",
      "--zui-brand-dark": "#93c5fd",
      "--zui-brand-hover-dark": "#60a5fa",
      "--zui-brand-fg-dark": "#172554",
      "--zui-surface-muted": "#dbeafe",
      "--zui-surface-muted-dark": "#172554",
      "--zui-surface-soft":
        "color-mix(in oklch, var(--zui-brand) 10%, transparent)",
      "--zui-surface-soft-dark":
        "color-mix(in oklch, var(--zui-brand-dark) 16%, transparent)",
      "--zui-surface-hover":
        "color-mix(in oklch, var(--zui-brand) 17%, transparent)",
      "--zui-surface-hover-dark":
        "color-mix(in oklch, var(--zui-brand-dark) 23%, transparent)",
      "--zui-border": "color-mix(in oklch, var(--zui-brand) 34%, transparent)",
      "--zui-border-dark":
        "color-mix(in oklch, var(--zui-brand-dark) 36%, transparent)",
      "--zui-focus-ring": "#2563eb",
      "--zui-focus-ring-dark": "#93c5fd",
      "--zui-color-sapphire": "var(--zui-brand)",
      "--zui-color-sapphire-dark": "var(--zui-brand-dark)",
      "--zui-button-default-bg": "var(--zui-brand)",
      "--zui-button-default-bg-hover": "var(--zui-brand-hover)",
      "--zui-button-default-fg": "var(--zui-brand-fg)",
      "--zui-button-default-bg-dark": "var(--zui-brand-dark)",
      "--zui-button-default-bg-hover-dark": "var(--zui-brand-hover-dark)",
      "--zui-button-default-fg-dark": "var(--zui-brand-fg-dark)",
      "--zui-badge-default-bg": "var(--zui-surface-soft)",
      "--zui-badge-default-fg": "#1e3a8a",
      "--zui-badge-default-bg-dark": "var(--zui-surface-soft-dark)",
      "--zui-badge-default-fg-dark": "#bfdbfe",
      "--zui-alert-default-border": "var(--zui-border)",
      "--zui-alert-default-bg": "var(--zui-surface-soft)",
      "--zui-alert-default-fg": "#1e3a8a",
      "--zui-alert-description-fg": "#1d4ed8",
      "--zui-alert-default-border-dark": "var(--zui-border-dark)",
      "--zui-alert-default-bg-dark": "var(--zui-surface-soft-dark)",
      "--zui-alert-default-fg-dark": "#dbeafe",
      "--zui-alert-description-fg-dark": "#bfdbfe",
      "--zui-input-default-border": "var(--zui-border)",
      "--zui-input-default-border-dark": "var(--zui-border-dark)",
    },
  },
  {
    name: "Amber",
    description: "Warm editorial surfaces with clear active states.",
    swatch: "#d97706",
    variables: {
      "--zui-brand": "#d97706",
      "--zui-brand-hover": "#b45309",
      "--zui-brand-fg": "#451a03",
      "--zui-brand-dark": "#fbbf24",
      "--zui-brand-hover-dark": "#f59e0b",
      "--zui-brand-fg-dark": "#451a03",
      "--zui-surface-muted": "#fef3c7",
      "--zui-surface-muted-dark": "#451a03",
      "--zui-surface-soft":
        "color-mix(in oklch, var(--zui-brand) 11%, transparent)",
      "--zui-surface-soft-dark":
        "color-mix(in oklch, var(--zui-brand-dark) 17%, transparent)",
      "--zui-surface-hover":
        "color-mix(in oklch, var(--zui-brand) 18%, transparent)",
      "--zui-surface-hover-dark":
        "color-mix(in oklch, var(--zui-brand-dark) 24%, transparent)",
      "--zui-border": "color-mix(in oklch, var(--zui-brand) 36%, transparent)",
      "--zui-border-dark":
        "color-mix(in oklch, var(--zui-brand-dark) 38%, transparent)",
      "--zui-focus-ring": "#d97706",
      "--zui-focus-ring-dark": "#fbbf24",
      "--zui-color-amber": "var(--zui-brand)",
      "--zui-color-amber-dark": "var(--zui-brand-dark)",
      "--zui-button-default-bg": "var(--zui-brand)",
      "--zui-button-default-bg-hover": "var(--zui-brand-hover)",
      "--zui-button-default-fg": "var(--zui-brand-fg)",
      "--zui-button-default-bg-dark": "var(--zui-brand-dark)",
      "--zui-button-default-bg-hover-dark": "var(--zui-brand-hover-dark)",
      "--zui-button-default-fg-dark": "var(--zui-brand-fg-dark)",
      "--zui-badge-default-bg": "var(--zui-surface-soft)",
      "--zui-badge-default-fg": "#92400e",
      "--zui-badge-default-bg-dark": "var(--zui-surface-soft-dark)",
      "--zui-badge-default-fg-dark": "#fde68a",
      "--zui-alert-default-border": "var(--zui-border)",
      "--zui-alert-default-bg": "var(--zui-surface-soft)",
      "--zui-alert-default-fg": "#92400e",
      "--zui-alert-description-fg": "#b45309",
      "--zui-alert-default-border-dark": "var(--zui-border-dark)",
      "--zui-alert-default-bg-dark": "var(--zui-surface-soft-dark)",
      "--zui-alert-default-fg-dark": "#fef3c7",
      "--zui-alert-description-fg-dark": "#fde68a",
      "--zui-input-default-border": "var(--zui-border)",
      "--zui-input-default-border-dark": "var(--zui-border-dark)",
    },
  },
  {
    name: "Plum",
    description: "Expressive creator tools with saturated purple accents.",
    swatch: "#9333ea",
    variables: {
      "--zui-brand": "#9333ea",
      "--zui-brand-hover": "#7e22ce",
      "--zui-brand-fg": "#faf5ff",
      "--zui-brand-dark": "#c084fc",
      "--zui-brand-hover-dark": "#a855f7",
      "--zui-brand-fg-dark": "#3b0764",
      "--zui-surface-muted": "#f3e8ff",
      "--zui-surface-muted-dark": "#3b0764",
      "--zui-surface-soft":
        "color-mix(in oklch, var(--zui-brand) 10%, transparent)",
      "--zui-surface-soft-dark":
        "color-mix(in oklch, var(--zui-brand-dark) 16%, transparent)",
      "--zui-surface-hover":
        "color-mix(in oklch, var(--zui-brand) 17%, transparent)",
      "--zui-surface-hover-dark":
        "color-mix(in oklch, var(--zui-brand-dark) 23%, transparent)",
      "--zui-border": "color-mix(in oklch, var(--zui-brand) 34%, transparent)",
      "--zui-border-dark":
        "color-mix(in oklch, var(--zui-brand-dark) 36%, transparent)",
      "--zui-focus-ring": "#9333ea",
      "--zui-focus-ring-dark": "#c084fc",
      "--zui-color-plum": "var(--zui-brand)",
      "--zui-color-plum-dark": "var(--zui-brand-dark)",
      "--zui-button-default-bg": "var(--zui-brand)",
      "--zui-button-default-bg-hover": "var(--zui-brand-hover)",
      "--zui-button-default-fg": "var(--zui-brand-fg)",
      "--zui-button-default-bg-dark": "var(--zui-brand-dark)",
      "--zui-button-default-bg-hover-dark": "var(--zui-brand-hover-dark)",
      "--zui-button-default-fg-dark": "var(--zui-brand-fg-dark)",
      "--zui-badge-default-bg": "var(--zui-surface-soft)",
      "--zui-badge-default-fg": "#6b21a8",
      "--zui-badge-default-bg-dark": "var(--zui-surface-soft-dark)",
      "--zui-badge-default-fg-dark": "#e9d5ff",
      "--zui-alert-default-border": "var(--zui-border)",
      "--zui-alert-default-bg": "var(--zui-surface-soft)",
      "--zui-alert-default-fg": "#6b21a8",
      "--zui-alert-description-fg": "#7e22ce",
      "--zui-alert-default-border-dark": "var(--zui-border-dark)",
      "--zui-alert-default-bg-dark": "var(--zui-surface-soft-dark)",
      "--zui-alert-default-fg-dark": "#f3e8ff",
      "--zui-alert-description-fg-dark": "#e9d5ff",
      "--zui-input-default-border": "var(--zui-border)",
      "--zui-input-default-border-dark": "var(--zui-border-dark)",
    },
  },
  {
    name: "Graphite",
    description: "Neutral enterprise screens with restrained contrast.",
    swatch: "#475569",
    variables: {
      "--zui-brand": "#475569",
      "--zui-brand-hover": "#334155",
      "--zui-brand-fg": "#f8fafc",
      "--zui-brand-dark": "#cbd5e1",
      "--zui-brand-hover-dark": "#94a3b8",
      "--zui-brand-fg-dark": "#0f172a",
      "--zui-surface-muted": "#e2e8f0",
      "--zui-surface-muted-dark": "#1e293b",
      "--zui-surface-soft":
        "color-mix(in oklch, var(--zui-brand) 10%, transparent)",
      "--zui-surface-soft-dark":
        "color-mix(in oklch, var(--zui-brand-dark) 14%, transparent)",
      "--zui-surface-hover":
        "color-mix(in oklch, var(--zui-brand) 16%, transparent)",
      "--zui-surface-hover-dark":
        "color-mix(in oklch, var(--zui-brand-dark) 20%, transparent)",
      "--zui-border": "color-mix(in oklch, var(--zui-brand) 30%, transparent)",
      "--zui-border-dark":
        "color-mix(in oklch, var(--zui-brand-dark) 30%, transparent)",
      "--zui-focus-ring": "#475569",
      "--zui-focus-ring-dark": "#cbd5e1",
      "--zui-color-slate": "var(--zui-brand)",
      "--zui-color-slate-dark": "var(--zui-brand-dark)",
      "--zui-button-default-bg": "var(--zui-brand)",
      "--zui-button-default-bg-hover": "var(--zui-brand-hover)",
      "--zui-button-default-fg": "var(--zui-brand-fg)",
      "--zui-button-default-bg-dark": "var(--zui-brand-dark)",
      "--zui-button-default-bg-hover-dark": "var(--zui-brand-hover-dark)",
      "--zui-button-default-fg-dark": "var(--zui-brand-fg-dark)",
      "--zui-badge-default-bg": "var(--zui-surface-soft)",
      "--zui-badge-default-fg": "#334155",
      "--zui-badge-default-bg-dark": "var(--zui-surface-soft-dark)",
      "--zui-badge-default-fg-dark": "#e2e8f0",
      "--zui-alert-default-border": "var(--zui-border)",
      "--zui-alert-default-bg": "var(--zui-surface-soft)",
      "--zui-alert-default-fg": "#334155",
      "--zui-alert-description-fg": "#475569",
      "--zui-alert-default-border-dark": "var(--zui-border-dark)",
      "--zui-alert-default-bg-dark": "var(--zui-surface-soft-dark)",
      "--zui-alert-default-fg-dark": "#f8fafc",
      "--zui-alert-description-fg-dark": "#cbd5e1",
      "--zui-input-default-border": "var(--zui-border)",
      "--zui-input-default-border-dark": "var(--zui-border-dark)",
    },
  },
] as const;

function getThemeCss(preset: TokenPreset) {
  const lightLines = Object.entries(preset.variables)
    .filter(([name]) => !name.endsWith("-dark"))
    .map(([name, value]) => `  ${name}: ${value};`);
  const darkLines = Object.entries(preset.variables)
    .filter(([name]) => name.endsWith("-dark"))
    .map(([name, value]) => `  ${name}: ${value};`);

  return `:root {\n${lightLines.join("\n")}\n}\n\n.dark {\n${darkLines.join("\n")}\n}`;
}

function getPreviewStyle(preset: TokenPreset): CSSProperties {
  return preset.variables as CSSProperties;
}

function PlaygroundGroup({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <div className="rounded-lg border border-slate-900/10 bg-white/80 p-4 dark:border-white/10 dark:bg-slate-950/45">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
        {title}
      </p>
      {children}
    </div>
  );
}

export function TokenPlayground() {
  const [activePreset, setActivePreset] = useState<TokenPreset>(
    tokenPresets[0],
  );
  const cssSnippet = getThemeCss(activePreset);
  const cssLines = cssSnippet.split("\n");

  return (
    <div className="grid gap-5 xl:grid-cols-[0.85fr_1.15fr]">
      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
          {tokenPresets.map((preset) => {
            const isActive = preset.name === activePreset.name;

            return (
              <button
                aria-label={`Select ${preset.name}`}
                className={`rounded-lg border p-4 text-left transition ${
                  isActive
                    ? "border-cyan-400 bg-cyan-50 text-slate-950 dark:bg-cyan-400/10 dark:text-white"
                    : "border-slate-900/10 bg-white text-slate-900 hover:border-cyan-400/50 dark:border-white/10 dark:bg-slate-950/60 dark:text-slate-200"
                }`}
                key={preset.name}
                type="button"
                onClick={() => setActivePreset(preset)}
              >
                <span
                  className="block h-2 rounded-full"
                  style={{ backgroundColor: preset.swatch }}
                />
                <span className="mt-3 block font-semibold">{preset.name}</span>
                <span className="mt-1 block text-sm leading-6 text-slate-700 dark:text-slate-400">
                  {preset.description}
                </span>
              </button>
            );
          })}
        </div>

        <div className="rounded-lg border border-slate-900/10 bg-white p-4 dark:border-white/10 dark:bg-slate-950/60">
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            Token contract layers
          </p>
          <ol className="mt-3 space-y-2 text-sm leading-6 text-slate-700 dark:text-slate-400">
            <li>
              1. Global variables define brand, surfaces, borders, and states.
            </li>
            <li>
              2. Component variables can override a specific slot or appearance.
            </li>
            <li>
              3. Hardcoded fallbacks keep every component rendered without
              setup.
            </li>
          </ol>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <div
          className="rounded-lg border border-slate-900/10 bg-slate-50 p-5 dark:border-white/10 dark:bg-slate-950/70"
          style={getPreviewStyle(activePreset)}
        >
          <div className="grid gap-4 lg:grid-cols-2">
            <PlaygroundGroup title="Buttons">
              <div className="flex flex-wrap items-center gap-2">
                <Button size="sm">Primary</Button>
                <Button appearance="outline" size="sm">
                  Outline
                </Button>
                <Button appearance="ghost" size="sm">
                  Ghost
                </Button>
              </div>
            </PlaygroundGroup>

            <PlaygroundGroup title="Badge">
              <div className="flex flex-wrap items-center gap-2">
                <Badge>Theme: {activePreset.name}</Badge>
                <Badge appearance="outline">Token ready</Badge>
              </div>
            </PlaygroundGroup>

            <PlaygroundGroup title="Checkbox">
              <Checkbox defaultChecked label="Apply brand tokens" />
            </PlaygroundGroup>

            <PlaygroundGroup title="Radio group">
              <RadioGroup defaultValue="system" name="token-playground-mode">
                <RadioGroupItem label="Light" value="light" />
                <RadioGroupItem label="System" value="system" />
              </RadioGroup>
            </PlaygroundGroup>

            <PlaygroundGroup title="Dropdown">
              <div className="min-h-40">
                <Dropdown defaultOpen>
                  <DropdownTrigger size="sm">Token menu</DropdownTrigger>
                  <DropdownContent spacing="sm">
                    <DropdownItem value="copy">Copy CSS</DropdownItem>
                    <DropdownItem value="export">Export preset</DropdownItem>
                  </DropdownContent>
                </Dropdown>
              </div>
            </PlaygroundGroup>

            <PlaygroundGroup title="Kbd">
              <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                <Kbd keys={["Ctrl", "K"]} />
                <span>Open command palette</span>
              </div>
            </PlaygroundGroup>

            <PlaygroundGroup title="Progress">
              <Progress label="Token coverage" value={68} />
            </PlaygroundGroup>

            <PlaygroundGroup title="Rating">
              <Rating
                appearance="default"
                label="Theme confidence"
                readOnly
                value={4}
              />
            </PlaygroundGroup>

            <PlaygroundGroup title="Skeleton">
              <div className="flex items-center gap-3">
                <SkeletonAvatar avatarSize="md" />
                <div className="min-w-0 flex-1">
                  <SkeletonText lines={2} />
                </div>
                <SkeletonButton buttonSize="sm" className="w-20" />
              </div>
            </PlaygroundGroup>

            <PlaygroundGroup title="Toast">
              <Toast className="w-full" toastId="token-playground-toast">
                <ToastTitle>Theme copied</ToastTitle>
                <ToastDescription>
                  CSS variables are ready for your app.
                </ToastDescription>
              </Toast>
            </PlaygroundGroup>

            <PlaygroundGroup title="Toggle">
              <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                <Toggle aria-label="Enable token preview" defaultChecked />
                <span>Live preview</span>
              </div>
            </PlaygroundGroup>
          </div>

          <div className="mt-4 space-y-4">
            <Alert>
              <AlertTitle>Shared globals, local exceptions</AlertTitle>
              <AlertDescription>
                This panel is reading the same --zui-* variables shown in the
                CSS output.
              </AlertDescription>
            </Alert>

            <Input
              aria-label="Token preview input"
              placeholder="Focus ring, border, and surface tokens"
            />
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-white/10 bg-slate-950">
          <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-white">
                Copy CSS variables
              </p>
              <p className="text-xs text-slate-400">
                Root and dark-mode overrides for {activePreset.name}.
              </p>
            </div>
            <CopyButton
              appearance="cyan"
              size="sm"
              iconOnly={false}
              label="Copy CSS variables"
              copiedLabel="Copied"
              timeout={1600}
              value={cssSnippet}
            />
          </div>
          <pre className="max-h-136 overflow-auto p-4 text-xs leading-6 text-slate-200">
            <code>
              {cssLines.map((line, index) => (
                <span className="block" key={`${line}-${index}`}>
                  {line || " "}
                </span>
              ))}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}
