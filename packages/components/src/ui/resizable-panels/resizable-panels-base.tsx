"use client";
import {
  Children,
  Fragment,
  isValidElement,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "../../lib/utils";
import {
  zuiResizablePanelsGripBase,
  zuiResizablePanelsGripOrientations,
} from "../../design-system/resizable-panels";
import { ResizableContext, ResizableSlotContext } from "./resizable-context";
import {
  normalizeSizes,
  panelConstraint,
  resizeIntervals,
  resizePair,
  stepResizePair,
  sameSizes,
} from "./resize-layout";
import {
  resizablePanelsVariants,
  resizablePanelVariants,
  resizableHandleVariants,
  resizablePanelContentVariants,
} from "./variants";
import type {
  ResizablePanelsProps,
  ResizablePanelProps,
  ResizableHandleProps,
} from "./types";

function flatten(
  children: ReactNode,
): ReactElement<{ id?: string; children?: ReactNode }>[] {
  return Children.toArray(children).flatMap((child) => {
    if (!isValidElement<{ id?: string; children?: ReactNode }>(child))
      throw new Error(
        "ResizablePanels accepts alternating ResizablePanel and ResizableHandle children.",
      );
    return child.type === Fragment ? flatten(child.props.children) : [child];
  });
}
function useResizableSlot() {
  const context = useContext(ResizableContext),
    index = useContext(ResizableSlotContext);
  if (!context || index === null)
    throw new Error(
      "ResizablePanel and ResizableHandle must be direct children of ResizablePanels (fragments are supported).",
    );
  return { context, index };
}

export function ResizablePanelsBase({
  orientation = "horizontal",
  sizes,
  defaultSizes,
  onSizesChange,
  onResizeEnd,
  disabled = false,
  keyboardStep = 2,
  children,
  className,
  style,
  ref,
  ...rest
}: ResizablePanelsProps) {
  const slots = flatten(children);
  const panelElements = slots.filter((_, i) => i % 2 === 0);
  if (
    slots.length > 0 &&
    (slots.length % 2 === 0 ||
      slots.some(
        (child, i) =>
          child.type !==
          (i % 2 === 0 ? ResizablePanelBase : ResizableHandleBase),
      ))
  )
    throw new Error(
      "ResizablePanels requires Panel, Handle, Panel order with exactly one handle between each pair.",
    );
  const panels = panelElements.map((child) =>
    panelConstraint(child.props as ResizablePanelProps),
  );
  const defaults = normalizeSizes(panels, defaultSizes);
  const [internal, setInternal] = useState<Record<string, number>>(() =>
    Object.fromEntries(panels.map((p, i) => [p.id, defaults[i]!])),
  );
  const layout = normalizeSizes(
    panels,
    sizes ?? panels.map((p, i) => internal[p.id] ?? defaults[i]!),
  );
  const [resizing, setResizing] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const remembered = useRef(new Map<string, number>());
  // Accepted controlled updates can collapse a pane without going through apply.
  useEffect(() => {
    panels.forEach((p, i) => {
      if (p.collapsible && layout[i]! > p.collapsed)
        remembered.current.set(p.id, layout[i]!);
    });
  }, [panels, layout]);
  const apply = (next: number[]) => {
    if (sameSizes(layout, next)) return false;
    panels.forEach((p, i) => {
      if (p.collapsible && layout[i]! > p.collapsed && next[i]! <= p.collapsed)
        remembered.current.set(p.id, layout[i]!);
    });
    if (sizes === undefined)
      setInternal(Object.fromEntries(panels.map((p, i) => [p.id, next[i]!])));
    onSizesChange?.([...next]);
    return true;
  };
  return (
    <ResizableContext.Provider
      value={{
        panels,
        sizes: layout,
        orientation,
        disabled,
        keyboardStep:
          Number.isFinite(keyboardStep) && keyboardStep > 0 ? keyboardStep : 2,
        root,
        apply,
        end: (next) => onResizeEnd?.([...next]),
        setResizing,
        remembered,
      }}
    >
      <div
        {...rest}
        role={rest.role ?? "group"}
        ref={(node) => {
          root.current = node;
          if (typeof ref === "function") return ref(node);
          if (ref) ref.current = node;
        }}
        data-slot="resizable-panels"
        data-orientation={orientation}
        data-resizing={resizing || undefined}
        className={cn(resizablePanelsVariants({ orientation }), className)}
        style={style}
      >
        {slots.map((child, i) => (
          <ResizableSlotContext.Provider
            key={
              panelElements[Math.floor(i / 2)]!.props.id +
              (i % 2 ? "-handle" : "-panel")
            }
            value={Math.floor(i / 2)}
          >
            {child}
          </ResizableSlotContext.Provider>
        ))}
      </div>
    </ResizableContext.Provider>
  );
}
ResizablePanelsBase.displayName = "ResizablePanels";

export function ResizablePanelBase({
  id,
  minSize = 10,
  maxSize = 100,
  collapsible = false,
  collapsedSize = 0,
  appearance,
  padding,
  className,
  style,
  children,
  ...rest
}: ResizablePanelProps) {
  const { context, index } = useResizableSlot();
  const size = context.sizes[index]!;
  const collapsed = collapsible && size <= collapsedSize;
  return (
    <div
      {...rest}
      id={id}
      data-slot="resizable-panel"
      data-size={size}
      data-min-size={minSize}
      data-max-size={maxSize}
      data-collapsed={collapsed || undefined}
      aria-hidden={size === 0 ? true : rest["aria-hidden"]}
      inert={size === 0 ? true : rest.inert}
      className={cn(
        resizablePanelVariants({ appearance, padding: "none" }),
        className,
      )}
      style={{
        ...style,
        flexBasis: 0,
        flexGrow: size,
        flexShrink: 1,
        ...(size === 0
          ? { padding: 0, borderWidth: 0, overflow: "hidden" }
          : {}),
      }}
    >
      <div
        data-slot="resizable-panel-content"
        className={resizablePanelContentVariants({ padding })}
      >
        {children}
      </div>
    </div>
  );
}
ResizablePanelBase.displayName = "ResizablePanel";

type Gesture = {
  id: number;
  coordinate: number;
  length: number;
  sign: number;
  start: number[];
  last: number[];
  element: HTMLDivElement;
  changed: boolean;
};
export function ResizableHandleBase({
  disabled = false,
  withGrip = true,
  appearance,
  size,
  children,
  className,
  ref,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
  onLostPointerCapture,
  onKeyDown,
  ...rest
}: ResizableHandleProps) {
  const { context, index } = useResizableSlot();
  const isDisabled = disabled || context.disabled;
  const gesture = useRef<Gesture | null>(null);
  const latest = useRef(context);
  latest.current = context;
  const primary = context.panels[index]!;
  const ranges = resizeIntervals(context.panels, context.sizes, index);
  const min = Math.min(...ranges.map((r) => r[0])),
    max = Math.max(...ranges.map((r) => r[1]));
  const horizontal = context.orientation === "horizontal";
  const signature = JSON.stringify(context.panels);
  const finish = (cancel: boolean, rollback = true) => {
    const active = gesture.current;
    if (!active) return;
    gesture.current = null;
    latest.current.setResizing(false);
    if (cancel && rollback) latest.current.apply(active.start);
    else if (!cancel && active.changed) latest.current.end(active.last);
    if (active.element.hasPointerCapture?.(active.id))
      active.element.releasePointerCapture(active.id);
  };
  // Stop on unmount or configuration changes without applying an obsolete layout.
  useEffect(
    () => () => finish(true, false),
    [isDisabled, context.orientation, signature],
  );
  return (
    <div
      {...rest}
      ref={ref}
      role="separator"
      tabIndex={isDisabled ? -1 : (rest.tabIndex ?? 0)}
      aria-orientation={horizontal ? "vertical" : "horizontal"}
      aria-controls={primary.id}
      aria-label={
        rest["aria-label"] ??
        (rest["aria-labelledby"] ? undefined : `Resize ${primary.id}`)
      }
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={context.sizes[index]}
      aria-disabled={isDisabled || undefined}
      data-slot="resizable-handle"
      data-orientation={context.orientation}
      data-disabled={isDisabled || undefined}
      className={cn(
        resizableHandleVariants({
          appearance,
          size,
          orientation: context.orientation,
        }),
        className,
      )}
      onPointerDown={(event) => {
        onPointerDown?.(event);
        if (
          event.defaultPrevented ||
          isDisabled ||
          event.button !== 0 ||
          event.isPrimary === false ||
          gesture.current
        )
          return;
        const root = context.root.current;
        if (!root) return;
        const rect = root.getBoundingClientRect();
        const handleLength = Array.from(root.children)
          .filter((el) => el.getAttribute("data-slot") === "resizable-handle")
          .reduce((sum, el) => {
            const r = el.getBoundingClientRect();
            return sum + (horizontal ? r.width : r.height);
          }, 0);
        const computed = getComputedStyle(root);
        const pixels = (value: string) => parseFloat(value) || 0;
        const length =
          (horizontal
            ? rect.width -
              pixels(computed.borderLeftWidth) -
              pixels(computed.borderRightWidth) -
              pixels(computed.paddingLeft) -
              pixels(computed.paddingRight)
            : rect.height -
              pixels(computed.borderTopWidth) -
              pixels(computed.borderBottomWidth) -
              pixels(computed.paddingTop) -
              pixels(computed.paddingBottom)) - handleLength;
        if (length <= 0) return;
        event.preventDefault();
        event.currentTarget.focus();
        event.currentTarget.setPointerCapture?.(event.pointerId);
        gesture.current = {
          id: event.pointerId,
          coordinate: horizontal ? event.clientX : event.clientY,
          length,
          sign: horizontal && computed.direction === "rtl" ? -1 : 1,
          start: [...context.sizes],
          last: [...context.sizes],
          element: event.currentTarget,
          changed: false,
        };
        context.setResizing(true);
      }}
      onPointerMove={(event) => {
        onPointerMove?.(event);
        const active = gesture.current;
        if (!active || active.id !== event.pointerId || event.defaultPrevented)
          return;
        const coordinate = horizontal ? event.clientX : event.clientY;
        const desired =
          active.start[index]! +
          ((coordinate - active.coordinate) / active.length) *
            100 *
            active.sign;
        const next = resizePair(context.panels, active.start, index, desired);
        if (context.apply(next)) active.changed = true;
        active.last = next;
      }}
      onPointerUp={(event) => {
        onPointerUp?.(event);
        if (gesture.current?.id === event.pointerId) finish(false);
      }}
      onPointerCancel={(event) => {
        onPointerCancel?.(event);
        if (gesture.current?.id === event.pointerId) finish(true);
      }}
      onLostPointerCapture={(event) => {
        onLostPointerCapture?.(event);
        if (gesture.current?.id === event.pointerId) finish(true);
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (
          event.defaultPrevented ||
          isDisabled ||
          gesture.current ||
          event.altKey ||
          event.metaKey ||
          event.ctrlKey
        )
          return;
        const rtl =
          horizontal &&
          context.root.current &&
          getComputedStyle(context.root.current).direction === "rtl";
        const step = context.keyboardStep * (event.shiftKey ? 10 : 1);
        let delta = 0;
        let desired = context.sizes[index]!;
        if (event.key === (horizontal ? "ArrowRight" : "ArrowDown"))
          delta = step * (rtl ? -1 : 1);
        else if (event.key === (horizontal ? "ArrowLeft" : "ArrowUp"))
          delta = -step * (rtl ? -1 : 1);
        else if (event.key === "Home") desired = min;
        else if (event.key === "End") desired = max;
        else if (event.key === "Enter" && primary.collapsible)
          desired =
            context.sizes[index]! <= primary.collapsed
              ? (context.remembered.current.get(primary.id) ?? primary.min)
              : primary.collapsed;
        else return;
        event.preventDefault();
        const next = delta
          ? stepResizePair(context.panels, context.sizes, index, delta)
          : resizePair(context.panels, context.sizes, index, desired);
        // A toggle must not resize an expanded pane if collapse is infeasible.
        if (
          event.key === "Enter" &&
          context.sizes[index]! > primary.collapsed &&
          next[index] !== primary.collapsed
        )
          return;
        if (context.apply(next)) context.end(next);
      }}
    >
      {children != null ? (
        children
      ) : withGrip ? (
        <span
          aria-hidden="true"
          data-slot="resizable-grip"
          className={cn(
            zuiResizablePanelsGripBase,
            zuiResizablePanelsGripOrientations[context.orientation],
          )}
        />
      ) : null}
    </div>
  );
}
ResizableHandleBase.displayName = "ResizableHandle";
