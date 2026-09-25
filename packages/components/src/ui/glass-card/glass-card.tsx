"use client";
import { forwardRef } from "react";
import { GlassCardBase, GlassCardContent } from "./glass-card-base";
import type { GlassCardProps } from "./types";

const GlassCardRoot = forwardRef<HTMLDivElement, GlassCardProps>(
  (props, ref) => <GlassCardBase {...props} ref={ref} />,
);
GlassCardRoot.displayName = "ZuiGlassCard";

export const ZuiGlassCard = Object.assign(GlassCardRoot, {
  Content: GlassCardContent,
});
export { GlassCardContent };
