import type { VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes, ReactNode, Ref } from "react";

import type { toggleThumbVariants, toggleTrackVariants } from "./variants";

export type ToggleTrackVariantProps = VariantProps<typeof toggleTrackVariants>;
export type ToggleThumbVariantProps = VariantProps<typeof toggleThumbVariants>;

export type ToggleProps = ToggleTrackVariantProps &
  ToggleThumbVariantProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "role" | "ref"> & {
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    "aria-label"?: string;
    children?: ReactNode;
    ref?: Ref<HTMLButtonElement>;
  };
