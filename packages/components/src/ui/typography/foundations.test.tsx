import * as typographyTokens from "../../design-system/typography";
import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  Heading,
  Text,
  Strong,
  Emphasis,
  Small,
  VisuallyHidden,
} from "./index";

function classes(element: HTMLElement) {
  return element.className.split(" ");
}

describe("Typography foundations", () => {
  it("keeps the semantic heading when visual and fluid display sizes change", () => {
    const ref = createRef<HTMLHeadingElement>();
    const { rerender } = render(
      <Heading level={3} displayLevel={1} ref={ref}>
        Overview
      </Heading>,
    );
    const heading = screen.getByRole("heading", { level: 3, name: "Overview" });
    expect(ref.current).toBe(heading);
    expect(heading.className).toContain("--zui-typography-heading-1-size");
    rerender(
      <Heading
        level={3}
        displayLevel={1}
        displaySize="lg"
        scale="fluid"
        ref={ref}
      >
        Overview
      </Heading>,
    );
    expect(screen.getByRole("heading", { level: 3 })).toBe(heading);
    expect(heading.className).toContain(
      "--zui-typography-display-lg-fluid-size",
    );
    expect(heading).not.toHaveAttribute("displaySize");
    expect(heading).not.toHaveAttribute("scale");
  });
  it("explicit weight overrides legacy bold while retaining unrelated formatting", () => {
    render(
      <Heading level={2} bold weight="normal" italic underline>
        Title
      </Heading>,
    );
    const heading = screen.getByRole("heading");
    expect(heading.className).toContain("--zui-typography-weight-normal");
    expect(heading.className).not.toContain("--zui-typography-weight-bold");
    expect(heading).toHaveClass("italic", "underline");
  });
  it("keeps normal utility overrides effective without dark metric utilities competing", () => {
    render(
      <Text
        size="lg"
        weight="bold"
        className="text-xs font-normal leading-tight"
      >
        Custom
      </Text>,
    );
    const tokens = classes(screen.getByText("Custom"));
    expect(tokens).toContain("text-xs");
    expect(tokens).toContain("font-normal");
    expect(tokens).toContain("leading-tight");
    expect(tokens.some((token) => token.startsWith("text-[length:"))).toBe(
      false,
    );
    expect(tokens.some((token) => token.startsWith("font-[number:"))).toBe(
      false,
    );
    expect(
      tokens.some((token) =>
        /^dark:(text-\[length:|font-\[|leading-)/.test(token),
      ),
    ).toBe(false);
  });
  it("consumes style controls instead of leaking them as DOM attributes", () => {
    render(
      <Text
        align="end"
        weight="medium"
        leading="tight"
        tracking="wide"
        wrap="balance"
        measure="readable"
        font="mono"
        numeric="tabular"
      >
        Amount
      </Text>,
    );
    const text = screen.getByText("Amount");
    expect(text).toHaveClass("text-end", "text-balance", "tabular-nums");
    for (const prop of [
      "align",
      "weight",
      "leading",
      "tracking",
      "wrap",
      "measure",
      "font",
      "numeric",
    ])
      expect(text).not.toHaveAttribute(prop);
  });
  it("preserves the text default and resolves presets without modifying content", () => {
    const { rerender } = render(<Text>Ready</Text>);
    const text = screen.getByText("Ready");
    expect(text.tagName).toBe("P");
    expect(text.className).toContain("--zui-typography-text-base-size");
    rerender(<Text preset="lead">Ready</Text>);
    expect(text.className).toContain("--zui-typography-text-lg-size");
    rerender(<Text preset="caption">Ready</Text>);
    expect(text.className).toContain("--zui-typography-text-sm-size");
    rerender(<Text preset="overline">Ready</Text>);
    expect(text).toHaveClass("uppercase");
    expect(text.textContent).toBe("Ready");
    expect(text.className).toContain("--zui-typography-text-xs-size");
  });
  it("explicit variants override preset styling and legacy booleans", () => {
    render(
      <Text
        preset="overline"
        size="xl"
        weight="normal"
        leading="relaxed"
        tracking="normal"
        bold
      >
        Override
      </Text>,
    );
    const text = screen.getByText("Override");
    expect(text.className).toContain("--zui-typography-text-xl-size");
    expect(text.className).toContain("--zui-typography-weight-normal");
    expect(text.className).not.toContain("--zui-typography-overline-weight");
    expect(text.className).not.toContain("--zui-typography-overline-leading");
    expect(text.className).not.toContain("--zui-typography-overline-tracking");
  });
  it("forwards native label attributes and callback refs", () => {
    const callback = vi.fn();
    render(
      <>
        <Text as="label" htmlFor="email" ref={callback}>
          Email
        </Text>
        <input id="email" />
      </>,
    );
    expect(screen.getByLabelText("Email")).toHaveAttribute("id", "email");
    expect(callback).toHaveBeenCalledWith(screen.getByText("Email"));
  });
  it("renders importance, emphasis and fine print with native inline semantics", () => {
    const ref = createRef<HTMLElement>();
    render(
      <Text tone="muted">
        <Strong ref={ref}>Important</Strong> <Emphasis>Really</Emphasis>{" "}
        <Small>Terms</Small>
      </Text>,
    );
    expect(screen.getByText("Important").tagName).toBe("STRONG");
    expect(ref.current).toBe(screen.getByText("Important"));
    expect(screen.getByText("Really").tagName).toBe("EM");
    expect(screen.getByText("Terms").tagName).toBe("SMALL");
    // Inline semantics inherit the surrounding tone unless explicitly overridden.
    for (const text of ["Important", "Really", "Terms"])
      expect(screen.getByText(text).className).not.toContain(
        "typography-default-fg",
      );
  });
  it("allows explicit tone overrides on semantic inline content", () => {
    render(
      <Strong tone="destructive" title="Warning">
        Delete
      </Strong>,
    );
    expect(screen.getByText("Delete").className).toContain(
      "--zui-typography-destructive-fg",
    );
    expect(screen.getByText("Delete")).toHaveAttribute("title", "Warning");
  });
  it("uses visually hidden content as an accessible name without hiding it from assistive technology", () => {
    render(
      <button>
        <VisuallyHidden>Delete item</VisuallyHidden>
        <span aria-hidden="true">×</span>
      </button>,
    );
    expect(
      screen.getByRole("button", { name: "Delete item" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Delete item")).toHaveClass("sr-only");
    expect(screen.getByText("Delete item")).not.toHaveAttribute("aria-hidden");
    expect(screen.getByText("Delete item")).not.toHaveAttribute("tabindex");
  });
  it("supports native block refs and a focus-within skip-link wrapper", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <VisuallyHidden as="div" focusable ref={ref}>
        <a href="#content">Skip to content</a>
      </VisuallyHidden>,
    );
    expect(ref.current?.tagName).toBe("DIV");
    expect(ref.current).toHaveClass("sr-only", "focus-within:not-sr-only");
    expect(ref.current).not.toHaveAttribute("focusable");
    expect(
      screen.getByRole("link", { name: "Skip to content" }),
    ).toHaveAttribute("href", "#content");
  });
});

it("keeps every typography arbitrary value balanced and code tone fallbacks present", () => {
  function check(value: unknown) {
    if (typeof value === "string") {
      for (const match of value.matchAll(/\[[^\]]+\]/g)) {
        let depth = 0;
        for (const character of match[0]) {
          if (character === "(") depth++;
          if (character === ")") {
            depth--;
            expect(depth, match[0]).toBeGreaterThanOrEqual(0);
          }
        }
        expect(depth, match[0]).toBe(0);
      }
    } else if (value && typeof value === "object") {
      Object.values(value).forEach(check);
    }
  }
  check(typographyTokens);
  for (const token of [
    typographyTokens.zuiTypographyCodeBlockBase,
    typographyTokens.zuiTypographyInlineCodeBase,
  ]) {
    expect(token).toMatch(
      /border-\[color:var\(--zui-typography-[^,]+,var\(--_zui-type-tone-border,/,
    );
  }
});
