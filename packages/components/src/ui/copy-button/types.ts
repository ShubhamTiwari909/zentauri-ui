import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef, ReactNode } from "react";

import type { copyButtonVariants } from "./variants";

export type CopyButtonVariantProps = VariantProps<typeof copyButtonVariants>;

/** Renders the icon region for a given copied state. Lets the animated entry swap the static icons for motion ones. */
export type CopyButtonIconRenderer = (state: {
  copied: boolean;
  copyIcon: ReactNode;
  copiedIcon: ReactNode;
}) => ReactNode;

export interface CopyButtonBaseProps
  extends Omit<ComponentPropsWithRef<"button">, "value" | "onCopy"> {
  /** Text written to the clipboard when the button is pressed. */
  value: string;
  /** Milliseconds the copied state stays active before resetting. `0` keeps it until re-copied. */
  timeout?: number;
  appearance?: CopyButtonVariantProps["appearance"];
  size?: CopyButtonVariantProps["size"];
  /** Render only the icon (default). Pass `false` to show the label text alongside the icon. */
  iconOnly?: boolean;
  /** Label shown (and used for `aria-label`) in the idle state. */
  label?: string;
  /** Label shown (and used for `aria-label`) after a successful copy. */
  copiedLabel?: string;
  copyIcon?: ReactNode;
  copiedIcon?: ReactNode;
  /** Called with `value` after the clipboard write succeeds. */
  onCopy?: (value: string) => void;
  /** Overrides how the icon region renders; the animated entry uses this for motion. */
  renderIcon?: CopyButtonIconRenderer;
}

export type CopyButtonProps = Omit<CopyButtonBaseProps, "renderIcon">;
