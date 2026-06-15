"use client";

import { useState } from "react";

import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { variantLeadComment } from "@/components/common/variant-code-prefix";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@zentauri-ui/zentauri-components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@zentauri-ui/zentauri-components/ui/select";
import { FiCheckCircle, FiSettings } from "react-icons/fi";

import {
  POPOVER_ALIGNS,
  POPOVER_ANIMATIONS,
  POPOVER_SIDES,
  POPOVER_SIZES,
  POPOVER_VARIANTS,
  POPOVER_WIDTHS,
} from "./data";
import { PopoverAnimationDemo } from "./demo";
import { popoverAnimationSnippet } from "./snippets";
import type {
  PopoverAlignValue,
  PopoverAnimationValue,
  PopoverSideValue,
  PopoverSize,
  PopoverVariant,
  PopoverWidth,
} from "./types";
import { cn } from "@/lib/utils";

const triggerClass =
  "inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/15";

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

function popoverPlaygroundSnippet(
  variant: PopoverVariant,
  size: PopoverSize,
  width: PopoverWidth,
  side: PopoverSideValue,
  align: PopoverAlignValue,
): string {
  const variantAttr = variant === "default" ? "" : ` variant="${variant}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  const widthAttr = width === "xs" ? "" : ` width="${width}"`;
  const sideAttr = side === "bottom" ? "" : ` side="${side}"`;
  const alignAttr = align === "center" ? "" : ` align="${align}"`;
  return `${variantLeadComment(
    `PopoverContent · variant ${variant}, size ${size}, width ${width}, side ${side}, align ${align}`,
  )}<Popover>
  <PopoverTrigger>
    <button type="button">Open ${variant}</button>
  </PopoverTrigger>
  <PopoverContent${variantAttr}${sizeAttr}${widthAttr}${sideAttr}${alignAttr}>
    <p>Review status, assign ownership, and save the next action.</p>
  </PopoverContent>
</Popover>`;
}

function PopoverPlaygroundDemo({
  variant,
  size,
  width,
  side,
  align,
}: {
  variant: PopoverVariant;
  size: PopoverSize;
  width: PopoverWidth;
  side: PopoverSideValue;
  align: PopoverAlignValue;
}) {
  const rootSideClassNames: Record<PopoverSideValue, string> = {
    left: "justify-end",
    right: "justify-start",
    top: "justify-center",
    bottom: "justify-center",
  };
  return (
    <div
      className={cn(
        "flex min-h-56 w-full items-center py-8",
        rootSideClassNames[side],
      )}
    >
      <Popover>
        <PopoverTrigger>
          <button type="button" className={triggerClass}>
            <FiSettings className="h-4 w-4" aria-hidden />
            Open · {variant} · {size}
          </button>
        </PopoverTrigger>
        <PopoverContent
          variant={variant}
          size={size}
          width={width}
          side={side}
          align={align}
        >
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <FiCheckCircle className="h-4 w-4" aria-hidden />
              <p className="text-sm font-semibold">
                {variant} / {size}
              </p>
            </div>
            <p className="text-sm leading-6 opacity-90">
              Review status, assign ownership, and save the next action.
            </p>
            <button
              type="button"
              className="rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white dark:bg-white dark:text-slate-950"
            >
              Save action
            </button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export function PopoverPlayground() {
  const [variant, setVariant] = useState<PopoverVariant>("default");
  const [size, setSize] = useState<PopoverSize>("md");
  const [width, setWidth] = useState<PopoverWidth>("xs");
  const [side, setSide] = useState<PopoverSideValue>("bottom");
  const [align, setAlign] = useState<PopoverAlignValue>("start");
  const [animation, setAnimation] = useState<PopoverAnimationValue>("fade");

  const code = popoverPlaygroundSnippet(variant, size, width, side, align);
  const animationCode = popoverAnimationSnippet(animation);

  return (
    <div className="mt-6 rounded-xl">
      <p className="text-cyan-400 font-semibold text-sm mb-4">
        For mobile viewport, all the popovers are top and start aligned so they
        won&rsquo;t overflow outside the screen
      </p>
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <VariantSelect
          label="Appearance"
          value={variant}
          options={POPOVER_VARIANTS}
          onChange={setVariant}
        />
        <VariantSelect
          label="Size"
          value={size}
          options={POPOVER_SIZES}
          onChange={setSize}
        />
        <VariantSelect
          label="Width"
          value={width}
          options={POPOVER_WIDTHS}
          onChange={setWidth}
        />
        <VariantSelect
          label="Side"
          value={side}
          options={POPOVER_SIDES}
          onChange={setSide}
        />
        <VariantSelect
          label="Align"
          value={align}
          options={POPOVER_ALIGNS}
          onChange={setAlign}
        />
      </div>
      <PreviewCodeShowcase code={code}>
        <PopoverPlaygroundDemo
          variant={variant}
          size={size}
          width={width}
          side={side}
          align={align}
        />
      </PreviewCodeShowcase>

      <div className="mt-12">
        <p className="text-sm font-semibold text-slate-900 dark:text-white">
          Animated popover
        </p>
        <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-600 dark:text-slate-400">
          The animated entry renders <code>PopoverContentAnimated</code> with a
          motion preset. Pick a preset to preview it live.
        </p>
        <div className="mt-5 mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <VariantSelect
            label="Animation"
            value={animation}
            options={POPOVER_ANIMATIONS}
            onChange={setAnimation}
          />
        </div>
        <PreviewCodeShowcase code={animationCode}>
          <PopoverAnimationDemo animation={animation} />
        </PreviewCodeShowcase>
      </div>
    </div>
  );
}
