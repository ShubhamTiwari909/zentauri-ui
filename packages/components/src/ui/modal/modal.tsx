"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import { cn } from "../../lib/utils";

import { modalOverlayAnimationPresets } from "./animations";
import type {
  ModalContentProps,
  ModalProps,
  ModalSectionProps,
  ModalTriggerProps,
} from "./types";
import {
  modalContentVariants,
  modalOverlayVariants,
  modalTriggerVariants,
} from "./variants";
import { useFocusManagement } from "@/src/lib/useFocusManagement";

type ModalCtx = {
  open: boolean;
  setOpen: (next: boolean) => void;
  titleId: string;
  descriptionId: string;
  contentRef: React.RefObject<HTMLDivElement | null>;
};

const ModalContext = createContext<ModalCtx | null>(null);

function useModalContext(component: string): ModalCtx {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <Modal>`);
  }
  return ctx;
}

export function Modal({
  open,
  defaultOpen = false,
  onOpenChange,
  children,
}: ModalProps) {
  const isControlled = open !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const resolvedOpen = isControlled ? Boolean(open) : uncontrolledOpen;

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(next);
      }
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  const baseId = useId();
  const titleId = `${baseId}-title`;
  const descriptionId = `${baseId}-description`;
  const contentRef = useRef<HTMLDivElement | null>(null);

  const ctx = useMemo(
    () => ({
      open: resolvedOpen,
      setOpen,
      titleId,
      descriptionId,
      contentRef,
    }),
    [descriptionId, resolvedOpen, setOpen, titleId],
  );

  return <ModalContext.Provider value={ctx}>{children}</ModalContext.Provider>;
}

Modal.displayName = "Modal";

export function ModalTrigger({
  className,
  children,
  appearance,
  onClick,
  ref,
  ...rest
}: ModalTriggerProps) {
  const { setOpen } = useModalContext("ModalTrigger");
  return (
    <button
      ref={ref}
      type="button"
      data-slot="modal-trigger"
      className={cn(modalTriggerVariants({ appearance }), className)}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          setOpen(true);
        }
      }}
      {...rest}
    >
      {children}
    </button>
  );
}

ModalTrigger.displayName = "ModalTrigger";

export function ModalContent({
  className,
  size,
  position,
  appearance,
  animation = "scale",
  children,
  ref,
  id,
  style,
}: ModalContentProps) {
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

ModalContent.displayName = "ModalContent";

export function ModalHeader({ className, children }: ModalSectionProps) {
  return (
    <header
      data-slot="modal-header"
      className={cn("mb-4 flex flex-col gap-2", className)}
    >
      {children}
    </header>
  );
}

ModalHeader.displayName = "ModalHeader";

export function ModalBody({ className, children }: ModalSectionProps) {
  return (
    <div
      data-slot="modal-body"
      className={cn("text-sm text-slate-300", className)}
    >
      {children}
    </div>
  );
}

ModalBody.displayName = "ModalBody";

export function ModalFooter({ className, children }: ModalSectionProps) {
  return (
    <footer
      data-slot="modal-footer"
      className={cn("mt-6 flex justify-end gap-2", className)}
    >
      {children}
    </footer>
  );
}

ModalFooter.displayName = "ModalFooter";

export function ModalTitle({ className, children }: ModalSectionProps) {
  const { titleId } = useModalContext("ModalTitle");
  return (
    <h2
      id={titleId}
      data-slot="modal-title"
      className={cn("text-lg font-semibold", className)}
    >
      {children}
    </h2>
  );
}

ModalTitle.displayName = "ModalTitle";

export function ModalDescription({ className, children }: ModalSectionProps) {
  const { descriptionId } = useModalContext("ModalDescription");
  return (
    <p
      id={descriptionId}
      data-slot="modal-description"
      className={cn("text-sm text-slate-400", className)}
    >
      {children}
    </p>
  );
}

ModalDescription.displayName = "ModalDescription";

export function ModalClose({
  className,
  children,
  ...rest
}: ModalSectionProps) {
  const { setOpen } = useModalContext("ModalClose");
  return (
    <button
      type="button"
      data-slot="modal-close"
      className={cn(
        "absolute right-4 top-4 inline-flex size-9 items-center justify-center rounded-md text-slate-200 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
        className,
      )}
      aria-label="Close dialog"
      onClick={() => setOpen(false)}
      {...rest}
    >
      {children ?? "×"}
    </button>
  );
}

ModalClose.displayName = "ModalClose";
