"use client";

import { useMemo, useState } from "react";
import type { KeyboardEvent } from "react";

import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { variantLeadComment } from "@/components/common/variant-code-prefix";
import { Button } from "@zentauri-ui/zentauri-components/ui/buttons";
import { ButtonAnimated } from "@zentauri-ui/zentauri-components/ui/buttons/animated";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@zentauri-ui/zentauri-components/ui/select";

import { buttonAnimationPresets, showcaseButtons, sizeButtons } from "./data";
import type { ButtonAnimation, ButtonAppearance, ButtonSize } from "./types";

const BUTTON_APPEARANCES = showcaseButtons.map(
  (button) => button.appearance,
) as ButtonAppearance[];
const BUTTON_SIZES = sizeButtons.map((button) => button.size) as ButtonSize[];
const BUTTON_ANIMATIONS = buttonAnimationPresets.map(
  (preset) => preset[1],
) as ButtonAnimation[];

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

function buttonPlaygroundSnippet(
  appearance: ButtonAppearance,
  size: ButtonSize,
  animation: ButtonAnimation,
): string {
  const lead = variantLeadComment(
    `appearance · ${appearance} | size · ${size} | animation · ${animation}`,
  );
  if (animation === "none") {
    return `${lead}<Button appearance="${appearance}" size="${size}" className="w-40">Button</Button>`;
  }
  return `${lead}<ButtonAnimated appearance="${appearance}" size="${size}" animation="${animation}" className="w-40">Button</ButtonAnimated>`;
}

type AppearanceGalleryProps = {
  selected: ButtonAppearance;
  onSelect: (appearance: ButtonAppearance) => void;
};

function AppearanceGallery({ selected, onSelect }: AppearanceGalleryProps) {
  const handleKeyDown =
    (appearance: ButtonAppearance) =>
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
        {BUTTON_APPEARANCES.map((itemAppearance) => {
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
              <div className="pointer-events-none">
                <Button
                  appearance={itemAppearance}
                  size="sm"
                  className="min-w-full justify-center"
                >
                  {itemAppearance}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ButtonPlayground() {
  const [appearance, setAppearance] = useState<ButtonAppearance>("default");
  const [size, setSize] = useState<ButtonSize>("md");
  const [animation, setAnimation] = useState<ButtonAnimation>("lift");

  const code = useMemo(
    () => buttonPlaygroundSnippet(appearance, size, animation),
    [appearance, size, animation],
  );

  return (
    <div className="mt-6 rounded-xl">
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <VariantSelect
          label="Appearance"
          value={appearance}
          options={BUTTON_APPEARANCES}
          onChange={setAppearance}
        />
        <VariantSelect
          label="Size"
          value={size}
          options={BUTTON_SIZES}
          onChange={setSize}
        />
        <VariantSelect
          label="Animation"
          value={animation}
          options={BUTTON_ANIMATIONS}
          onChange={setAnimation}
        />
      </div>
      <PreviewCodeShowcase code={code}>
        {animation === "none" ? (
          <Button appearance={appearance} size={size} className="w-40">
            Button
          </Button>
        ) : (
          <ButtonAnimated
            appearance={appearance}
            size={size}
            animation={animation}
            className="w-40"
          >
            Button
          </ButtonAnimated>
        )}
      </PreviewCodeShowcase>
      <AppearanceGallery selected={appearance} onSelect={setAppearance} />
    </div>
  );
}
