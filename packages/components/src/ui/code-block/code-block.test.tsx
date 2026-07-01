import { createRef } from "react";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CodeBlock } from "./code-block";
import { splitCodeLines } from "./code-block-base";

const SAMPLE_CODE = `const greeting = "hello";
console.log(greeting);`;

describe("CodeBlock", () => {
  it("should set displayName", () => {
    expect(CodeBlock.displayName).toBe("CodeBlock");
  });

  it("should stamp data-slot on the root and body", () => {
    const { container } = render(<CodeBlock code={SAMPLE_CODE} />);
    expect(container.querySelector('[data-slot="code-block"]')).toBeTruthy();
    expect(
      container.querySelector('[data-slot="code-block-body"]'),
    ).toBeTruthy();
  });

  it("should render the given code content", () => {
    const { container } = render(<CodeBlock code={SAMPLE_CODE} />);
    expect(container.textContent).toContain('const greeting = "hello"');
    expect(container.textContent).toContain("console.log(greeting)");
  });

  it("should render the language label", () => {
    const { container } = render(
      <CodeBlock code={SAMPLE_CODE} language="javascript" />,
    );
    const lang = container.querySelector('[data-slot="code-block-lang"]');
    expect(lang?.textContent).toBe("javascript");
  });

  it("should render line numbers when showLineNumbers is true", () => {
    const { container } = render(
      <CodeBlock code={SAMPLE_CODE} showLineNumbers />,
    );
    const lineNumbers = [
      ...container.querySelectorAll('[data-slot="code-block-line-number"]'),
    ];
    expect(lineNumbers.length).toBe(2);
    expect(lineNumbers[0]?.textContent).toBe("1");
    expect(lineNumbers[1]?.textContent).toBe("2");
  });

  it("should render the copy button by default", () => {
    const { container } = render(<CodeBlock code={SAMPLE_CODE} />);
    expect(
      container.querySelector('[data-slot="code-block-copy"]'),
    ).toBeTruthy();
  });

  it("should hide the copy button when enableClipboard is false", () => {
    const { container } = render(
      <CodeBlock code={SAMPLE_CODE} enableClipboard={false} />,
    );
    expect(
      container.querySelector('[data-slot="code-block-copy"]'),
    ).toBeFalsy();
  });

  it("should render the header by default and hide it when disabled", () => {
    const { container, rerender } = render(<CodeBlock code={SAMPLE_CODE} />);
    expect(
      container.querySelector('[data-slot="code-block-header"]'),
    ).toBeTruthy();
    rerender(<CodeBlock code={SAMPLE_CODE} showHeader={false} />);
    expect(
      container.querySelector('[data-slot="code-block-header"]'),
    ).toBeFalsy();
  });

  it("should forward refs to the root element", () => {
    const ref = createRef<HTMLDivElement>();
    render(<CodeBlock code={SAMPLE_CODE} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.getAttribute("data-slot")).toBe("code-block");
  });

  it("should apply custom className", () => {
    const { container } = render(
      <CodeBlock code={SAMPLE_CODE} className="custom-class" />,
    );
    const root = container.querySelector('[data-slot="code-block"]');
    expect(root?.className).toMatch(/custom-class/);
  });
});

describe("code-block helpers", () => {
  it("splitCodeLines splits code into lines", () => {
    const lines = splitCodeLines(SAMPLE_CODE);
    expect(lines).toEqual([
      'const greeting = "hello";',
      "console.log(greeting);",
    ]);
  });

  it("splitCodeLines handles a single line", () => {
    expect(splitCodeLines("hello")).toEqual(["hello"]);
  });

  it("splitCodeLines handles empty string", () => {
    expect(splitCodeLines("")).toEqual([""]);
  });
});
