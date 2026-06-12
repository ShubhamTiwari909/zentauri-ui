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
} from "react";
import type { ReactNode, RefObject } from "react";

import {
  zuiComboboxEmptyBase,
  zuiComboboxSearchIconBase,
  zuiComboboxSearchInputBase,
  zuiComboboxSearchRowBase,
} from "../../design-system/combobox";
import { cn } from "../../lib/utils";
import type {
  ComboboxAppearance,
  ComboboxContentProps,
  ComboboxContextType,
  ComboboxEmptyProps,
  ComboboxItemProps,
  ComboboxListProps,
  ComboboxOption,
  ComboboxProps,
  ComboboxSearchProps,
  ComboboxTriggerProps,
  ComboboxValueProps,
} from "./types";
import {
  comboboxContentVariants,
  comboboxItemVariants,
  comboboxListVariants,
  comboboxTriggerVariants,
} from "./variants";

const ComboboxContext = createContext<ComboboxContextType | null>(null);
const ComboboxAppearanceContext = createContext<ComboboxAppearance>("default");

export const useCombobox = () => {
  const ctx = useContext(ComboboxContext);
  if (!ctx) throw new Error("Combobox components must be used inside Combobox");
  return ctx;
};

export { ComboboxContext };

export const Combobox = ({
  children,
  value,
  defaultValue = [],
  onChange,
  multiple = false,
  className,
}: ComboboxProps) => {
  const baseId = useId();
  const triggerId = `${baseId}-trigger`;
  const listboxId = `${baseId}-listbox`;

  const [internal, setInternal] = useState<string[]>(defaultValue);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<ComboboxOption[]>([]);
  const [query, setQuery] = useState("");
  const [activeValue, setActiveValue] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const selected = value ?? internal;

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (event: PointerEvent) => {
      const root = rootRef.current;
      if (!root) return;
      if (event.target instanceof Node && !root.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setActiveValue(null);
    }
  }, [open]);

  const visibleValues = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return options.map((o) => o.value);
    return options
      .filter((o) => {
        if (o.disabled) return false;
        const labelText =
          typeof o.label === "string" ? o.label.toLowerCase() : "";
        return (
          o.value.toLowerCase().includes(normalized) ||
          labelText.includes(normalized)
        );
      })
      .map((o) => o.value);
  }, [query, options]);

  // If the current highlight gets filtered out while typing, clear it.
  // We do NOT auto-populate on open so ArrowDown always starts from the top.
  useEffect(() => {
    if (!open) return;
    if (!activeValue) return;
    if (visibleValues.includes(activeValue)) return;
    setActiveValue(null);
  }, [open, activeValue, visibleValues]);

  const setSelected = (vals: string[]) => {
    if (value !== undefined) {
      onChange?.(vals);
    } else {
      setInternal(vals);
      onChange?.(vals);
    }
  };

  const toggleValue = useCallback(
    (val: string) => {
      if (multiple) {
        const next = selected.includes(val)
          ? selected.filter((v) => v !== val)
          : [...selected, val];
        setSelected(next);
      } else {
        setSelected([val]);
        setOpen(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [multiple, selected],
  );

  const isSelected = useCallback(
    (val: string) => selected.includes(val),
    [selected],
  );

  const isVisible = useCallback(
    (val: string) => visibleValues.includes(val),
    [visibleValues],
  );

  const registerOption = useCallback((opt: ComboboxOption) => {
    setOptions((prev) => {
      const existing = prev.find((o) => o.value === opt.value);
      if (existing) {
        const labelChanged =
          (typeof opt.label === "string" || typeof opt.label === "number") &&
          existing.label !== opt.label;
        const disabledChanged = existing.disabled !== opt.disabled;
        if (labelChanged || disabledChanged) {
          return prev.map((o) => (o.value === opt.value ? opt : o));
        }
        return prev;
      }
      return [...prev, opt];
    });
    // No cleanup on unmount: options must persist across panel open/close so
    // ComboboxValue can still display the selected label when the panel is closed.
  }, []);

  return (
    <ComboboxContext.Provider
      value={{
        open,
        setOpen,
        query,
        setQuery,
        selected,
        toggleValue,
        isSelected,
        multiple,
        options,
        registerOption,
        visibleValues,
        isVisible,
        activeValue,
        setActiveValue,
        triggerId,
        listboxId,
        searchRef,
        triggerRef,
      }}
    >
      <div ref={rootRef} className={cn("relative w-full", className)}>
        {children}
      </div>
    </ComboboxContext.Provider>
  );
};

Combobox.displayName = "Combobox";

export const ComboboxTrigger = ({
  className,
  variant,
  size,
  onClick,
  ref: refProp,
  ...props
}: ComboboxTriggerProps) => {
  const { open, setOpen, triggerId, listboxId, triggerRef } = useCombobox();

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
      id={triggerId}
      type="button"
      aria-expanded={open}
      aria-haspopup="listbox"
      aria-controls={listboxId}
      data-slot="combobox-trigger"
      className={cn(comboboxTriggerVariants({ variant, size }), className)}
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          setOpen(!open);
        }
      }}
    />
  );
};

