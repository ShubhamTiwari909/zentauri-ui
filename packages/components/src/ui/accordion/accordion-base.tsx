"use client";

import {
  createContext,
  useCallback,
  useContext,
  useId,
  useMemo,
  useState,
} from "react";

import { cn } from "../../lib/utils";

import type {
  AccordionBaseProps,
  AccordionContentProps,
  AccordionCtx,
  AccordionItemProps,
  AccordionTriggerProps,
} from "./types";
import {
  accordionContentVariants,
  accordionItemVariants,
  accordionTriggerVariants,
  accordionVariants,
} from "./variants";

const AccordionContext = createContext<AccordionCtx | null>(null);

const AccordionItemValueContext = createContext<string | null>(null);

export function useAccordionContext(component: string): AccordionCtx {
  const ctx = useContext(AccordionContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <Accordion>`);
  }
  return ctx;
}

export function useAccordionItemValue(component: string): string {
  const value = useContext(AccordionItemValueContext);
  if (!value) {
    throw new Error(`${component} must be used within <AccordionItem>`);
  }
  return value;
}

export function AccordionBase(props: AccordionBaseProps) {
  const {
    type = "single",
    value,
    values,
    defaultValue,
    defaultValues,
    onValueChange,
    onValuesChange,
    appearance = "default",
    size = "md",
    className,
    children,
  } = props;
  const isSingleControlled = value !== undefined;
  const isMultipleControlled = values !== undefined;
  const [singleUncontrolled, setSingleUncontrolled] = useState<
    string | undefined
  >(defaultValue);
  const [multipleUncontrolled, setMultipleUncontrolled] = useState<string[]>(
    defaultValues ?? [],
  );

  const singleValue = isSingleControlled ? value : singleUncontrolled;
  const multipleValues = useMemo(
    () => (isMultipleControlled ? (values ?? []) : multipleUncontrolled),
    [isMultipleControlled, values, multipleUncontrolled],
  );

  const isOpen = useCallback(
    (itemValue: string) => {
      if (type === "single") {
        return singleValue === itemValue;
      }
      return multipleValues.includes(itemValue);
    },
    [multipleValues, singleValue, type],
  );

  const toggle = useCallback(
    (itemValue: string) => {
      if (type === "single") {
        const next = singleValue === itemValue ? undefined : itemValue;
        if (!isSingleControlled) {
          setSingleUncontrolled(next);
        }
        onValueChange?.(next);
        return;
      }
      const exists = multipleValues.includes(itemValue);
      const next = exists
        ? multipleValues.filter((entry) => entry !== itemValue)
        : [...multipleValues, itemValue];
      if (!isMultipleControlled) {
        setMultipleUncontrolled(next);
      }
      onValuesChange?.(next);
    },
    [
      isMultipleControlled,
      isSingleControlled,
      multipleValues,
      onValueChange,
      onValuesChange,
      singleValue,
      type,
    ],
  );

  const ctx = useMemo(
    () => ({
      type,
      appearance: appearance ?? "default",
      size: size ?? "md",
      isOpen,
      toggle,
    }),
    [appearance, isOpen, size, toggle, type],
  );

  return (
    <AccordionContext.Provider value={ctx}>
      <div
        data-slot="accordion"
        className={cn(accordionVariants({ appearance, size }), className)}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

AccordionBase.displayName = "Accordion";

export function AccordionItem(props: AccordionItemProps) {
  const { className, value, children, ref, ...rest } = props;
  const { appearance } = useAccordionContext("AccordionItem");
  return (
    <AccordionItemValueContext.Provider value={value}>
      <div
        ref={ref}
        data-slot="accordion-item"
        data-value={value}
        className={cn(accordionItemVariants({ appearance }), className)}
        {...rest}
      >
        {children}
      </div>
    </AccordionItemValueContext.Provider>
  );
}

AccordionItem.displayName = "AccordionItem";

export function AccordionTrigger(props: AccordionTriggerProps) {
  const { className, children, ref, ...rest } = props;
  const itemValue = useAccordionItemValue("AccordionTrigger");
  const { isOpen, toggle, size } = useAccordionContext("AccordionTrigger");
  const open = isOpen(itemValue);
  const panelId = `${itemValue}-panel`;
  const baseId = useId();

  return (
    <h3 className="m-0">
      <button
        ref={ref}
        type="button"
        data-slot="accordion-trigger"
        id={`${baseId}-trigger-${itemValue}`}
        aria-expanded={open}
        aria-controls={panelId}
        className={cn(accordionTriggerVariants({ size }), className)}
        onClick={() => toggle(itemValue)}
        {...rest}
      >
        {children}
      </button>
    </h3>
  );
}

AccordionTrigger.displayName = "AccordionTrigger";

export function AccordionContent(props: AccordionContentProps) {
  const { className, children, ref } = props;
  const itemValue = useAccordionItemValue("AccordionContent");
  const { isOpen, size } = useAccordionContext("AccordionContent");
  const open = isOpen(itemValue);
  const panelId = `${itemValue}-panel`;

  return open ? (
    <div
      key={itemValue}
      ref={ref}
      id={panelId}
      role="region"
      data-slot="accordion-content"
      className={cn(accordionContentVariants({ size }), className)}
    >
      {children}
    </div>
  ) : null;
}

AccordionContent.displayName = "AccordionContent";
