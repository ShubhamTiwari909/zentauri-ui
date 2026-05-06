"use client";
import { useState, useEffect, useCallback, useRef, useId } from "react";
import {
  SelectProps,
  SelectOption,
  SelectTriggerProps,
  SelectContentProps,
  SelectItemProps,
  SelectValueProps,
} from "./types";
import { createContext, useContext } from "react";
import { SelectContextType } from "./types";
import { cn } from "../../lib/utils";
import {
  selectContentVariants,
  selectItemVariants,
  selectTriggerVariants,
} from "./variants";

export const SelectContext = createContext<SelectContextType | null>(null);

export const useSelect = () => {
  const ctx = useContext(SelectContext);
  if (!ctx) throw new Error("Select components must be used inside Select");
  return ctx;
};

export const Select = ({
  children,
  value,
  defaultValue = [],
  onChange,
  multiple = true,
}: SelectProps) => {
  const listboxId = `${useId()}-listbox`;
  const [internal, setInternal] = useState<string[]>(defaultValue);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<SelectOption[]>([]);
  const rootRef = useRef<HTMLDivElement>(null);

  const selected = value ?? internal;

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      const root = rootRef.current;
      if (!root) return;
      const target = event.target;
      if (target instanceof Node && !root.contains(target)) {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  const setSelected = (vals: string[]) => {
    if (value !== undefined) {
      onChange?.(vals);
    } else {
      setInternal(vals);
      onChange?.(vals);
    }
  };

  const toggleValue = (val: string) => {
    if (multiple) {
      if (selected.includes(val)) {
        setSelected(selected.filter((v) => v !== val));
      } else {
        setSelected([...selected, val]);
      }
    } else {
      setSelected([val]);
      setOpen(false);
    }
  };

  const isSelected = (val: string) => selected.includes(val);

  const registerOption = useCallback((opt: SelectOption) => {
    setOptions((prev) => {
      if (prev.find((o) => o.value === opt.value)) return prev;
      return [...prev, opt];
    });
  }, []);

  return (
    <SelectContext.Provider
      value={{
        open,
        setOpen,
        selected,
        toggleValue,
        isSelected,
        registerOption,
        options,
        multiple,
        listboxId,
      }}
    >
      <div ref={rootRef} className="relative w-full">
        {children}
      </div>
    </SelectContext.Provider>
  );
};

export const SelectTrigger = ({
  className,
  variant,
  size,
  onClick,
  ...props
}: SelectTriggerProps) => {
  const { open, setOpen, listboxId } = useSelect();

  return (
    <button
      type="button"
      aria-expanded={open}
      aria-haspopup="listbox"
      aria-controls={listboxId}
      className={cn(selectTriggerVariants({ variant, size }), className)}
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

export const SelectValue = ({
  placeholder = "Select...",
  className,
  ...props
}: SelectValueProps) => {
  const { selected, options } = useSelect();

  const selectedOptions = options.filter((o) => selected.includes(o.value));

  if (selectedOptions.length === 0) {
    return (
      <span className={cn(className)} {...props}>
        {placeholder}
      </span>
    );
  }

  return (
    <span className={cn(className)} {...props}>
      {selectedOptions.map((option, index) => (
        <span key={option.value}>
          {index > 0 ? ", " : null}
          {option.label}
        </span>
      ))}
    </span>
  );
};

export const SelectContent = ({
  children,
  className,
  appearance = "default",
  size = "md",
  spacing = "default",
  ...props
}: SelectContentProps) => {
  const { open, listboxId, multiple } = useSelect();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }
    const panel = panelRef.current;
    if (!panel) {
      return;
    }
    const opts = Array.from(
      panel.querySelectorAll<HTMLElement>('[role="option"]'),
    ).filter((el) => el.getAttribute("aria-disabled") !== "true");
    requestAnimationFrame(() => opts[0]?.focus());
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }
    const panel = panelRef.current;
    if (!panel) {
      return;
    }

    const enabledOptions = () =>
      Array.from(panel.querySelectorAll<HTMLElement>('[role="option"]')).filter(
        (el) => el.getAttribute("aria-disabled") !== "true",
      );

    const handleKeyDown = (event: KeyboardEvent) => {
      const options = enabledOptions();
      if (options.length === 0) {
        return;
      }

      const idx = options.findIndex((el) => el === document.activeElement);

      if (event.key === "ArrowDown") {
        event.preventDefault();
        const next = idx < 0 ? 0 : Math.min(idx + 1, options.length - 1);
        options[next]?.focus();
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        const prev = idx <= 0 ? options.length - 1 : Math.max(idx - 1, 0);
        options[prev]?.focus();
        return;
      }

      if (event.key === "Home") {
        event.preventDefault();
        options[0]?.focus();
        return;
      }

      if (event.key === "End") {
        event.preventDefault();
        options[options.length - 1]?.focus();
      }
    };

    panel.addEventListener("keydown", handleKeyDown);
    return () => panel.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  if (!open) return null;

  return (
    <div
      ref={panelRef}
      id={listboxId}
      role="listbox"
      aria-multiselectable={multiple}
      tabIndex={-1}
      className={cn(
        selectContentVariants({ appearance, size, spacing }),
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const SelectItem = ({
  value,
  children,
  disabled,
  appearance = "default",
  className,
  ...props
}: SelectItemProps) => {
  const { toggleValue, isSelected, registerOption } = useSelect();

  useEffect(() => {
    registerOption({ label: children, value, disabled });
  }, [children, disabled, registerOption, value]);

  const isActive = isSelected(value);

  return (
    <div
      role="option"
      aria-selected={isActive}
      aria-disabled={disabled ? true : undefined}
      tabIndex={-1}
      onClick={() => !disabled && toggleValue(value)}
      onKeyDown={(e) => {
        if (disabled) {
          return;
        }
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleValue(value);
        }
      }}
      data-selected={isActive ? "true" : "false"}
      className={cn(
        selectItemVariants({
          disabled,
          appearance,
        }),
        "flex justify-between",
        className,
      )}
      {...props}
    >
      {children}
      {isActive && <span>✓</span>}
    </div>
  );
};
