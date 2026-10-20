import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef, Profiler, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { zuiElectricBorderAppearances } from "../../design-system/electric-border";
import { ZuiElectricBorder } from "./index";
import type { ElectricBorderProps } from "./types";

let frames: Map<number, FrameRequestCallback>;
let frameId: number;
let time: number;
let reduced: boolean;
let fine: boolean;
let hidden: boolean;
let bounds: { width: number; height: number };
let mediaListeners: Set<() => void>;
let resizeCallback: ResizeObserverCallback;
let intersectionCallback: IntersectionObserverCallback;
let resizeDisconnect: ReturnType<typeof vi.fn>;
let intersectionDisconnect: ReturnType<typeof vi.fn>;

function advance(count = 1) {
  act(() => {
    for (let i = 0; i < count; i++) {
      const pending = [...frames.values()];
      frames.clear();
      time += 34;
      pending.forEach((callback) => callback(time));
    }
  });
}
function visible(value = true) {
  act(() =>
    intersectionCallback(
      [{ isIntersecting: value } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    ),
  );
}
function mediaChange() {
  act(() => mediaListeners.forEach((callback) => callback()));
}
function setup(props: ElectricBorderProps = {}) {
  const result = render(
    <ZuiElectricBorder data-testid="border" intro={false} {...props}>
      Content
    </ZuiElectricBorder>,
  );
  const root = screen.getByTestId("border");
  const svg = root.querySelector("svg")!;
  const path = root.querySelector("[data-eb-strand]")!;
  visible();
  advance();
  return { ...result, root, svg, path };
}
beforeEach(() => {
  frames = new Map();
  frameId = 0;
  time = 0;
  reduced = false;
  fine = true;
  hidden = false;
  bounds = { width: 320, height: 160 };
  mediaListeners = new Set();
  resizeDisconnect = vi.fn();
  intersectionDisconnect = vi.fn();
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(
    () =>
      ({
        ...bounds,
        x: 10,
        y: 20,
        left: 10,
        top: 20,
        right: 10 + bounds.width,
        bottom: 20 + bounds.height,
      }) as DOMRect,
  );
  vi.spyOn(document, "hidden", "get").mockImplementation(() => hidden);
  vi.stubGlobal(
    "requestAnimationFrame",
    vi.fn((callback: FrameRequestCallback) => {
      frames.set(++frameId, callback);
      return frameId;
    }),
  );
  vi.stubGlobal(
    "cancelAnimationFrame",
    vi.fn((id: number) => frames.delete(id)),
  );
  vi.spyOn(window, "matchMedia").mockImplementation(
    (query) =>
      ({
        get matches() {
          return query.includes("reduced-motion") ? reduced : fine;
        },
        addEventListener: (_: string, callback: () => void) =>
          mediaListeners.add(callback),
        removeEventListener: (_: string, callback: () => void) =>
          mediaListeners.delete(callback),
      }) as unknown as MediaQueryList,
  );
  vi.stubGlobal(
    "ResizeObserver",
    class {
      constructor(callback: ResizeObserverCallback) {
        resizeCallback = callback;
      }
      observe() {}
      disconnect = resizeDisconnect;
    },
  );
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(callback: IntersectionObserverCallback) {
        intersectionCallback = callback;
      }
      observe() {}
      disconnect = intersectionDisconnect;
    },
  );
});
afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("ZuiElectricBorder", () => {
  it("hydrates the server markup with stable paint IDs and no recoverable errors", async () => {
    const content = <ZuiElectricBorder>Hydrated content</ZuiElectricBorder>;
    const mount = document.createElement("div");
    mount.innerHTML = renderToString(content);
    document.body.append(mount);
    const paint = mount.querySelector("linearGradient")!.id;
    const onRecoverableError = vi.fn();
    let hydration: ReturnType<typeof hydrateRoot>;
    await act(async () => {
      hydration = hydrateRoot(mount, content, { onRecoverableError });
    });
    expect(mount.querySelector("linearGradient")!.id).toBe(paint);
    expect(onRecoverableError).not.toHaveBeenCalled();
    act(() => hydration.unmount());
    mount.remove();
  });

  it("caps decorative path writes at 30 Hz on a high-refresh display", () => {
    const { path } = setup();
    const write = vi.spyOn(path, "setAttribute");
    act(() => {
      for (let i = 0; i < 120; i++) {
        const pending = [...frames.values()];
        frames.clear();
        time += 1000 / 120;
        pending.forEach((callback) => callback(time));
      }
    });
    const updates = write.mock.calls.filter(([name]) => name === "d").length;
    expect(updates).toBeGreaterThan(0);
    expect(updates).toBeLessThanOrEqual(30);
    expect(frames.size).toBe(1);
  });

  it("forwards div props/ref, keeps numeric children and isolates decoration from accessibility and hit testing", () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(
      <ZuiElectricBorder
        ref={ref}
        title="Frame"
        className="custom rounded-lg"
        style={{ width: 320 }}
        radius={18}
        thickness={2}
      >
        {0}
      </ZuiElectricBorder>,
    );
    expect(ref.current?.tagName).toBe("DIV");
    expect(ref.current).toHaveTextContent("0");
    expect(ref.current).toHaveClass("custom", "rounded-lg");
    expect(ref.current).toHaveAttribute("title", "Frame");
    expect(ref.current).not.toHaveAttribute("role");
    expect(ref.current).not.toHaveAttribute("tabindex");
    expect(ref.current?.style.getPropertyValue("--_eb-radius")).toBe("18px");
    expect(ref.current).toHaveStyle({ width: "320px" });
    expect(container.querySelector("svg")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    expect(container.querySelector("svg")).toHaveAttribute(
      "focusable",
      "false",
    );
    expect(container.querySelector("svg")).toHaveClass(
      "pointer-events-none",
      "motion-reduce:hidden",
    );
  });

  for (const appearance of Object.keys(
    zuiElectricBorderAppearances,
  ) as (keyof typeof zuiElectricBorderAppearances)[]) {
    it(`supports the ${appearance} appearance with paired dark tokens`, () => {
      const { root } = setup({ appearance });
      const expected = zuiElectricBorderAppearances[appearance].split(" ");
      expected.forEach((className) => expect(root).toHaveClass(className));
      expect(root.className).toContain("dark:");
    });
  }

  it("supports empty children and null appearance with a working default", () => {
    const { container } = render(<ZuiElectricBorder appearance={null} />);
    expect(
      container.querySelector('[data-slot="electric-border"]')?.className,
    ).toContain("--zui-electric-border-color,");
  });
  it("waits until visible, reveals once, and keeps geometry changing without rerendering content", () => {
    const commits = vi.fn();
    const { container } = render(
      <Profiler id="border" onRender={commits}>
        <ZuiElectricBorder>Still content</ZuiElectricBorder>
      </Profiler>,
    );
    expect(frames.size).toBe(0);
    visible();
    advance();
    const root = container.firstElementChild!;
    const current = root.querySelector(
      '[data-slot="electric-border-current"]',
    )!;
    expect(root).toHaveAttribute("data-motion", "intro");
    expect(Number(current.getAttribute("stroke-dashoffset"))).toBeGreaterThan(
      0,
    );
    advance(20);
    expect(root).toHaveAttribute("data-motion", "running");
    expect(current).toHaveAttribute("stroke-dashoffset", "0");
    const path = root.querySelector("[data-eb-strand]")!;
    const before = path.getAttribute("d");
    const count = commits.mock.calls.length;
    fireEvent.pointerMove(root, {
      clientX: 170,
      clientY: 21,
      pointerType: "mouse",
    });
    advance(4);
    expect(root).toHaveAttribute("data-motion", "surge");
    expect(path.getAttribute("d")).not.toBe(before);
    expect(commits).toHaveBeenCalledTimes(count);
    expect(frames.size).toBe(1);
  });
  it("settles surges on pointer exit and cancellation, composing user callbacks", () => {
    const enter = vi.fn(),
      move = vi.fn(),
      leave = vi.fn(),
      cancel = vi.fn();
    const { root } = setup({
      onPointerEnter: enter,
      onPointerMove: move,
      onPointerLeave: leave,
      onPointerCancel: cancel,
    });
    fireEvent.pointerEnter(root, {
      pointerType: "mouse",
      clientX: 100,
      clientY: 20,
    });
    fireEvent.pointerMove(root, {
      pointerType: "mouse",
      clientX: 110,
      clientY: 20,
    });
    advance(4);
    expect(root).toHaveAttribute("data-motion", "surge");
    fireEvent.pointerLeave(root);
    advance(20);
    expect(root).toHaveAttribute("data-motion", "running");
    fireEvent.pointerEnter(root, {
      pointerType: "mouse",
      clientX: 100,
      clientY: 20,
    });
    advance(2);
    fireEvent.pointerCancel(root);
    advance(20);
    expect(root).toHaveAttribute("data-motion", "running");
    expect(enter).toHaveBeenCalledTimes(2);
    expect(move).toHaveBeenCalledOnce();
    expect(leave).toHaveBeenCalledOnce();
    expect(cancel).toHaveBeenCalledOnce();
  });
  it("honors preventDefault for surges and pulses", () => {
    const { root } = setup({
      onPointerMove: (e) => e.preventDefault(),
      onClick: (e) => e.preventDefault(),
    });
    fireEvent.pointerMove(root, {
      pointerType: "mouse",
      clientX: 100,
      clientY: 20,
    });
    fireEvent.click(root);
    advance(4);
    expect(root).toHaveAttribute("data-motion", "running");
  });
  it("replaces repeated pulses and returns to continuous motion without accumulating frames", () => {
    const click = vi.fn();
    const { root } = setup({ onClick: click, sparks: false });
    fireEvent.click(root);
    advance();
    expect(root).toHaveAttribute("data-motion", "pulse");
    advance(4);
    fireEvent.click(root);
    advance(4);
    expect(root).toHaveAttribute("data-motion", "pulse");
    expect(frames.size).toBe(1);
    advance(15);
    expect(root).toHaveAttribute("data-motion", "running");
    expect(click).toHaveBeenCalledTimes(2);
    root
      .querySelectorAll("[data-eb-spark]")
      .forEach((path) => expect(path).toHaveAttribute("d", ""));
  });
  it("keeps native child keyboard controls usable and pulses on their keyboard activation", async () => {
    const user = userEvent.setup();
    const click = vi.fn();
    const { container } = render(
      <ZuiElectricBorder intro={false}>
        <button onClick={click}>Launch</button>
      </ZuiElectricBorder>,
    );
    visible();
    advance();
    await user.tab();
    expect(screen.getByRole("button", { name: "Launch" })).toHaveFocus();
    await user.keyboard("{Enter}");
    advance();
    expect(click).toHaveBeenCalledOnce();
    expect(container.firstElementChild).toHaveAttribute("data-motion", "pulse");
  });
  it("ignores touch, nonprimary and coarse-pointer tracking", () => {
    const { root } = setup();
    fireEvent.pointerMove(root, {
      pointerType: "touch",
      clientX: 100,
      clientY: 20,
    });
    advance();
    expect(root).toHaveAttribute("data-motion", "running");
    fireEvent.pointerMove(root, { pointerType: "mouse", isPrimary: false });
    advance();
    expect(root).toHaveAttribute("data-motion", "running");
    fine = false;
    mediaChange();
    fireEvent.pointerMove(root, {
      pointerType: "mouse",
      clientX: 100,
      clientY: 20,
    });
    advance();
    expect(root).toHaveAttribute("data-motion", "running");
  });
  it("retains animation but disables all interaction when interactive=false", () => {
    const { root } = setup({ interactive: false });
    fireEvent.pointerMove(root, {
      pointerType: "mouse",
      clientX: 100,
      clientY: 20,
    });
    fireEvent.click(root);
    advance(4);
    expect(root).toHaveAttribute("data-motion", "running");
  });
  it("keeps content and a static rim for inactive, zero-speed and explicit reduced-motion modes", () => {
    const { root, svg, rerender } = setup({ active: false });
    for (const props of [
      { active: false },
      { speed: 0 },
      { reducedMotion: true },
    ]) {
      rerender(
        <ZuiElectricBorder data-testid="border" {...props}>
          <button>Content</button>
        </ZuiElectricBorder>,
      );
      expect(root).toHaveAttribute("data-motion", "static");
      expect(svg).toHaveStyle({ opacity: "0" });
      expect(
        root.querySelector('[data-slot="electric-border-rim"]'),
      ).toBeInTheDocument();
      expect(screen.getByRole("button")).toBeEnabled();
      expect(frames.size).toBe(0);
    }
  });
  it("checks system reduced motion before scheduling any animation and responds to preference changes", () => {
    reduced = true;
    const { root, svg } = setup();
    expect(requestAnimationFrame).not.toHaveBeenCalled();
    reduced = false;
    mediaChange();
    advance();
    expect(root).toHaveAttribute("data-motion", "running");
    reduced = true;
    // A frame must also stop safely if a media-change event has not arrived yet.
    advance();
    expect(root).toHaveAttribute("data-motion", "static");
    expect(svg).toHaveStyle({ opacity: "0" });
    expect(frames.size).toBe(0);
  });
  it("suspends when hidden or offscreen and resumes without replaying the intro", () => {
    const { root, path } = setup({ intro: true });
    advance(20);
    visible(false);
    const before = path.getAttribute("d");
    advance(60);
    expect(frames.size).toBe(0);
    expect(path).toHaveAttribute("d", before!);
    expect(root).toHaveAttribute("data-motion", "suspended");
    visible();
    advance();
    expect(root).toHaveAttribute("data-motion", "running");
    hidden = true;
    fireEvent(document, new Event("visibilitychange"));
    expect(frames.size).toBe(0);
    hidden = false;
    fireEvent(document, new Event("visibilitychange"));
    advance();
    expect(root).toHaveAttribute("data-motion", "running");
  });
  it("replays the intro on activation, but changing configuration keeps the current phase", () => {
    const { root, rerender } = setup({ intro: true });
    advance(20);
    rerender(
      <ZuiElectricBorder
        data-testid="border"
        speed={2}
        intensity={2}
        radius={0}
      />,
    );
    advance();
    expect(root).toHaveAttribute("data-motion", "running");
    rerender(<ZuiElectricBorder data-testid="border" active={false} />);
    expect(frames.size).toBe(0);
    rerender(<ZuiElectricBorder data-testid="border" />);
    advance();
    expect(root).toHaveAttribute("data-motion", "intro");
  });
  it("recomputes geometry after resizing and stops at zero size", () => {
    const { path, root } = setup({ intensity: 0 });
    const before = path.getAttribute("d");
    bounds = { width: 160, height: 80 };
    act(() => resizeCallback([], {} as ResizeObserver));
    advance();
    expect(path.getAttribute("d")).not.toBe(before);
    expect(path.getAttribute("d")).not.toMatch(/NaN|Infinity/);
    bounds = { width: 0, height: 0 };
    act(() => resizeCallback([], {} as ResizeObserver));
    expect(frames.size).toBe(0);
    expect(root).toHaveAttribute("data-motion", "suspended");
  });
  it("falls back safely without observers or matchMedia", () => {
    vi.stubGlobal("ResizeObserver", undefined);
    vi.stubGlobal("IntersectionObserver", undefined);
    const { container, unmount } = render(
      <ZuiElectricBorder intro={false} intensity={0}>
        Fallback
      </ZuiElectricBorder>,
    );
    advance();
    const path = container.querySelector("[data-eb-strand]")!;
    const before = path.getAttribute("d");
    bounds = { width: 240, height: 80 };
    fireEvent(window, new Event("resize"));
    advance();
    expect(path.getAttribute("d")).not.toBe(before);
    unmount();
    vi.stubGlobal("matchMedia", undefined);
    const next = render(<ZuiElectricBorder>Static fallback</ZuiElectricBorder>);
    expect(next.container.firstElementChild).toHaveAttribute(
      "data-motion",
      "static",
    );
    expect(frames.size).toBe(0);
  });
  it("clamps nonfinite/extreme numbers and supports a glow-free, spark-free border", () => {
    const { root, path } = setup({
      speed: NaN,
      intensity: Infinity,
      radius: -10,
      thickness: Infinity,
      glow: false,
      sparks: false,
    });
    expect(root.style.getPropertyValue("--_eb-radius")).toBe("0px");
    expect(root.style.getPropertyValue("--_eb-thickness")).toBe("1.5px");
    expect(path.getAttribute("d")).not.toMatch(/NaN|Infinity/);
    expect(root.querySelector(".blur-\\[3px\\]")).toBeNull();
    expect(
      root.querySelector('[data-slot="electric-border-rim"]')?.className,
    ).not.toContain("shadow-");
  });
  it("allocates at most two sparks and turns them off immediately when configured", () => {
    const { root, rerender } = setup();
    let observed = false;
    for (let i = 0; i < 70; i++) {
      advance();
      if (
        [...root.querySelectorAll("[data-eb-spark]")].some((path) =>
          path.getAttribute("d"),
        )
      )
        observed = true;
    }
    expect(observed).toBe(true);
    expect(root.querySelectorAll("[data-eb-spark]")).toHaveLength(2);
    rerender(
      <ZuiElectricBorder data-testid="border" intro={false} sparks={false} />,
    );
    advance();
    root
      .querySelectorAll("[data-eb-spark]")
      .forEach((path) => expect(path).toHaveAttribute("d", ""));
  });
  it("uses independent SVG paint identifiers for multiple instances", () => {
    const { container } = render(
      <>
        <ZuiElectricBorder />
        <ZuiElectricBorder />
      </>,
    );
    const gradients = [...container.querySelectorAll("linearGradient")].map(
      (node) => node.id,
    );
    expect(new Set(gradients).size).toBe(2);
    container.querySelectorAll("svg").forEach((svg, i) => {
      expect(
        svg.querySelector('[data-slot="electric-border-current"]'),
      ).toHaveAttribute("stroke", `url(#${gradients[i]})`);
    });
  });
  it("cleans up frames, media subscriptions and observers, including StrictMode replay", () => {
    const { unmount } = render(
      <StrictMode>
        <ZuiElectricBorder />
      </StrictMode>,
    );
    visible();
    advance();
    expect(frames.size).toBe(1);
    unmount();
    expect(frames.size).toBe(0);
    expect(mediaListeners.size).toBe(0);
    expect(resizeDisconnect).toHaveBeenCalledTimes(2);
    expect(intersectionDisconnect).toHaveBeenCalledTimes(2);
    fireEvent(window, new Event("resize"));
    fireEvent(document, new Event("visibilitychange"));
    expect(frames.size).toBe(0);
  });
});
