import { variantLeadComment } from "@/components/common/variant-code-prefix";

import { CIRCULAR_MENU_ITEM_POOL_DATA } from "./item-pool-data";
import type { CircularMenuDemoProps } from "./types";

/** Renders `itemCount` `items` array entries, cycling the pool like `buildCircularMenuItems`. */
function circularMenuItemsSnippet(itemCount: number): string {
  const pool = CIRCULAR_MENU_ITEM_POOL_DATA;
  const lines = Array.from({ length: itemCount }, (_, index) => {
    const pooled = pool[index % pool.length];
    const id = index < pool.length ? pooled.id : `${pooled.id}-${index}`;
    const onSelect = index === 0 ? `, onSelect: () => copy()` : "";
    return `  { id: "${id}", label: "${pooled.label}", icon: <${pooled.icon} />${onSelect} },`;
  });
  return lines.join("\n");
}

/** Builds the playground snippet, omitting every attribute left at its default. */
export function circularMenuSnippet(opts: CircularMenuDemoProps): string {
  const {
    appearance,
    size,
    trigger,
    labelPlacement,
    itemRotation,
    animation,
    itemCount,
    radius,
    startAngle,
    sweep,
    spin,
    showSpokes,
    disabled,
  } = opts;

  const isAnimated = animation !== "none";
  const importPath = isAnimated
    ? "@zentauri-ui/zentauri-components/ui/circular-menu/animated"
    : "@zentauri-ui/zentauri-components/ui/circular-menu";

  const attributes = [
    appearance === "default" ? "" : ` appearance="${appearance}"`,
    size === "md" ? "" : ` size="${size}"`,
    trigger === "click" ? "" : ` trigger="${trigger}"`,
    labelPlacement === "tooltip" ? "" : ` labelPlacement="${labelPlacement}"`,
    itemRotation === "upright" ? "" : ` itemRotation="${itemRotation}"`,
    size === "md" && radius === 132 ? "" : ` radius={${radius}}`,
    startAngle === 0 ? "" : ` startAngle={${startAngle}}`,
    sweep === 360 ? "" : ` sweep={${sweep}}`,
    spin ? " spin" : "",
    showSpokes ? " showSpokes" : "",
    disabled ? " disabled" : "",
    isAnimated && animation !== "pop" ? ` animation="${animation}"` : "",
  ].join("");

  const lead = variantLeadComment(
    `appearance · ${appearance}, size · ${size}, items · ${itemCount}, radius · ${radius}, sweep · ${sweep}, animation · ${animation}`,
  );

  return `import { CircularMenu } from "${importPath}";

const items = [
${circularMenuItemsSnippet(itemCount)}
];

${lead}<CircularMenu${attributes}
  label="Menu"
  items={items}
  onSelect={(item) => console.log(item.id)}
/>`;
}

/** Half-circle fan anchored to a corner, the usual radial FAB shape. */
export function circularMenuArcSnippet(): string {
  return `${variantLeadComment("quarter arc · FAB")}import { CircularMenu } from "@zentauri-ui/zentauri-components/ui/circular-menu/animated";

<CircularMenu
  appearance="gradient-blue"
  trigger="hover"
  radius={140}
  startAngle={-90}
  sweep={90}
  labelPlacement="outside"
  items={items}
/>`;
}

/** Decorative always-open ring that rotates on its own. */
export function circularMenuOrbitSnippet(): string {
  return `${variantLeadComment("orbit · always open, spinning")}<CircularMenu
  appearance="violet"
  trigger="always"
  spin
  spinDuration={18}
  showSpokes
  itemRotation="upright"
  items={items}
/>`;
}

export function circularMenuControlledSnippet(): string {
  return `${variantLeadComment("controlled state")}const [open, setOpen] = useState(false);

<CircularMenu
  appearance="emerald"
  open={open}
  onOpenChange={setOpen}
  closeOnSelect={false}
  items={items}
  onSelect={(item) => setLastAction(item.id)}
/>`;
}
