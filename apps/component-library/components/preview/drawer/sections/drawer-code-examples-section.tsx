"use client";

import { variantLeadComment } from "@/components/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  type DrawerContentProps,
} from "@repo/components/ui";

const SECTION =
  "rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40";

const TRIGGER_CLASS =
  "rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-slate-200";

const DRAWER_SIDES = ["left", "right", "top", "bottom"] as const satisfies readonly NonNullable<
  DrawerContentProps["side"]
>[];

const DRAWER_SIZES = ["sm", "md", "lg", "xl", "full"] as const satisfies readonly NonNullable<
  DrawerContentProps["size"]
>[];

const DRAWER_APPEARANCES = ["default", "glass", "sky", "rose", "purple", "pink", "orange", "yellow", "teal", "indigo", "emerald", "gray", "amber", "violet", "gradient-blue", "gradient-green", "gradient-red", "gradient-yellow", "gradient-purple", "gradient-teal", "gradient-indigo", "gradient-pink", "gradient-orange"] as const satisfies readonly NonNullable<
  DrawerContentProps["appearance"]
>[];

function drawerSnippet(opts: {
  side: NonNullable<DrawerContentProps["side"]>;
  size: NonNullable<DrawerContentProps["size"]>;
  appearance: NonNullable<DrawerContentProps["appearance"]>;
  label: string;
}) {
  const { side, size, appearance, label } = opts;
  const sideAttr = side === "right" ? "" : ` side="${side}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  const appearanceAttr =
    appearance === "default" ? "" : ` appearance="${appearance}"`;
  return `${variantLeadComment(`DrawerContent · side · ${side}, size · ${size}, appearance · ${appearance}`)}<Drawer>
  <DrawerTrigger className="${TRIGGER_CLASS}">
    ${label}
  </DrawerTrigger>
  <DrawerContent${sideAttr}${sizeAttr}${appearanceAttr} animation="fade">
    <DrawerClose />
    <DrawerHeader>
      <DrawerTitle>Panel</DrawerTitle>
    </DrawerHeader>
    <DrawerBody>
      <p className="text-sm text-slate-300">Drawer body copy.</p>
    </DrawerBody>
  </DrawerContent>
</Drawer>`;
}

function DrawerDemo(opts: {
  side: NonNullable<DrawerContentProps["side"]>;
  size: NonNullable<DrawerContentProps["size"]>;
  appearance: NonNullable<DrawerContentProps["appearance"]>;
  label: string;
}) {
  const { side, size, appearance, label } = opts;
  return (
    <Drawer>
      <DrawerTrigger className={TRIGGER_CLASS}>{label}</DrawerTrigger>
      <DrawerContent side={side} size={size} appearance={appearance} animation="fade">
        <DrawerClose />
        <DrawerHeader>
          <DrawerTitle>Panel</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <p className="text-sm text-slate-300">Drawer body copy.</p>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

export function DrawerCodeExamplesSection() {
  return (
    <section className={SECTION}>
      <h2 className="mt-3 text-2xl font-semibold text-white">Drawer variants examples</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Edge, width tier, and surface style on the same panel structure. Each snippet begins with Variant: naming the row.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {DRAWER_SIDES.map((side) => (
          <PreviewCodeShowcase
            key={`side-${side}`}
            code={drawerSnippet({
              side,
              size: "md",
              appearance: "default",
              label: `Open ${side}`,
            })}
          >
            <DrawerDemo side={side} size="md" appearance="default" label={`Open ${side}`} />
          </PreviewCodeShowcase>
        ))}
        {DRAWER_SIZES.map((size) => (
          <PreviewCodeShowcase
            key={`size-${size}`}
            code={drawerSnippet({
              side: "right",
              size,
              appearance: "default",
              label: `Open (${size})`,
            })}
          >
            <DrawerDemo side="right" size={size} appearance="default" label={`Open (${size})`} />
          </PreviewCodeShowcase>
        ))}
        {DRAWER_APPEARANCES.map((appearance) => (
          <PreviewCodeShowcase
            key={`app-${appearance}`}
            code={drawerSnippet({
              side: "right",
              size: "md",
              appearance,
              label: `Open (${appearance})`,
            })}
          >
            <DrawerDemo side="right" size="md" appearance={appearance} label={`Open (${appearance})`} />
          </PreviewCodeShowcase>
        ))}
      </div>
    </section>
  );
}
