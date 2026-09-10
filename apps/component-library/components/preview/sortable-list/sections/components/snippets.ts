import { variantLeadComment } from "@/components/common/variant-code-prefix";

import type { SortableListDemoProps } from "./types";

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
  const itemNames = items.map((item) => item.title).join(", ");
  const lead = variantLeadComment(
    `appearance · ${appearance}, size · ${size}, move buttons · ${showMoveButtons ? "on" : "off"}`,
  );

  return `const [items, setItems] = useState([${itemNames
    .split(", ")
    .map((item) => `{ title: "${item}" }`)
    .join(", ")}]);

${lead}<SortableList
  items={items}
  getItemId={(item) => item.title}
  onItemsChange={setItems}
  renderItem={(item) => <span>{item.title}</span>}${appearanceAttr}${sizeAttr}${moveButtonsAttr}
/>`;
}
