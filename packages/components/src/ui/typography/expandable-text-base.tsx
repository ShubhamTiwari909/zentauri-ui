"use client";

import { useId } from "react";
import { useControllableState } from "../../hooks/useControllableState";
import { useTextOverflow } from "../../hooks/useTextOverflow";
import { cn } from "../../lib/utils";
import {
  zuiTypographyExpandableBase,
  zuiTypographyExpandableContent,
  zuiTypographyExpandableButton,
} from "../../design-system/typography";
import { truncateTextVariants } from "./variants";
import type { ExpandableTextProps } from "./types";

export const ExpandableTextBase = ({
  text,
  lines = 3,
  expanded: controlled,
  defaultExpanded = false,
  onExpandedChange,
  moreLabel = "Show more",
  lessLabel = "Show less",
  showToggle = "overflow",
  contentId: suppliedId,
  contentClassName,
  buttonClassName,
  className,
  ...props
}: ExpandableTextProps) => {
  const id = useId();
  const contentId = suppliedId ?? `zui-expandable-${id}`;
  const [expanded, setExpanded] = useControllableState({
    value: controlled,
    defaultValue: defaultExpanded,
    onChange: onExpandedChange,
  });
  const { ref, isOverflowing } = useTextOverflow<HTMLDivElement>({
    enabled: showToggle === "overflow",
    lines,
    measurementKey: text,
  });
  return (
    <div
      {...props}
      data-slot="typography-expandable-text"
      className={cn(zuiTypographyExpandableBase, className)}
    >
      <div
        id={contentId}
        ref={ref}
        className={cn(
          zuiTypographyExpandableContent,
          !expanded &&
            truncateTextVariants({ mode: lines === 1 ? "single" : "multiple" }),
          contentClassName,
        )}
        style={{ WebkitLineClamp: !expanded && lines > 1 ? lines : undefined }}
      >
        {text}
      </div>
      {(isOverflowing || showToggle === "always") && (
        <button
          type="button"
          aria-controls={contentId}
          aria-expanded={expanded}
          className={cn(zuiTypographyExpandableButton, buttonClassName)}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? lessLabel : moreLabel}
        </button>
      )}
    </div>
  );
};
ExpandableTextBase.displayName = "ExpandableText";
