import { createRef } from "react";
import { expectTypeOf, it } from "vitest";
import type {
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
  // @ts-expect-error Highlighting does not render HTML input.
  const html: HighlightTextProps = {
    text: "Text",
    query: "T",
    dangerouslySetInnerHTML: { __html: "Text" },
  };
  void invalid;
  void html;
});
