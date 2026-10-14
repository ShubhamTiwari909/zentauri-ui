"use client";

import { createContext, useContext, useId } from "react";
import { cn } from "../../lib/utils";
import {
  zuiTypographyFootnotesBase,
  zuiTypographyFootnotesListBase,
  zuiTypographyFootnoteItemBase,
  zuiTypographyFootnoteReferenceBase,
} from "../../design-system/typography";
import { textLinkVariants } from "./variants";
import type {
  FootnotesProps,
  FootnotesListProps,
  FootnoteItemProps,
  FootnoteReferenceProps,
  FootnoteBacklinkProps,
} from "./types";

const FootnotesContext = createContext<string | null>(null);
function identifier(value: string, name: string) {
  // Lone surrogates would make encodeURIComponent throw while building fragments.
  if (
    typeof value !== "string" ||
    !value.length ||
    /\s/u.test(value) ||
    /\p{Cs}/u.test(value)
  )
    throw new TypeError(
      `${name} must be a nonempty, well-formed identifier without whitespace`,
    );
  return value;
}
function ordinal(number: number) {
  if (!Number.isInteger(number) || number < 1 || number > 2147483647)
    throw new RangeError("Footnote number must be a positive 32-bit integer");
}
function useFootnotesScope() {
  const value = useContext(FootnotesContext);
  if (value === null)
    throw new Error("Footnote components must be used within Footnotes");
  return value;
}
// Length-delimited identifiers keep different authored tuples from colliding.
function noteId(scopeId: string, note: string) {
  identifier(note, "noteId");
  return `zui-note-s${scopeId.length}-${scopeId}-n${note.length}-${note}`;
}
function referenceId(scopeId: string, note: string, reference: string) {
  identifier(reference, "referenceId");
  return `${noteId(scopeId, note)}-r${reference.length}-${reference}`;
}
export const FootnotesBase = ({
  scopeId,
  className,
  children,
  ...props
}: FootnotesProps) => {
  const generated = useId();
  const value = identifier(scopeId ?? generated, "scopeId");
  return (
    <FootnotesContext.Provider value={value}>
      <div
        {...props}
        data-slot="typography-footnotes"
        className={cn(zuiTypographyFootnotesBase, className)}
      >
        {children}
      </div>
    </FootnotesContext.Provider>
  );
};
FootnotesBase.displayName = "Footnotes";

export const FootnoteReferenceBase = ({
  noteId: note,
  referenceId: reference,
  number,
  className,
  "aria-label": label,
  ...props
}: FootnoteReferenceProps) => {
  const value = useFootnotesScope();
  ordinal(number);
  return (
    <sup
      data-slot="typography-footnote-reference-wrapper"
      className={zuiTypographyFootnoteReferenceBase}
    >
      <a
        {...props}
        data-slot="typography-footnote-reference"
        id={referenceId(value, note, reference)}
        href={`#${encodeURIComponent(noteId(value, note))}`}
        aria-label={label ?? `Footnote ${number}`}
        className={cn(textLinkVariants({}), className)}
      >
        {number}
      </a>
    </sup>
  );
};
FootnoteReferenceBase.displayName = "FootnoteReference";
export const FootnotesListBase = ({
  className,
  "aria-label": label = "Footnotes",
  ...props
}: FootnotesListProps) => (
  <ol
    {...props}
    data-slot="typography-footnotes-list"
    aria-label={label}
    className={cn(zuiTypographyFootnotesListBase, className)}
  />
);
FootnotesListBase.displayName = "FootnotesList";
export const FootnoteItemBase = ({
  noteId: note,
  number,
  className,
  tabIndex = -1,
  ...props
}: FootnoteItemProps) => {
  const value = useFootnotesScope();
  ordinal(number);
  return (
    <li
      {...props}
      data-slot="typography-footnote-item"
      id={noteId(value, note)}
      value={number}
      tabIndex={tabIndex}
      className={cn(zuiTypographyFootnoteItemBase, className)}
    />
  );
};
FootnoteItemBase.displayName = "FootnoteItem";
export const FootnoteBacklinkBase = ({
  noteId: note,
  referenceId: reference,
  label,
  children = "↩",
  className,
  ...props
}: FootnoteBacklinkProps) => {
  const value = useFootnotesScope();
  if (!label.trim())
    throw new TypeError("Footnote backlink label must not be empty");
  return (
    <a
      {...props}
      data-slot="typography-footnote-backlink"
      href={`#${encodeURIComponent(referenceId(value, note, reference))}`}
      aria-label={label}
      className={cn(textLinkVariants({}), className)}
    >
      {children}
    </a>
  );
};
FootnoteBacklinkBase.displayName = "FootnoteBacklink";
