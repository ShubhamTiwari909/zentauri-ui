import { variantLeadComment } from "@/components/common/variant-code-prefix";

import { TOOLTIP_TRIGGER_CLASS } from "./tooltip-code-examples.data";
import type {
  ContentAnimation,
  ContentSize,
  ContentVariant,
  ContentWidth,
  TooltipPlacement,
} from "./tooltip-code-examples.types";

export function contentVariantSizeSnippet(
  variant: ContentVariant,
  size: ContentSize,
): string {
  const variantAttr = variant === "default" ? "" : ` variant="${variant}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  return `${variantLeadComment(
    `TooltipContent · variant · ${variant}, size · ${size}`,
  )}<Tooltip>
  <TooltipTrigger className="${TOOLTIP_TRIGGER_CLASS}">
    Hover · ${variant} · ${size}
  </TooltipTrigger>
  <TooltipContent${variantAttr}${sizeAttr}>
    Tooltip for ${variant} / ${size}.
  </TooltipContent>
</Tooltip>`;
}

export function positionSnippet(position: TooltipPlacement): string {
  const positionAttr = position === "top" ? "" : ` position="${position}"`;
  return `${variantLeadComment(`Tooltip · position · ${position}`)}<Tooltip${positionAttr}>
  <TooltipTrigger className="${TOOLTIP_TRIGGER_CLASS}">
    Hover
  </TooltipTrigger>
  <TooltipContent className="min-w-50">
    Tooltip body
  </TooltipContent>
</Tooltip>`;
}

export function animationSnippet(animation: ContentAnimation): string {
  const animationAttr = animation === "fade" ? "" : ` animation="${animation}"`;
  return `${variantLeadComment(`TooltipContentAnimated · animation · ${animation}`)}<Tooltip>
  <TooltipTrigger className="${TOOLTIP_TRIGGER_CLASS}">
    Hover · animation · ${animation}
  </TooltipTrigger>
  <TooltipContentAnimated variant="outline"${animationAttr}>
    Motion preset: ${animation}.
  </TooltipContentAnimated>
</Tooltip>`;
}

export function contentVariantWidthSnippet(
  variant: ContentVariant,
  width: ContentWidth,
): string {
  const variantAttr = variant === "default" ? "" : ` variant="${variant}"`;
  const widthAttr = width === "fit" ? "" : ` width="${width}"`;
  return `${variantLeadComment(
    `TooltipContent · variant · ${variant}, width · ${width}`,
  )}<Tooltip>
  <TooltipTrigger className="${TOOLTIP_TRIGGER_CLASS}">
    Hover · {variant} · {width}
  </TooltipTrigger>
  <TooltipContent${variantAttr}${widthAttr}>
    Tooltip for {variant} / {width}.
  </TooltipContent>
</Tooltip>`;
}
