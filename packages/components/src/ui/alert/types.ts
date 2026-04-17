import type { VariantProps } from "class-variance-authority";
import type { HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

import type { alertVariants } from "./variants";

export type AlertAnimation = "none" | "slide-down" | "fade" | "pop";

type AlertVariantProps = VariantProps<typeof alertVariants> & {
  closable?: boolean;
};

export type AlertProps = AlertVariantProps &
  Omit<HTMLMotionProps<"div">, "children"> & {
    triggerClassName?: string;
    animation?: AlertAnimation;
    children?: ReactNode;
    onClose?: () => void;
    closeLabel?: string;
  };

export type AlertSectionProps = {
  className?: string;
  children?: ReactNode;
};

export type AlertSize = NonNullable<AlertProps["size"]>;
