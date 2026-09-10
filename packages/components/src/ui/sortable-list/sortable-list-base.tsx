"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";
import type { SortableListItemProps, SortableListProps } from "./types";
import { zuiSortableListGradientHandle } from "../../design-system/sortable-list";
import {
  sortableListHandleVariants,
  sortableListItemVariants,
  sortableListVariants,
} from "./variants";

export function SortableList<T>({
  items,
  defaultItems,
  getItemId,
  renderItem,
  onItemsChange,
  appearance,
  size,
  disabled = false,
  label,
  showMoveButtons = true,
  className,
  ...rest
}: SortableListProps<T>) {
  const [orderedItems, setOrderedItems] = useState<T[]>(() => [
    ...(defaultItems ?? items),
  ]);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const dragIndex = useRef<number | null>(null);

  useEffect(() => {
    if (defaultItems === undefined) setOrderedItems([...items]);
  }, [defaultItems, items]);

  const moveItem = (from: number, to: number) => {
    if (
      disabled ||
      from === to ||
      from < 0 ||
      to < 0 ||
      to >= orderedItems.length
    )
      return;
    const next = [...orderedItems];
    const [moved] = next.splice(from, 1);
    if (moved === undefined) return;
    next.splice(to, 0, moved);
    setOrderedItems(next);
    onItemsChange?.(next);
  };

  return (
    <ul
      ref={rest.ref}
      data-slot="sortable-list"
      aria-label={label}
      className={cn(sortableListVariants({ appearance, size }), className)}
      {...rest}
    >
      {orderedItems.map((item, index) => {
        const id = getItemId(item, index);
        return (
          <SortableListItem
            key={id}
            size={size}
            appearance={appearance}
            dragging={draggingId === id}
            draggable={!disabled}
            onDragStart={() => {
              dragIndex.current = index;
              setDraggingId(id);
            }}
            onDragOver={(event) => {
              event.preventDefault();
              if (dragIndex.current !== null)
                moveItem(dragIndex.current, index);
              dragIndex.current = index;
            }}
            onDragEnd={() => {
              dragIndex.current = null;
              setDraggingId(null);
            }}
          >
            <span
              className={cn(
                sortableListHandleVariants(),
                appearance?.startsWith("gradient-") &&
                  zuiSortableListGradientHandle,
              )}
              aria-hidden="true"
            >
              ⋮⋮
            </span>
            <span className="min-w-0 flex-1">{renderItem(item, index)}</span>
            {showMoveButtons && (
              <span className="flex shrink-0 gap-1">
                <button
                  type="button"
                  aria-label={`Move item ${index + 1} up`}
                  disabled={disabled || index === 0}
                  onClick={() => moveItem(index, index - 1)}
                  className="rounded px-1.5 text-xs text-slate-500 hover:bg-black/5 disabled:opacity-30 dark:hover:bg-white/10"
                >
                  ↑
                </button>
                <button
                  type="button"
                  aria-label={`Move item ${index + 1} down`}
                  disabled={disabled || index === orderedItems.length - 1}
                  onClick={() => moveItem(index, index + 1)}
                  className="rounded px-1.5 text-xs text-slate-500 hover:bg-black/5 disabled:opacity-30 dark:hover:bg-white/10"
                >
                  ↓
                </button>
              </span>
            )}
          </SortableListItem>
        );
      })}
    </ul>
  );
}

export function SortableListItem({
  appearance,
  size,
  dragging = false,
  className,
  children,
  ...rest
}: SortableListItemProps) {
  return (
    <li
      data-slot="sortable-list-item"
      aria-grabbed={dragging}
      className={cn(
        sortableListItemVariants({ appearance, size }),
        dragging && "opacity-50 ring-2 ring-inset ring-sky-500",
        className,
      )}
      {...rest}
    >
      {children}
    </li>
  );
}

SortableList.displayName = "SortableList";
SortableListItem.displayName = "SortableListItem";
