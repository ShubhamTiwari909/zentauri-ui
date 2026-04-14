"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Children,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import { cn } from "@/lib/utils";

import { selectContentAnimationPresets } from "./animations";
import type {
  SelectContentProps,
  SelectGroupProps,
  SelectItemProps,
  SelectLabelProps,
  SelectProps,
  SelectSeparatorProps,
  SelectTriggerProps,
  SelectValueProps,
} from "./types";
import {
  selectContentVariants,
  selectItemVariants,
  selectLabelVariants,
  selectSeparatorVariants,
  selectTriggerVariants,
} from "./variants";

type SelectCtx = {
  mode: NonNullable<SelectProps["mode"]>;
  open: boolean;
  setOpen: (next: boolean) => void;
  disabled: boolean;
  value?: string;
  /** Selected values in `multiple` mode (empty in `single` mode). */
  multiValues: string[];
  labelVersion: number;
  setSingleValue: (next: string | undefined) => void;
  toggleMultiValue: (itemValue: string) => void;
  isSelected: (itemValue: string) => boolean;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  listboxId: string;
  labelMap: React.MutableRefObject<Map<string, string>>;
  registerLabel: (itemValue: string, label: string) => void;
  unregisterLabel: (itemValue: string) => void;
};

const SelectContext = createContext<SelectCtx | null>(null);

