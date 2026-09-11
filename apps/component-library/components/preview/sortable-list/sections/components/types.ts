import type { SortableListProps } from "@zentauri-ui/zentauri-components/ui/sortable-list";

export type SortableListDemoItem = {
  id: string;
  title: string;
};

export type SortableListAppearance = NonNullable<
  SortableListProps<SortableListDemoItem>["appearance"]
>;

export type SortableListSize = NonNullable<
  SortableListProps<SortableListDemoItem>["size"]
>;

export type SortableListDemoProps = {
  appearance: SortableListAppearance;
  size: SortableListSize;
  showMoveButtons: boolean;
  items: readonly SortableListDemoItem[];
};
