"use client";

import { variantLeadComment } from "@/components/preview/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectExamplesSection() {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40">
      <h2 className="mt-3 text-2xl font-semibold text-white">Examples</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Ghost trigger with a glass list surface.
      </p>
      <div className="mt-6 max-w-md space-y-10 rounded-xl">
        <PreviewCodeShowcase
          code={`${variantLeadComment(`SelectTrigger · ghost sm, SelectContent · glass, animation · fade`)}
<Select defaultValue="a">
  <SelectTrigger appearance="ghost" size="sm">
    <SelectValue placeholder="Choose" />
  </SelectTrigger>
  <SelectContent appearance="glass" animation="fade">
    <SelectItem value="a">Option A</SelectItem>
    <SelectItem value="b">Option B</SelectItem>
  </SelectContent>
</Select>`}
        >
          <Select defaultValue="a">
            <SelectTrigger appearance="ghost" size="sm">
              <SelectValue placeholder="Choose" />
            </SelectTrigger>
            <SelectContent animation="fade" appearance="glass">
              <SelectItem value="a">Option A</SelectItem>
              <SelectItem value="b">Option B</SelectItem>
            </SelectContent>
          </Select>
        </PreviewCodeShowcase>
      </div>
    </section>
  );
}
