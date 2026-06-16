"use client";

import { useState } from "react";
import type { KeyboardEvent } from "react";

import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { variantLeadComment } from "@/components/common/variant-code-prefix";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@zentauri-ui/zentauri-components/ui/select";
import {
  Tooltip,
  TooltipTrigger,
} from "@zentauri-ui/zentauri-components/ui/tooltip";
import { TooltipContentAnimated } from "@zentauri-ui/zentauri-components/ui/tooltip/animated";

import {
  CONTENT_ANIMATIONS,
  CONTENT_SIZES,
  CONTENT_VARIANTS,
  CONTENT_WIDTHS,
  TOOLTIP_POSITIONS,
} from "./data";
import type {
  ContentAnimation,
  ContentSize,
  ContentVariant,
  ContentWidth,
  TooltipPlacement,
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

function tooltipPlaygroundSnippet({
  variant,
  size,
  width,
  position,
  animation,
}: {
  variant: ContentVariant;
  size: ContentSize;
  width: ContentWidth;
  position: TooltipPlacement;
  animation: ContentAnimation;
}) {
  const positionAttr = position === "top" ? "" : ` position="${position}"`;
  const variantAttr = variant === "default" ? "" : ` variant="${variant}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  const widthAttr = width === "fit" ? "" : ` width="${width}"`;
  const animationAttr = animation === "fade" ? "" : ` animation="${animation}"`;

  return `${variantLeadComment(
    `Tooltip · position · ${position}, variant · ${variant}, size · ${size}, width · ${width}, animation · ${animation}`,
  )}<Tooltip${positionAttr}>
  <TooltipTrigger className="text-slate-900 dark:text-white">
    Hover · ${variant}
  </TooltipTrigger>
  <TooltipContentAnimated${variantAttr}${sizeAttr}${widthAttr}${animationAttr}>
    Tooltip for ${variant} / ${size}.
  </TooltipContentAnimated>
</Tooltip>`;
}

type AppearanceGalleryProps = {
  selected: ContentVariant;
  onSelect: (variant: ContentVariant) => void;
};

function AppearanceGallery({ selected, onSelect }: AppearanceGalleryProps) {
  const handleKeyDown =
    (variant: ContentVariant) => (event: KeyboardEvent<HTMLDivElement>) => {
      // Enter activates on keydown; Space activates on keyup to match the
      // native button / WAI-ARIA button pattern (allows cancel-by-move).
      if (event.key === "Enter") {
        event.preventDefault();
        onSelect(variant);
      } else if (event.key === " ") {
        event.preventDefault();
      }
    };

  const handleKeyUp =
    (variant: ContentVariant) => (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === " ") {
        event.preventDefault();
        onSelect(variant);
      }
    };

  return (
    <div className="mt-12">
      <p className="text-sm font-semibold text-slate-900 dark:text-white">
        All variants
      </p>
      <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-600 dark:text-slate-400">
        Every shipped content variant at a glance. Click any swatch to load it
        into the playground above.
      </p>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {CONTENT_VARIANTS.map((variant) => {
          const isActive = variant === selected;
          return (
            <div
              key={variant}
              role="button"
              tabIndex={0}
              aria-pressed={isActive}
              aria-label={variant}
              onClick={() => onSelect(variant)}
              onKeyDown={handleKeyDown(variant)}
              onKeyUp={handleKeyUp(variant)}
              className={`rounded-xl p-3 text-left transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                isActive
                  ? "ring-2 ring-sky-500 ring-offset-2 ring-offset-white dark:ring-offset-slate-950"
                  : "ring-1 ring-slate-200 hover:ring-slate-300 dark:ring-white/10 dark:hover:ring-white/20"
              }`}
            >
              <div
                className="pointer-events-none flex min-h-20 items-end justify-center pb-1"
                inert
              >
                <Tooltip open position="top">
                  <TooltipTrigger className="text-xs text-slate-600 dark:text-slate-400">
                    {variant}
                  </TooltipTrigger>
                  <TooltipContentAnimated
                    variant={variant}
                    size="sm"
                    width="fit"
                    animation="fade"
                  >
                    {variant}
                  </TooltipContentAnimated>
                </Tooltip>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function TooltipPlayground() {
  const [variant, setVariant] = useState<ContentVariant>("default");
  const [size, setSize] = useState<ContentSize>("md");
  const [width, setWidth] = useState<ContentWidth>("fit");
  const [position, setPosition] = useState<TooltipPlacement>("top");
  const [animation, setAnimation] = useState<ContentAnimation>("fade");

  const code = tooltipPlaygroundSnippet({
    variant,
    size,
    width,
    position,
    animation,
  });

  return (
    <div className="mt-6 rounded-xl">
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-5">
        <VariantSelect
          label="Variant"
          value={variant}
          options={CONTENT_VARIANTS}
          onChange={setVariant}
        />
        <VariantSelect
          label="Size"
          value={size}
          options={CONTENT_SIZES}
          onChange={setSize}
        />
        <VariantSelect
          label="Width"
          value={width}
          options={CONTENT_WIDTHS}
          onChange={setWidth}
        />
        <VariantSelect
          label="Position"
          value={position}
          options={TOOLTIP_POSITIONS}
          onChange={setPosition}
        />
        <VariantSelect
          label="Animation"
          value={animation}
          options={CONTENT_ANIMATIONS}
          onChange={setAnimation}
        />
      </div>
      <PreviewCodeShowcase code={code}>
        <Tooltip position={position}>
          <TooltipTrigger className="text-slate-900 dark:text-white">
            Hover · {variant} · {size}
          </TooltipTrigger>
          <TooltipContentAnimated
            variant={variant}
            size={size}
            width={width}
            animation={animation}
          >
            Tooltip for {variant} / {size}.
          </TooltipContentAnimated>
        </Tooltip>
      </PreviewCodeShowcase>
      <AppearanceGallery selected={variant} onSelect={setVariant} />
    </div>
  );
}
