import { act, fireEvent, render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { zuiOrbitSystemAppearances } from "../../design-system/orbit-system";
import { ZuiOrbit, ZuiOrbitItem, ZuiOrbitSystem } from "./orbit-system";

beforeEach(() => {
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({
    width: 400,
    height: 300,
  } as DOMRect);
});
afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

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
    expect(screen.getByRole("button", { name: "One" }).style.left).toBe(
      "300px",
    );
    expect(screen.getByRole("button", { name: "One" }).style.top).toBe("150px");
    expect(screen.getByRole("button", { name: "One" }).className).not.toMatch(
      /-translate-[xy]-1\/2/,
    );
  });

  it("distributes items nested in fragments across the ring", () => {
    render(
      <ZuiOrbitSystem autoRotate={false}>
        <ZuiOrbit radius={80}>
          <>
            <ZuiOrbitItem id="a">A</ZuiOrbitItem>
            <>
              <ZuiOrbitItem id="b">B</ZuiOrbitItem>
            </>
          </>
          <ZuiOrbitItem id="c">C</ZuiOrbitItem>
        </ZuiOrbit>
      </ZuiOrbitSystem>,
    );
    expect(
      screen.getByRole("group", { name: "Orbit with 3 items" }),
    ).toBeInTheDocument();
    const positions = ["A", "B", "C"].map((name) => {
      const style = screen.getByRole("button", { name }).style;
      return `${style.left},${style.top}`;
    });
    expect(new Set(positions).size).toBe(3);
  });

  it("measures the container when ResizeObserver is unavailable", () => {
    vi.stubGlobal("ResizeObserver", undefined);
    const bounds = vi.mocked(HTMLElement.prototype.getBoundingClientRect);
    const { container } = render(
      <ZuiOrbitSystem autoRotate={false}>
        <ZuiOrbit radius={80}>
          <ZuiOrbitItem>A</ZuiOrbitItem>
        </ZuiOrbit>
      </ZuiOrbitSystem>,
    );
    expect(screen.getByRole("button", { name: "A" }).style.left).toBe("280px");
    bounds.mockReturnValue({ width: 500, height: 350 } as DOMRect);
    act(() => window.dispatchEvent(new Event("resize")));
    expect(screen.getByRole("button", { name: "A" }).style.left).toBe("330px");
    expect(container.querySelector('[data-slot="orbit"]')).toBeVisible();
  });

  it("keeps unmeasured server geometry hidden", () => {
    const markup = renderToString(
      <ZuiOrbitSystem autoRotate={false}>
        <ZuiOrbit radius={80}>
          <ZuiOrbitItem>A</ZuiOrbitItem>
        </ZuiOrbit>
      </ZuiOrbitSystem>,
    );
    expect(markup).toContain("visibility:hidden");
  });

  it("renders without matchMedia and names noninteractive scenes accurately", () => {
    vi.stubGlobal("matchMedia", undefined);
    render(
      <ZuiOrbitSystem interactive={false} autoRotate={false}>
        <ZuiOrbit radius={80}>
          <ZuiOrbitItem>A</ZuiOrbitItem>
        </ZuiOrbit>
      </ZuiOrbitSystem>,
    );
    expect(
      screen.getByRole("region", { name: "Orbital system" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "A" })).toBeDisabled();
  });

  it("reports mouse hover pause without letting touch pause the scene", () => {
    mockMotionPreference(false);
    const { container } = render(
      <ZuiOrbitSystem>
        <ZuiOrbit radius={80}>
          <ZuiOrbitItem>A</ZuiOrbitItem>
        </ZuiOrbit>
      </ZuiOrbitSystem>,
    );
    const region = screen.getByRole("region");
    fireEvent.pointerEnter(region, { pointerType: "touch" });
    expect(region).toHaveAttribute("data-paused", "false");
    fireEvent.pointerEnter(region, { pointerType: "mouse" });
    expect(region).toHaveAttribute("data-paused", "true");
    expect(
      screen.getByRole("button", { name: "Orbits paused on hover" }),
    ).toBeInTheDocument();
    fireEvent.pointerEnter(
      container.querySelector('[data-slot="orbit-system-controls"]')!,
      { pointerType: "mouse" },
    );
    expect(region).toHaveAttribute("data-paused", "false");
    fireEvent.pointerLeave(region, { pointerType: "mouse" });
    expect(region).toHaveAttribute("data-paused", "false");
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
