import { createRef } from "react";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SecretReveal } from "./secret-reveal";

describe("SecretReveal", () => {
  it("should set displayName", () => {
    expect(SecretReveal.displayName).toBe("SecretReveal");
  });

  it("should stamp data-slot on the root container", () => {
    const { container } = render(<SecretReveal value="sk-test" />);
    const root = container.querySelector('[data-slot="secret-reveal"]');
    expect(root).toBeTruthy();
  });

  it("should render masked value by default", () => {
    const { container } = render(<SecretReveal value="sk-test" />);
    const valueEl = container.querySelector(
      '[data-slot="secret-reveal-value"]',
    );
    expect(valueEl?.textContent).toBe("•••••••");
  });

  it("should render a label", () => {
    const { container } = render(
      <SecretReveal value="sk-test" label="API Key" />,
    );
    const label = container.querySelector('[data-slot="secret-reveal-label"]');
    expect(label).toBeTruthy();
    expect(label?.textContent).toBe("API Key");
  });

  it("should render a toggle button", () => {
    const { container } = render(<SecretReveal value="sk-test" />);
    const toggle = container.querySelector(
      '[data-slot="secret-reveal-toggle"]',
    );
    expect(toggle).toBeTruthy();
  });

  it("should render initial revealed state", () => {
    const { container } = render(
      <SecretReveal value="sk-test" initiallyRevealed />,
    );
    const valueEl = container.querySelector(
      '[data-slot="secret-reveal-value"]',
    );
    expect(valueEl?.textContent).toBe("sk-test");
  });

  it("should render with children instead of value", () => {
    const { container } = render(<SecretReveal>my-secret-key</SecretReveal>);
    const valueEl = container.querySelector(
      '[data-slot="secret-reveal-value"]',
    );
    expect(valueEl?.textContent).toBe("•••••••••••••");
  });

  it("should forward refs to the root element", () => {
    const ref = createRef<HTMLDivElement>();
    render(<SecretReveal value="test" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.getAttribute("data-slot")).toBe("secret-reveal");
  });

  it("should apply custom className", () => {
    const { container } = render(
      <SecretReveal value="test" className="custom-class" />,
    );
    const root = container.querySelector('[data-slot="secret-reveal"]');
    expect(root?.className).toMatch(/custom-class/);
  });
});
