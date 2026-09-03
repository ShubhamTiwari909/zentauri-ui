"use client";

import { Children, useRef } from "react";
import type { ReactElement } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
} from "framer-motion";

import { usePrefersReducedMotion } from "../../../hooks/usePrefersReducedMotion";
import { cn } from "../../../lib/utils";

import {
  CircularMenuItem,
  CircularMenuItemIcon,
  CircularMenuItemLabel,
  CircularMenuItemSlot,
  CircularMenuMotionContext,
  CircularMenuRoot,
  CircularMenuSpoke,
  CircularMenuTrigger,
  shorthandItemAriaLabel,
  useCircularMenuContext,
  useCircularMenuLayout,
} from "../circular-menu-base";
import { getCircularMenuPositions } from "../geometry";
import type { CircularMenuCssProperties } from "../types";
import {
  circularMenuItemPositionerVariants,
  circularMenuListVariants,
} from "../variants";

import { circularMenuItemAnimationPresets } from "./animations";
import type {
  CircularMenuAnimatedProps,
  CircularMenuListAnimatedProps,
} from "./types";

/**
 * Motion-driven ring body.
 *
 * Placement still comes from CSS (`--zui-circular-menu-item-x/-y` scaled by
 * `--zui-circular-menu-open`), so items land exactly where the static entry puts
 * them. Framer Motion owns the disc reveal, the per-item stagger, and the
 * continuous rotation, which runs on a motion value instead of React state so a
 * spinning ring never re-renders.
 */
export function CircularMenuListAnimated({
  className,
  children,
  animation = "pop",
  stagger = 0.04,
  onKeyDown,
  style,
  ref,
  ...rest
}: CircularMenuListAnimatedProps) {
  const {
    appearance,
    counterSpin,
    handleListKeyDown,
    isOpen,
    listId,
    showSpokes,
    spin,
    spinDuration,
    spinPauseOnHover,
    state,
    triggerId,
  } = useCircularMenuContext("CircularMenu.List");
  const layout = useCircularMenuLayout();
  const prefersReducedMotion = usePrefersReducedMotion();

  const listRef = useRef<HTMLDivElement | null>(null);
  const rotation = useMotionValue(0);
  const elapsedRef = useRef(0);
  const lastFrameRef = useRef<number | null>(null);
  const counterRotation = useTransform(rotation, (value) => -value);

  useAnimationFrame((time) => {
    if (!spin || prefersReducedMotion) {
      lastFrameRef.current = null;
      return;
    }
    const previous = lastFrameRef.current;
    lastFrameRef.current = time;
    if (previous === null) return;
    // Reading :hover beats tracking hover in state: the frame loop already runs
    // every frame, and a hover state update would re-render the whole ring.
    // Use closest() rather than parentElement: a compound `CircularMenu.List`
    // can be nested inside a consumer wrapper, which would otherwise be the
    // element whose :hover state gets read instead of the menu root.
    const paused =
      spinPauseOnHover &&
      listRef.current
        ?.closest('[data-slot="circular-menu"]')
        ?.matches(":hover") === true;
    if (paused) return;
    elapsedRef.current += time - previous;
    const revolutionMs = Math.max(spinDuration, 0.001) * 1000;
    rotation.set(((elapsedRef.current / revolutionMs) * 360) % 360);
  });

  const preset =
    circularMenuItemAnimationPresets[prefersReducedMotion ? "none" : animation];
  const slots = Children.toArray(children);
  const positions = getCircularMenuPositions({
    count: slots.length,
    radius: layout.radius,
    startAngle: layout.startAngle,
    sweep: layout.sweep,
    direction: layout.direction,
  });

  return (
    <motion.div
      ref={(node) => {
        listRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      }}
      id={listId}
      role="menu"
      aria-labelledby={triggerId}
      aria-hidden={!isOpen || undefined}
      inert={!isOpen}
      data-slot="circular-menu-list"
      data-state={state}
      data-motion-spin={spin || undefined}
      className={cn(circularMenuListVariants(), className)}
      style={{ ...style, rotate: rotation }}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (!event.defaultPrevented) handleListKeyDown(event);
      }}
      {...rest}
    >
      {/* Framer already drives the reveal and the counter-rotation here, so
          the shared item/icon/label components must stand down their static
          CSS equivalents (closed-state fade/scale, CSS counter-spin) — both
          running at once is what causes the drift this context prevents. */}
      <CircularMenuMotionContext.Provider value={true}>
        {showSpokes &&
          positions.map((position) => (
            <CircularMenuItemSlot
              key={`spoke-${position.index}`}
              index={position.index}
              position={position}
            >
              <CircularMenuSpoke appearance={appearance} />
            </CircularMenuItemSlot>
          ))}
        {slots.map((slot, index) => {
          const position = positions[index] ?? { index, angle: 0, x: 0, y: 0 };
          const key = (slot as ReactElement).key ?? index;

          return (
            <CircularMenuItemSlot key={key} index={index} position={position}>
              <div
                data-slot="circular-menu-item-positioner"
                data-index={index}
                data-angle={position.angle}
                className={cn(circularMenuItemPositionerVariants())}
                style={
                  {
                    "--zui-circular-menu-item-x": `${position.x}px`,
                    "--zui-circular-menu-item-y": `${position.y}px`,
                    "--zui-circular-menu-item-angle": `${position.angle}deg`,
                    "--zui-circular-menu-item-index": String(index),
                  } as CircularMenuCssProperties
                }
              >
                <motion.div
                  initial={false}
                  animate={preset.states[state]}
                  transition={{
                    ...preset.transition,
                    delay: isOpen ? index * stagger : 0,
                  }}
                >
                  <motion.div
                    style={
                      counterSpin ? { rotate: counterRotation } : undefined
                    }
                  >
                    {slot}
                  </motion.div>
                </motion.div>
              </div>
            </CircularMenuItemSlot>
          );
        })}
      </CircularMenuMotionContext.Provider>
    </motion.div>
  );
}

