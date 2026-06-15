"use client";

import { useState } from "react";

import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { variantLeadComment } from "@/components/common/variant-code-prefix";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxSearch,
  ComboboxTrigger,
  ComboboxValue,
} from "@zentauri-ui/zentauri-components/ui/combobox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@zentauri-ui/zentauri-components/ui/select";
import type {
  ComboboxContentProps,
  ComboboxTriggerProps,
} from "@zentauri-ui/zentauri-components/ui/combobox";

import {
  COMBOBOX_CONTENT_APPEARANCES,
  COMBOBOX_CONTENT_SIZES,
  COMBOBOX_TRIGGER_SIZES,
  COMBOBOX_TRIGGER_VARIANTS,
  DEMO_FRAMEWORKS,
} from "./data";

type TriggerVariant = NonNullable<ComboboxTriggerProps["variant"]>;
type TriggerSize = NonNullable<ComboboxTriggerProps["size"]>;
type ContentAppearance = NonNullable<ComboboxContentProps["appearance"]>;
type ContentSize = NonNullable<ComboboxContentProps["size"]>;

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

function comboboxPlaygroundSnippet(
  triggerVariant: TriggerVariant,
  triggerSize: TriggerSize,
  contentAppearance: ContentAppearance,
  contentSize: ContentSize,
): string {
  const triggerVariantAttr =
    triggerVariant === "default" ? "" : ` variant="${triggerVariant}"`;
  const triggerSizeAttr = triggerSize === "md" ? "" : ` size="${triggerSize}"`;
  const appearanceAttr =
    contentAppearance === "default" ? "" : ` appearance="${contentAppearance}"`;
  const contentSizeAttr = contentSize === "md" ? "" : ` size="${contentSize}"`;
  return `${variantLeadComment(
    `Combobox · trigger ${triggerVariant}/${triggerSize}, content ${contentAppearance}/${contentSize}`,
  )}<Combobox defaultValue={["react"]} multiple={false}>
  <ComboboxTrigger${triggerVariantAttr}${triggerSizeAttr}>
    <ComboboxValue placeholder="Select framework" />
  </ComboboxTrigger>
  <ComboboxContent${appearanceAttr}${contentSizeAttr}>
    <ComboboxSearch placeholder="Search..." />
    <ComboboxList>
      <ComboboxItem value="react">React</ComboboxItem>
      <ComboboxItem value="vue">Vue</ComboboxItem>
      <ComboboxItem value="svelte">Svelte</ComboboxItem>
      <ComboboxItem value="angular" disabled>Angular (disabled)</ComboboxItem>
      <ComboboxEmpty>No framework found.</ComboboxEmpty>
    </ComboboxList>
  </ComboboxContent>
</Combobox>`;
}

export function ComboboxPlayground() {
  const [triggerVariant, setTriggerVariant] =
    useState<TriggerVariant>("default");
  const [triggerSize, setTriggerSize] = useState<TriggerSize>("md");
  const [contentAppearance, setContentAppearance] =
    useState<ContentAppearance>("default");
  const [contentSize, setContentSize] = useState<ContentSize>("md");

  const code = comboboxPlaygroundSnippet(
    triggerVariant,
    triggerSize,
    contentAppearance,
    contentSize,
  );

  return (
    <div className="mt-6 rounded-xl">
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <VariantSelect
          label="Trigger variant"
          value={triggerVariant}
          options={COMBOBOX_TRIGGER_VARIANTS}
          onChange={setTriggerVariant}
        />
        <VariantSelect
          label="Trigger size"
          value={triggerSize}
          options={COMBOBOX_TRIGGER_SIZES}
          onChange={setTriggerSize}
        />
        <VariantSelect
          label="Content appearance"
          value={contentAppearance}
          options={COMBOBOX_CONTENT_APPEARANCES}
          onChange={setContentAppearance}
        />
        <VariantSelect
          label="Content size"
          value={contentSize}
          options={COMBOBOX_CONTENT_SIZES}
          onChange={setContentSize}
        />
      </div>
      <PreviewCodeShowcase code={code}>
        <div className="max-w-md">
          <Combobox defaultValue={["react"]} multiple={false}>
            <ComboboxTrigger variant={triggerVariant} size={triggerSize}>
              <ComboboxValue placeholder="Select framework" />
            </ComboboxTrigger>
            <ComboboxContent appearance={contentAppearance} size={contentSize}>
              <ComboboxSearch placeholder="Search..." />
              <ComboboxList>
                {DEMO_FRAMEWORKS.map((f) => (
                  <ComboboxItem key={f.value} value={f.value}>
                    {f.label}
                  </ComboboxItem>
                ))}
                <ComboboxItem value="angular" disabled>
                  Angular (disabled)
                </ComboboxItem>
                <ComboboxEmpty>No framework found.</ComboboxEmpty>
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>
      </PreviewCodeShowcase>
    </div>
  );
}
