import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef, ReactNode } from "react";

import type {
  sortableListItemVariants,
  sortableListVariants,
} from "./variants";

export type SortableListVariantProps = VariantProps<
  typeof sortableListVariants
>;
export type SortableListItemVariantProps = VariantProps<
  typeof sortableListItemVariants
>;

export type SortableListRenderItem<T> = (item: T, index: number) => ReactNode;

export type SortableListProps<T> = Omit<
  ComponentPropsWithRef<"ul">,
  "children" | "onChange"
> &
  SortableListVariantProps & {
    items: readonly T[];
    getItemId: (item: T, index: number) => string;
    renderItem: SortableListRenderItem<T>;
    onItemsChange?: (items: T[]) => void;
    defaultItems?: readonly T[];
    disabled?: boolean;
    label?: string;
    showMoveButtons?: boolean;
  };

export type SortableListItemProps = ComponentPropsWithRef<"li"> &
  SortableListItemVariantProps & {
    dragging?: boolean;
    children: ReactNode;
  };
