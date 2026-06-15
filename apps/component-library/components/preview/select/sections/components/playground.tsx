"use client";

import { useState } from "react";

import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { variantLeadComment } from "@/components/common/variant-code-prefix";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@zentauri-ui/zentauri-components/ui/select";
import type {
  SelectContentProps,
  SelectTriggerProps,
} from "@zentauri-ui/zentauri-components/ui/select";

import {
  SELECT_CONTENT_APPEARANCES,
  SELECT_CONTENT_SIZES,
  SELECT_CONTENT_SPACING,
  SELECT_TRIGGER_SIZES,
  SELECT_TRIGGER_VARIANTS,
} from "./data";

type TriggerVariant = NonNullable<SelectTriggerProps["variant"]>;
type TriggerSize = NonNullable<SelectTriggerProps["size"]>;
type ContentAppearance = NonNullable<SelectContentProps["appearance"]>;
type ContentSize = NonNullable<SelectContentProps["size"]>;
type ContentSpacing = NonNullable<SelectContentProps["spacing"]>;

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

type PlaygroundProps = {
  triggerVariant: TriggerVariant;
  triggerSize: TriggerSize;
  contentAppearance: ContentAppearance;
  contentSize: ContentSize;
  contentSpacing: ContentSpacing;
};

function selectPlaygroundSnippet({
  triggerVariant,
  triggerSize,
  contentAppearance,
  contentSize,
  contentSpacing,
}: PlaygroundProps): string {
  const triggerVariantAttr =
    triggerVariant === "default" ? "" : ` variant="${triggerVariant}"`;
  const triggerSizeAttr = triggerSize === "md" ? "" : ` size="${triggerSize}"`;
  const appearanceAttr =
    contentAppearance === "default" ? "" : ` appearance="${contentAppearance}"`;
  const contentSizeAttr = contentSize === "md" ? "" : ` size="${contentSize}"`;
  const spacingAttr =
    contentSpacing === "default" ? "" : ` spacing="${contentSpacing}"`;
  return `${variantLeadComment(
    `Select · trigger ${triggerVariant}/${triggerSize}, content ${contentAppearance}/${contentSize}/${contentSpacing}`,
  )}<Select defaultValue={["opt-a"]} multiple={false}>
  <SelectTrigger${triggerVariantAttr}${triggerSizeAttr}>
    <SelectValue placeholder="Choose one" />
  </SelectTrigger>
  <SelectContent${appearanceAttr}${contentSizeAttr}${spacingAttr}>
    <SelectItem value="opt-a" appearance="${contentAppearance}">Option A</SelectItem>
    <SelectItem value="opt-b" appearance="${contentAppearance}">Option B</SelectItem>
    <SelectItem value="opt-c" appearance="${contentAppearance}" disabled>
      Option C (disabled)
    </SelectItem>
  </SelectContent>
</Select>`;
}

function SelectPlaygroundDemo({
  triggerVariant,
  triggerSize,
  contentAppearance,
  contentSize,
  contentSpacing,
}: PlaygroundProps) {
  return (
    <div className="max-w-md">
      <Select defaultValue={["opt-a"]} multiple={false}>
        <SelectTrigger variant={triggerVariant} size={triggerSize}>
          <SelectValue placeholder="Choose one" />
        </SelectTrigger>
        <SelectContent
          appearance={contentAppearance}
          size={contentSize}
          spacing={contentSpacing}
        >
          <SelectItem value="opt-a" appearance={contentAppearance}>
            Option A
          </SelectItem>
          <SelectItem value="opt-b" appearance={contentAppearance}>
            Option B
          </SelectItem>
          <SelectItem value="opt-c" disabled appearance={contentAppearance}>
            Option C (disabled)
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export function SelectPlayground() {
  const [triggerVariant, setTriggerVariant] =
    useState<TriggerVariant>("default");
  const [triggerSize, setTriggerSize] = useState<TriggerSize>("md");
  const [contentAppearance, setContentAppearance] =
    useState<ContentAppearance>("glass");
  const [contentSize, setContentSize] = useState<ContentSize>("md");
  const [contentSpacing, setContentSpacing] =
    useState<ContentSpacing>("default");

  const code = selectPlaygroundSnippet({
    triggerVariant,
    triggerSize,
    contentAppearance,
    contentSize,
    contentSpacing,
  });

  return (
    <div className="mt-6 rounded-xl">
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <VariantSelect
          label="Trigger variant"
          value={triggerVariant}
          options={SELECT_TRIGGER_VARIANTS}
          onChange={setTriggerVariant}
        />
        <VariantSelect
          label="Trigger size"
          value={triggerSize}
          options={SELECT_TRIGGER_SIZES}
          onChange={setTriggerSize}
        />
        <VariantSelect
          label="Content appearance"
          value={contentAppearance}
          options={SELECT_CONTENT_APPEARANCES}
          onChange={setContentAppearance}
        />
        <VariantSelect
          label="Content size"
          value={contentSize}
          options={SELECT_CONTENT_SIZES}
          onChange={setContentSize}
        />
        <VariantSelect
          label="Content spacing"
          value={contentSpacing}
          options={SELECT_CONTENT_SPACING}
          onChange={setContentSpacing}
        />
      </div>
      <PreviewCodeShowcase code={code}>
        <SelectPlaygroundDemo
          triggerVariant={triggerVariant}
          triggerSize={triggerSize}
          contentAppearance={contentAppearance}
          contentSize={contentSize}
          contentSpacing={contentSpacing}
        />
      </PreviewCodeShowcase>
    </div>
  );
}
