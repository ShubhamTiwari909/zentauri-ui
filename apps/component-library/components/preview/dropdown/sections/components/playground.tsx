"use client";

import { useState } from "react";
import type { KeyboardEvent } from "react";

import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { variantLeadComment } from "@/components/common/variant-code-prefix";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "@zentauri-ui/zentauri-components/ui/dropdown";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@zentauri-ui/zentauri-components/ui/select";

import {
  DROPDOWN_CONTENT_PLACEMENTS,
  DROPDOWN_CONTENT_SPACINGS,
  DROPDOWN_TRIGGER_SIZES,
  DROPDOWN_TRIGGER_VARIANTS,
} from "./data";
import type {
  DropdownContentPlacement,
  DropdownContentSpacing,
  DropdownTriggerSize,
  DropdownTriggerVariant,
} from "./types";

const DROPDOWN_DIVIDERS = ["off", "on"] as const;
type DropdownDivider = (typeof DROPDOWN_DIVIDERS)[number];

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

const placementLayoutClass: Record<DropdownContentPlacement, string> = {
  top: "justify-start",
  bottom: "justify-start",
  left: "justify-end",
  right: "justify-start",
};

type AppearanceGalleryProps = {
  selected: DropdownTriggerVariant;
  onSelect: (variant: DropdownTriggerVariant) => void;
};

function AppearanceGallery({ selected, onSelect }: AppearanceGalleryProps) {
  const handleKeyDown =
    (variant: DropdownTriggerVariant) =>
    (event: KeyboardEvent<HTMLDivElement>) => {
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
    (variant: DropdownTriggerVariant) =>
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === " ") {
        event.preventDefault();
        onSelect(variant);
      }
    };

  return (
    <div className="mt-12">
      <p className="text-sm font-semibold text-slate-900 dark:text-white">
        All appearances
      </p>
      <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-600 dark:text-slate-400">
        Every shipped trigger variant at a glance. Click any swatch to load it
        into the playground above.
      </p>
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {DROPDOWN_TRIGGER_VARIANTS.map((itemVariant) => {
          const isActive = itemVariant === selected;
          return (
            <div
              key={itemVariant}
              role="button"
              tabIndex={0}
              aria-pressed={isActive}
              aria-label={itemVariant}
              onClick={() => onSelect(itemVariant)}
              onKeyDown={handleKeyDown(itemVariant)}
              onKeyUp={handleKeyUp(itemVariant)}
              className={`rounded-xl p-3 text-left transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                isActive
                  ? "ring-2 ring-sky-500 ring-offset-2 ring-offset-white dark:ring-offset-slate-950"
                  : "ring-1 ring-slate-200 hover:ring-slate-300 dark:ring-white/10 dark:hover:ring-white/20"
              }`}
            >
              <div className="pointer-events-none" inert>
                <Dropdown>
                  <DropdownTrigger variant={itemVariant} size="sm">
                    {itemVariant}
                  </DropdownTrigger>
                </Dropdown>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function dropdownPlaygroundSnippet(
  variant: DropdownTriggerVariant,
  size: DropdownTriggerSize,
  placement: DropdownContentPlacement,
  spacing: DropdownContentSpacing,
  divider: boolean,
): string {
  const variantAttr = variant === "default" ? "" : ` variant="${variant}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  const placementAttr =
    placement === "bottom" ? "" : ` placement="${placement}"`;
  const spacingAttr = spacing === "default" ? "" : ` spacing="${spacing}"`;
  const dividerAttr = divider ? " divider" : "";
  return `${variantLeadComment(
    `Dropdown · variant · ${variant}, size · ${size}, placement · ${placement}, spacing · ${spacing}, divider · ${divider ? "on" : "off"}`,
  )}<Dropdown>
  <DropdownTrigger${variantAttr}${sizeAttr}>
    Menu
  </DropdownTrigger>
  <DropdownContent${placementAttr}${spacingAttr}${dividerAttr}>
    <DropdownItem value="edit">Edit</DropdownItem>
    <DropdownItem value="duplicate">Duplicate</DropdownItem>
    <DropdownItem value="archive">Archive</DropdownItem>
  </DropdownContent>
</Dropdown>`;
}

export function DropdownPlayground() {
  const [variant, setVariant] = useState<DropdownTriggerVariant>("default");
  const [size, setSize] = useState<DropdownTriggerSize>("md");
  const [placement, setPlacement] =
    useState<DropdownContentPlacement>("bottom");
  const [spacing, setSpacing] = useState<DropdownContentSpacing>("default");
  const [divider, setDivider] = useState<DropdownDivider>("off");

  const dividerOn = divider === "on";
  const code = dropdownPlaygroundSnippet(
    variant,
    size,
    placement,
    spacing,
    dividerOn,
  );

  return (
    <div className="mt-6 rounded-xl">
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <VariantSelect
          label="Trigger variant"
          value={variant}
          options={DROPDOWN_TRIGGER_VARIANTS}
          onChange={setVariant}
        />
        <VariantSelect
          label="Trigger size"
          value={size}
          options={DROPDOWN_TRIGGER_SIZES}
          onChange={setSize}
        />
        <VariantSelect
          label="Placement"
          value={placement}
          options={DROPDOWN_CONTENT_PLACEMENTS}
          onChange={setPlacement}
        />
        <VariantSelect
          label="Spacing"
          value={spacing}
          options={DROPDOWN_CONTENT_SPACINGS}
          onChange={setSpacing}
        />
        <VariantSelect
          label="Divider"
          value={divider}
          options={DROPDOWN_DIVIDERS}
          onChange={setDivider}
        />
      </div>
      <PreviewCodeShowcase code={code}>
        <div
          className={`flex ${placementLayoutClass[placement]} min-h-48 w-full max-w-xl items-center`}
        >
          <Dropdown>
            <DropdownTrigger variant={variant} size={size}>
              Menu
            </DropdownTrigger>
            <DropdownContent
              placement={placement}
              spacing={spacing}
              divider={dividerOn}
            >
              <DropdownItem value="edit" variant={variant}>
                Edit
              </DropdownItem>
              <DropdownItem value="duplicate" variant={variant}>
                Duplicate
              </DropdownItem>
              <DropdownItem value="archive" variant={variant}>
                Archive
              </DropdownItem>
            </DropdownContent>
          </Dropdown>
        </div>
      </PreviewCodeShowcase>
      <AppearanceGallery selected={variant} onSelect={setVariant} />
    </div>
  );
}
