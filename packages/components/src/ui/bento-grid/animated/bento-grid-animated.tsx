"use client";

import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
  type Transition,
} from "framer-motion";
import {
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import { createPortal } from "react-dom";

import { cn } from "../../../lib/utils";

import {
  zuiBentoGridDetailBase,
  zuiBentoGridDetailCloseBase,
  zuiBentoGridDetailOverlayBase,
} from "../../../design-system/bento-grid";
import {
  BentoGridContext,
  bentoGridTemplateColumns,
  composeRefs,
  useBentoGrid,
  useBentoGridDetailFocusTrap,
} from "../bento-grid-base";
import type { BentoGridContextValue } from "../types";
import { bentoGridItemVariants, bentoGridVariants } from "../variants";

import {
  bentoGridInstantTransition,
  bentoGridTransitionPresets,
} from "./animations";
import type {
  BentoGridAnimatedProps,
  BentoGridItemAnimatedProps,
} from "./types";

type BentoGridAnimatedContextValue = {
  transition: Transition;
  reducedMotion: boolean;
};

const BentoGridAnimatedContext =
  createContext<BentoGridAnimatedContextValue | null>(null);

const useBentoGridAnimated = () => {
  const ctx = useContext(BentoGridAnimatedContext);
  if (!ctx)
    throw new Error(
      "BentoGridAnimated.Item must be used within a BentoGridAnimated",
    );
  return ctx;
};

export function BentoGridAnimatedBase({
  cols = 4,
  minItemWidth,
  gap,
  autoFlow,
  animation = "none",
  transitionPreset = "default",
  className,
  style,
  children,
  ref,
  ...rest
}: BentoGridAnimatedProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  // Automatic prefers-reduced-motion support: items snap to state instantly.
  const reducedMotion = useReducedMotion() ?? false;

  const contextValue = useMemo<BentoGridContextValue>(
    () => ({ animation, cols, openId, setOpenId }),
    [animation, cols, openId],
  );

  const animatedContextValue = useMemo<BentoGridAnimatedContextValue>(
    () => ({
      transition: reducedMotion
        ? bentoGridInstantTransition
        : bentoGridTransitionPresets[transitionPreset],
      reducedMotion,
    }),
    [reducedMotion, transitionPreset],
  );

  return (
    <BentoGridContext.Provider value={contextValue}>
      <BentoGridAnimatedContext.Provider value={animatedContextValue}>
        <div
          ref={ref}
          data-slot="bento-grid"
          data-reduced-motion={reducedMotion ? "" : undefined}
          className={cn(bentoGridVariants({ gap, autoFlow }), className)}
          style={{
            gridTemplateColumns: bentoGridTemplateColumns(cols, minItemWidth),
            ...style,
          }}
          {...rest}
        >
          <LayoutGroup>
            <AnimatePresence initial={false} mode="popLayout">
              {children}
            </AnimatePresence>
          </LayoutGroup>
        </div>
      </BentoGridAnimatedContext.Provider>
    </BentoGridContext.Provider>
  );
}

BentoGridAnimatedBase.displayName = "BentoGridAnimated";

/**
 * The backdrop reads openId from context (context updates reach AnimatePresence's
 * frozen exiting subtree) so it stops intercepting clicks the moment the close
 * starts, not when the fade finishes.
 */
function BentoGridDetailOverlayAnimated({
  id,
  onClose,
}: {
  id: string;
  onClose: () => void;
}) {
  const { openId } = useBentoGrid();
  const { transition } = useBentoGridAnimated();
  const closing = openId !== id;

  return (
    <motion.div
      data-slot="bento-grid-detail-overlay"
      aria-hidden={closing || undefined}
      className={cn(
        zuiBentoGridDetailOverlayBase,
        closing && "pointer-events-none",
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={transition}
      onClick={onClose}
    />
  );
}

/**
 * The morphing dialog lives OUTSIDE AnimatePresence and unmounts instantly on
 * close: framer-motion never completes an AnimatePresence exit on an element
 * whose layoutId is also mounted elsewhere (the grid item content). On close
 * the item content takes the layoutId lead back and animates the morph-return;
 * only the plain backdrop fades out through AnimatePresence.
 */
function BentoGridDetailDialogAnimated({
  layoutId,
  onClose,
  children,
}: {
  layoutId: string | undefined;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const { transition } = useBentoGridAnimated();
  const { panelRef, handleKeyDown } = useBentoGridDetailFocusTrap(onClose);

  return (
    <div
      data-slot="bento-grid-detail-positioner"
      className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Detail view"
        tabIndex={-1}
        data-slot="bento-grid-detail"
        data-layout-id={layoutId}
        layoutId={layoutId}
        className={cn(zuiBentoGridDetailBase, "pointer-events-auto")}
        transition={transition}
        onKeyDown={handleKeyDown}
      >
        <button
          type="button"
          aria-label="Close detail"
          data-slot="bento-grid-detail-close"
          className={zuiBentoGridDetailCloseBase}
          onClick={onClose}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="size-4"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
        {children}
      </motion.div>
    </div>
  );
}

export function BentoGridItemAnimated({
  id,
  span = "1x1",
  appearance,
  expandable = false,
  expandedSpan = "2x2",
  detail,
  onOpenDetail,
  onCloseDetail,
  className,
  children,
  ref,
  onClick,
  onKeyDown,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ...rest
}: BentoGridItemAnimatedProps) {
  const { animation, openId, setOpenId } = useBentoGrid();
  const { transition, reducedMotion } = useBentoGridAnimated();
  const itemRef = useRef<HTMLDivElement | null>(null);
  // Expansion is React state (not CSS :hover) so Framer Motion re-measures and
  // FLIP-animates the item and its reflowing neighbors.
  const [expanded, setExpanded] = useState(false);

  const reflowEnabled = animation !== "none" && !reducedMotion;
  const expandEnabled =
    expandable && (animation === "bento" || animation === "morph");
  const detailEnabled = detail !== undefined && animation === "morph";
  const open = detailEnabled && openId === id;
  const layoutId =
    detailEnabled && !reducedMotion ? `bento-detail-${id}` : undefined;

  const openDetail = () => {
    setOpenId(id);
    onOpenDetail?.();
  };

  const closeDetail = () => {
    setOpenId(null);
    onCloseDetail?.();
    itemRef.current?.focus();
  };

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    onClick?.(event);
    if (!detailEnabled || event.defaultPrevented) return;
    openDetail();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (!detailEnabled || event.defaultPrevented) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openDetail();
    }
  };

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    onBlur?.(event);
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setExpanded(false);
    }
  };

  return (
    <>
      <motion.div
        ref={composeRefs(itemRef, ref)}
        data-slot="bento-grid-item"
        data-expandable={expandEnabled ? "" : undefined}
        data-expanded={expandEnabled && expanded ? "" : undefined}
        layout={reflowEnabled}
        transition={transition}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        className={cn(
          bentoGridItemVariants({
            span: expandEnabled && expanded ? expandedSpan : span,
            appearance,
          }),
          detailEnabled && "cursor-pointer",
          className,
        )}
        {...(detailEnabled
          ? {
              role: "button",
              tabIndex: 0,
              "aria-haspopup": "dialog" as const,
              "aria-expanded": open,
            }
          : {})}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={(event) => {
          onMouseEnter?.(event);
          if (expandEnabled) setExpanded(true);
        }}
        onMouseLeave={(event) => {
          onMouseLeave?.(event);
          if (expandEnabled) setExpanded(false);
        }}
        onFocus={(event) => {
          onFocus?.(event);
          if (expandEnabled) setExpanded(true);
        }}
        onBlur={handleBlur}
        {...rest}
      >
        {/* Shared-element source: same layoutId as the detail panel content. */}
        <motion.div
          data-slot="bento-grid-item-content"
          data-layout-id={layoutId}
          layoutId={layoutId}
          transition={transition}
          className="h-full w-full"
        >
          {children}
        </motion.div>
      </motion.div>
      {typeof document !== "undefined" &&
        detailEnabled &&
        createPortal(
          <>
            <AnimatePresence>
              {open && (
                <BentoGridDetailOverlayAnimated id={id} onClose={closeDetail} />
              )}
            </AnimatePresence>
            {open && (
              <BentoGridDetailDialogAnimated
                layoutId={layoutId}
                onClose={closeDetail}
              >
                {detail}
              </BentoGridDetailDialogAnimated>
            )}
          </>,
          document.body,
        )}
    </>
  );
}

BentoGridItemAnimated.displayName = "BentoGridItemAnimated";

export const BentoGridAnimated = Object.assign(BentoGridAnimatedBase, {
  Item: BentoGridItemAnimated,
});
