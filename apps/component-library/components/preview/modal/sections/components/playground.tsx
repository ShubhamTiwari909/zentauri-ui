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

import { ModalDemo } from "./demo";
import {
  MODAL_ANIMATIONS,
  MODAL_APPEARANCES,
  MODAL_POSITIONS,
  MODAL_SIZES,
} from "./data";
import { modalSnippet } from "./snippets";
import type {
  ModalDemoAnimation,
  ModalDemoAppearance,
  ModalDemoPosition,
  ModalDemoSize,
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

export function ModalPlayground() {
  const [size, setSize] = useState<ModalDemoSize>("md");
  const [position, setPosition] = useState<ModalDemoPosition>("center");
  const [appearance, setAppearance] = useState<ModalDemoAppearance>("default");
  const [animation, setAnimation] = useState<ModalDemoAnimation>("scale");

  const label = `Open (${appearance})`;
  const code = modalSnippet({ size, position, appearance, animation, label });

  return (
    <div className="mt-6 rounded-xl">
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <VariantSelect
          label="Size"
          value={size}
          options={MODAL_SIZES}
          onChange={setSize}
        />
        <VariantSelect
          label="Position"
          value={position}
          options={MODAL_POSITIONS}
          onChange={setPosition}
        />
        <VariantSelect
          label="Appearance"
          value={appearance}
          options={MODAL_APPEARANCES}
          onChange={setAppearance}
        />
        <VariantSelect
          label="Animation"
          value={animation}
          options={MODAL_ANIMATIONS}
          onChange={setAnimation}
        />
      </div>
      <PreviewCodeShowcase code={code}>
        <ModalDemo
          size={size}
          position={position}
          appearance={appearance}
          animation={animation}
          label={label}
        />
      </PreviewCodeShowcase>
    </div>
  );
}
