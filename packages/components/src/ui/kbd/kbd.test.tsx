import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Kbd } from "./kbd";

describe("Kbd", () => {
  it("should expose displayName", () => {
    expect(Kbd.displayName).toBe("Kbd");
  });

  it("should stamp data-slot on the wrapper", () => {
    render(<Kbd keys={["⌘", "K"]} />);
    expect(document.querySelector('[data-slot="kbd"]')).toBeInTheDocument();
  });

  it("should render one keycap per key", () => {
    render(<Kbd keys={["Ctrl", "Shift", "P"]} />);
    expect(document.querySelectorAll('[data-slot="kbd-key"]')).toHaveLength(3);
  });

  it("should render children as a single keycap", () => {
    render(<Kbd>Esc</Kbd>);
    expect(document.querySelectorAll('[data-slot="kbd-key"]')).toHaveLength(1);
    expect(screen.getByText("Esc")).toBeInTheDocument();
  });

  it("should render separators between keys", () => {
    render(<Kbd keys={["⌘", "K"]} separator="+" />);
    expect(
      document.querySelectorAll('[data-slot="kbd-separator"]'),
    ).toHaveLength(1);
  });

  it("should apply the appearance token", () => {
    render(<Kbd keys={["A"]} appearance="emerald" />);
    const key = document.querySelector('[data-slot="kbd-key"]') as HTMLElement;
    expect(key.className).toMatch(/--zui-kbd-emerald-bg/);
  });

  it("should forward ref", () => {
    const ref = createRef<HTMLSpanElement>();
    render(<Kbd ref={ref} keys={["A"]} />);
    expect(ref.current?.getAttribute("data-slot")).toBe("kbd");
  });
});
