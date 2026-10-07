"use client";

import {
  cloneElement,
  createContext,
  Fragment,
  isValidElement,
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import type { Ref, KeyboardEvent, MouseEvent } from "react";
import { cn } from "../../lib/utils";
import type {
  ToolbarProps,
  ToolbarButtonProps,
  ToolbarToggleProps,
  ToolbarLinkProps,
  ToolbarItemProps,
  ToolbarGroupProps,
  ToolbarSeparatorProps,
} from "./types";
import {
  toolbarVariants,
  toolbarItemVariants,
  toolbarGroupVariants,
  toolbarSeparatorVariants,
} from "./variants";

type ToolbarContextValue = {
  orientation: "horizontal" | "vertical";
  size: "sm" | "md" | "lg";
  disabled: boolean;
};
const ToolbarContext = createContext<ToolbarContextValue | null>(null);
function useToolbar() {
  const context = useContext(ToolbarContext);
  if (!context) throw new Error("Toolbar items must be used inside Toolbar.");
  return context;
}

function composeRefs<T>(...refs: (Ref<T> | undefined)[]) {
  return (node: T | null) => {
    const cleanups = refs.map((ref) => {
      if (typeof ref === "function") {
        const cleanup = ref(node);
        return typeof cleanup === "function" ? cleanup : () => ref(null);
      }
      if (ref) ref.current = node;
      return () => {
        if (ref) ref.current = null;
      };
    });
    return () => cleanups.forEach((cleanup) => cleanup());
  };
}

function ownedItems(root: HTMLElement) {
  return Array.from(
    root.querySelectorAll<HTMLElement>("[data-toolbar-item]"),
  ).filter((item) => item.closest('[data-slot="toolbar"]') === root);
}
function isAvailable(item: HTMLElement, root: HTMLElement) {
  if (
    item.matches(":disabled") ||
    item.getAttribute("aria-disabled") === "true"
  )
    return false;
  for (let node: HTMLElement | null = item; node; node = node.parentElement) {
    if (
      node.hidden ||
      node.hasAttribute("inert") ||
      node.getAttribute("aria-hidden") === "true"
    )
      return false;
    const style = getComputedStyle(node);
    if (
      style.display === "none" ||
      style.visibility === "hidden" ||
      style.visibility === "collapse"
    )
      return false;
    if (node === root) break;
  }
  return true;
}

export function ToolbarBase({
  appearance,
  size = "md",
  orientation = "horizontal",
  wrap = true,
  loop = true,
  disabled = false,
  className,
  ref,
  onKeyDown,
  onFocus,
  ...props
}: ToolbarProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const remembered = useRef<HTMLElement | null>(null);
  const resolvedOrientation = orientation ?? "horizontal";
  const synchronize = useCallback(() => {
    const root = rootRef.current;
    if (!root) return;
    const all = ownedItems(root);
    const available = disabled
      ? []
      : all.filter((item) => isAvailable(item, root));
    const focused = root.ownerDocument.activeElement as HTMLElement | null;
    const current =
      available.find((item) => item === focused) ??
      available.find((item) => item === remembered.current) ??
      available[0];
    remembered.current = current ?? null;
    for (const item of all) item.tabIndex = item === current ? 0 : -1;
    // A control that becomes disabled/hidden while focused yields to a usable item.
    if (focused && all.includes(focused) && !available.includes(focused))
      current?.focus();
  }, [disabled]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    synchronize();
    const observer = new MutationObserver(synchronize);
    observer.observe(root, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: [
        "disabled",
        "aria-disabled",
        "hidden",
        "aria-hidden",
        "inert",
        "class",
        "style",
      ],
    });
    return () => observer.disconnect();
  }, [synchronize]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (
      event.defaultPrevented ||
      disabled ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey
    )
      return;
    const root = event.currentTarget;
    const target = event.target as HTMLElement;
    const item = target.closest<HTMLElement>("[data-toolbar-item]");
    if (!item || item.closest('[data-slot="toolbar"]') !== root) return;
    // Native editing and popup widgets keep keys consumed by their own handlers.
    if (
      target.closest(
        'input, textarea, select, [contenteditable=""], [contenteditable="true"], [contenteditable="plaintext-only"]',
      )
    )
      return;
    const items = ownedItems(root).filter((candidate) =>
      isAvailable(candidate, root),
    );
    const index = items.indexOf(item);
    if (index < 0) return;
    const rtl =
      (props.dir === "ltr" || props.dir === "rtl"
        ? props.dir
        : getComputedStyle(root).direction ||
          root.closest("[dir]")?.getAttribute("dir")) === "rtl";
    const previous =
      resolvedOrientation === "vertical"
        ? "ArrowUp"
        : rtl
          ? "ArrowRight"
          : "ArrowLeft";
    const next =
      resolvedOrientation === "vertical"
        ? "ArrowDown"
        : rtl
          ? "ArrowLeft"
          : "ArrowRight";
    let destination: number;
    if (event.key === "Home") destination = 0;
    else if (event.key === "End") destination = items.length - 1;
    else if (event.key === previous || event.key === next) {
      const step = event.key === next ? 1 : -1;
      destination = loop
        ? (index + step + items.length) % items.length
        : Math.max(0, Math.min(items.length - 1, index + step));
    } else return;
    event.preventDefault();
    items[destination]?.focus();
  };

  return (
    <ToolbarContext.Provider
      value={{ orientation: resolvedOrientation, size: size ?? "md", disabled }}
    >
      <div
        {...props}
        ref={composeRefs(rootRef, ref)}
        role="toolbar"
        aria-orientation={resolvedOrientation}
        aria-disabled={disabled || undefined}
        data-slot="toolbar"
        data-orientation={resolvedOrientation}
        data-disabled={disabled ? "true" : undefined}
        className={cn(
          toolbarVariants({
            appearance,
            orientation: resolvedOrientation,
            wrap,
          }),
          className,
        )}
        onKeyDown={handleKeyDown}
        onFocus={(event) => {
          onFocus?.(event);
          const item = (event.target as HTMLElement).closest<HTMLElement>(
            "[data-toolbar-item]",
          );
          if (item?.closest('[data-slot="toolbar"]') === event.currentTarget) {
            remembered.current = item;
            synchronize();
          }
        }}
      />
    </ToolbarContext.Provider>
  );
}

