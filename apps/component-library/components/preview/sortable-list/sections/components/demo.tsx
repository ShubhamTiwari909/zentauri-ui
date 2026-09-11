"use client";

import { useState } from "react";

import { SortableList } from "@zentauri-ui/zentauri-components/ui/sortable-list";

import type { SortableListDemoItem, SortableListDemoProps } from "./types";

export function SortableListDemo({
  appearance,
  size,
  showMoveButtons,
  items: initialItems,
}: SortableListDemoProps) {
  const [items, setItems] = useState([...initialItems]);

  return (
    <SortableList
      items={items}
      appearance={appearance}
      size={size}
      getItemId={(item) => item.id}
      onItemsChange={setItems}
      showMoveButtons={showMoveButtons}
      renderItem={(item: SortableListDemoItem) => <span>{item.title}</span>}
      label="Release checklist"
    />
  );
}
