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

import { HashGeneratorDemo } from "./demo";
import { HASH_GENERATOR_ALGORITHMS } from "./data";
import { hashGeneratorSnippet } from "./snippets";
import type { HashGeneratorAlgorithm, HashGeneratorDemoProps } from "./types";

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

export function HashGeneratorPlayground() {
  const [algorithm, setAlgorithm] = useState<HashGeneratorAlgorithm>("sha256");

  const demoProps: HashGeneratorDemoProps = {
    algorithm,
  };

  const code = hashGeneratorSnippet(demoProps);

  return (
    <div className="mt-6 rounded-xl">
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <VariantSelect
          label="Algorithm"
          value={algorithm}
          options={HASH_GENERATOR_ALGORITHMS}
          onChange={setAlgorithm}
        />
      </div>
      <PreviewCodeShowcase code={code}>
        <HashGeneratorDemo {...demoProps} />
      </PreviewCodeShowcase>
    </div>
  );
}
