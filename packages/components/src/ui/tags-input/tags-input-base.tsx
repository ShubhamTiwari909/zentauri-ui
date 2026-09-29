"use client";

import { useState } from "react";
import { cn } from "../../lib/utils";
import { zuiTagsInputTag } from "../../design-system/tags-input";
import { tagsInputVariants } from "./variants";
import type { TagsInputProps } from "./types";

export function TagsInputBase({
  value,
  defaultValue = [],
  onValueChange,
  maxTags,
  validateTag,
  onInvalidTag,
  delimiters = [",", "Enter"],
  appearance,
  size,
  disabled,
  readOnly,
  className,
  placeholder = "Add a tag…",
  name,
  onKeyDown,
  onBlur,
  onPaste,
  ref,
  ...rest
}: TagsInputProps) {
  const controlled = value !== undefined;
  const [internal, setInternal] = useState<string[]>([...defaultValue]);
  const tags = controlled ? value : internal;
  const [draft, setDraft] = useState("");
  const [announcement, setAnnouncement] = useState("");
  const publish = (next: string[]) => {
    if (!controlled) setInternal(next);
    onValueChange?.(next);
  };
  const add = (raw: string, current = [...tags]) => {
    const tag = raw.trim();
    if (!tag) return current;
    let reason: "duplicate" | "limit" | "invalid" | undefined;
    if (current.some((item) => item.toLowerCase() === tag.toLowerCase()))
      reason = "duplicate";
    else if (maxTags !== undefined && current.length >= maxTags)
      reason = "limit";
    else if (validateTag && !validateTag(tag)) reason = "invalid";
    if (reason) {
      onInvalidTag?.(tag, reason);
      setAnnouncement(`${tag} was not added: ${reason}`);
      return current;
    }
    return [...current, tag];
  };
  const commit = (raw: string) => {
    const next = add(raw);
    if (next.length !== tags.length) {
      publish(next);
      setAnnouncement(`${next.at(-1)} added`);
      setDraft("");
    }
  };
  const remove = (index: number) => {
    const removed = tags[index];
    publish(tags.filter((_, i) => i !== index));
    setAnnouncement(`${removed} removed`);
  };
  return (
    <div
      data-slot="tags-input"
      data-disabled={disabled || undefined}
      className={cn(
        tagsInputVariants({ appearance, size }),
        "flex-wrap",
        className,
      )}
      onClick={(event) => {
        if (event.target === event.currentTarget)
          event.currentTarget.querySelector("input")?.focus();
      }}
    >
      {tags.map((tag, index) => (
        <span
          key={`${tag}-${index}`}
          data-slot="tags-input-tag"
          className={zuiTagsInputTag}
        >
          <span>{tag}</span>
          {!disabled && !readOnly && (
            <button
              type="button"
              aria-label={`Remove ${tag}`}
              onClick={() => remove(index)}
              className="rounded-sm px-0.5 focus-visible:outline-2"
            >
              ×
            </button>
          )}
        </span>
      ))}
      <input
        {...rest}
        ref={ref}
        data-slot="tags-input-control"
        type="text"
        name={undefined}
        value={draft}
        placeholder={tags.length ? undefined : placeholder}
        disabled={disabled}
        readOnly={readOnly}
        className="min-w-20 flex-1 bg-transparent outline-none placeholder:opacity-60"
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={(event) => {
          if (!disabled && !readOnly && delimiters.includes(event.key)) {
            event.preventDefault();
            if (draft.trim()) commit(draft);
          } else if (
            event.key === "Backspace" &&
            !draft &&
            tags.length &&
            !readOnly &&
            !disabled
          ) {
            remove(tags.length - 1);
          } else if (event.key === "Escape") {
            setDraft("");
          }
          onKeyDown?.(event);
        }}
        onBlur={(event) => {
          if (draft.trim() && !readOnly && !disabled) commit(draft);
          onBlur?.(event);
        }}
        onPaste={(event) => {
          if (disabled || readOnly) {
            onPaste?.(event);
            return;
          }
          const text = event.clipboardData.getData("text");
          const separators = delimiters.filter((d) => d.length === 1);
          if (separators.some((d) => text.includes(d)) || text.includes("\n")) {
            event.preventDefault();
            const parts = (draft + text).split(
              new RegExp(
                `[${separators.map((d) => d.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("")}\\n]+`,
              ),
            );
            let next = [...tags];
            for (const part of parts) next = add(part, next);
            if (next.length !== tags.length) publish(next);
            setDraft("");
          }
          onPaste?.(event);
        }}
      />
      {name &&
        tags.map((tag, index) => (
          <input
            key={`${tag}-${index}`}
            type="hidden"
            name={name}
            value={tag}
            disabled={disabled}
          />
        ))}
      <span className="sr-only" role="status" aria-live="polite">
        {announcement}
      </span>
    </div>
  );
}
