import type { VariantProps } from "class-variance-authority";
import type { CSSProperties, ElementType, HTMLAttributes, ReactNode, Ref } from "react";

import type { modalContentVariants, modalTriggerVariants } from "./variants";

export type ModalContentVariantProps = VariantProps<typeof modalContentVariants>;

export type ModalProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
};

export type ModalTriggerProps = HTMLAttributes<HTMLButtonElement> & {
  ref?: Ref<HTMLButtonElement>;
  appearance?: VariantProps<typeof modalTriggerVariants>["appearance"];
};

export type ModalContentProps = ModalContentVariantProps & {
  className?: string;
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
  id?: string;
  style?: CSSProperties;
};

export type ModalSectionProps = {
  className?: string;
  children?: ReactNode;
};
