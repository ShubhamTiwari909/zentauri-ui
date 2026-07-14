"use client";

import {
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type MutableRefObject,
  type ReactNode,
  type Ref,
  type RefObject,
} from "react";

import { cn } from "../../lib/utils";
import { useFocusManagement } from "../../hooks/useFocusManagement";

import type {
  BentoGridBaseProps,
  BentoGridContextValue,
  BentoGridItemBaseProps,
} from "./types";
import {
  bentoGridExpandedSpanClasses,
  bentoGridItemVariants,
  bentoGridVariants,
} from "./variants";
import {
  zuiBentoGridDetailBase,
  zuiBentoGridDetailCloseBase,
  zuiBentoGridDetailOverlayBase,
} from "../../design-system/bento-grid";

export const BentoGridContext = createContext<BentoGridContextValue | null>(
  null,
);

export const useBentoGrid = () => {
  const ctx = useContext(BentoGridContext);
  if (!ctx) throw new Error("BentoGrid.Item must be used within a BentoGrid");
  return ctx;
};

export function composeRefs<T>(
  ...refs: (Ref<T> | undefined)[]
): (node: T | null) => void {
  return (node) => {
    for (const ref of refs) {
      if (!ref) continue;
      if (typeof ref === "function") ref(node);
      else (ref as MutableRefObject<T | null>).current = node;
    }
  };
}

export function bentoGridTemplateColumns(
  cols: number,
  minItemWidth?: number,
): string {
  return minItemWidth
    ? `repeat(auto-fit, minmax(min(${minItemWidth}px, 100%), 1fr))`
    : `repeat(${cols}, minmax(0, 1fr))`;
}

const NESTED_INTERACTIVE_SELECTOR =
  'a[href], button, input, select, textarea, [role="button"], [role="link"], [contenteditable="true"]';

/**
 * A detail-enabled item acts as a button, but interactive content nested
 * inside it must stay independently usable — a click/Enter on a nested link
 * or button must not also open the detail view.
 */
export function isNestedInteractiveTarget(
  target: EventTarget | null,
  item: HTMLElement | null,
): boolean {
  if (!(target instanceof Element) || !item) return false;
  const interactive = target.closest(NESTED_INTERACTIVE_SELECTOR);
  return interactive !== null && interactive !== item;
}

/**
 * Modal behavior for an open detail panel: body scroll lock, focus containment,
 * Escape to close, and focus restore to the triggering item — reuses the
 * library-wide useFocusManagement hook (same as Modal/Drawer). The panel is
 * mounted only while open, so `open` is always true for its lifetime.
 */
export function useBentoGridDetailFocus(
  onClose: () => void,
  triggerRef?: RefObject<HTMLElement | null>,
) {
  const panelRef = useRef<HTMLDivElement | null>(null);

  useFocusManagement({
    open: true,
    setOpen: (next) => {
      if (!next) onClose();
    },
    contentRef: panelRef,
    triggerRef,
  });

  return panelRef;
}

/**
 * Static detail view: plain conditional overlay (no portal, no morph). The
 * animated entry ships its own motion-based panel and reuses the focus hook.
 */
export function BentoGridDetailPanelBase({
  onClose,
  triggerRef,
  children,
}: {
  onClose: () => void;
  triggerRef?: RefObject<HTMLElement | null>;
  children: ReactNode;
}) {
  const panelRef = useBentoGridDetailFocus(onClose, triggerRef);

  return (
    <div
      data-slot="bento-grid-detail-overlay"
      className={zuiBentoGridDetailOverlayBase}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Detail view"
        tabIndex={-1}
        data-slot="bento-grid-detail"
        className={zuiBentoGridDetailBase}
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
      </div>
    </div>
  );
}

BentoGridDetailPanelBase.displayName = "BentoGridDetailPanel";

export function BentoGridBase({
  cols = 4,
  minItemWidth,
  gap,
  autoFlow,
  animation = "none",
  className,
  style,
  children,
  ref,
  ...rest
}: BentoGridBaseProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const contextValue = useMemo<BentoGridContextValue>(
    () => ({ animation, cols, openId, setOpenId }),
    [animation, cols, openId],
  );

  return (
    <BentoGridContext.Provider value={contextValue}>
      <div
        ref={ref}
        data-slot="bento-grid"
        className={cn(bentoGridVariants({ gap, autoFlow }), className)}
        style={{
          gridTemplateColumns: bentoGridTemplateColumns(cols, minItemWidth),
          ...style,
        }}
        {...rest}
      >
        {children}
      </div>
    </BentoGridContext.Provider>
  );
}

BentoGridBase.displayName = "BentoGrid";

export function BentoGridItemBase({
  id,
  span,
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
  ...rest
}: BentoGridItemBaseProps) {
  const { animation, openId, setOpenId } = useBentoGrid();
  const itemRef = useRef<HTMLDivElement | null>(null);

  // Cumulative animation gates: bento expand needs `bento`+, detail needs `morph`.
  const expandEnabled =
    expandable && (animation === "bento" || animation === "morph");
  const detailEnabled = detail !== undefined && animation === "morph";
  const open = detailEnabled && openId === id;

  const openDetail = () => {
    setOpenId(id);
    onOpenDetail?.();
  };

  // Focus return to the item is handled by the detail panel's focus
  // management on unmount (via triggerRef).
  const closeDetail = () => {
    setOpenId(null);
    onCloseDetail?.();
  };

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    onClick?.(event);
    if (!detailEnabled || event.defaultPrevented) return;
    if (isNestedInteractiveTarget(event.target, itemRef.current)) return;
    openDetail();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (!detailEnabled || event.defaultPrevented) return;
    if (isNestedInteractiveTarget(event.target, itemRef.current)) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openDetail();
    }
  };

  return (
    <>
      <div
        ref={composeRefs(itemRef, ref)}
        data-slot="bento-grid-item"
        data-expandable={expandEnabled ? "" : undefined}
        className={cn(
          bentoGridItemVariants({ span, appearance }),
          expandEnabled && bentoGridExpandedSpanClasses[expandedSpan],
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
        {...rest}
      >
        {children}
      </div>
      {/* Sibling, not child: keeps the dialog out of the role="button" subtree
          and out of the grid flow (the overlay is position:fixed). */}
      {open && (
        <BentoGridDetailPanelBase onClose={closeDetail} triggerRef={itemRef}>
          {detail}
        </BentoGridDetailPanelBase>
      )}
    </>
  );
}

BentoGridItemBase.displayName = "BentoGridItem";

export const BentoGrid = Object.assign(BentoGridBase, {
  Item: BentoGridItemBase,
});

export const BentoGridItem = BentoGridItemBase;
