import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@zentauri-ui/zentauri-components/ui/tooltip";
import { cn } from "@/lib/utils";

import { TOOLTIP_TRIGGER_CLASS } from "./tooltip-code-examples.data";
import type {
  ContentAnimation,
  ContentSize,
  ContentVariant,
  ContentWidth,
  TooltipPlacement,
} from "./tooltip-code-examples.types";

export function ContentVariantSizeDemo({
  variant,
  size,
}: {
  variant: ContentVariant;
  size: ContentSize;
}) {
  return (
    <Tooltip>
      <TooltipTrigger className={TOOLTIP_TRIGGER_CLASS}>
        Hover · Variant: {variant} · Size: {size}
      </TooltipTrigger>
      <TooltipContent variant={variant} size={size}>
        Tooltip for {variant} / {size}.
      </TooltipContent>
    </Tooltip>
  );
}

const positionLayoutClass: Record<TooltipPlacement, string> = {
  top: "justify-center",
  bottom: "justify-center",
  left: "justify-end",
  right: "justify-start",
};

export function PositionDemo({ position }: { position: TooltipPlacement }) {
  return (
    <>
      <p className="mb-5 text-xs md:text-sm">Position: {position}</p>
      <div
        className={cn(
          "flex min-h-44 w-full max-w-xl items-center p-4",
          positionLayoutClass[position],
        )}
      >
        <p className="mb-5 text-xs md:text-sm"></p>
        <Tooltip position={position}>
          <TooltipTrigger className={TOOLTIP_TRIGGER_CLASS}>
            Hover
          </TooltipTrigger>
          <TooltipContent className="min-w-50" variant="outline">
            Tooltip body.
          </TooltipContent>
        </Tooltip>
      </div>
    </>
  );
}

export function ContentVariantWidthDemo({
  variant,
  width,
}: {
  variant: ContentVariant;
  width: ContentWidth;
}) {
  return (
    <Tooltip>
      <TooltipTrigger className={TOOLTIP_TRIGGER_CLASS}>
        Hover · Variant: {variant} · Width: {width}
      </TooltipTrigger>
      <TooltipContent variant={variant} width={width}>
        Tooltip for {variant} / {width}.
      </TooltipContent>
    </Tooltip>
  );
}

export function AnimationDemo({ animation }: { animation: ContentAnimation }) {
  return (
    <Tooltip>
      <TooltipTrigger className={TOOLTIP_TRIGGER_CLASS}>
        Hover · animation · {animation}
      </TooltipTrigger>
      <TooltipContent variant="outline" animation={animation}>
        Motion preset: {animation}.
      </TooltipContent>
    </Tooltip>
  );
}
