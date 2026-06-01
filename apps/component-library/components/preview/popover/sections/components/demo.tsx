import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@zentauri-ui/zentauri-components/ui/popover";
import { PopoverContentAnimated } from "@zentauri-ui/zentauri-components/ui/popover/animated";
import { FiBell, FiCheckCircle, FiSettings } from "react-icons/fi";

import type {
  PopoverAlignValue,
  PopoverAnimationValue,
  PopoverSideValue,
  PopoverSize,
  PopoverVariant,
  PopoverWidth,
} from "./types";
import { cn } from "@/lib/utils";

const triggerClass =
  "inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/15";

function PopoverBody({ label }: { label: string }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <FiCheckCircle className="h-4 w-4" aria-hidden />
        <p className="text-sm font-semibold">{label}</p>
      </div>
      <p className="text-sm leading-6 opacity-90">
        {label}
      </p>
      <button
        type="button"
        className="rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white dark:bg-white dark:text-slate-950"
      >
        Save action
      </button>
    </div>
  );
}

export function PopoverVariantSizeDemo({
  variant,
  size,
}: {
  variant: PopoverVariant;
  size: PopoverSize;
}) {
  return (
    <Popover>
      <PopoverTrigger>
        <button type="button" className={triggerClass}>
          <FiSettings className="h-4 w-4" aria-hidden />
          Open · {variant} · {size}
        </button>
      </PopoverTrigger>
      <PopoverContent variant={variant} size={size} align="start">
        <PopoverBody label={`${variant} / ${size}`} />
      </PopoverContent>
    </Popover>
  );
}

export function PopoverWidthDemo({ width }: { width: PopoverWidth }) {
  return (
    <Popover>
      <PopoverTrigger>
        <button type="button" className={triggerClass}>
          Width · {width}
        </button>
      </PopoverTrigger>
      <PopoverContent width={width} variant="outline" align="start">
        <PopoverBody label={`Width ${width}`} />
      </PopoverContent>
    </Popover>
  );
}

export function PopoverSideAlignDemo({
  side,
  align,
}: {
  side: PopoverSideValue;
  align: PopoverAlignValue;
}) {
  const rootSideClassNames = {
    left: "justify-end",
    right: "justify-start",
    top: "justify-center",
    bottom: "justify-center"
  }
  return (
    <div className={cn("flex min-h-56 w-full items-center py-8", rootSideClassNames[side])}>
      <Popover>
        <PopoverTrigger>
          <button type="button" className={triggerClass}>
            {side} · {align}
          </button>
        </PopoverTrigger>
        <PopoverContent side={side} align={align} variant="glass">
          <PopoverBody label={`${side} / ${align}`} />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export function PopoverAnimationDemo({
  animation,
}: {
  animation: PopoverAnimationValue;
}) {
  return (
    <Popover>
      <PopoverTrigger>
        <button type="button" className={triggerClass}>
          <FiBell className="h-4 w-4" aria-hidden />
          Motion · {animation}
        </button>
      </PopoverTrigger>
      <PopoverContentAnimated variant="outline" animation={animation} align="start">
        <PopoverBody label={`Motion ${animation}`} />
      </PopoverContentAnimated>
    </Popover>
  );
}
