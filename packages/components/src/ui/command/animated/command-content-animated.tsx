"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { commandOverlayAnimationPresets } from "./animations";
import type { CommandContentAnimatedProps } from "./types";
import { CommandContentLayer } from "../command-base";

export function CommandContentAnimated({
  className,
  size,
  appearance,
  animation = "slide-down",
  children,
  ref,
  id,
  style,
}: CommandContentAnimatedProps) {
  const reduceMotion = useReducedMotion();
  const overlayMotion = commandOverlayAnimationPresets.fade;
  const panelMotion =
    commandOverlayAnimationPresets[reduceMotion ? "fade" : animation];

  return (
    <CommandContentLayer
      appearance={appearance}
      className={className}
      componentName="CommandContent"
      id={id}
      ref={ref}
      renderOverlay={(overlayProps) => (
        <motion.div
          {...overlayProps}
          initial={overlayMotion.initial}
          animate={overlayMotion.animate}
          exit={overlayMotion.exit}
          transition={overlayMotion.transition}
        />
      )}
      renderPanel={(panelProps) => (
        <motion.div
          {...panelProps}
          initial={animation === "none" ? false : panelMotion.initial}
          animate={animation === "none" ? undefined : panelMotion.animate}
          exit={animation === "none" ? undefined : panelMotion.exit}
          transition={panelMotion.transition}
        />
      )}
      renderPresence={(content) => <AnimatePresence>{content}</AnimatePresence>}
      size={size}
      style={style}
    >
      {children}
    </CommandContentLayer>
  );
}

CommandContentAnimated.displayName = "CommandContent";
