"use client";

import type { VariantProps } from "class-variance-authority";

import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { variantLeadComment } from "@/components/common/variant-code-prefix";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  tabsListVariants,
  tabsTriggerVariants,
} from "@zentauri-ui/zentauri-components/ui";

const SECTION =
  "rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40";

type ListVariant = NonNullable<VariantProps<typeof tabsListVariants>["variant"]>;
type ListSize = NonNullable<VariantProps<typeof tabsListVariants>["size"]>;
type ListAppearance = NonNullable<VariantProps<typeof tabsTriggerVariants>["appearance"]>;

const TABS_LIST_VARIANTS = [
  "default",
  "pills",
  "underline",
] as const satisfies readonly ListVariant[];

const TABS_LIST_SIZES = ["sm", "md", "lg"] as const satisfies readonly ListSize[];

const TABS_LIST_APPEARANCES = [
  "default",
  "sky",
  "rose",
  "purple",
  "pink",
  "orange",
  "yellow",
  "teal",
  "indigo",
  "emerald",
  "gray",
  "gradient-blue",
  "gradient-green",
  "gradient-red",
  "gradient-yellow",
  "gradient-purple",
  "gradient-teal",
  "gradient-indigo",
  "gradient-pink",
  "gradient-orange",
] as const satisfies readonly ListAppearance[];

function tabsSnippet(opts: { variant: ListVariant; size: ListSize; appearance: ListAppearance }) {
  const { variant, size, appearance } = opts;
  const sizeAttr = size === "md" ? "" : `, size: "${size}"`;
  const listClass = `tabsListVariants({ variant: "${variant}"${sizeAttr}, orientation: "horizontal" })`;
  const triggerClass = `tabsTriggerVariants({ variant: "${variant}"${sizeAttr} })`;
  return `${variantLeadComment(`Tabs · list variant · ${variant}, size · ${size}, appearance · ${appearance}`)}<Tabs defaultValue="one">
  <TabsList className={${listClass}}>
    <TabsTrigger className={${triggerClass}} value="one">One</TabsTrigger>
    <TabsTrigger className={${triggerClass}} value="two">Two</TabsTrigger>
  </TabsList>
  <TabsContent value="one" animation="fade">First panel content.</TabsContent>
  <TabsContent value="two" animation="fade">Second panel content.</TabsContent>
</Tabs>`;
}

function TabsDemo(opts: { variant: ListVariant; size: ListSize; appearance: ListAppearance }) {
  const { variant, size, appearance } = opts;
  const listClass = tabsListVariants({
    variant,
    size,
    orientation: "horizontal",
  });
  const triggerClass = tabsTriggerVariants({ variant, size, appearance });
  return (
    <div>
      <p className="mb-5">
        List variant: <span className="font-bold">{variant}</span> | Size:{" "}
        <span className="font-bold">{size}</span> | Appearance:{" "}
        <span className="font-bold">{appearance}</span>
      </p>
      <Tabs defaultValue="one" appearance={appearance}>
        <TabsList className={listClass}>
          <TabsTrigger className={triggerClass} value="one">
            One
          </TabsTrigger>
          <TabsTrigger className={triggerClass} value="two">
            Two
          </TabsTrigger>
        </TabsList>
        <TabsContent value="one" animation="fade">
          First panel content.
        </TabsContent>
        <TabsContent value="two" animation="fade">
          Second panel content.
        </TabsContent>
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
        List chrome and density come from{" "}
        <code className="text-xs text-cyan-200">tabsListVariants</code> and{" "}
        <code className="text-xs text-cyan-200">tabsTriggerVariants</code>; panel
        motion is set per{" "}
        <code className="text-xs text-cyan-200">TabsContent</code>. Each snippet
        starts with Variant: for the row.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {TABS_LIST_VARIANTS.map((variant) => (
          <PreviewCodeShowcase
            key={`var-${variant}`}
            code={tabsSnippet({ variant, size: "md", appearance: "default" })}
          >
            <TabsDemo variant={variant} size="md" appearance="default" />
          </PreviewCodeShowcase>
        ))}
        {TABS_LIST_SIZES.map((size) => (
          <PreviewCodeShowcase
            key={`size-${size}`}
            code={tabsSnippet({ variant: "pills", size, appearance: "default" })}
          >
            <TabsDemo variant="pills" size={size} appearance="default" />
          </PreviewCodeShowcase>
        ))}
        {TABS_LIST_APPEARANCES.map((appearance) => (
          <PreviewCodeShowcase
            key={`appearance-${appearance}`}
            code={tabsSnippet({ variant: "pills", size: "md", appearance })}
          >
            <TabsDemo variant="pills" size="md" appearance={appearance} />
          </PreviewCodeShowcase>
        ))}
      </div>
    </section>
  );
}
