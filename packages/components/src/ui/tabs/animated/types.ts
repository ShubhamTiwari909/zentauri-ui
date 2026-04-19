import type { HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import type { TabsValue } from "../types";

export type TabsAnimation = "none" | "fade" | "slide";

export type TabsPresetMotionProps = Pick<
  HTMLMotionProps<"div">,
    "initial" | "animate" | "transition"
  >;

  export type TabsAnimationPresets = Record<TabsAnimation, TabsPresetMotionProps>;

export type TabsOrientation = "horizontal" | "vertical";

export type TabsContentAnimatedProps = {
  value: TabsValue;
  children: ReactNode;
  className?: string;
  animation?: TabsAnimation;
} & Omit<
  HTMLMotionProps<"div">,
  "children" | "className" | "role" | "id" | "aria-labelledby"
>;
