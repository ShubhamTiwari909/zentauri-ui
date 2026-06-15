"use client";

import { useState } from "react";

import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { OTPInput } from "@zentauri-ui/zentauri-components/ui/otp-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@zentauri-ui/zentauri-components/ui/select";
import type {
  OTPInputAllowedCharacters,
  OTPInputProps,
} from "@zentauri-ui/zentauri-components/ui/otp-input";

import { OTPInputDemo } from "./demo";
import { OTP_INPUT_APPEARANCES, OTP_INPUT_SIZES } from "./data";
import { otpInputSnippet } from "./snippets";

type OTPInputAppearance = NonNullable<OTPInputProps["appearance"]>;
type OTPInputSize = NonNullable<OTPInputProps["size"]>;

const OTP_INPUT_ALLOWED_CHARACTERS = [
  "numeric",
  "alphanumeric",
] as const satisfies readonly OTPInputAllowedCharacters[];

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
  selected: OTPInputAppearance;
  onSelect: (appearance: OTPInputAppearance) => void;
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
        {OTP_INPUT_APPEARANCES.map((appearance) => {
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
              <p className="mb-2 text-xs font-semibold text-slate-900 dark:text-white">
                {appearance}
              </p>
              {/* Visual only — pointer events go to the wrapping button so the
                  swatch selects rather than focusing the cells. */}
              <div className="pointer-events-none">
                <OTPInput
                  appearance={appearance}
                  defaultValue="482"
                  length={3}
                  size="sm"
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function OTPInputPlayground() {
  const [appearance, setAppearance] = useState<OTPInputAppearance>("outline");
  const [size, setSize] = useState<OTPInputSize>("md");
  const [allowedCharacters, setAllowedCharacters] =
    useState<OTPInputAllowedCharacters>("numeric");

  const code = otpInputSnippet({ allowedCharacters, appearance, size });

  return (
    <div className="mt-6 rounded-xl">
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <VariantSelect
          label="Appearance"
          value={appearance}
          options={OTP_INPUT_APPEARANCES}
          onChange={setAppearance}
        />
        <VariantSelect
          label="Size"
          value={size}
          options={OTP_INPUT_SIZES}
          onChange={setSize}
        />
        <VariantSelect
          label="Allowed characters"
          value={allowedCharacters}
          options={OTP_INPUT_ALLOWED_CHARACTERS}
          onChange={setAllowedCharacters}
        />
      </div>
      <PreviewCodeShowcase code={code}>
        <OTPInputDemo
          allowedCharacters={allowedCharacters}
          appearance={appearance}
          size={size}
        />
      </PreviewCodeShowcase>
      <AppearanceGallery selected={appearance} onSelect={setAppearance} />
    </div>
  );
}
