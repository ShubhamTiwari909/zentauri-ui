"use client";

import { useState } from "react";

import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@zentauri-ui/zentauri-components/ui/select";

import { DrawerDemo } from "./demo";
import { DRAWER_APPEARANCES, DRAWER_SIDES, DRAWER_SIZES } from "./data";
import { drawerSnippet } from "./snippets";
import type {
  DrawerDemoAppearance,
  DrawerDemoSide,
  DrawerDemoSize,
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

export function DrawerPlayground() {
  const [side, setSide] = useState<DrawerDemoSide>("right");
  const [size, setSize] = useState<DrawerDemoSize>("md");
  const [appearance, setAppearance] = useState<DrawerDemoAppearance>("default");

  const label = `Open ${side}`;
  const code = drawerSnippet({ side, size, appearance, label });

  return (
    <div className="mt-6 rounded-xl">
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <VariantSelect
          label="Side"
          value={side}
          options={DRAWER_SIDES}
          onChange={setSide}
        />
        <VariantSelect
          label="Size"
          value={size}
          options={DRAWER_SIZES}
          onChange={setSize}
        />
        <VariantSelect
          label="Appearance"
          value={appearance}
          options={DRAWER_APPEARANCES}
          onChange={setAppearance}
        />
      </div>
      <PreviewCodeShowcase code={code}>
        <DrawerDemo
          side={side}
          size={size}
          appearance={appearance}
          label={label}
        />
      </PreviewCodeShowcase>
    </div>
  );
}
