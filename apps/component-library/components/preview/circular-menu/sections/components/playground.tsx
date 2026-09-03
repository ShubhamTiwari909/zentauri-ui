"use client";

import { useState } from "react";

import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { CircularMenu } from "@zentauri-ui/zentauri-components/ui/circular-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@zentauri-ui/zentauri-components/ui/select";

import { buildCircularMenuItems, CircularMenuDemo } from "./demo";
import {
  CIRCULAR_MENU_ANIMATIONS,
  CIRCULAR_MENU_APPEARANCES,
  CIRCULAR_MENU_ITEM_COUNTS,
  CIRCULAR_MENU_ITEM_ROTATIONS,
  CIRCULAR_MENU_LABEL_PLACEMENTS,
  CIRCULAR_MENU_RADII,
  CIRCULAR_MENU_SIZES,
  CIRCULAR_MENU_SWEEPS,
  CIRCULAR_MENU_TRIGGERS,
} from "./data";
import { circularMenuSnippet } from "./snippets";
import type {
  CircularMenuAppearanceOption,
  CircularMenuDemoProps,
  CircularMenuItemRotationOption,
  CircularMenuLabelPlacementOption,
  CircularMenuSizeOption,
  CircularMenuTriggerOption,
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

type ToggleChipProps = {
  label: string;
  active: boolean;
  onToggle: () => void;
};

function ToggleChip({ label, active, onToggle }: ToggleChipProps) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold text-slate-900 dark:text-white">
        {label}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={active}
        onClick={onToggle}
        className={`flex h-9 items-center justify-center rounded-lg border px-3 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
          active
            ? "border-sky-500 bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300"
            : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-white/10 dark:bg-white/5 dark:text-slate-400 dark:hover:border-white/20"
        }`}
      >
        {active ? "on" : "off"}
      </button>
    </label>
  );
}

type AppearanceGalleryProps = {
  selected: CircularMenuAppearanceOption;
  onSelect: (appearance: CircularMenuAppearanceOption) => void;
};

const GALLERY_ITEMS = buildCircularMenuItems(4);

function AppearanceGallery({ selected, onSelect }: AppearanceGalleryProps) {
  return (
    <div className="mt-12">
      <p className="text-sm font-semibold text-slate-900 dark:text-white">
        All appearances
      </p>
      <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-600 dark:text-slate-400">
        Every shipped appearance token at a glance, each shown as an always-open
        ring. Click any swatch to load it into the playground above.
      </p>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {CIRCULAR_MENU_APPEARANCES.map((appearance) => {
          const isActive = appearance === selected;
          return (
            // A native <button> can't be used here: CircularMenu renders its
            // own <button> trigger and items, and <button> cannot nest inside
            // <button> in HTML.
            <div
              key={appearance}
              role="button"
              tabIndex={0}
              aria-pressed={isActive}
              onClick={() => onSelect(appearance)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onSelect(appearance);
                }
              }}
              className={`flex cursor-pointer flex-col items-center gap-2 rounded-xl p-3 text-left transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                isActive
                  ? "ring-2 ring-sky-500 ring-offset-2 ring-offset-white dark:ring-offset-slate-950"
                  : "ring-1 ring-slate-200 hover:ring-slate-300 dark:ring-white/10 dark:hover:ring-white/20"
              }`}
            >
              <span className="self-start text-xs text-slate-600 dark:text-slate-400">
                {appearance}
              </span>
              {/* inert removes the nested trigger and items from the tab order
                  and from click handling, so only the tile itself is
                  interactive. */}
              <div className="pointer-events-none" inert>
                <CircularMenu
                  appearance={appearance}
                  size="sm"
                  trigger="always"
                  radius={56}
                  itemSize={24}
                  labelPlacement="none"
                  label="Menu"
                  items={GALLERY_ITEMS}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function CircularMenuPlayground() {
  const [appearance, setAppearance] =
    useState<CircularMenuAppearanceOption>("primary");
  const [size, setSize] = useState<CircularMenuSizeOption>("md");
  const [trigger, setTrigger] = useState<CircularMenuTriggerOption>("click");
  const [labelPlacement, setLabelPlacement] =
    useState<CircularMenuLabelPlacementOption>("tooltip");
  const [itemRotation, setItemRotation] =
    useState<CircularMenuItemRotationOption>("upright");
  const [animation, setAnimation] =
    useState<(typeof CIRCULAR_MENU_ANIMATIONS)[number]>("pop");
  const [itemCount, setItemCount] = useState<string>("6");
  const [radius, setRadius] = useState<string>("132");
  const [sweep, setSweep] = useState<string>("360");
  const [spin, setSpin] = useState(false);
  const [showSpokes, setShowSpokes] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const isArc = sweep !== "360";
  const demoProps: CircularMenuDemoProps = {
    appearance,
    size,
    trigger,
    labelPlacement,
    itemRotation,
    animation,
    itemCount: Number(itemCount),
    radius: Number(radius),
    // An arc reads best centred on 12 o'clock, so shift its start by half.
    startAngle: isArc ? -Number(sweep) / 2 : 0,
    sweep: Number(sweep),
    spin,
    showSpokes,
    disabled,
  };

  const code = circularMenuSnippet(demoProps);

  return (
    <div className="mt-6 rounded-xl">
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <VariantSelect
          label="Appearance"
          value={appearance}
          options={CIRCULAR_MENU_APPEARANCES}
          onChange={setAppearance}
        />
        <VariantSelect
          label="Size"
          value={size}
          options={CIRCULAR_MENU_SIZES}
          onChange={setSize}
        />
        <VariantSelect
          label="Trigger"
          value={trigger}
          options={CIRCULAR_MENU_TRIGGERS}
          onChange={setTrigger}
        />
        <VariantSelect
          label="Items"
          value={itemCount}
          options={CIRCULAR_MENU_ITEM_COUNTS}
          onChange={setItemCount}
        />
        <VariantSelect
          label="Radius"
          value={radius}
          options={CIRCULAR_MENU_RADII}
          onChange={setRadius}
        />
        <VariantSelect
          label="Sweep"
          value={sweep}
          options={CIRCULAR_MENU_SWEEPS}
          onChange={setSweep}
        />
        <VariantSelect
          label="Label"
          value={labelPlacement}
          options={CIRCULAR_MENU_LABEL_PLACEMENTS}
          onChange={setLabelPlacement}
        />
        <VariantSelect
          label="Animation"
          value={animation}
          options={CIRCULAR_MENU_ANIMATIONS}
          onChange={setAnimation}
        />
        <VariantSelect
          label="Item rotation"
          value={itemRotation}
          options={CIRCULAR_MENU_ITEM_ROTATIONS}
          onChange={setItemRotation}
        />
        <ToggleChip
          label="Spin"
          active={spin}
          onToggle={() => setSpin((value) => !value)}
        />
        <ToggleChip
          label="Spokes"
          active={showSpokes}
          onToggle={() => setShowSpokes((value) => !value)}
        />
        <ToggleChip
          label="Disabled"
          active={disabled}
          onToggle={() => setDisabled((value) => !value)}
        />
      </div>
      <p className="mb-3 text-xs text-slate-500 dark:text-slate-400">
        Open the ring, then walk it with the arrow keys — Home and End jump to
        the first and last item, Escape closes and returns focus to the trigger.
      </p>
      <PreviewCodeShowcase code={code}>
        <CircularMenuDemo {...demoProps} />
      </PreviewCodeShowcase>
      <AppearanceGallery selected={appearance} onSelect={setAppearance} />
    </div>
  );
}
