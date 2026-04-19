"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { MutableRefObject } from "react";
import { createPortal } from "react-dom";

import { cn } from "../../../lib/utils";
import { useFocusManagement } from "../../../hooks/useFocusManagement";

import { drawerPanelPresets } from "./animations";
import { useDrawerContext } from "../drawer-base";
import {
  drawerContentVariants,
  drawerOverlayVariants,
} from "../variants";
import type { DrawerContentAnimatedProps } from "./types";

export function DrawerContentAnimated({
  className,
  side = "right",
  size,
  appearance,
  animation = "slide",
  children,
  ref,
  id,
  style,
}: DrawerContentAnimatedProps) {
  const { open, setOpen, titleId, descriptionId, contentRef } =
    useDrawerContext("DrawerContent");
  const resolvedSide = side ?? "right";
  const reduceMotion = useReducedMotion();
  const overlayMotion =
    drawerPanelPresets(resolvedSide)[reduceMotion ? "fade" : animation];
  const panelMotion =
    drawerPanelPresets(resolvedSide)[reduceMotion ? "fade" : animation];

  useFocusManagement({
    open,
    setOpen,
    contentRef,
  });

  const portalTarget = typeof document !== "undefined" ? document.body : null;
  if (!portalTarget) {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-50" data-slot="drawer-portal">
          <motion.button
            type="button"
            aria-hidden
            tabIndex={-1}
            data-slot="drawer-overlay"
            className={drawerOverlayVariants()}
            onClick={() => setOpen(false)}
            initial={animation === "none" ? false : overlayMotion.initial}
            animate={animation === "none" ? undefined : overlayMotion.animate}
            exit={animation === "none" ? undefined : overlayMotion.exit}
            transition={overlayMotion.transition}
          />
          <motion.div
            ref={(node) => {
              contentRef.current = node;
              if (typeof ref === "function") {
                ref(node);
              } else if (ref) {
                (ref as MutableRefObject<HTMLDivElement | null>).current =
                  node;
              }
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            data-slot="drawer-content"
            tabIndex={-1}
            className={cn(
              drawerContentVariants({ side: resolvedSide, size, appearance }),
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

DrawerContentAnimated.displayName = "DrawerContent";
