"use client";

import { useState } from "react";

import { variantLeadComment } from "@/components/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/components/ui";

export function SelectExamplesSection() {
  const [controlledValues, setControlledValues] = useState<string[]>(["react"]);

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40">
      <h2 className="mt-3 text-2xl font-semibold text-white">Examples</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Single-select, multi-select, and controlled value patterns with trigger and content variants.
      </p>
      <div className="mt-6 max-w-md space-y-10 rounded-xl">
        <PreviewCodeShowcase
          code={`${variantLeadComment("SelectTrigger · ghost sm, SelectContent · glass md, single select")}
<Select defaultValue={["a"]} multiple={false}>
  <SelectTrigger variant="ghost" size="sm">
    <SelectValue placeholder="Choose" />
  </SelectTrigger>
  <SelectContent appearance="glass" size="md">
    <SelectItem value="a">Option A</SelectItem>
    <SelectItem value="b">Option B</SelectItem>
  </SelectContent>
</Select>`}
        >
          <Select defaultValue={["a"]} multiple={false}>
            <SelectTrigger variant="ghost" size="sm">
              <SelectValue placeholder="Choose" />
            </SelectTrigger>
            <SelectContent appearance="glass" size="md">
              <SelectItem value="a">Option A</SelectItem>
              <SelectItem value="b">Option B</SelectItem>
            </SelectContent>
          </Select>
        </PreviewCodeShowcase>

        <PreviewCodeShowcase
          code={`${variantLeadComment("Multi select · outline trigger, default content")}
<Select multiple defaultValue={["x"]}>
  <SelectTrigger variant="outline" size="md">
    <SelectValue placeholder="Pick any" />
  </SelectTrigger>
  <SelectContent appearance="default" size="md">
    <SelectItem value="x">Alpha</SelectItem>
    <SelectItem value="y">Beta</SelectItem>
    <SelectItem value="z">Gamma</SelectItem>
  </SelectContent>
</Select>`}
        >
          <Select multiple defaultValue={["x"]}>
            <SelectTrigger variant="outline" size="md">
              <SelectValue placeholder="Pick any" />
            </SelectTrigger>
            <SelectContent appearance="default" size="md">
              <SelectItem value="x">Alpha</SelectItem>
              <SelectItem value="y">Beta</SelectItem>
              <SelectItem value="z">Gamma</SelectItem>
            </SelectContent>
          </Select>
        </PreviewCodeShowcase>

        <PreviewCodeShowcase
          code={`${variantLeadComment("Controlled · value + onChange, emerald trigger")}
const [value, setValue] = useState<string[]>(["react"]);

<Select multiple value={value} onChange={setValue}>
  <SelectTrigger variant="emerald" size="lg">
    <SelectValue placeholder="Libraries" />
  </SelectTrigger>
  <SelectContent appearance="default" size="sm">
    <SelectItem value="react">React</SelectItem>
    <SelectItem value="vue">Vue</SelectItem>
    <SelectItem value="svelte">Svelte</SelectItem>
  </SelectContent>
</Select>`}
        >
          <Select multiple value={controlledValues} onChange={setControlledValues}>
            <SelectTrigger variant="emerald" size="lg">
              <SelectValue placeholder="Libraries" />
            </SelectTrigger>
            <SelectContent appearance="default" size="sm">
              <SelectItem value="react">React</SelectItem>
              <SelectItem value="vue">Vue</SelectItem>
              <SelectItem value="svelte">Svelte</SelectItem>
            </SelectContent>
          </Select>
        </PreviewCodeShowcase>
      </div>
    </section>
  );
}
