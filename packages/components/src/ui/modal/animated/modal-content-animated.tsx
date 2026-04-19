"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { createPortal } from "react-dom";

import { cn } from "../../../lib/utils";
import { useFocusManagement } from "../../../hooks/useFocusManagement";

import { modalOverlayAnimationPresets } from "./animations";
import type { ModalContentAnimatedProps } from "./types";
import { modalContentVariants, modalOverlayVariants } from "../variants";
import { useModalContext } from "../modal-base";

export function ModalContentAnimated({
  className,
  size,
  position,
  appearance,
  animation = "scale",
  children,
  ref,
  id,
  style,
}: ModalContentAnimatedProps) {
  const { open, setOpen, titleId, descriptionId, contentRef } =
    useModalContext("ModalContent");
  const reduceMotion = useReducedMotion();
  const overlayMotion =
    modalOverlayAnimationPresets[reduceMotion ? "fade" : animation];
  const panelMotion =
    modalOverlayAnimationPresets[reduceMotion ? "fade" : animation];

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
        <div className="fixed inset-0 z-50" data-slot="modal-portal">
          <motion.button
            type="button"
            aria-hidden
            tabIndex={-1}
            data-slot="modal-overlay"
            className={modalOverlayVariants()}
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
                (ref as React.RefObject<HTMLDivElement | null>).current = node;
              }
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            data-slot="modal-content"
            tabIndex={-1}
            className={cn(
              modalContentVariants({ size, position, appearance }),
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

ModalContentAnimated.displayName = "ModalContent";
