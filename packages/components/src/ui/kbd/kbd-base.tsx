"use client";

import { Fragment } from "react";

import { zuiKbdBase } from "../../design-system/kbd";
import { cn } from "../../lib/utils";

import type { KbdBaseProps } from "./types";
import { kbdKeyVariants, kbdSeparatorVariants } from "./variants";

export function KbdBase({
  keys,
  separator,
  appearance,
  size,
  children,
  className,
  as: Wrapper = "span",
  ref,
  ...rest
}: KbdBaseProps) {
  const items = keys ?? (children != null ? [children] : []);

  return (
    <Wrapper
      ref={ref}
      data-slot="kbd"
      className={cn(zuiKbdBase, className)}
      {...rest}
    >
      {items.map((key, index) => (
        <Fragment key={index}>
          {index > 0 && separator != null ? (
            <span
              data-slot="kbd-separator"
              className={kbdSeparatorVariants({ size })}
            >
              {separator}
            </span>
          ) : null}
          <kbd
            data-slot="kbd-key"
            className={kbdKeyVariants({ appearance, size })}
          >
            {key}
          </kbd>
        </Fragment>
      ))}
    </Wrapper>
  );
}

KbdBase.displayName = "Kbd";
