"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";

import { cn } from "../../lib/utils";
import { useFocusManagement } from "../../hooks/useFocusManagement";

import type {
  CommandContentProps,
  CommandCtx,
  CommandGroupProps,
  CommandInputProps,
  CommandItemProps,
  CommandListProps,
  CommandProps,
  CommandSectionProps,
  CommandTriggerProps,
  ItemMeta,
  RegisteredItem,
} from "./types";
import {
  commandContentVariants,
  commandEmptyVariants,
  commandFooterVariants,
  commandGroupHeadingVariants,
  commandInputRowVariants,
  commandInputVariants,
  commandItemVariants,
  commandListVariants,
  commandOverlayVariants,
  commandSeparatorVariants,
  commandTriggerVariants,
} from "./variants";


const CommandContext = createContext<CommandCtx | null>(null);

export function useCommandContext(component: string): CommandCtx {
  const ctx = useContext(CommandContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <Command>`);
  }
  return ctx;
}

function itemMatches(value: string, meta: ItemMeta, normalized: string): boolean {
  if (!normalized) {
    return true;
  }
  if (value.toLowerCase().includes(normalized)) {
    return true;
  }
  if (meta.searchText?.toLowerCase().includes(normalized)) {
    return true;
  }
  return Boolean(
    meta.keywords?.some((keyword) => keyword.toLowerCase().includes(normalized)),
  );
}

export function Command({
  open,
  defaultOpen = false,
  onOpenChange,
  hotkey,
  label = "Command menu",
  children,
}: CommandProps) {
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

  const labelId = useId();
  const contentRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [query, setQuery] = useState("");
  const [activeValue, setActiveValue] = useState<string | null>(null);
  const itemsRef = useRef<RegisteredItem[]>([]);
  const [registryVersion, setRegistryVersion] = useState(0);

  const registerItem = useCallback((item: RegisteredItem) => {
    itemsRef.current = [...itemsRef.current, item];
    setRegistryVersion((version) => version + 1);
    return () => {
      itemsRef.current = itemsRef.current.filter((entry) => entry !== item);
      setRegistryVersion((version) => version + 1);
    };
  }, []);

  const invalidateRegistry = useCallback(() => {
    setRegistryVersion((version) => version + 1);
  }, []);

  const visibleValues = useMemo(() => {
    void registryVersion;
    const normalized = query.trim().toLowerCase();
    return itemsRef.current
      .filter((item) => {
        const meta = item.metaRef.current;
        if (meta.disabled) {
          return false;
        }
        return itemMatches(item.value, meta, normalized);
      })
      .map((item) => item.value);
  }, [query, registryVersion]);

  const visibleSet = useMemo(() => new Set(visibleValues), [visibleValues]);
  const isVisible = useCallback(
    (value: string) => visibleSet.has(value),
    [visibleSet],
  );

  const selectValue = useCallback((value: string) => {
    const entry = itemsRef.current.find((item) => item.value === value);
    if (!entry || entry.metaRef.current.disabled) {
      return false;
    }
    entry?.metaRef.current.onSelect?.(value);
    return true;
  }, []);

  // Reset transient state when the palette closes; keep active in sync with results.
  useEffect(() => {
    if (!resolvedOpen) {
      setQuery("");
      setActiveValue(null);
    }
  }, [resolvedOpen]);

  useEffect(() => {
    if (!resolvedOpen) {
      return;
    }
    if (activeValue && visibleSet.has(activeValue)) {
      return;
    }
    setActiveValue(visibleValues[0] ?? null);
  }, [resolvedOpen, activeValue, visibleSet, visibleValues]);

  // Global hotkey: meta/ctrl + key toggles the palette.
  useEffect(() => {
    if (!hotkey) {
      return;
    }
    const key = (typeof hotkey === "string" ? hotkey : "k").toLowerCase();
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === key) {
        event.preventDefault();
        setOpen(!resolvedOpen);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [hotkey, resolvedOpen, setOpen]);

  const ctx = useMemo<CommandCtx>(
    () => ({
      open: resolvedOpen,
      setOpen,
      labelId,
      query,
      setQuery,
      activeValue,
      setActiveValue,
      visibleValues,
      isVisible,
      registerItem,
      invalidateRegistry,
      selectValue,
      contentRef,
      triggerRef,
      inputRef,
    }),
    [
      resolvedOpen,
      setOpen,
      labelId,
      query,
      activeValue,
      visibleValues,
      isVisible,
      registerItem,
      invalidateRegistry,
      selectValue,
    ],
  );

  return (
    <CommandContext.Provider value={ctx}>
      <span hidden id={labelId}>
        {label}
      </span>
      {children}
    </CommandContext.Provider>
  );
}

Command.displayName = "Command";

export function CommandTrigger({
  className,
  children,
  onClick,
  ref: refProp,
}: CommandTriggerProps) {
  const { setOpen, triggerRef } = useCommandContext("CommandTrigger");
  return (
    <button
      ref={(node) => {
        triggerRef.current = node;
        if (typeof refProp === "function") {
          refProp(node);
        } else if (refProp) {
          (refProp as RefObject<HTMLButtonElement | null>).current = node;
        }
      }}
      type="button"
      data-slot="command-trigger"
      className={cn(commandTriggerVariants(), className)}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          setOpen(true);
        }
      }}
    >
      {children}
    </button>
  );
}

CommandTrigger.displayName = "CommandTrigger";

export function CommandContent({
  className,
  size,
  appearance,
  children,
  ref,
  id,
  style,
}: CommandContentProps) {
  const { open, setOpen, labelId, contentRef, triggerRef } =
    useCommandContext("CommandContent");
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
    open ? (
      <div className="fixed inset-0 z-9999" data-slot="command-portal">
        <div
          role="presentation"
          data-slot="command-overlay"
          className={commandOverlayVariants()}
          onClick={() => setOpen(false)}
        />
        <div
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
          id={id}
          style={style}
        >
          {children}
        </div>
      </div>
    ) : null,
    portalTarget,
  );
}

CommandContent.displayName = "CommandContent";

export function CommandInput({ className, placeholder, ref }: CommandInputProps) {
  const {
    query,
    setQuery,
    visibleValues,
    activeValue,
    setActiveValue,
    selectValue,
    setOpen,
    inputRef,
  } = useCommandContext("CommandInput");

  const moveActive = (direction: 1 | -1) => {
    if (visibleValues.length === 0) {
      return;
    }
    const currentIndex = activeValue
      ? visibleValues.indexOf(activeValue)
      : -1;
    const nextIndex =
      currentIndex === -1
        ? direction === 1
          ? 0
          : visibleValues.length - 1
        : (currentIndex + direction + visibleValues.length) %
          visibleValues.length;
    setActiveValue(visibleValues[nextIndex] ?? null);
  };

  return (
    <div className={commandInputRowVariants()} data-slot="command-input-row">
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="size-4 shrink-0 opacity-60"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <input
        ref={(node) => {
          inputRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            (ref as RefObject<HTMLInputElement | null>).current = node;
          }
        }}
        type="text"
        autoFocus
        role="combobox"
        aria-expanded
        aria-controls="command-list"
        aria-autocomplete="list"
        data-slot="command-input"
        className={cn(commandInputVariants(), className)}
        placeholder={placeholder}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            moveActive(1);
          } else if (event.key === "ArrowUp") {
            event.preventDefault();
            moveActive(-1);
          } else if (event.key === "Enter") {
            if (activeValue && visibleValues.includes(activeValue)) {
              event.preventDefault();
              if (selectValue(activeValue)) {
                setOpen(false);
              }
            }
          }
        }}
      />
    </div>
  );
}

CommandInput.displayName = "CommandInput";

export function CommandList({ className, children }: CommandListProps) {
  return (
    <div
      id="command-list"
      role="listbox"
      aria-label="Commands"
      data-slot="command-list"
      className={cn(commandListVariants(), className)}
    >
      {children}
    </div>
  );
}

CommandList.displayName = "CommandList";

export function CommandGroup({ className, heading, children }: CommandGroupProps) {
  return (
    <div
      role="group"
      data-slot="command-group"
      className={cn(
        "[&:not(:has([data-slot=command-item]:not([hidden])))]:hidden",
        className,
      )}
    >
      {heading ? (
        <div className={commandGroupHeadingVariants()} aria-hidden>
          {heading}
        </div>
      ) : null}
      {children}
    </div>
  );
}

CommandGroup.displayName = "CommandGroup";

export function CommandItem({
  className,
  value,
  keywords,
  disabled,
  onSelect,
  children,
}: CommandItemProps) {
  const {
    registerItem,
    invalidateRegistry,
    isVisible,
    activeValue,
    setActiveValue,
    selectValue,
    setOpen,
  } = useCommandContext("CommandItem");

  const itemRef = useRef<HTMLDivElement | null>(null);
  const keywordSignature = keywords?.join("\u0000") ?? "";
  const metaRef = useRef<ItemMeta>({ keywords, disabled, onSelect });
  metaRef.current = {
    keywords,
    disabled,
    onSelect,
    searchText: metaRef.current.searchText,
  };

  useEffect(() => {
    const unregister = registerItem({ value, metaRef });
    return unregister;
  }, [registerItem, value]);

  useEffect(() => {
    metaRef.current = {
      keywords: metaRef.current.keywords,
      disabled,
      onSelect: metaRef.current.onSelect,
      searchText: itemRef.current?.textContent ?? undefined,
    };
    invalidateRegistry();
  }, [children, disabled, invalidateRegistry, keywordSignature]);

  const visible = isVisible(value);
  const active = activeValue === value;

  return (
    <div
      ref={itemRef}
      role="option"
      aria-selected={active}
      aria-disabled={disabled || undefined}
      data-slot="command-item"
      data-value={value}
      data-active={active || undefined}
      hidden={!visible || undefined}
      className={cn(commandItemVariants(), className)}
      onMouseEnter={() => {
        if (!disabled) {
          setActiveValue(value);
        }
      }}
      onClick={() => {
        if (disabled) {
          return;
        }
        if (selectValue(value)) {
          setOpen(false);
        }
      }}
    >
      {children}
    </div>
  );
}

CommandItem.displayName = "CommandItem";

export function CommandSeparator({ className }: { className?: string }) {
  return (
    <div
      role="separator"
      data-slot="command-separator"
      className={cn(commandSeparatorVariants(), className)}
    />
  );
}

CommandSeparator.displayName = "CommandSeparator";

export function CommandEmpty({ className, children }: CommandSectionProps) {
  const { visibleValues } = useCommandContext("CommandEmpty");
  if (visibleValues.length > 0) {
    return null;
  }
  return (
    <div
      data-slot="command-empty"
      className={cn(commandEmptyVariants(), className)}
    >
      {children}
    </div>
  );
}

CommandEmpty.displayName = "CommandEmpty";

export function CommandFooter({ className, children }: CommandSectionProps) {
  return (
    <div
      data-slot="command-footer"
      className={cn(commandFooterVariants(), className)}
    >
      {children}
    </div>
  );
}

CommandFooter.displayName = "CommandFooter";
