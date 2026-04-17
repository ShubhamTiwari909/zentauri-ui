import type { VariantProps } from "class-variance-authority";
import type { HTMLAttributes, ReactNode, Ref } from "react";

import type { AccordionTransition } from "./animations";
import type { accordionVariants } from "./variants";

export type { AccordionTransition };

type AccordionVariantProps = VariantProps<typeof accordionVariants>;

export type AccordionType = "single" | "multiple";

export type AccordionProps = AccordionVariantProps & {
  transition?: AccordionTransition;
  type?: AccordionType;
  /** Controlled value for `single` mode. */
  value?: string;
  /** Controlled values for `multiple` mode. */
  values?: string[];
  defaultValue?: string;
  defaultValues?: string[];
  onValueChange?: (value: string | undefined) => void;
  onValuesChange?: (values: string[]) => void;
  className?: string;
  children?: ReactNode;
};

export type AccordionItemProps = HTMLAttributes<HTMLDivElement> & {
  value: string;
  ref?: Ref<HTMLDivElement>;
};

export type AccordionTriggerProps = HTMLAttributes<HTMLButtonElement> & {
  ref?: Ref<HTMLButtonElement>;
};

export type AccordionContentProps = HTMLAttributes<HTMLDivElement> & {
  ref?: Ref<HTMLDivElement>;
};

export type AccordionCtx = {
  type: NonNullable<AccordionProps["type"]>;
  transition: NonNullable<AccordionProps["transition"]>;
  appearance: NonNullable<AccordionProps["appearance"]>;
  size: NonNullable<AccordionProps["size"]>;
  isOpen: (value: string) => boolean;
  toggle: (value: string) => void;
};
