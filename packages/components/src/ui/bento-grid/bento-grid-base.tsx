"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type MutableRefObject,
  type ReactNode,
  type Ref,
} from "react";

import { cn } from "../../lib/utils";

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

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Focus management for the detail view: moves focus into the panel on mount,
 * traps Tab/Shift+Tab inside it, and closes on Escape. Focus return to the
 * triggering item is handled by the item's close handler.
 */
export function useBentoGridDetailFocusTrap(onClose: () => void) {
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    panelRef.current?.focus();
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;
      const focusables = Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      );
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (!first || !last) {
        event.preventDefault();
        return;
      }
      const active = document.activeElement;
      if (event.shiftKey && (active === first || active === panel)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  return { panelRef, handleKeyDown };
}

/**
 * Static detail view: plain conditional overlay (no portal, no morph). The
 * animated entry ships its own motion-based panel and reuses the focus trap.
 */
export function BentoGridDetailPanelBase({
  onClose,
  children,
}: {
  onClose: () => void;
  children: ReactNode;
}) {
  const { panelRef, handleKeyDown } = useBentoGridDetailFocusTrap(onClose);

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
        <BentoGridDetailPanelBase onClose={closeDetail}>
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
