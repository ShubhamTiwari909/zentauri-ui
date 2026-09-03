"use client";

import type { ReactNode } from "react";
import {
  FiBell,
  FiBookmark,
  FiCopy,
  FiDownload,
  FiEdit2,
  FiHeart,
  FiLink,
  FiSave,
  FiSend,
  FiShare2,
  FiStar,
  FiTrash2,
} from "react-icons/fi";

import { CircularMenu } from "@zentauri-ui/zentauri-components/ui/circular-menu";
import type { CircularMenuItemData } from "@zentauri-ui/zentauri-components/ui/circular-menu";
import { CircularMenu as CircularMenuAnimated } from "@zentauri-ui/zentauri-components/ui/circular-menu/animated";

import { CIRCULAR_MENU_ITEM_POOL_DATA } from "./item-pool-data";
import type { CircularMenuDemoProps } from "./types";

/** Resolves an icon name from `CIRCULAR_MENU_ITEM_POOL_DATA` to its element. */
const ICONS: Record<string, ReactNode> = {
  FiCopy: <FiCopy />,
  FiShare2: <FiShare2 />,
  FiEdit2: <FiEdit2 />,
  FiSave: <FiSave />,
  FiDownload: <FiDownload />,
  FiLink: <FiLink />,
  FiStar: <FiStar />,
  FiBookmark: <FiBookmark />,
  FiHeart: <FiHeart />,
  FiBell: <FiBell />,
  FiSend: <FiSend />,
  FiTrash2: <FiTrash2 />,
};

const ITEM_POOL: CircularMenuItemData[] = CIRCULAR_MENU_ITEM_POOL_DATA.map(
  (entry) => ({
    id: entry.id,
    label: entry.label,
    icon: ICONS[entry.icon],
  }),
);

/** Repeats the pool when a demo asks for more items than it holds. */
export function buildCircularMenuItems(count: number): CircularMenuItemData[] {
  return Array.from({ length: count }, (_, index) => {
    const item = ITEM_POOL[index % ITEM_POOL.length] as CircularMenuItemData;
    return index < ITEM_POOL.length
      ? item
      : { ...item, id: `${item.id}-${index}` };
  });
}

export function CircularMenuDemo({
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
}: CircularMenuDemoProps) {
  const shared = {
    appearance,
    size,
    trigger,
    labelPlacement,
    itemRotation,
    radius,
    startAngle,
    sweep,
    spin,
    showSpokes,
    disabled,
    items: buildCircularMenuItems(itemCount),
  };

  return (
    <div className="flex min-h-[420px] items-center justify-center py-6">
      {animation === "none" ? (
        <CircularMenu {...shared} />
      ) : (
        <CircularMenuAnimated animation={animation} {...shared} />
      )}
    </div>
  );
}
