import { createRef } from "react";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { TypingIndicator } from "./typing-indicator";

describe("TypingIndicator", () => {
  it("should set displayName", () => {
    expect(TypingIndicator.displayName).toBe("TypingIndicator");
  });

  it("should stamp data-slot on the root container", () => {
    const { container } = render(<TypingIndicator />);
    const root = container.querySelector('[data-slot="typing-indicator"]');
    expect(root).toBeTruthy();
  });

  it("should render three dots by default", () => {
    const { container } = render(<TypingIndicator />);
    const dots = container.querySelectorAll(
      '[data-slot="typing-indicator-dot"]',
    );
    expect(dots.length).toBe(3);
  });

  it("should render custom number of dots", () => {
    const { container } = render(<TypingIndicator dots={5} />);
    const dots = container.querySelectorAll(
      '[data-slot="typing-indicator-dot"]',
    );
    expect(dots.length).toBe(5);
  });

  it("should render a label before the dots", () => {
    const { container } = render(
      <TypingIndicator label="Typing" labelPosition="before" />,
    );
    const label = container.querySelector(
      '[data-slot="typing-indicator-label"]',
    );
    expect(label).toBeTruthy();
    expect(label?.textContent).toBe("Typing");
  });

  it("should render a label after the dots", () => {
    const { container } = render(
      <TypingIndicator label="is typing" labelPosition="after" />,
    );
    const label = container.querySelector(
      '[data-slot="typing-indicator-label"]',
    );
    expect(label).toBeTruthy();
    expect(label?.textContent).toBe("is typing");
  });

  it("should skip label when not provided", () => {
    const { container } = render(<TypingIndicator />);
    const label = container.querySelector(
      '[data-slot="typing-indicator-label"]',
    );
    expect(label).toBeFalsy();
  });

  it("should forward refs to the root element", () => {
    const ref = createRef<HTMLSpanElement>();
    render(<TypingIndicator ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.getAttribute("data-slot")).toBe("typing-indicator");
  });

  it("should apply custom className", () => {
    const { container } = render(<TypingIndicator className="custom-class" />);
    const root = container.querySelector('[data-slot="typing-indicator"]');
    expect(root?.className).toMatch(/custom-class/);
  });
});
