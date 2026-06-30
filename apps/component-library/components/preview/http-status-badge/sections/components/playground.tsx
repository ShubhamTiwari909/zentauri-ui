"use client";

import { useState } from "react";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { HttpStatusBadge } from "@zentauri-ui/zentauri-components/ui/http-status-badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@zentauri-ui/zentauri-components/ui/select";
import { HttpStatusBadgeDemo } from "./demo";
import {
  HTTP_STATUS_BADGE_APPEARANCES,
  HTTP_STATUS_BADGE_CLASS_SAMPLES,
  HTTP_STATUS_BADGE_SAMPLES,
  HTTP_STATUS_BADGE_SIZES,
} from "./data";
import { httpStatusBadgeSnippet } from "./snippets";
import type {
  HttpStatusBadgeAppearance,
  HttpStatusBadgeDemoProps,
  HttpStatusBadgeSize,
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
  selected: HttpStatusBadgeAppearance;
  onSelect: (appearance: HttpStatusBadgeAppearance) => void;
}) {
  return (
    <div className="mt-12">
      <p className="text-sm font-semibold text-slate-900 dark:text-white">
        All appearances
      </p>
      <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-600 dark:text-slate-400">
        Every fill style across the status classes. Click any card to load its
        appearance into the playground above.
      </p>
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {HTTP_STATUS_BADGE_APPEARANCES.map((appearance) => {
          const isActive = appearance === selected;
          return (
            <div
              key={appearance}
              role="button"
              tabIndex={0}
              aria-pressed={isActive}
              onClick={() => onSelect(appearance)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(appearance);
                }
              }}
              className={`flex cursor-pointer flex-col gap-3 rounded-xl p-3 text-left transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                isActive
                  ? "ring-2 ring-sky-500 ring-offset-2 ring-offset-white dark:ring-offset-slate-950"
                  : "ring-1 ring-slate-200 hover:ring-slate-300 dark:ring-white/10 dark:hover:ring-white/20"
              }`}
            >
              <span className="text-xs text-slate-600 dark:text-slate-400">
                {appearance}
              </span>
              <div className="pointer-events-none flex flex-wrap gap-2">
                {HTTP_STATUS_BADGE_CLASS_SAMPLES.map(({ status }) => (
                  <HttpStatusBadge
                    key={status}
                    status={status}
                    appearance={appearance}
                    size="sm"
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StatusClassGrid({
  appearance,
}: {
  appearance: HttpStatusBadgeAppearance;
}) {
  return (
    <div className="mt-12">
      <p className="text-sm font-semibold text-slate-900 dark:text-white">
        Tone per status class
      </p>
      <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-600 dark:text-slate-400">
        One representative code per HTTP status class, each resolving to its
        semantic tone.
      </p>
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {HTTP_STATUS_BADGE_CLASS_SAMPLES.map(({ label, status }) => (
          <div
            key={status}
            className="flex flex-col items-start gap-2 rounded-xl p-3 ring-1 ring-slate-200 dark:ring-white/10"
          >
            <span className="text-xs text-slate-600 dark:text-slate-400">
              {label}
            </span>
            <HttpStatusBadge status={status} appearance={appearance} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function HttpStatusBadgePlayground() {
  const [status, setStatus] = useState<number>(200);
  const [appearance, setAppearance] =
    useState<HttpStatusBadgeAppearance>("soft");
  const [size, setSize] = useState<HttpStatusBadgeSize>("md");
  const [showText, setShowText] = useState(true);

  const demoProps: HttpStatusBadgeDemoProps = {
    status,
    appearance,
    size,
    showText,
  };
  const code = httpStatusBadgeSnippet(demoProps);

  return (
    <div className="mt-6 rounded-xl">
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <VariantSelect
          label="Status"
          value={String(status)}
          options={HTTP_STATUS_BADGE_SAMPLES.map(String)}
          onChange={(value) => setStatus(Number(value))}
        />
        <VariantSelect
          label="Appearance"
          value={appearance}
          options={HTTP_STATUS_BADGE_APPEARANCES}
          onChange={setAppearance}
        />
        <VariantSelect
          label="Size"
          value={size}
          options={HTTP_STATUS_BADGE_SIZES}
          onChange={setSize}
        />
      </div>
      <label className="mb-6 inline-flex items-center gap-2 text-xs font-semibold text-slate-900 dark:text-white">
        <input
          type="checkbox"
          checked={showText}
          onChange={(e) => setShowText(e.target.checked)}
          className="size-4 rounded border-slate-300 dark:border-white/20"
        />
        Show reason phrase
      </label>
      <PreviewCodeShowcase code={code}>
        <HttpStatusBadgeDemo {...demoProps} />
      </PreviewCodeShowcase>
      <AppearanceGallery selected={appearance} onSelect={setAppearance} />
      <StatusClassGrid appearance={appearance} />
    </div>
  );
}