export function ToolbarItemBase({
  children,
  disabled,
  native = true,
  className,
  ref,
  onClick,
  ...props
}: ToolbarItemProps) {
  const context = useToolbar();
  if (
    !isValidElement<Record<string, unknown>>(children) ||
    children.type === Fragment
  ) {
    throw new Error(
      "ToolbarItem expects one focusable element, not a fragment or text.",
    );
  }
  const child = children.props;
  const isDisabled =
    context.disabled ||
    disabled ||
    !!child.disabled ||
    child["aria-disabled"] === true ||
    child["aria-disabled"] === "true";
  const childClick = child.onClick as
    | ((event: MouseEvent<HTMLElement>) => void)
    | undefined;
  return cloneElement(children, {
    ...props,
    ...child,
    ref: composeRefs(child.ref as Ref<HTMLElement> | undefined, ref),
    "data-slot": child["data-slot"] ?? "toolbar-item",
    "data-toolbar-item": "",
    tabIndex: -1,
    ...(native ? { disabled: isDisabled || undefined } : {}),
    "aria-disabled": isDisabled || undefined,
    // Remove the navigation target for disabled native anchors, including middle clicks.
    ...(isDisabled && children.type === "a"
      ? { href: undefined, role: child.role ?? "link" }
      : {}),
    className: cn(
      toolbarItemVariants({ size: context.size }),
      className,
      child.className as string | undefined,
    ),
    onClick: (event: MouseEvent<HTMLElement>) => {
      if (isDisabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      childClick?.(event);
      if (!event.defaultPrevented) onClick?.(event);
    },
  });
}

export function ToolbarButtonBase({
  disabled,
  type = "button",
  ...props
}: ToolbarButtonProps) {
  return (
    <ToolbarItemBase disabled={disabled}>
      <button {...props} type={type} data-slot="toolbar-button" />
    </ToolbarItemBase>
  );
}
export function ToolbarToggleBase({
  pressed,
  defaultPressed = false,
  onPressedChange,
  onClick,
  type = "button",
  ...props
}: ToolbarToggleProps) {
  const [localPressed, setLocalPressed] = useState(defaultPressed);
  const resolved = pressed ?? localPressed;
  return (
    <ToolbarItemBase disabled={props.disabled}>
      <button
        {...props}
        type={type}
        data-slot="toolbar-toggle"
        aria-pressed={resolved}
        data-state={resolved ? "on" : "off"}
        onClick={(event) => {
          onClick?.(event);
          if (event.defaultPrevented) return;
          if (pressed === undefined) setLocalPressed(!resolved);
          onPressedChange?.(!resolved);
        }}
      />
    </ToolbarItemBase>
  );
}
export function ToolbarLinkBase({ disabled, ...props }: ToolbarLinkProps) {
  return (
    <ToolbarItemBase disabled={disabled} native={false}>
      <a {...props} data-slot="toolbar-link" />
    </ToolbarItemBase>
  );
}
export function ToolbarGroupBase({ className, ...props }: ToolbarGroupProps) {
  const { orientation } = useToolbar();
  return (
    <div
      {...props}
      role="group"
      data-slot="toolbar-group"
      className={cn(toolbarGroupVariants({ orientation }), className)}
    />
  );
}
export function ToolbarSeparatorBase({
  decorative = true,
  className,
  ...props
}: ToolbarSeparatorProps) {
  const { orientation } = useToolbar();
  const separatorOrientation =
    orientation === "horizontal" ? "vertical" : "horizontal";
  return (
    <div
      {...props}
      role={decorative ? undefined : "separator"}
      aria-hidden={decorative || undefined}
      aria-orientation={decorative ? undefined : separatorOrientation}
      data-slot="toolbar-separator"
      data-orientation={separatorOrientation}
      className={cn(toolbarSeparatorVariants(), className)}
    />
  );
}
