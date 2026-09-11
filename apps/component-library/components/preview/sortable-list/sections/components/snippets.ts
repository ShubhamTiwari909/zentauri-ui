import { variantLeadComment } from "@/components/common/variant-code-prefix";

import type { SortableListDemoProps } from "./types";

/** JSON-quote a title so an apostrophe or quote in it cannot break the snippet. */
function quote(value: string): string {
  return JSON.stringify(value);
}

export function sortableListSnippet({
  appearance,
  size,
  showMoveButtons,
  items,
}: SortableListDemoProps) {
  const appearanceAttr =
    appearance === "default" ? "" : ` appearance="${appearance}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  const moveButtonsAttr = showMoveButtons ? "" : " showMoveButtons={false}";
  // Mapped straight from the items — joining and re-splitting on ", " used to
  // tear any title that contained that sequence into two entries.
  const itemLiterals = items
    .map((item) => `  { id: ${quote(item.id)}, title: ${quote(item.title)} }`)
    .join(",\n");
  const lead = variantLeadComment(
    `appearance · ${appearance}, size · ${size}, move buttons · ${showMoveButtons ? "on" : "off"}`,
  );

  return `import { useState } from "react";
import { SortableList } from "@zentauri-ui/zentauri-components/ui/sortable-list";

const initialItems = [
${itemLiterals},
];

const [items, setItems] = useState(initialItems);

${lead}<SortableList
  items={items}
  getItemId={(item) => item.id}
  onItemsChange={setItems}
  renderItem={(item) => <span>{item.title}</span>}
  label="Release checklist"${appearanceAttr}${sizeAttr}${moveButtonsAttr}
/>`;
}
