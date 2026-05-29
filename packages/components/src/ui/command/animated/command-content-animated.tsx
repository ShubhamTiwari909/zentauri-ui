"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { createPortal } from "react-dom";
import { useEffect, useState, type RefObject } from "react";

import { cn } from "../../../lib/utils";
import { useFocusManagement } from "../../../hooks/useFocusManagement";

import { commandOverlayAnimationPresets } from "./animations";
import type { CommandContentAnimatedProps } from "./types";
import { commandContentVariants, commandOverlayVariants } from "../variants";
import { useCommandContext } from "../command-base";

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
  const { open, setOpen, labelId, contentRef, triggerRef } =
    useCommandContext("CommandContent");
  const reduceMotion = useReducedMotion();
  const overlayMotion = commandOverlayAnimationPresets.fade;
  const panelMotion =
    commandOverlayAnimationPresets[reduceMotion ? "fade" : animation];
  const [isMounted, setIsMounted] = useState(false);

  useFocusManagement({
    open,
    setOpen,
    contentRef,
    triggerRef,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const portalTarget = document.body;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-9999" data-slot="command-portal">
          <motion.div
            role="presentation"
            data-slot="command-overlay"
            className={commandOverlayVariants()}
            onClick={() => setOpen(false)}
            initial={overlayMotion.initial}
            animate={overlayMotion.animate}
            exit={overlayMotion.exit}
            transition={overlayMotion.transition}
          />
          <motion.div
            ref={(node) => {
              contentRef.current = node;
              if (typeof ref === "function") {
                ref(node);
              } else if (ref) {
                (ref as RefObject<HTMLDivElement | null>).current = node;
              }
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelId}
            data-slot="command-content"
            tabIndex={-1}
            className={cn(
              commandContentVariants({ size, appearance }),
              className,
            )}
            initial={animation === "none" ? false : panelMotion.initial}
            animate={animation === "none" ? undefined : panelMotion.animate}
            exit={animation === "none" ? undefined : panelMotion.exit}
            transition={panelMotion.transition}
            id={id}
            style={style}
          >
            {children}
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>,
    portalTarget,
  );
}

CommandContentAnimated.displayName = "CommandContent";
