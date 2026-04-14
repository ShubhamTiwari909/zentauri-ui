"use client";

import { variantLeadComment } from "@/components/preview/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "@/components/ui/dropdown";

export function DropdownExamplesSection() {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40">
      <h2 className="mt-3 text-2xl font-semibold text-white">Examples</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Outline appearance with fade animation.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        <PreviewCodeShowcase
          code={`${variantLeadComment(`DropdownContent · appearance · default, size · sm, animation · fade`)}
<Dropdown>
  <DropdownTrigger className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-slate-200">
    Actions
  </DropdownTrigger>
  <DropdownContent appearance="default" size="sm" animation="fade">
    <DropdownItem>Edit</DropdownItem>
    <DropdownItem>Duplicate</DropdownItem>
  </DropdownContent>
</Dropdown>`}
        >
          <Dropdown>
            <DropdownTrigger className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-slate-200">
              Actions
            </DropdownTrigger>
            <DropdownContent appearance="default" animation="fade" size="sm">
              <DropdownItem>Edit</DropdownItem>
              <DropdownItem>Duplicate</DropdownItem>
            </DropdownContent>
          </Dropdown>
        </PreviewCodeShowcase>
      </div>
    </section>
  );
}