CircularMenuListAnimated.displayName = "CircularMenuListAnimated";

/** Default trigger glyph, used when `label` is explicitly `null`. */
function DefaultTriggerIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
      className="size-4"
    >
      <circle cx="8" cy="3" r="1.5" />
      <circle cx="8" cy="8" r="1.5" />
      <circle cx="8" cy="13" r="1.5" />
    </svg>
  );
}

function CircularMenuAnimatedImpl({
  animation = "pop",
  stagger = 0.04,
  items,
  label = "Menu",
  children,
  ...rest
}: CircularMenuAnimatedProps) {
  return (
    <CircularMenuRoot items={items} {...rest}>
      <CircularMenuTrigger aria-label={label === null ? "Menu" : undefined}>
        {label ?? <DefaultTriggerIcon />}
      </CircularMenuTrigger>
      <CircularMenuListAnimated animation={animation} stagger={stagger}>
        {children ??
          items?.map((item) => (
            <CircularMenuItem
              key={item.id}
              appearance={item.appearance}
              disabled={item.disabled}
              href={item.href}
              target={item.target}
              onSelect={item.onSelect}
              aria-label={shorthandItemAriaLabel(item)}
            >
              {item.icon != null && (
                <CircularMenuItemIcon>{item.icon}</CircularMenuItemIcon>
              )}
              {item.label != null && (
                <CircularMenuItemLabel>{item.label}</CircularMenuItemLabel>
              )}
            </CircularMenuItem>
          ))}
      </CircularMenuListAnimated>
    </CircularMenuRoot>
  );
}

CircularMenuAnimatedImpl.displayName = "CircularMenu";

export const CircularMenu = Object.assign(CircularMenuAnimatedImpl, {
  Root: CircularMenuRoot,
  Trigger: CircularMenuTrigger,
  List: CircularMenuListAnimated,
  Item: CircularMenuItem,
  ItemIcon: CircularMenuItemIcon,
  ItemLabel: CircularMenuItemLabel,
  Spoke: CircularMenuSpoke,
});
