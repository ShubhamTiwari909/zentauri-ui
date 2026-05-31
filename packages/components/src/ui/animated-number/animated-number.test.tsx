import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AnimatedNumber, AnimatedNumberCounter } from "./animated-number";

describe("AnimatedNumber", () => {
  it("renders one span per digit", () => {
    render(<AnimatedNumber number={123} />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("applies the default appearance token by default", () => {
    render(<AnimatedNumber number={7} />);
    expect(screen.getByText("7").className).toContain(
      "--zui-animated-number-default-fg",
    );
  });

  it("applies the requested appearance token", () => {
    render(<AnimatedNumber number={5} appearance="success" />);
    expect(screen.getByText("5").className).toContain(
      "--zui-animated-number-success-fg",
    );
  });

  it("clips a gradient to the text for gradient appearances", () => {
    render(<AnimatedNumber number={9} appearance="gradient-blue" />);
    const span = screen.getByText("9");
    expect(span.className).toContain("bg-clip-text");
    expect(span.className).toContain("text-transparent");
  });

  it("applies the requested size token", () => {
    render(<AnimatedNumber number={4} size="lg" />);
    expect(screen.getByText("4").className).toMatch(/text-6xl/);
  });

  it("merges a custom className onto each digit", () => {
    render(<AnimatedNumber number={8} className="custom-digit" />);
    expect(screen.getByText("8").className).toContain("custom-digit");
  });
});

describe("AnimatedNumberCounter", () => {
  it("renders a paragraph starting from zero", () => {
    render(<AnimatedNumberCounter number={500} />);
    expect(screen.getByText("0").tagName).toBe("P");
  });

  it("applies the requested appearance token", () => {
    render(<AnimatedNumberCounter number={500} appearance="orange" />);
    expect(screen.getByText("0").className).toContain(
      "--zui-animated-number-orange-fg",
    );
  });

  it("defers the count until the element is in view", () => {
    render(<AnimatedNumberCounter number={500} />);
    expect(screen.getByText("0")).toBeInTheDocument();
    expect(screen.queryByText("500")).not.toBeInTheDocument();
  });
});
