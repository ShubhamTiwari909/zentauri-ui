import { Fragment } from "react";
import { Mark } from "./mark";
import type { HighlightTextProps } from "./types";

export const HighlightTextBase = ({
  text,
  query,
  caseSensitive = false,
  markClassName,
  ...props
}: HighlightTextProps) => {
  const queries = [
    ...new Set(
      (typeof query === "string" ? [query] : query).filter(
        (item) => item.length > 0,
      ),
    ),
  ].sort((a, b) => b.length - a.length);
  const fragments = [];
  let cursor = 0;
  if (queries.length) {
    const escape = (value: string) =>
      value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = new RegExp(
      queries.map(escape).join("|"),
      caseSensitive ? "gu" : "giu",
    );
    for (const match of text.matchAll(pattern)) {
      const start = match.index;
      fragments.push(
        <Fragment key={`text-${cursor}`}>{text.slice(cursor, start)}</Fragment>,
      );
      fragments.push(
        <Mark key={`mark-${start}`} className={markClassName}>
          {match[0]}
        </Mark>,
      );
      cursor = start + match[0].length;
    }
  }
  fragments.push(
    <Fragment key={`text-${cursor}`}>{text.slice(cursor)}</Fragment>,
  );
  return (
    <span {...props} data-slot="typography-highlight-text">
      {fragments}
    </span>
  );
};
HighlightTextBase.displayName = "HighlightText";
