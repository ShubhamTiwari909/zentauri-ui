import { createRef } from "react";
import { expectTypeOf, it } from "vitest";
import type { HeadingProps, TextProps, VisuallyHiddenProps } from "./types";

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
  void invalidParagraph;
  void invalidHeading;
});
