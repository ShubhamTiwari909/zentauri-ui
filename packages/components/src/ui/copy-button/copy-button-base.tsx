"use client";

import { FiCheck, FiCopy } from "react-icons/fi";

import { useClipboard } from "../../hooks/useClipboard/useClipboard";
import { cn } from "../../lib/utils";

import type { CopyButtonBaseProps, CopyButtonIconRenderer } from "./types";
import { copyButtonVariants } from "./variants";

const defaultRenderIcon: CopyButtonIconRenderer = ({
  copied,
  copyIcon,
  copiedIcon,
}) => (copied ? copiedIcon : copyIcon);

export function CopyButtonBase({
  value,
  timeout = 2000,
  appearance,
  size,
  iconOnly = true,
  label = "Copy",
  copiedLabel = "Copied",
  copyIcon = <FiCopy aria-hidden />,
  copiedIcon = <FiCheck aria-hidden />,
  onCopy,
  renderIcon = defaultRenderIcon,
  className,
  type = "button",
  disabled,
  onClick,
  "aria-label": ariaLabel,
  ref,
  ...rest
}: CopyButtonBaseProps) {
  const { copied, copy } = useClipboard(timeout);

  const handleClick: NonNullable<CopyButtonBaseProps["onClick"]> = async (
    event,
  ) => {
    onClick?.(event);
    if (event.defaultPrevented) {
      return;
    }
    const ok = await copy(value);
    if (ok) {
      onCopy?.(value);
    }
  };

  const text = copied ? copiedLabel : label;

  return (
    <button
      ref={ref}
      type={type}
      data-slot="copy-button"
      data-copied={copied ? "true" : undefined}
      disabled={disabled}
      aria-label={ariaLabel ?? (iconOnly ? text : undefined)}
      onClick={handleClick}
      className={cn(
        copyButtonVariants({ appearance, size, iconOnly }),
        className,
      )}
      {...rest}
    >
      <span
        data-slot="copy-button-icon"
        className="relative inline-flex items-center justify-center"
      >
        {renderIcon({ copied, copyIcon, copiedIcon })}
      </span>
      {!iconOnly ? (
        <span data-slot="copy-button-label" aria-live="polite">
          {text}
        </span>
      ) : (
        <span className="sr-only" aria-live="polite">
          {text}
        </span>
      )}
    </button>
  );
}

CopyButtonBase.displayName = "CopyButton";
