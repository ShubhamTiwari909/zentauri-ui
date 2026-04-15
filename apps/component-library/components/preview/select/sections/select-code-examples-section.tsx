"use client";

import { variantLeadComment } from "@/components/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  type SelectContentProps,
  type SelectTriggerProps,
} from "@/components/ui/select";

const SECTION =
  "rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40";

const SELECT_TRIGGER_VARIANTS = [
  "default",
  "outline",
  "ghost",
  "sky",
  "rose",
  "purple",
  "pink",
  "orange",
  "yellow",
  "teal",
  "indigo",
  "emerald",
  "glass",
] as const satisfies readonly NonNullable<SelectTriggerProps["variant"]>[];

const SELECT_TRIGGER_SIZES = ["sm", "md", "lg"] as const satisfies readonly NonNullable<
  SelectTriggerProps["size"]
>[];


const SELECT_CONTENT_SIZES = ["sm", "md", "lg"] as const satisfies readonly NonNullable<
  SelectContentProps["size"]
>[];

const SELECT_CONTENT_SPACING = ["none", "default", "sm", "md", "lg", "xl"] as const satisfies readonly NonNullable<
  SelectContentProps["spacing"]
>[];

function selectTriggerSnippet(opts: {
  triggerVariant: NonNullable<SelectTriggerProps["variant"]>;
  triggerSize: NonNullable<SelectTriggerProps["size"]>;
}) {
  const { triggerVariant, triggerSize } = opts;
  const variantAttr = triggerVariant === "default" ? "" : ` variant="${triggerVariant}"`;
  const sizeAttr = triggerSize === "md" ? "" : ` size="${triggerSize}"`;
  return `${variantLeadComment(`SelectTrigger · variant · ${triggerVariant}, size · ${triggerSize}`)}<Select defaultValue={["opt-a"]} multiple={false}>
  <SelectTrigger${variantAttr}${sizeAttr}>
    <SelectValue placeholder="Choose one" />
  </SelectTrigger>
  <SelectContent appearance="default" size="md">
    <SelectItem value="opt-a">Option A</SelectItem>
    <SelectItem value="opt-b">Option B</SelectItem>
    <SelectItem value="opt-c" disabled>
      Option C (disabled)
    </SelectItem>
  </SelectContent>
</Select>`;
}

