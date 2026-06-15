"use client";

import { useState } from "react";

import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { variantLeadComment } from "@/components/common/variant-code-prefix";
import {
  Avatar,
  AvatarFallback,
} from "@zentauri-ui/zentauri-components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@zentauri-ui/zentauri-components/ui/select";

import { AvatarDemo } from "./demo";
import { AVATAR_ANIMATIONS, AVATAR_APPEARANCES, AVATAR_SIZES } from "./data";
import type {
  AvatarDemoAnimation,
  AvatarDemoAppearance,
  AvatarDemoSize,
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

function avatarPlaygroundSnippet(
  size: AvatarDemoSize,
  appearance: AvatarDemoAppearance,
  animation: AvatarDemoAnimation,
): string {
  const lead = variantLeadComment(
    `size · ${size}, appearance · ${appearance}, animation · ${animation}`,
  );
  if (animation === "none") {
    return `${lead}<Avatar size="${size}" appearance="${appearance}">
  <AvatarFallback>ZU</AvatarFallback>
</Avatar>`;
  }
  return `${lead}<AvatarAnimated size="${size}" appearance="${appearance}" animation="${animation}">
  <AvatarFallback>ZU</AvatarFallback>
</AvatarAnimated>`;
}

type AppearanceGalleryProps = {
  selected: AvatarDemoAppearance;
  onSelect: (appearance: AvatarDemoAppearance) => void;
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
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {AVATAR_APPEARANCES.map((appearance) => {
          const isActive = appearance === selected;
          return (
            <button
              key={appearance}
              type="button"
              aria-pressed={isActive}
              onClick={() => onSelect(appearance)}
              className={`flex flex-col items-center gap-2 rounded-xl p-3 transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                isActive
                  ? "ring-2 ring-sky-500 ring-offset-2 ring-offset-white dark:ring-offset-slate-950"
                  : "ring-1 ring-slate-200 hover:ring-slate-300 dark:ring-white/10 dark:hover:ring-white/20"
              }`}
            >
              {/* Visual only — pointer events go to the wrapping button so the
                  swatch selects rather than interacting with the avatar. */}
              <div className="pointer-events-none">
                <Avatar size="sm" appearance={appearance}>
                  <AvatarFallback>ZU</AvatarFallback>
                </Avatar>
              </div>
              <span className="text-[11px] leading-4 text-slate-600 dark:text-slate-400">
                {appearance}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function AvatarPlayground() {
  const [size, setSize] = useState<AvatarDemoSize>("md");
  const [appearance, setAppearance] = useState<AvatarDemoAppearance>("default");
  const [animation, setAnimation] = useState<AvatarDemoAnimation>("none");

  const code = avatarPlaygroundSnippet(size, appearance, animation);

  return (
    <div className="mt-6 rounded-xl">
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <VariantSelect
          label="Size"
          value={size}
          options={AVATAR_SIZES}
          onChange={setSize}
        />
        <VariantSelect
          label="Appearance"
          value={appearance}
          options={AVATAR_APPEARANCES}
          onChange={setAppearance}
        />
        <VariantSelect
          label="Animation"
          value={animation}
          options={AVATAR_ANIMATIONS}
          onChange={setAnimation}
        />
      </div>
      <PreviewCodeShowcase code={code}>
        <AvatarDemo size={size} appearance={appearance} animation={animation} />
      </PreviewCodeShowcase>
      <AppearanceGallery selected={appearance} onSelect={setAppearance} />
    </div>
  );
}
