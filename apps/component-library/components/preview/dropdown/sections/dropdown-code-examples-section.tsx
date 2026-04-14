"use client";

import { variantLeadComment } from "@/components/preview/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
  type DropdownContentProps,
} from "@/components/ui/dropdown";

const SECTION =
  "rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40";

const TRIGGER_CLASS =
  "rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-slate-200";

const DROPDOWN_APPEARANCES = ["default", "glass"] as const satisfies readonly NonNullable<
  DropdownContentProps["appearance"]
>[];

const DROPDOWN_SIZES = ["sm", "md", "lg"] as const satisfies readonly NonNullable<
  DropdownContentProps["size"]
>[];

function dropdownSnippet(opts: {
  appearance: NonNullable<DropdownContentProps["appearance"]>;
  size: NonNullable<DropdownContentProps["size"]>;
}) {
  const { appearance, size } = opts;
  const appearanceAttr =
    appearance === "default" ? "" : ` appearance="${appearance}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  return `${variantLeadComment(`DropdownContent · appearance · ${appearance}, size · ${size}`)}<Dropdown>
  <DropdownTrigger className="${TRIGGER_CLASS}">
    Menu
  </DropdownTrigger>
  <DropdownContent${appearanceAttr}${sizeAttr} animation="fade">
    <DropdownItem>Edit</DropdownItem>
    <DropdownItem>Duplicate</DropdownItem>
  </DropdownContent>
</Dropdown>`;
}

function DropdownDemo(opts: {
  appearance: NonNullable<DropdownContentProps["appearance"]>;
  size: NonNullable<DropdownContentProps["size"]>;
}) {
  const { appearance, size } = opts;
  return (
    <Dropdown>
      <DropdownTrigger className={TRIGGER_CLASS}>Menu</DropdownTrigger>
      <DropdownContent appearance={appearance} size={size} animation="fade">
        <DropdownItem>Edit</DropdownItem>
        <DropdownItem>Duplicate</DropdownItem>
      </DropdownContent>
    </Dropdown>
  );
}

export function DropdownCodeExamplesSection() {
  return (
    <section className={SECTION}>
      <h2 className="mt-3 text-2xl font-semibold text-white">Dropdown variants examples</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Menu surface appearance and density on the same trigger markup. Code blocks open with Variant: for the row.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {DROPDOWN_APPEARANCES.map((appearance) => (
          <PreviewCodeShowcase
            key={`app-${appearance}`}
            code={dropdownSnippet({ appearance, size: "md" })}
          >
            <DropdownDemo appearance={appearance} size="md" />
          </PreviewCodeShowcase>
        ))}
        {DROPDOWN_SIZES.map((size) => (
          <PreviewCodeShowcase
            key={`size-${size}`}
            code={dropdownSnippet({ appearance: "glass", size })}
          >
            <DropdownDemo appearance="glass" size={size} />
          </PreviewCodeShowcase>
        ))}
      </div>
    </section>
  );
}
