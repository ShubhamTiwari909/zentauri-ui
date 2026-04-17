import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperTitle,
} from "./stepper";

describe("Stepper", () => {
  it("should expose displayName", () => {
    expect(Stepper.displayName).toBe("Stepper");
    expect(StepperItem.displayName).toBe("StepperItem");
    expect(StepperIndicator.displayName).toBe("StepperIndicator");
    expect(StepperTitle.displayName).toBe("StepperTitle");
    expect(StepperDescription.displayName).toBe("StepperDescription");
  });

  it("should stamp data-slot on stepper root and use list semantics", () => {
    render(
      <Stepper>
        <StepperItem>
          <StepperIndicator />
          <StepperTitle>One</StepperTitle>
        </StepperItem>
      </Stepper>,
    );
    const root = document.querySelector('[data-slot="stepper"]');
    expect(root).toBeTruthy();
    expect(root).toHaveAttribute("role", "list");
    expect(document.querySelector('[data-slot="stepper-item"]')).toHaveAttribute(
      "role",
      "listitem",
    );
  });

  it("should apply default upcoming appearance to indicators", () => {
    render(
      <Stepper>
        <StepperItem>
          <StepperIndicator />
          <StepperTitle>Cart</StepperTitle>
        </StepperItem>
        <StepperItem>
          <StepperIndicator />
          <StepperTitle>Pay</StepperTitle>
        </StepperItem>
      </Stepper>,
    );
    const indicators = document.querySelectorAll(
      '[data-slot="stepper-indicator"]',
    );
    expect(indicators).toHaveLength(2);
    expect(indicators[0]?.className).toContain("border-white/15");
    expect(indicators[1]?.className).toContain("border-white/15");
  });

  it("should honor appearance prop on each indicator", () => {
    render(
      <Stepper>
        <StepperItem>
          <StepperIndicator appearance="complete" />
          <StepperTitle>Done</StepperTitle>
        </StepperItem>
        <StepperItem>
          <StepperIndicator appearance="current" />
          <StepperTitle>Active</StepperTitle>
        </StepperItem>
      </Stepper>,
    );
    const indicators = document.querySelectorAll(
      '[data-slot="stepper-indicator"]',
    );
    expect(indicators[0]?.className).toMatch(/emerald/);
    expect(indicators[1]?.className).toMatch(/violet/);
  });

  it("should render step index as indicator content when children are omitted", () => {
    render(
      <Stepper>
        <StepperItem>
          <StepperIndicator />
          <StepperTitle>First</StepperTitle>
        </StepperItem>
        <StepperItem>
          <StepperIndicator />
          <StepperTitle>Second</StepperTitle>
        </StepperItem>
      </Stepper>,
    );
    const indicators = screen.getAllByText(/^[12]$/);
    expect(indicators[0]).toHaveTextContent("1");
    expect(indicators[1]).toHaveTextContent("2");
  });

  it("should render custom indicator children instead of the default index", () => {
    render(
      <Stepper>
        <StepperItem>
          <StepperIndicator>✓</StepperIndicator>
          <StepperTitle>Check</StepperTitle>
        </StepperItem>
      </Stepper>,
    );
    expect(screen.getByText("✓")).toBeInTheDocument();
  });

  it("should apply vertical orientation classes on the root", () => {
    const { container } = render(
      <Stepper orientation="vertical">
        <StepperItem>
          <StepperIndicator />
          <StepperTitle>V</StepperTitle>
        </StepperItem>
      </Stepper>,
    );
    const root = container.querySelector('[data-slot="stepper"]');
    expect(root?.className).toMatch(/flex-col/);
  });

  it("should pass size from Stepper context to indicators", () => {
    render(
      <Stepper size="sm">
        <StepperItem>
          <StepperIndicator />
          <StepperTitle>Small</StepperTitle>
        </StepperItem>
      </Stepper>,
    );
    const indicator = document.querySelector('[data-slot="stepper-indicator"]');
    expect(indicator?.className).toMatch(/size-8/);
  });

  it("should stamp data-slot on title and description", () => {
    render(
      <Stepper>
        <StepperItem>
          <StepperIndicator />
          <StepperTitle data-testid="t">T</StepperTitle>
          <StepperDescription data-testid="d">D</StepperDescription>
        </StepperItem>
      </Stepper>,
    );
    expect(document.querySelector('[data-slot="stepper-title"]')).toBe(
      screen.getByTestId("t"),
    );
    expect(document.querySelector('[data-slot="stepper-description"]')).toBe(
      screen.getByTestId("d"),
    );
  });

  it("should forward ref on Stepper", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <Stepper ref={ref}>
        <StepperItem>
          <StepperIndicator />
          <StepperTitle>A</StepperTitle>
        </StepperItem>
      </Stepper>,
    );
    expect(ref.current?.getAttribute("data-slot")).toBe("stepper");
  });

  it("should throw when StepperItem is used outside Stepper", () => {
    expect(() =>
      render(
        <StepperItem>
          <StepperIndicator />
        </StepperItem>,
      ),
    ).toThrow(/must be used within <Stepper>/);
  });

  it("should throw when StepperIndicator is used outside Stepper", () => {
    expect(() => render(<StepperIndicator />)).toThrow(
      /must be used within <Stepper>/,
    );
  });
});