function SelectTriggerDemo(opts: {
  triggerVariant: NonNullable<SelectTriggerProps["variant"]>;
  triggerSize: NonNullable<SelectTriggerProps["size"]>;
}) {
  const { triggerVariant, triggerSize } = opts;
  return (
    <div className="max-w-md">
      <Select defaultValue={["opt-a"]} multiple={false}>
        <SelectTrigger variant={triggerVariant} size={triggerSize}>
          <SelectValue placeholder="Choose one" />
        </SelectTrigger>
        <SelectContent appearance={triggerVariant} size="md">
          <SelectItem value="opt-a" appearance={triggerVariant}>Option A</SelectItem>
          <SelectItem value="opt-b" appearance={triggerVariant}>Option B</SelectItem>
          <SelectItem value="opt-c" disabled appearance={triggerVariant}>
            Option C (disabled)
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

function selectContentSnippet(opts: {
  contentAppearance: NonNullable<SelectContentProps["appearance"]>;
  contentSize: NonNullable<SelectContentProps["size"]>;
  contentSpacing?: NonNullable<SelectContentProps["spacing"]>;
}) {
  const { contentAppearance, contentSize, contentSpacing } = opts;
  const appearanceAttr =
    contentAppearance === "default" ? "" : ` appearance="${contentAppearance}"`;
  const sizeAttr = contentSize === "md" ? "" : ` size="${contentSize}"`;
  const spacingAttr = contentSpacing === "default" ? "" : ` spacing="${contentSpacing}"`;
  return `${variantLeadComment(`SelectContent · appearance · ${contentAppearance}, size · ${contentSize}`)}<Select defaultValue={["opt-a"]} multiple={false}>
  <SelectTrigger variant="ghost" size="sm">
    <SelectValue placeholder="Choose one" />
  </SelectTrigger>
  <SelectContent${appearanceAttr}${sizeAttr}${spacingAttr}>
    <SelectItem value="opt-a" appearance={contentAppearance}>Option A</SelectItem>
    <SelectItem value="opt-b" appearance={contentAppearance}>Option B</SelectItem>
  </SelectContent>
</Select>`;
}

function SelectContentDemo(opts: {
  contentAppearance: NonNullable<SelectContentProps["appearance"]>;
  contentSize: NonNullable<SelectContentProps["size"]>;
  contentSpacing?: NonNullable<SelectContentProps["spacing"]>;
}) {
  const { contentAppearance, contentSize, contentSpacing } = opts;
  return (
    <div className="max-w-md">
      <p className="text-sm text-slate-400 mb-5">SelectContent · Appearance · <span className="font-bold">{contentAppearance}</span>, Size · <span className="font-bold">{contentSize}</span>, Spacing · <span className="font-bold">{contentSpacing}</span></p>
      <Select defaultValue={["opt-a"]} multiple={false}>
        <SelectTrigger variant={contentAppearance} size="sm">
          <SelectValue placeholder="Choose one" />
        </SelectTrigger>
        <SelectContent appearance={contentAppearance} size={contentSize} spacing={contentSpacing}>
          <SelectItem value="opt-a" appearance={contentAppearance}>Option A</SelectItem>
          <SelectItem value="opt-b" appearance={contentAppearance}>Option B</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

function multiSelectSnippet() {
  return `${variantLeadComment("Select · multi, controlled value + onChange")}<Select
  multiple
  value={selected}
  onChange={setSelected}
>
  <SelectTrigger variant="sky" size="md">
    <SelectValue placeholder="Pick one or more" />
  </SelectTrigger>
  <SelectContent appearance="sky" size="md">
    <SelectItem value="opt-a" appearance="sky">Option A</SelectItem>
    <SelectItem value="opt-b" appearance="sky">Option B</SelectItem>
    <SelectItem value="opt-c" appearance="sky">Option C</SelectItem>
  </SelectContent>
</Select>`;
}

function MultiSelectDemo() {
  return (
    <div className="max-w-md">
      <p className="text-sm text-slate-400 mb-5">Select · multi, controlled value + onChange</p>
      <Select multiple defaultValue={["opt-a", "opt-b"]}>
        <SelectTrigger variant="sky" size="md">
          <SelectValue placeholder="Pick one or more" />
        </SelectTrigger>
        <SelectContent appearance="sky" size="md">
          <SelectItem value="opt-a" appearance="sky">Option A</SelectItem>
          <SelectItem value="opt-b" appearance="sky">Option B</SelectItem>
          <SelectItem value="opt-c" appearance="sky">Option C</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export function SelectCodeExamplesSection() {
  return (
    <section className={SECTION}>
      <h2 className="mt-3 text-2xl font-semibold text-white">Select variants examples</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Trigger uses CVA <code className="text-slate-300">variant</code> and <code className="text-slate-300">size</code>;
        the list panel uses <code className="text-slate-300">appearance</code> and <code className="text-slate-300">size</code>{" "}
        on <code className="text-slate-300">SelectContent</code>. Each snippet starts with a Variant: lead-in.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        <PreviewCodeShowcase code={multiSelectSnippet()}>
          <MultiSelectDemo />
        </PreviewCodeShowcase>
        {SELECT_TRIGGER_VARIANTS.map((triggerVariant) => (
          <PreviewCodeShowcase
            key={`tr-var-${triggerVariant}`}
            code={selectTriggerSnippet({ triggerVariant, triggerSize: "md" })}
          >
            <SelectTriggerDemo triggerVariant={triggerVariant} triggerSize="md" />
          </PreviewCodeShowcase>
        ))}
        {SELECT_TRIGGER_SIZES.map((triggerSize) => (
          <PreviewCodeShowcase
            key={`tr-size-${triggerSize}`}
            code={selectTriggerSnippet({ triggerVariant: "default", triggerSize })}
          >
            <SelectTriggerDemo triggerVariant="default" triggerSize={triggerSize} />
          </PreviewCodeShowcase>
        ))}
        {SELECT_CONTENT_SIZES.map((contentSize) => (
          <PreviewCodeShowcase
            key={`ct-size-${contentSize}`}
            code={selectContentSnippet({ contentAppearance: "glass", contentSize, contentSpacing: "default" })}
          >
            <SelectContentDemo contentAppearance="glass" contentSize={contentSize} contentSpacing="default" />
          </PreviewCodeShowcase>
        ))}
        {SELECT_CONTENT_SPACING.map((contentSpacing) => (
          <PreviewCodeShowcase
            key={`ct-spacing-${contentSpacing}`}
            code={selectContentSnippet({ contentAppearance: "sky", contentSize: "md", contentSpacing })}
          >
            <SelectContentDemo contentAppearance="sky" contentSize="md" contentSpacing={contentSpacing} />
          </PreviewCodeShowcase>
        ))}
      </div>
    </section>
  );
}
