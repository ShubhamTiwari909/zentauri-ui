import type { VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";

import type { ToastAnimation } from "./animations";
import type { toastRootVariants, toastViewportVariants } from "./variants";

export type { ToastAnimation };

type ToastViewportVariantProps = VariantProps<typeof toastViewportVariants>;
type ToastRootVariantProps = VariantProps<typeof toastRootVariants>;

export type ToastPosition = NonNullable<ToastViewportVariantProps["position"]>;

export type ToastInput = ToastRootVariantProps & {
  id?: string;
  title?: ReactNode;
  description?: ReactNode;
  durationMs?: number;
  animation?: ToastAnimation;
};

export type ToastContextValue = {
  toast: (input: ToastInput) => string;
  dismiss: (id: string) => void;
};

export type ToastProviderProps = {
  children?: ReactNode;
};

export type ToastViewportProps = ToastViewportVariantProps & {
  className?: string;
};

export type ToastProps = ToastRootVariantProps & {
  toastId: string;
  animation?: ToastAnimation;
  className?: string;
  children?: ReactNode;
};

export type ToastSectionProps = {
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
};

export type InternalToast = Required<Pick<ToastInput, "id">> &
  Omit<ToastInput, "id"> & {
    durationMs: number;
    animation: NonNullable<ToastInput["animation"]>;
  };

export type ToastStoreContextValue = {
  toasts: InternalToast[];
  push: (input: ToastInput) => string;
  dismiss: (id: string) => void;
};