ComboboxTrigger.displayName = "ComboboxTrigger";

export const ComboboxValue = ({
  placeholder = "Select...",
  className,
  ...props
}: ComboboxValueProps) => {
  const { selected, options } = useCombobox();
  const selectedOptions = options.filter((o) => selected.includes(o.value));

  if (selectedOptions.length === 0) {
    return (
      <span
        data-slot="combobox-placeholder"
        className={cn(
          "text-[color:var(--zui-combobox-value-placeholder-fg,oklch(55.1%_0.027_264.364))] dark:text-[color:var(--zui-combobox-value-placeholder-fg-dark,#ffffff)]",
          className,
        )}
        {...props}
      >
        {placeholder}
      </span>
    );
  }

  return (
    <span data-slot="combobox-value" className={cn(className)} {...props}>
      {selectedOptions.map((option, index) => (
        <span key={option.value}>
          {index > 0 ? ", " : null}
          {option.label}
        </span>
      ))}
    </span>
  );
};

ComboboxValue.displayName = "ComboboxValue";

export const ComboboxContent = ({
  children,
  className,
  appearance = "default",
  size = "md",
  spacing = "default",
  ...props
}: ComboboxContentProps) => {
  const { open, triggerId, listboxId, searchRef } = useCombobox();

  useEffect(() => {
    if (open) {
      searchRef.current?.focus();
    }
  }, [open, searchRef]);

  if (!open) return null;

  return (
    <ComboboxAppearanceContext.Provider value={appearance}>
      <div
        aria-labelledby={triggerId}
        data-slot="combobox-content"
        className={cn(
          comboboxContentVariants({ appearance, size, spacing }),
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </ComboboxAppearanceContext.Provider>
  );
};

ComboboxContent.displayName = "ComboboxContent";

export const ComboboxSearch = ({
  className,
  placeholder = "Search...",
  ref: refProp,
  ...props
}: ComboboxSearchProps) => {
  const {
    query,
    setQuery,
    visibleValues,
    activeValue,
    setActiveValue,
    toggleValue,
    setOpen,
    searchRef,
    listboxId,
    options,
    triggerRef,
  } = useCombobox();

  const optionByValue = useMemo(
    () => new Map(options.map((option) => [option.value, option])),
    [options],
  );

  const moveActive = (direction: 1 | -1) => {
    if (visibleValues.length === 0) return;
    const currentIndex = activeValue ? visibleValues.indexOf(activeValue) : -1;
    let nextIndex = currentIndex;
    for (let i = 0; i < visibleValues.length; i++) {
      if (nextIndex === -1) {
        nextIndex = direction === 1 ? 0 : visibleValues.length - 1;
      } else {
        nextIndex =
          (nextIndex + direction + visibleValues.length) % visibleValues.length;
      }
      const candidate = optionByValue.get(visibleValues[nextIndex] ?? "");
      if (candidate && !candidate.disabled) {
        setActiveValue(visibleValues[nextIndex] ?? null);
        return;
      }
    }
  };

  return (
    <div data-slot="combobox-search-row" className={zuiComboboxSearchRowBase}>
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className={zuiComboboxSearchIconBase}
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
          searchRef.current = node;
          if (typeof refProp === "function") {
            refProp(node);
          } else if (refProp) {
            (refProp as RefObject<HTMLInputElement | null>).current = node;
          }
        }}
        type="text"
        role="combobox"
        aria-expanded
        aria-controls={listboxId}
        aria-autocomplete="list"
        aria-activedescendant={
          activeValue ? `${listboxId}-option-${activeValue}` : undefined
        }
        data-slot="combobox-search"
        className={cn(zuiComboboxSearchInputBase, className)}
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
            event.preventDefault();
            if (activeValue && visibleValues.includes(activeValue)) {
              const option = optionByValue.get(activeValue);
              if (option && !option.disabled) {
                toggleValue(activeValue);
              }
            }
          } else if (event.key === "Escape") {
            event.preventDefault();
            setOpen(false);
            triggerRef.current?.focus();
          }
        }}
        {...props}
      />
    </div>
  );
};