function useSelectContext(component: string): SelectCtx {
  const ctx = useContext(SelectContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <Select>`);
  }
  return ctx;
}

function useBodyStyleVar(
  triggerRef: React.RefObject<HTMLButtonElement | null>,
  open: boolean,
) {
  useLayoutEffect(() => {
    if (!open) {
      return;
    }
    const node = triggerRef.current;
    if (!node) {
      return;
    }
    const width = `${node.getBoundingClientRect().width}px`;
    document.documentElement.style.setProperty("--select-trigger-width", width);
    return () => {
      document.documentElement.style.removeProperty("--select-trigger-width");
    };
  }, [open, triggerRef]);
}

export function Select({
  mode = "single",
  value,
  values,
  defaultValue,
  defaultValues,
  onValueChange,
  onValuesChange,
  disabled = false,
  children,
}: SelectProps) {
  const isSingleControlled = value !== undefined;
  const isMultiControlled = values !== undefined;
  const [singleUncontrolled, setSingleUncontrolled] = useState<string | undefined>(defaultValue);
  const [multiUncontrolled, setMultiUncontrolled] = useState<string[]>(defaultValues ?? []);
  const [open, setOpen] = useState(false);
  const [labelVersion, setLabelVersion] = useState(0);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const labelMap = useRef(new Map<string, string>());
  const listboxId = useId();

  const singleValue = isSingleControlled ? value : singleUncontrolled;
  const multiValues = isMultiControlled ? values ?? [] : multiUncontrolled;

  const setSingleValue = useCallback(
    (next: string | undefined) => {
      if (!isSingleControlled) {
        setSingleUncontrolled(next);
      }
      onValueChange?.(next);
    },
    [isSingleControlled, onValueChange],
  );

  const toggleMultiValue = useCallback(
    (itemValue: string) => {
      const base = isMultiControlled ? values ?? [] : multiUncontrolled;
      const exists = base.includes(itemValue);
      const next = exists ? base.filter((v) => v !== itemValue) : [...base, itemValue];
      if (!isMultiControlled) {
        setMultiUncontrolled(next);
      }
      onValuesChange?.(next);
    },
    [isMultiControlled, multiUncontrolled, onValuesChange, values],
  );

  const isSelected = useCallback(
    (itemValue: string) => {
      if (mode === "single") {
        return singleValue === itemValue;
      }
      return multiValues.includes(itemValue);
    },
    [mode, multiValues, singleValue],
  );

  const registerLabel = useCallback((itemValue: string, label: string) => {
    labelMap.current.set(itemValue, label);
    setLabelVersion((version) => version + 1);
  }, []);

  const unregisterLabel = useCallback((itemValue: string) => {
    labelMap.current.delete(itemValue);
    setLabelVersion((version) => version + 1);
  }, []);

  const ctx = useMemo(
    () => ({
      mode,
      open,
      setOpen,
      disabled,
      value: singleValue,
      multiValues,
      labelVersion,
      setSingleValue,
      toggleMultiValue,
      isSelected,
      triggerRef,
      listboxId,
      labelMap,
      registerLabel,
      unregisterLabel,
    }),
    [
      disabled,
      isSelected,
      labelVersion,
      listboxId,
      mode,
      multiValues,
      open,
      registerLabel,
      setSingleValue,
      singleValue,
      toggleMultiValue,
      unregisterLabel,
    ],
  );

  return <SelectContext.Provider value={ctx}>{children}</SelectContext.Provider>;
}

Select.displayName = "Select";

export function SelectTrigger({ className, size, appearance, children, ref, ...rest }: SelectTriggerProps) {
  const { open, setOpen, disabled, triggerRef, listboxId } = useSelectContext("SelectTrigger");

  return (
    <button
      ref={(node) => {
        triggerRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        }
      }}
      type="button"
      role="combobox"
      data-slot="select-trigger"
      aria-expanded={open}
      aria-controls={listboxId}
      aria-haspopup="listbox"
      aria-disabled={disabled}
      disabled={disabled}
      className={cn(selectTriggerVariants({ size, appearance }), className)}
      onClick={() => {
        if (!disabled) {
          setOpen(!open);
        }
      }}
      {...rest}
    >
      {children}
    </button>
  );
}

SelectTrigger.displayName = "SelectTrigger";

export function SelectValue({ placeholder = "Select…", className }: SelectValueProps) {
  const { mode, value, multiValues, labelMap, labelVersion } = useSelectContext("SelectValue");

  const text = useMemo(() => {
    if (mode === "single") {
      if (!value) {
        return null;
      }
      return labelMap.current.get(value) ?? value;
    }
    if (multiValues.length === 0) {
      return null;
    }
    if (multiValues.length === 1) {
      const only = multiValues[0];
      return labelMap.current.get(only) ?? only;
    }
    return `${multiValues.length} selected`;
  }, [labelMap, labelVersion, mode, multiValues, value]);

  return (
    <span data-slot="select-value" className={cn("truncate", !text && "text-slate-500", className)}>
      {text ?? placeholder}
    </span>
  );
}

SelectValue.displayName = "SelectValue";

export function SelectContent({
  className,
  size,
  appearance,
  animation = "scale",
  children,
  ref,
}: SelectContentProps) {
  const { open, setOpen, triggerRef, listboxId, mode } = useSelectContext("SelectContent");
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const motionProps = selectContentAnimationPresets[animation];

  useBodyStyleVar(triggerRef, open);

  useLayoutEffect(() => {
    if (!open) {
      return;
    }
    const trigger = triggerRef.current?.getBoundingClientRect();
    if (!trigger) {
      return;
    }
    setCoords({
      top: trigger.bottom + 6 + window.scrollY,
      left: trigger.left + window.scrollX,
    });
  }, [open, triggerRef]);

  useEffect(() => {
    if (!open) {
      return;
    }
    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (contentRef.current?.contains(target) || triggerRef.current?.contains(target)) {
        return;
      }
      setOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, setOpen, triggerRef]);

  const portalTarget = typeof document !== "undefined" ? document.body : null;
  if (!portalTarget) {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={(node) => {
            contentRef.current = node;
            if (typeof ref === "function") {
              ref(node);
            } else if (ref) {
              (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
            }
          }}
          id={listboxId}
          role="listbox"
          aria-multiselectable={mode === "multiple"}
          data-slot="select-content"
          className={cn("fixed", selectContentVariants({ size, appearance }), className)}
          style={{ top: coords.top, left: coords.left }}
          initial={animation === "none" ? false : motionProps.initial}
          animate={animation === "none" ? undefined : motionProps.animate}
          exit={animation === "none" ? undefined : motionProps.exit}
          transition={motionProps.transition}
        >
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>,
    portalTarget,
  );
}

SelectContent.displayName = "SelectContent";

function getItemLabel(children: SelectItemProps["children"]): string {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }
  const texts: string[] = [];
  Children.forEach(children, (child) => {
    if (typeof child === "string" || typeof child === "number") {
      texts.push(String(child));
    } else if (isValidElement(child)) {
      const props = child.props as { children?: unknown };
      if (typeof props.children === "string") {
        texts.push(props.children);
      }
    }
  });
  return texts.join(" ").trim() || "";
}

export function SelectItem({
  className,
  value: itemValue,
  disabled: itemDisabled,
  children,
  ref,
  ...rest
}: SelectItemProps) {
  const {
    setOpen,
    disabled: rootDisabled,
    mode,
    setSingleValue,
    toggleMultiValue,
    isSelected,
    registerLabel,
    unregisterLabel,
  } = useSelectContext("SelectItem");

  const label = useMemo(() => getItemLabel(children), [children]);

  useEffect(() => {
    registerLabel(itemValue, label || itemValue);
    return () => unregisterLabel(itemValue);
  }, [itemValue, label, registerLabel, unregisterLabel]);

  const selected = isSelected(itemValue);
  const isDisabled = rootDisabled || itemDisabled;

  return (
    <div
      ref={ref}
      role="option"
      aria-selected={selected}
      data-slot="select-item"
      data-disabled={isDisabled ? "" : undefined}
      data-highlighted={undefined}
      className={cn(selectItemVariants(), className)}
      onClick={() => {
        if (isDisabled) {
          return;
        }
        if (mode === "single") {
          setSingleValue(itemValue);
          setOpen(false);
          return;
        }
        toggleMultiValue(itemValue);
      }}
      {...rest}
    >
      <span className="flex-1 truncate">{children}</span>
      {mode === "multiple" ? (
        <span
          aria-hidden
          className={cn(
            "flex size-4 items-center justify-center rounded border border-white/20 text-[0.65rem]",
            selected && "border-cyan-400 bg-cyan-500/20 text-cyan-200",
          )}
        >
          {selected ? "✓" : ""}
        </span>
      ) : null}
    </div>
  );
}

SelectItem.displayName = "SelectItem";

export function SelectGroup({ className, ...rest }: SelectGroupProps) {
  return <div role="group" data-slot="select-group" className={cn(className)} {...rest} />;
}

SelectGroup.displayName = "SelectGroup";

export function SelectLabel({ className, ...rest }: SelectLabelProps) {
  return <div data-slot="select-label" className={cn(selectLabelVariants(), className)} {...rest} />;
}

SelectLabel.displayName = "SelectLabel";

export function SelectSeparator({ className, ...rest }: SelectSeparatorProps) {
  return <div role="separator" data-slot="select-separator" className={cn(selectSeparatorVariants(), className)} {...rest} />;
}

SelectSeparator.displayName = "SelectSeparator";
