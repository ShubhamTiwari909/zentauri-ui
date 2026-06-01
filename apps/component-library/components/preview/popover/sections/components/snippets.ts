import { variantLeadComment } from "@/components/common/variant-code-prefix";

import type {
  PopoverAlignValue,
  PopoverAnimationValue,
  PopoverSideValue,
  PopoverSize,
  PopoverVariant,
  PopoverWidth,
} from "./types";

export function popoverVariantSizeSnippet(
  variant: PopoverVariant,
  size: PopoverSize,
): string {
  const variantAttr = variant === "default" ? "" : ` variant="${variant}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  return `${variantLeadComment(
    `PopoverContent · variant · ${variant}, size · ${size} align="start"`,
  )}<Popover>
  <PopoverTrigger>
    <button type="button">Open ${variant}</button>
  </PopoverTrigger>
  <PopoverContent${variantAttr}${sizeAttr}>
    <p>Review status, assign ownership, and save the next action.</p>
  </PopoverContent>
</Popover>`;
}

export function popoverWidthSnippet(width: PopoverWidth): string {
  const widthAttr = width === "xs" ? "" : ` width="${width}"`;
  return `${variantLeadComment(`PopoverContent · width · ${width}`)}<Popover>
  <PopoverTrigger>
    <button type="button">Open width</button>
  </PopoverTrigger>
  <PopoverContent${widthAttr} align="start">
    <p>Popover content can hold short forms, lists, and status summaries.</p>
  </PopoverContent>
</Popover>`;
}

export function popoverSideAlignSnippet(
  side: PopoverSideValue,
  align: PopoverAlignValue,
): string {
  const sideAttr = side === "bottom" ? "" : ` side="${side}"`;
  const alignAttr = align === "center" ? "" : ` align="${align}"`;
  return `${variantLeadComment(
    `PopoverContent · side · ${side}, align · ${align}, mobileSide`,
  )}<Popover>
  <PopoverTrigger>
    <button type="button">Open placement</button>
  </PopoverTrigger>
  <PopoverContent${sideAttr}${alignAttr} variant="outline">
    <p>Placement uses side and align tokens.</p>
  </PopoverContent>
</Popover>`;
}

export function popoverAnimationSnippet(
  animation: PopoverAnimationValue,
): string {
  const animationAttr = animation === "fade" ? "" : ` animation="${animation}"`;
  return `${variantLeadComment(
    `PopoverContentAnimated · animation · ${animation}`,
  )}<Popover>
  <PopoverTrigger>
    <button type="button">Open motion</button>
  </PopoverTrigger>
  <PopoverContentAnimated variant="outline"${animationAttr} align="start">
    <p>Motion preset: ${animation}.</p>
  </PopoverContentAnimated>
</Popover>`;
}
