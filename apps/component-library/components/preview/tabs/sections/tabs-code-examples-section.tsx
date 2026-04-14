"use client";

import { variantLeadComment } from "@/components/preview/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  type TabsProps,
} from "@/components/ui/tabs";

const SECTION =
  "rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40";

const TABS_APPEARANCES = [
  "default",
  "pill",
  "underline",
] as const satisfies readonly NonNullable<TabsProps["appearance"]>[];

const TABS_SIZES = ["sm", "md", "lg"] as const satisfies readonly NonNullable<
  TabsProps["size"]
>[];

function tabsSnippet(opts: {
  appearance: NonNullable<TabsProps["appearance"]>;
  size: NonNullable<TabsProps["size"]>;
}) {
  const { appearance, size } = opts;
  const appearanceAttr =
    appearance === "default" ? "" : ` appearance="${appearance}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  return `${variantLeadComment(`Tabs · appearance · ${appearance}, size · ${size}`)}<Tabs defaultValue="one"${appearanceAttr}${sizeAttr} animation="fade">
  <TabsList>
    <TabsTrigger value="one">One</TabsTrigger>
    <TabsTrigger value="two">Two</TabsTrigger>
  </TabsList>
  <TabsContent value="one">First panel content.</TabsContent>
  <TabsContent value="two">Second panel content.</TabsContent>
</Tabs>`;
}

function TabsDemo(opts: {
  appearance: NonNullable<TabsProps["appearance"]>;
  size: NonNullable<TabsProps["size"]>;
}) {
  const { appearance, size } = opts;
  return (
    <div>
      <p className="mb-5">Appearance: <span className="font-bold">{appearance}</span> | Size: <span className="font-bold">{size}</span></p>
      <Tabs
        defaultValue="one"
        appearance={appearance}
        size={size}
        animation="fade"
      >
        <TabsList>
          <TabsTrigger value="one">One</TabsTrigger>
          <TabsTrigger value="two">Two</TabsTrigger>
        </TabsList>
        <TabsContent value="one">First panel content.</TabsContent>
        <TabsContent value="two">Second panel content.</TabsContent>
      </Tabs>
    </div>
  );
}

export function TabsCodeExamplesSection() {
  return (
    <section className={SECTION}>
      <h2 className="mt-3 text-2xl font-semibold text-white">
        Tabs variants examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        List chrome and density; list and triggers share the same appearance
        context. Each snippet starts with Variant: for the row.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {TABS_APPEARANCES.map((appearance) => (
          <PreviewCodeShowcase
            key={`app-${appearance}`}
            code={tabsSnippet({ appearance, size: "md" })}
          >
            <TabsDemo appearance={appearance} size="md" />
          </PreviewCodeShowcase>
        ))}
        {TABS_SIZES.map((size) => (
          <PreviewCodeShowcase
            key={`size-${size}`}
            code={tabsSnippet({ appearance: "pill", size })}
          >
            <TabsDemo appearance="pill" size={size} />
          </PreviewCodeShowcase>
        ))}
      </div>
    </section>
  );
}
