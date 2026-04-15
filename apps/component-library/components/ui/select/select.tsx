"use client";
import { useState, useEffect, useCallback, useRef } from "react";
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
import { cn } from "@/lib/utils";
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
  ...props
}: SelectTriggerProps) => {
  const { open, setOpen } = useSelect();

  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className={cn(selectTriggerVariants({ variant, size }), className)}
      {...props}
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
  const { open } = useSelect();

  if (!open) return null;

  return (
    <div
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
      tabIndex={0}
      onClick={() => !disabled && toggleValue(value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") toggleValue(value);
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
