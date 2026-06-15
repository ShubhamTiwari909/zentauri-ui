"use client";

import { useMemo, useState } from "react";

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
    </div>
  );
}
