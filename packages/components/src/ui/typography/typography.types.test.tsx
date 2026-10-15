import { createRef } from "react";
import { expectTypeOf, it } from "vitest";
import type {
  FootnotesProps,
  FootnotesListProps,
  FootnoteReferenceProps,
  FootnoteItemProps,
  FootnoteBacklinkProps,
  NumberTextProps,
  MarkProps,
  HighlightTextProps,
  TruncateTextProps,
  ExpandableTextProps,
  ProseProps,
  TextLinkProps,
  DescriptionListProps,
  HeadingProps,
  TextProps,
  VisuallyHiddenProps,
} from "./types";

it("accepts native attributes and correctly typed refs on the public typography APIs", () => {
  const heading = {
    level: 2,
    ref: createRef<HTMLHeadingElement>(),
  } satisfies HeadingProps;
  const label = {
    as: "label",
    htmlFor: "email",
    ref: createRef<HTMLLabelElement>(),
  } satisfies TextProps;
  const text = {
    as: "span",
    ref: createRef<HTMLSpanElement>(),
    preset: "caption",
  } satisfies TextProps;
  const hidden = {
    as: "div",
    ref: createRef<HTMLDivElement>(),
    focusable: true,
  } satisfies VisuallyHiddenProps;
  expectTypeOf(heading).toExtend<HeadingProps>();
  expectTypeOf(label).toExtend<TextProps>();
  expectTypeOf(text).toExtend<TextProps>();
  expectTypeOf(hidden).toExtend<VisuallyHiddenProps>();
  // @ts-expect-error htmlFor belongs to labels, not paragraph text.
  const invalidParagraph: TextProps = { as: "p", htmlFor: "email" };
  // @ts-expect-error Heading still requires a valid semantic level.
  const invalidHeading: HeadingProps = { level: 7 };
  const prose = {
    as: "article",
    tone: "muted",
    ref: createRef<HTMLElement>(),
  } satisfies ProseProps;
  const link = {
    href: "/docs",
    target: "_blank",
    ref: createRef<HTMLAnchorElement>(),
  } satisfies TextLinkProps;
  const definitions = {
    layout: "responsive",
    ref: createRef<HTMLDListElement>(),
  } satisfies DescriptionListProps;
  expectTypeOf(prose).toExtend<ProseProps>();
  expectTypeOf(link).toExtend<TextLinkProps>();
  expectTypeOf(definitions).toExtend<DescriptionListProps>();
  // @ts-expect-error Gradient foregrounds are not available on whole prose containers.
  const gradientProse: ProseProps = { tone: "gradient-cyan-blue" };
  // @ts-expect-error Link foregrounds must remain readable without text clipping.
  const gradientLink: TextLinkProps = { tone: "gradient-cyan-blue" };
  void gradientProse;
  void gradientLink;
  void invalidParagraph;
  void invalidHeading;
});

it("supports text utility native refs and rejects arbitrary child traversal", () => {
  const mark = {
    ref: createRef<HTMLElement>(),
    children: "match",
  } satisfies MarkProps;
  const highlight = {
    ref: createRef<HTMLSpanElement>(),
    text: "Text",
    query: ["text"] as const,
  } satisfies HighlightTextProps;
  const truncate = {
    as: "p",
    ref: createRef<HTMLParagraphElement>(),
    children: "Full text",
    lines: 2,
  } satisfies TruncateTextProps;
  const disclosure = {
    ref: createRef<HTMLDivElement>(),
    text: "Full text",
    expanded: false,
    onExpandedChange: (value: boolean) => {
      void value;
    },
  } satisfies ExpandableTextProps;
  expectTypeOf(mark).toExtend<MarkProps>();
  expectTypeOf(highlight).toExtend<HighlightTextProps>();
  expectTypeOf(truncate).toExtend<TruncateTextProps>();
  expectTypeOf(disclosure).toExtend<ExpandableTextProps>();
  // @ts-expect-error Truncation accepts strings, not arbitrary React children.
  const invalid: TruncateTextProps = { children: <span>Text</span> };
  const html: HighlightTextProps = {
    text: "Text",
    query: "T",
    // @ts-expect-error Highlighting does not render HTML input.
    dangerouslySetInnerHTML: { __html: "Text" },
  };
  void invalid;
  void html;
});

it("keeps numeric values, formatting options and native style/ref props separate", () => {
  const amount = {
    value: 1234.5,
    locale: "en-IN",
    formatOptions: { style: "currency", currency: "INR" },
    style: { color: "red" },
    ref: createRef<HTMLSpanElement>(),
    partClassNames: { currency: "currency" },
  } satisfies NumberTextProps;
  const paragraph = {
    as: "p",
    value: 1234n,
    ref: createRef<HTMLParagraphElement>(),
  } satisfies NumberTextProps;
  expectTypeOf(amount).toExtend<NumberTextProps>();
  expectTypeOf(paragraph).toExtend<NumberTextProps>();
  const string: NumberTextProps = {
    // @ts-expect-error Numeric strings are deliberately outside the public API.
    value: "12",
  };
  const children: NumberTextProps = {
    value: 12,
    // @ts-expect-error Formatted content is derived from value.
    children: "12",
  };
  const gradient: NumberTextProps = {
    value: 12,
    // @ts-expect-error Numeric text uses readable foreground tones.
    tone: "gradient-cyan-blue",
  };
  void string;
  void children;
  void gradient;
});

it("preserves editorial native refs and owns its navigation identifiers", () => {
  const root = {
    scopeId: "article",
    ref: createRef<HTMLDivElement>(),
  } satisfies FootnotesProps;
  const list = {
    ref: createRef<HTMLOListElement>(),
    "aria-label": "Notas",
  } satisfies FootnotesListProps;
  const reference = {
    noteId: "one",
    referenceId: "opening",
    number: 1,
    ref: createRef<HTMLAnchorElement>(),
  } satisfies FootnoteReferenceProps;
  const item = {
    noteId: "one",
    number: 1,
    ref: createRef<HTMLLIElement>(),
  } satisfies FootnoteItemProps;
  const backlink = {
    noteId: "one",
    referenceId: "opening",
    label: "Back to opening",
    ref: createRef<HTMLAnchorElement>(),
  } satisfies FootnoteBacklinkProps;
  expectTypeOf(root).toExtend<FootnotesProps>();
  expectTypeOf(list).toExtend<FootnotesListProps>();
  expectTypeOf(reference).toExtend<FootnoteReferenceProps>();
  expectTypeOf(item).toExtend<FootnoteItemProps>();
  expectTypeOf(backlink).toExtend<FootnoteBacklinkProps>();
  const href: FootnoteReferenceProps = {
    noteId: "one",
    referenceId: "opening",
    number: 1,
    // @ts-expect-error The target is derived from the note's scoped identifier.
    href: "#other",
  };
  const id: FootnoteItemProps = {
    noteId: "one",
    number: 1,
    // @ts-expect-error FootnoteItem owns its target ID.
    id: "other",
  };
  // @ts-expect-error Backlinks need a meaningful accessible label.
  const unlabeled: FootnoteBacklinkProps = {
    noteId: "one",
    referenceId: "opening",
  };
  void href;
  void id;
  void unlabeled;
});

const rejectedBacklinkHtml: FootnoteBacklinkProps = {
  noteId: "note",
  referenceId: "opening",
  label: "Back to opening",
  // @ts-expect-error Backlinks supply their own children and cannot also inject HTML.
  dangerouslySetInnerHTML: { __html: "Back" },
};
void rejectedBacklinkHtml;
