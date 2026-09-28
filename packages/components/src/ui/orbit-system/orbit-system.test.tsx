import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { zuiOrbitSystemAppearances } from "../../design-system/orbit-system";
import { ZuiOrbit, ZuiOrbitItem, ZuiOrbitSystem } from "./orbit-system";

afterEach(() => vi.restoreAllMocks());

function mockMotionPreference(matches: boolean) {
  vi.spyOn(window, "matchMedia").mockImplementation((query) => ({
    media: query,
    matches,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

describe("ZuiOrbitSystem", () => {
  it("shows an empty state and merges classes", () => {
    render(<ZuiOrbitSystem className="custom-orbit" autoRotate={false} />);
    expect(screen.getByRole("region")).toHaveClass("custom-orbit");
    expect(screen.getByText("Add a ZuiOrbit to begin")).toBeInTheDocument();
  });

  it("positions compound items on a ring and retains zero content", () => {
    const { container } = render(
      <ZuiOrbitSystem center={0} autoRotate={false}>
        <ZuiOrbit radius={100} label="Tools">
          <ZuiOrbitItem id="one">One</ZuiOrbitItem>
          <ZuiOrbitItem id="two" angle={90}>
            Two
          </ZuiOrbitItem>
        </ZuiOrbit>
      </ZuiOrbitSystem>,
    );
    expect(screen.getByText("0")).toBeInTheDocument();
    expect(screen.getByRole("group", { name: "Tools" })).toBeInTheDocument();
    expect(container.querySelectorAll('[data-slot="orbit-item"]')).toHaveLength(
      2,
    );
    expect(screen.getByRole("button", { name: "One" }).style.left).not.toBe(
      screen.getByRole("button", { name: "Two" }).style.left,
    );
  });

  it("supports controlled and uncontrolled selection", () => {
    const onSelectionChange = vi.fn();
    const { rerender } = render(
      <ZuiOrbitSystem autoRotate={false} onSelectionChange={onSelectionChange}>
        <ZuiOrbit radius={100}>
          <ZuiOrbitItem id="react">React</ZuiOrbitItem>
        </ZuiOrbit>
      </ZuiOrbitSystem>,
    );
    fireEvent.click(screen.getByRole("button", { name: "React" }));
    expect(screen.getByRole("button", { name: "React" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(onSelectionChange).toHaveBeenCalledWith("react");
    rerender(
      <ZuiOrbitSystem
        autoRotate={false}
        selectedId="react"
        onSelectionChange={onSelectionChange}
      >
        <ZuiOrbit radius={100}>
          <ZuiOrbitItem id="react">React</ZuiOrbitItem>
        </ZuiOrbit>
      </ZuiOrbitSystem>,
    );
    fireEvent.click(screen.getByRole("button", { name: "React" }));
    expect(onSelectionChange).toHaveBeenLastCalledWith(null);
    expect(screen.getByRole("button", { name: "React" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("supports camera keyboard controls and pause button", () => {
    mockMotionPreference(false);
    const { container } = render(
      <ZuiOrbitSystem>
        <ZuiOrbit radius={80}>
          <ZuiOrbitItem>A</ZuiOrbitItem>
        </ZuiOrbit>
      </ZuiOrbitSystem>,
    );
    const item = screen.getByRole("button", { name: "A" });
    const before = item.style.left;
    fireEvent.keyDown(screen.getByRole("region"), { key: "ArrowRight" });
    expect(item.style.left).not.toBe(before);
    fireEvent.click(screen.getByRole("button", { name: "Pause orbits" }));
    expect(
      container.querySelector('[data-slot="orbit-system"]'),
    ).toHaveAttribute("data-paused", "true");
  });

  it("pauses motion when reduced motion is preferred", () => {
    mockMotionPreference(true);
    render(
      <ZuiOrbitSystem>
        <ZuiOrbit radius={80}>
          <ZuiOrbitItem>A</ZuiOrbitItem>
        </ZuiOrbit>
      </ZuiOrbitSystem>,
    );
    expect(screen.getByRole("region")).toHaveAttribute("data-paused", "true");
    expect(
      screen.getByRole("button", { name: "Motion paused" }),
    ).toBeDisabled();
  });

  it.each(Object.keys(zuiOrbitSystemAppearances))(
    "renders %s appearance",
    (appearance) => {
      render(
        <ZuiOrbitSystem
          appearance={appearance as keyof typeof zuiOrbitSystemAppearances}
          autoRotate={false}
          showControls={false}
        />,
      );
      expect(screen.getByRole("region")).toHaveAttribute(
        "data-appearance",
        appearance,
      );
    },
  );
});
