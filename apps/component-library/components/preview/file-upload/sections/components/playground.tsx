"use client";

import { useState } from "react";
import type { KeyboardEvent } from "react";

import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { FileUpload } from "@zentauri-ui/zentauri-components/ui/file-upload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@zentauri-ui/zentauri-components/ui/select";

import { FileUploadDemo } from "./demo";
import { FILE_UPLOAD_APPEARANCES } from "./data";
import { fileUploadSnippet } from "./snippets";

type FileUploadAppearance = (typeof FILE_UPLOAD_APPEARANCES)[number];

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
          <SelectValue placeholder={String(value)} />
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
  selected: FileUploadAppearance;
  onSelect: (appearance: FileUploadAppearance) => void;
};

function AppearanceGallery({ selected, onSelect }: AppearanceGalleryProps) {
  const handleKeyDown =
    (appearance: FileUploadAppearance) =>
    (event: KeyboardEvent<HTMLDivElement>) => {
      // Enter activates on keydown; Space activates on keyup to match the
      // native button / WAI-ARIA button pattern (allows cancel-by-move).
      if (event.key === "Enter") {
        event.preventDefault();
        onSelect(appearance);
      } else if (event.key === " ") {
        event.preventDefault();
      }
    };

  const handleKeyUp =
    (appearance: FileUploadAppearance) =>
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === " ") {
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
        {FILE_UPLOAD_APPEARANCES.map((appearance) => {
          const isActive = appearance === selected;
          return (
            <div
              key={appearance}
              role="button"
              tabIndex={0}
              aria-pressed={isActive}
              onClick={() => onSelect(appearance)}
              onKeyDown={handleKeyDown(appearance)}
              onKeyUp={handleKeyUp(appearance)}
              className={`rounded-xl p-2 text-left transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                isActive
                  ? "ring-2 ring-sky-500 ring-offset-2 ring-offset-white dark:ring-offset-slate-950"
                  : "ring-1 ring-slate-200 hover:ring-slate-300 dark:ring-white/10 dark:hover:ring-white/20"
              }`}
            >
              <div className="pointer-events-none" inert>
                <FileUpload
                  appearance={appearance}
                  disabled={appearance === "disabled"}
                  className="min-h-24"
                >
                  <span className="text-xs font-semibold text-slate-900 dark:text-white">
                    {appearance}
                  </span>
                  <span className="text-xs text-slate-600 dark:text-slate-400">
                    Drop files here
                  </span>
                </FileUpload>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function FileUploadPlayground() {
  const [appearance, setAppearance] = useState<FileUploadAppearance>("idle");

  const code = fileUploadSnippet(appearance);

  return (
    <div className="mt-6 rounded-xl">
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <VariantSelect
          label="Appearance"
          value={appearance}
          options={FILE_UPLOAD_APPEARANCES}
          onChange={setAppearance}
        />
      </div>
      <PreviewCodeShowcase code={code}>
        <FileUploadDemo appearance={appearance} />
      </PreviewCodeShowcase>
      <AppearanceGallery selected={appearance} onSelect={setAppearance} />
    </div>
  );
}
