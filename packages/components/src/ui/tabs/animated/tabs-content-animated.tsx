"use client";

import { motion, prefersReducedMotion, useReducedMotion } from "framer-motion";

import { cn } from "../../../lib/utils";

import { getTabsContentMotionProps } from "./animations";
import type { TabsContentAnimatedProps } from "./types";
import { useTabs } from "../tabs-base";

export function TabsContentAnimated({
  value,
  children,
  className,
  animation = "fade",
}: TabsContentAnimatedProps) {
  const {
    value: activeValue,
    orientation,
    tabTriggerId,
    tabPanelId,
  } = useTabs();
  const prefersReducedMotion = useReducedMotion();

  if (activeValue !== value) return null;

  const motionProps = getTabsContentMotionProps(
    animation,
    orientation,
    Boolean(prefersReducedMotion),
  );

  return (
    <motion.div
      id={tabPanelId(value)}
      role="tabpanel"
      aria-labelledby={tabTriggerId(value)}
      {...motionProps}
      className={cn("mt-2", className)}
    >
      {children}
    </motion.div>
  );
}

TabsContentAnimated.displayName = "TabsContent";
