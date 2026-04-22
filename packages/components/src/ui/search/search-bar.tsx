"use client";

import { forwardRef, useId } from "react";

import { cn } from "../../lib/utils";
import { inputVariants } from "../inputs/variants";

import type { SearchBarProps } from "./types";

export const SearchBar = function SearchBar(
  {
    value,
    onValueChange,
    leadingSlot,
    className,
    inputClassName,
    appearance = "default",
    inputSize = "md",
    ring = true,
    id,
    onChange,
    disabled,
    type,
    comboboxListboxId,
    comboboxActiveOptionId,
    comboboxExpanded,
    ref,
    ...rest
  }: SearchBarProps,
) {
  const generatedId = useId();
  const controlId = id ?? generatedId;
  const combobox = Boolean(comboboxListboxId);

  return (
    <div
      data-slot="search-bar"
      className={cn("relative flex w-full min-w-0 items-center", className)}
    >
      {leadingSlot ? (
        <span
          className="pointer-events-none absolute left-3 top-1/2 z-1 flex -translate-y-1/2 text-slate-400 [&_svg]:size-4"
          aria-hidden
        >
          {leadingSlot}
        </span>
      ) : null}
      <input
        ref={ref}
        id={controlId}
        type={type ?? "search"}
        autoComplete="off"
        spellCheck={false}
        disabled={disabled}
        value={value}
        data-slot="search-bar-input"
        className={cn(
          inputVariants({ appearance, size: inputSize, ring, as: "input" }),
          leadingSlot ? "pl-10" : null,
          inputClassName,
        )}
        onChange={(event) => {
          onChange?.(event);
          onValueChange?.(event.target.value);
        }}
        {...(combobox
          ? {
              role: "combobox" as const,
              "aria-autocomplete": "list" as const,
              "aria-controls": comboboxListboxId,
              "aria-expanded": comboboxExpanded ?? false,
              ...(comboboxActiveOptionId
                ? { "aria-activedescendant": comboboxActiveOptionId }
                : {}),
            }
          : {})}
        {...rest}
      />
    </div>
  );
}

SearchBar.displayName = "SearchBar";
