import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { DynamicStepper } from "./dynamic-stepper";

const sampleSteps = [
  { id: "a", title: "One", description: "First" },
  { id: "b", title: "Two", description: "Second" },
  { id: "c", title: "Three", description: "Third" },
];

describe("DynamicStepper", () => {
  it("should expose displayName", () => {
    expect(DynamicStepper.displayName).toBe("DynamicStepper");
  });

  it("should render null when steps is empty", () => {
    const { container } = render(<DynamicStepper steps={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("should stamp mapper ol and button ids with suffixes", () => {
    render(<DynamicStepper steps={sampleSteps} />);
    const mapper = document.querySelector(
      '[data-slot="dynamic-stepper-mapper"]',
    );
    expect(mapper?.tagName).toBe("OL");
    expect(mapper?.id.endsWith("-mapper")).toBe(true);

    const prev = document.querySelector(
      '[data-slot="dynamic-stepper-previous"]',
    );
    const next = document.querySelector('[data-slot="dynamic-stepper-next"]');
    expect(prev?.id.endsWith("-previous")).toBe(true);
    expect(next?.id.endsWith("-next")).toBe(true);
  });

  it("should navigate uncontrolled with next and previous", async () => {
    const user = userEvent.setup();
    render(<DynamicStepper steps={sampleSteps} defaultActiveStep={0} />);

    expect(screen.getByText("One")).toBeInTheDocument();
    const indicators = document.querySelectorAll(
      '[data-slot="dynamic-stepper-indicator"]',
    );
    expect(indicators[0]?.className).toMatch(/violet/);

    await user.click(screen.getByRole("button", { name: "Next" }));
    expect(indicators[1]?.className).toMatch(/violet/);

    await user.click(screen.getByRole("button", { name: "Previous" }));
    expect(indicators[0]?.className).toMatch(/violet/);
  });

  it("should disable previous on first step and next on last step", () => {
    render(<DynamicStepper steps={sampleSteps} defaultActiveStep={0} />);
    expect(screen.getByRole("button", { name: "Previous" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next" })).not.toBeDisabled();
  });

  it("should respect controlled activeStep", async () => {
    const user = userEvent.setup();
    const onActiveStepChange = vi.fn();
    const { rerender } = render(
      <DynamicStepper
        steps={sampleSteps}
        activeStep={0}
        onActiveStepChange={onActiveStepChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Next" }));
    expect(onActiveStepChange).toHaveBeenCalledWith(1);

    rerender(
      <DynamicStepper
        steps={sampleSteps}
        activeStep={1}
        onActiveStepChange={onActiveStepChange}
      />,
    );
    const indicators = document.querySelectorAll(
      '[data-slot="dynamic-stepper-indicator"]',
    );
    expect(indicators[1]?.className).toMatch(/violet/);
  });

  it("should forward ref to root", () => {
    const ref = createRef<HTMLDivElement>();
    render(<DynamicStepper ref={ref} steps={sampleSteps} />);
    expect(ref.current?.getAttribute("data-slot")).toBe("dynamic-stepper");
  });

  it("should apply indicator tone props to semantic states", () => {
    const { container } = render(
      <DynamicStepper
        steps={sampleSteps}
        defaultActiveStep={1}
        indicatorCompleteAppearance="sky"
        indicatorCurrentAppearance="rose"
        indicatorUpcomingAppearance="amber"
      />,
    );
    const indicators = container.querySelectorAll(
      '[data-slot="dynamic-stepper-indicator"]',
    );
    expect(indicators[0]?.className).toMatch(/sky-/);
    expect(indicators[1]?.className).toMatch(/rose-/);
    expect(indicators[2]?.className).toMatch(/amber-/);
  });
});
