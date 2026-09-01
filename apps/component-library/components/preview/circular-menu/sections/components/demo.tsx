"use client";

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

import type { CircularMenuDemoProps } from "./types";

const ITEM_POOL: CircularMenuItemData[] = [
  { id: "copy", label: "Copy", icon: <FiCopy /> },
  { id: "share", label: "Share", icon: <FiShare2 /> },
  { id: "edit", label: "Edit", icon: <FiEdit2 /> },
  { id: "save", label: "Save", icon: <FiSave /> },
  { id: "download", label: "Download", icon: <FiDownload /> },
  { id: "link", label: "Copy link", icon: <FiLink /> },
  { id: "star", label: "Star", icon: <FiStar /> },
  { id: "bookmark", label: "Bookmark", icon: <FiBookmark /> },
  { id: "like", label: "Like", icon: <FiHeart /> },
  { id: "notify", label: "Notify", icon: <FiBell /> },
  { id: "send", label: "Send", icon: <FiSend /> },
  { id: "delete", label: "Delete", icon: <FiTrash2 /> },
];

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
