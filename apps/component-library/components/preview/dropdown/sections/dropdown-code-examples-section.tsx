"use client";

import { variantLeadComment } from "@/components/preview/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "@/components/ui/dropdown";

const SECTION =
  "rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40";

const MENU_SURFACE_CLASS =
  "border border-white/10 bg-slate-900 text-slate-100 shadow-lg";

const TRIGGER_VARIANTS = ["default", "outline", "ghost", "sky", "rose", "purple", "pink", "orange", "yellow", "teal", "indigo", "emerald"] as const;
const TRIGGER_SIZES = ["sm", "md", "lg"] as const;

const CONTENT_PLACEMENTS = ["top", "bottom", "left", "right"] as const;

const ITEM_VARIANTS = ["default", "destructive", "outline"] as const;

type TriggerVariant = (typeof TRIGGER_VARIANTS)[number];
type TriggerSize = (typeof TRIGGER_SIZES)[number];
type ContentPlacement = (typeof CONTENT_PLACEMENTS)[number];
type ItemVariant = (typeof ITEM_VARIANTS)[number];

function triggerSnippet(variant: TriggerVariant, size: TriggerSize) {
  const variantAttr = variant === "default" ? "" : ` variant="${variant}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  return `${variantLeadComment(
    `DropdownTrigger · variant · ${variant}, size · ${size}`,
  )}<Dropdown>
  <DropdownTrigger${variantAttr}${sizeAttr}>
    Menu
  </DropdownTrigger>
  <DropdownContent className="${MENU_SURFACE_CLASS}">
    <DropdownItem value="one">One</DropdownItem>
    <DropdownItem value="two">Two</DropdownItem>
  </DropdownContent>
</Dropdown>`;
}

function TriggerDemo({
  variant,
  size,
}: {
  variant: TriggerVariant;
  size: TriggerSize;
}) {
  return (
    <Dropdown>
      <DropdownTrigger variant={variant} size={size}>
        Menu {variant} {size}
      </DropdownTrigger>
      <DropdownContent className={MENU_SURFACE_CLASS}>
        <DropdownItem value="one">One</DropdownItem>
        <DropdownItem value="two">Two</DropdownItem>
      </DropdownContent>
    </Dropdown>
  );
}

function placementSnippet(placement: ContentPlacement) {
  const placementAttr =
    placement === "bottom" ? "" : ` placement="${placement}"`;
  return `${variantLeadComment(`DropdownContent · placement · ${placement}`)}<Dropdown>
  <DropdownTrigger variant="outline" size="sm">
    Menu
  </DropdownTrigger>
  <DropdownContent${placementAttr} className="${MENU_SURFACE_CLASS}">
    <DropdownItem value="a">Alpha</DropdownItem>
    <DropdownItem value="b">Beta</DropdownItem>
  </DropdownContent>
</Dropdown>`;
}

function PlacementDemo({ placement }: { placement: ContentPlacement }) {
  return (
    <div className="flex min-h-40 w-full max-w-xl items-center">
      <Dropdown>
        <DropdownTrigger variant="outline" size="sm">
          Menu {placement}
        </DropdownTrigger>
        <DropdownContent placement={placement} className={MENU_SURFACE_CLASS}>
          <DropdownItem value="a">Alpha</DropdownItem>
          <DropdownItem value="b">Beta</DropdownItem>
        </DropdownContent>
      </Dropdown>
    </div>
  );
}

function itemSnippet(itemVariant: ItemVariant) {
  const variantAttr =
    itemVariant === "default" ? "" : ` variant="${itemVariant}"`;
  return `${variantLeadComment(`DropdownItem · variant · ${itemVariant}`)}<Dropdown>
  <DropdownTrigger variant="outline" size="sm">
    Actions
  </DropdownTrigger>
  <DropdownContent className="${MENU_SURFACE_CLASS}">
    <DropdownItem value="safe">Keep</DropdownItem>
    <DropdownItem value="risky"${variantAttr}>
      ${itemVariant === "destructive" ? "Delete" : itemVariant === "outline" ? "Archive" : "Default row"}
    </DropdownItem>
  </DropdownContent>
</Dropdown>`;
}

function ItemVariantDemo({ itemVariant }: { itemVariant: ItemVariant }) {
  const label =
    itemVariant === "destructive"
      ? "Delete"
      : itemVariant === "outline"
        ? "Archive"
        : "Default row";

  return (
    <Dropdown>
      <DropdownTrigger variant="outline" size="sm">
        Actions {itemVariant}
      </DropdownTrigger>
      <DropdownContent className={MENU_SURFACE_CLASS}>
        <DropdownItem value="safe">Keep</DropdownItem>
        <DropdownItem value="risky" variant={itemVariant}>
          {label}
        </DropdownItem>
      </DropdownContent>
    </Dropdown>
  );
}

export function DropdownCodeExamplesSection() {
  return (
    <section className={SECTION}>
      <h2 className="mt-3 text-2xl font-semibold text-white">
        Variant code examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Each block matches one combination. Open “Show code” to copy the JSX;
        the leading comment names the variant row.
      </p>

      <h3 className="mt-10 text-lg font-semibold text-white">
        DropdownTrigger — variant × size
      </h3>
      <p className="mt-1 max-w-2xl text-sm text-slate-400">
        Three trigger variants with small, medium, and large sizes.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {TRIGGER_VARIANTS.flatMap((variant) => (
          <PreviewCodeShowcase
            key={`trigger-${variant}`}
            code={triggerSnippet(variant, "md")}
          >
            <TriggerDemo variant={variant} size="md" />
          </PreviewCodeShowcase>
        ))}
        {TRIGGER_SIZES.map((size) => (
          <PreviewCodeShowcase
            key={`trigger-${size}`}
            code={triggerSnippet("default", size)}
          >
            <TriggerDemo variant="default" size={size} />
          </PreviewCodeShowcase>
        ))}
      </div>

      <h3 className="mt-14 text-lg font-semibold text-white">
        DropdownContent — placement
      </h3>
      <p className="mt-1 max-w-2xl text-sm text-slate-400">
        Surfaces position relative to the trigger on top, bottom, left, or
        right.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {CONTENT_PLACEMENTS.map((placement) => (
          <PreviewCodeShowcase
            key={`placement-${placement}`}
            code={placementSnippet(placement)}
          >
            <PlacementDemo placement={placement} />
          </PreviewCodeShowcase>
        ))}
      </div>

      <h3 className="mt-14 text-lg font-semibold text-white">
        DropdownItem — variant
      </h3>
      <p className="mt-1 max-w-2xl text-sm text-slate-400">
        Item emphasis: default, destructive, and outline.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {ITEM_VARIANTS.map((itemVariant) => (
          <PreviewCodeShowcase
            key={`item-${itemVariant}`}
            code={itemSnippet(itemVariant)}
          >
            <ItemVariantDemo itemVariant={itemVariant} />
          </PreviewCodeShowcase>
        ))}
      </div>
    </section>
  );
}