ComboboxSearch.displayName = "ComboboxSearch";

export const ComboboxList = ({
  children,
  className,
  ...props
}: ComboboxListProps) => {
  const { listboxId, triggerId } = useCombobox();
  const appearance = useContext(ComboboxAppearanceContext);

  return (
    <div
      id={listboxId}
      role="listbox"
      aria-labelledby={triggerId}
      data-slot="combobox-list"
      className={cn(comboboxListVariants({ appearance }), className)}
      {...props}
    >
      {children}
    </div>
  );
};

ComboboxList.displayName = "ComboboxList";

export const ComboboxItem = ({
  value,
  children,
  disabled,
  appearance,
  className,
  ...props
}: ComboboxItemProps) => {
  const {
    toggleValue,
    isSelected,
    registerOption,
    isVisible,
    activeValue,
    setActiveValue,
    listboxId,
  } = useCombobox();
  const contentAppearance = useContext(ComboboxAppearanceContext);
  const itemAppearance = appearance ?? contentAppearance;

  useEffect(() => {
    registerOption({ label: children, value, disabled });
  }, [children, disabled, registerOption, value]);

  const visible = isVisible(value);
  const isActive = isSelected(value);
  const isHighlighted = activeValue === value;

  if (!visible) return null;

  return (
    <div
      id={`${listboxId}-option-${value}`}
      role="option"
      aria-selected={isActive}
      aria-disabled={disabled ? true : undefined}
      tabIndex={-1}
      data-slot="combobox-item"
      data-selected={isActive ? "true" : "false"}
      data-active={isHighlighted ? "true" : undefined}
      onMouseEnter={() => !disabled && setActiveValue(value)}
      onClick={() => !disabled && toggleValue(value)}
      onKeyDown={(e) => {
        if (disabled) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleValue(value);
        }
      }}
      className={cn(
        comboboxItemVariants({ disabled, appearance: itemAppearance }),
        "flex justify-between",
        isHighlighted &&
          "bg-[var(--zui-combobox-item-active-bg,oklch(93%_0.006_264.531))] dark:bg-[var(--zui-combobox-item-active-bg-dark,oklch(22%_0.006_264.531))]",
        className,
      )}
      {...props}
    >
      {children}
      {isActive && (
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="size-4 shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      )}
    </div>
  );
};

ComboboxItem.displayName = "ComboboxItem";

export const ComboboxEmpty = ({
  className,
  children,
  ...props
}: ComboboxEmptyProps) => {
  const { visibleValues } = useCombobox();

  if (visibleValues.length > 0) return null;

  return (
    <div
      data-slot="combobox-empty"
      className={cn(zuiComboboxEmptyBase, className)}
      {...props}
    >
      {children}
    </div>
  );
};

ComboboxEmpty.displayName = "ComboboxEmpty";
