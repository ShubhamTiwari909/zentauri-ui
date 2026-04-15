import type { VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes, ReactNode, Ref } from "react";

import type { ToggleAnimation } from "./animations";
import type { toggleThumbVariants, toggleTrackVariants } from "./variants";

export type { ToggleAnimation };

type ToggleTrackVariantProps = VariantProps<typeof toggleTrackVariants>;
type ToggleThumbVariantProps = VariantProps<typeof toggleThumbVariants>;

export type ToggleProps = ToggleTrackVariantProps &
  ToggleThumbVariantProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "role" | "ref"> & {
    animation?: ToggleAnimation;
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    "aria-label"?: string;
    children?: ReactNode;
    ref?: Ref<HTMLButtonElement>;
  };
