import type { VariantProps } from "class-variance-authority";
import type { CSSProperties, HTMLAttributes, ReactNode, Ref } from "react";

import type { modalContentVariants, modalTriggerVariants } from "./variants";

export type ModalAnimation = "none" | "fade" | "scale" | "slide-up" | "slide-down";

type ModalContentVariantProps = VariantProps<typeof modalContentVariants>;

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
  animation?: ModalAnimation;
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
