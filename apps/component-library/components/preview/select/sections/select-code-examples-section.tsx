"use client";

import { variantLeadComment } from "@/components/preview/common/variant-code-prefix";
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

const SELECT_TRIGGER_APPEARANCES = ["default", "ghost", "error"] as const satisfies readonly NonNullable<
  SelectTriggerProps["appearance"]
>[];

const SELECT_TRIGGER_SIZES = ["sm", "md", "lg"] as const satisfies readonly NonNullable<
  SelectTriggerProps["size"]
>[];

const SELECT_CONTENT_APPEARANCES = ["default", "glass"] as const satisfies readonly NonNullable<
  SelectContentProps["appearance"]
>[];

const SELECT_CONTENT_SIZES = ["sm", "md", "lg"] as const satisfies readonly NonNullable<
  SelectContentProps["size"]
>[];

function selectTriggerSnippet(opts: {
  triggerAppearance: NonNullable<SelectTriggerProps["appearance"]>;
  triggerSize: NonNullable<SelectTriggerProps["size"]>;
}) {
  const { triggerAppearance, triggerSize } = opts;
  const appearanceAttr =
    triggerAppearance === "default" ? "" : ` appearance="${triggerAppearance}"`;
  const sizeAttr = triggerSize === "md" ? "" : ` size="${triggerSize}"`;
  return `${variantLeadComment(`SelectTrigger · appearance · ${triggerAppearance}, size · ${triggerSize}`)}<Select defaultValue="opt-a">
  <SelectTrigger${appearanceAttr}${sizeAttr}>
    <SelectValue placeholder="Choose" />
  </SelectTrigger>
  <SelectContent appearance="default" size="md" animation="fade">
    <SelectItem value="opt-a">Option A</SelectItem>
    <SelectItem value="opt-b">Option B</SelectItem>
  </SelectContent>
</Select>`;
}

function SelectTriggerDemo(opts: {
  triggerAppearance: NonNullable<SelectTriggerProps["appearance"]>;
  triggerSize: NonNullable<SelectTriggerProps["size"]>;
}) {
  const { triggerAppearance, triggerSize } = opts;
  return (
    <div className="max-w-md">
      <Select defaultValue="opt-a">
        <SelectTrigger appearance={triggerAppearance} size={triggerSize}>
          <SelectValue placeholder="Choose" />
        </SelectTrigger>
        <SelectContent appearance="default" size="md" animation="fade">
          <SelectItem value="opt-a">Option A</SelectItem>
          <SelectItem value="opt-b">Option B</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

function selectContentSnippet(opts: {
  contentAppearance: NonNullable<SelectContentProps["appearance"]>;
  contentSize: NonNullable<SelectContentProps["size"]>;
}) {
  const { contentAppearance, contentSize } = opts;
  const appearanceAttr =
    contentAppearance === "default" ? "" : ` appearance="${contentAppearance}"`;
  const sizeAttr = contentSize === "md" ? "" : ` size="${contentSize}"`;
  return `${variantLeadComment(`SelectContent · appearance · ${contentAppearance}, size · ${contentSize}`)}<Select defaultValue="opt-a">
  <SelectTrigger appearance="ghost" size="sm">
    <SelectValue placeholder="Choose" />
  </SelectTrigger>
  <SelectContent${appearanceAttr}${sizeAttr} animation="fade">
    <SelectItem value="opt-a">Option A</SelectItem>
    <SelectItem value="opt-b">Option B</SelectItem>
  </SelectContent>
</Select>`;
}

function SelectContentDemo(opts: {
  contentAppearance: NonNullable<SelectContentProps["appearance"]>;
  contentSize: NonNullable<SelectContentProps["size"]>;
}) {
  const { contentAppearance, contentSize } = opts;
  return (
    <div className="max-w-md">
      <Select defaultValue="opt-a">
        <SelectTrigger appearance="ghost" size="sm">
          <SelectValue placeholder="Choose" />
        </SelectTrigger>
        <SelectContent appearance={contentAppearance} size={contentSize} animation="fade">
          <SelectItem value="opt-a">Option A</SelectItem>
          <SelectItem value="opt-b">Option B</SelectItem>
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
        Trigger styling first, then list surface tokens, with matching JSX for each row. Each snippet starts with Variant: naming the part and tokens.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {SELECT_TRIGGER_APPEARANCES.map((triggerAppearance) => (
          <PreviewCodeShowcase
            key={`tr-app-${triggerAppearance}`}
            code={selectTriggerSnippet({ triggerAppearance, triggerSize: "md" })}
          >
            <SelectTriggerDemo triggerAppearance={triggerAppearance} triggerSize="md" />
          </PreviewCodeShowcase>
        ))}
        {SELECT_TRIGGER_SIZES.map((triggerSize) => (
          <PreviewCodeShowcase
            key={`tr-size-${triggerSize}`}
            code={selectTriggerSnippet({ triggerAppearance: "default", triggerSize })}
          >
            <SelectTriggerDemo triggerAppearance="default" triggerSize={triggerSize} />
          </PreviewCodeShowcase>
        ))}
        {SELECT_CONTENT_APPEARANCES.map((contentAppearance) => (
          <PreviewCodeShowcase
            key={`ct-app-${contentAppearance}`}
            code={selectContentSnippet({ contentAppearance, contentSize: "md" })}
          >
            <SelectContentDemo contentAppearance={contentAppearance} contentSize="md" />
          </PreviewCodeShowcase>
        ))}
        {SELECT_CONTENT_SIZES.map((contentSize) => (
          <PreviewCodeShowcase
            key={`ct-size-${contentSize}`}
            code={selectContentSnippet({ contentAppearance: "glass", contentSize })}
          >
            <SelectContentDemo contentAppearance="glass" contentSize={contentSize} />
          </PreviewCodeShowcase>
        ))}
      </div>
    </section>
  );
}
