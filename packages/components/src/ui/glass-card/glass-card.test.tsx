import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef, Profiler } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ZuiGlassCard } from "./index";
import { GlassCardBase, GlassCardContent } from "./glass-card-base";
import {
  zuiGlassCardAppearances,
  zuiGlassCardMaterials,
} from "../../design-system/glass-card";

let frames: Map<number, FrameRequestCallback>;
let frameId: number;
let time: number;
let reduced: boolean;
let fine: boolean;
let mediaListeners: Set<() => void>;
function flush() {
  act(() => {
    for (let count = 0; frames.size && count < 150; count++) {
      const pending = [...frames.values()];
      frames.clear();
      time += 16.67;
      pending.forEach((callback) => callback(time));
    }
  });
}
function setup(props: React.ComponentProps<typeof ZuiGlassCard> = {}) {
  const result = render(
    <ZuiGlassCard data-testid="card" {...props}>
      <ZuiGlassCard.Content>Crystal content</ZuiGlassCard.Content>
    </ZuiGlassCard>,
  );
  const root = screen.getByTestId("card");
  const surface = root.querySelector<HTMLElement>(
    '[data-slot="glass-card-surface"]',
  )!;
  vi.spyOn(root, "getBoundingClientRect").mockReturnValue({
    left: 0,
    top: 0,
    width: 200,
    height: 100,
  } as DOMRect);
  return { ...result, root, surface };
}
function move(root: HTMLElement, extra: PointerEventInit = {}) {
  fireEvent.pointerMove(root, {
    clientX: 200,
    clientY: 0,
    pointerType: "mouse",
    isPrimary: true,
    ...extra,
  });
  flush();
}
beforeEach(() => {
  frames = new Map();
  frameId = 0;
  time = 0;
  reduced = false;
  fine = true;
  mediaListeners = new Set();
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
});
afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("ZuiGlassCard", () => {
  it("renders a normal div with content, defaults, HTML props, style and refs", () => {
    expect(ZuiGlassCard).not.toBe(GlassCardBase);
    expect(Object.hasOwn(GlassCardBase, "Content")).toBe(false);
    expect(ZuiGlassCard.displayName).toBe("ZuiGlassCard");
    expect(ZuiGlassCard.Content).toBe(GlassCardContent);
    const ref = createRef<HTMLDivElement>();
    const contentRef = createRef<HTMLDivElement>();
    render(
      <ZuiGlassCard
        ref={ref}
        title="Surface"
        className="custom"
        style={{ width: 320 }}
      >
        <ZuiGlassCard.Content ref={contentRef} id="content">
          0
        </ZuiGlassCard.Content>
      </ZuiGlassCard>,
    );
    expect(ref.current?.tagName).toBe("DIV");
    expect(ref.current).toHaveAttribute("data-variant", "glass");
    expect(ref.current).toHaveAttribute("title", "Surface");
    expect(ref.current).toHaveClass("custom");
    expect(ref.current).toHaveStyle({ width: "320px", perspective: "1000px" });
    expect(ref.current).not.toHaveAttribute("tabindex");
    expect(contentRef.current).toHaveAttribute("id", "content");
    expect(contentRef.current).toHaveTextContent("0");
  });
  it("supports empty and numeric children", () => {
    const { rerender, container } = render(<ZuiGlassCard />);
    expect(container.querySelector('[data-slot="glass-card"]')).toBeTruthy();
    rerender(<ZuiGlassCard>{0}</ZuiGlassCard>);
    expect(screen.getByText("0")).toBeInTheDocument();
  });
  for (const variant of Object.keys(
    zuiGlassCardMaterials,
  ) as (keyof typeof zuiGlassCardMaterials)[]) {
    it(`renders ${variant} material`, () => {
      const { root } = setup({ variant });
      expect(root).toHaveAttribute("data-variant", variant);
      expect(root.className).toContain(`--zui-glass-card-${variant}-blur`);
    });
  }
  for (const appearance of Object.keys(
    zuiGlassCardAppearances,
  ) as (keyof typeof zuiGlassCardAppearances)[]) {
    it(`renders ${appearance} appearance`, () => {
      expect(setup({ appearance }).root.className).toContain(
        zuiGlassCardAppearances[appearance],
      );
    });
  }
  for (const [size, padding] of [
    ["sm", "1rem"],
    ["md", "1.5rem"],
    ["lg", "2rem"],
  ] as const) {
    it(`uses ${size} content spacing`, () =>
      expect(setup({ size }).root.className).toContain(
        `--_gc-padding:${padding}`,
      ));
  }
  it("tilts with pointer coordinates and settles without rendering again", () => {
    const onRender = vi.fn();
    render(
      <Profiler id="card" onRender={onRender}>
        <ZuiGlassCard data-testid="card">Content</ZuiGlassCard>
      </Profiler>,
    );
    const root = screen.getByTestId("card");
    const surface = root.firstElementChild as HTMLElement;
    vi.spyOn(root, "getBoundingClientRect").mockReturnValue({
      left: 0,
      top: 0,
      width: 200,
      height: 100,
    } as DOMRect);
    const initialRenders = onRender.mock.calls.length;
    move(root);
    expect(surface.style.getPropertyValue("--_gc-rx")).toBe("12deg");
    expect(surface.style.getPropertyValue("--_gc-ry")).toBe("12deg");
    expect(surface.style.getPropertyValue("--_gc-px")).toBe("100%");
    expect(surface.style.getPropertyValue("--_gc-glare")).toBe("0.15");
    expect(onRender).toHaveBeenCalledTimes(initialRenders);
    expect(frames.size).toBe(0);
    expect(surface.style.willChange).toBe("");
  });
  it("coalesces pointer events into one frame and clamps out-of-bounds input", () => {
    const { root, surface } = setup({ intensity: 99 });
    for (let i = 0; i < 10; i++)
      fireEvent.pointerMove(root, { clientX: 400, clientY: -200 });
    expect(frames.size).toBe(1);
    flush();
    expect(surface.style.getPropertyValue("--_gc-ry")).toBe("30deg");
    expect(root.getBoundingClientRect).toHaveBeenCalledTimes(1);
  });
  it.each(["pointerLeave", "pointerCancel"] as const)(
    "resets smoothly on %s and stops scheduling",
    (event) => {
      const { root, surface } = setup();
      move(root);
      fireEvent[event](root);
      expect(surface.style.getPropertyValue("--_gc-ry")).toBe("12deg");
      flush();
      expect(surface.style.getPropertyValue("--_gc-ry")).toBe("0deg");
      expect(surface.style.getPropertyValue("--_gc-glare")).toBe("0");
      expect(frames.size).toBe(0);
    },
  );
  it.each([
    { disabled: true },
    { interactive: false },
    { reducedMotion: true },
  ])("blocks motion for %j", (props) => {
    const { root } = setup(props);
    move(root);
    expect(requestAnimationFrame).not.toHaveBeenCalled();
    expect(screen.getByText("Crystal content")).toBeVisible();
  });
  it("honors OS reduced motion even when reducedMotion is false and reacts to changes", () => {
    const { root, surface } = setup({ reducedMotion: false });
    move(root);
    reduced = true;
    act(() => mediaListeners.forEach((listener) => listener()));
    expect(surface.style.getPropertyValue("--_gc-ry")).toBe("0deg");
    move(root);
    expect(surface.style.getPropertyValue("--_gc-ry")).toBe("0deg");
    expect(frames.size).toBe(0);
  });
  it("ignores touch and coarse-pointer devices", () => {
    const { root } = setup();
    move(root, { pointerType: "touch" });
    fine = false;
    move(root);
    expect(requestAnimationFrame).not.toHaveBeenCalled();
  });
  it("composes handlers, supports preventing tilt, and forwards child actions", () => {
    const onPointerMove = vi.fn((event: React.PointerEvent) =>
      event.preventDefault(),
    );
    const onPointerLeave = vi.fn();
    const { root } = setup({ onPointerMove, onPointerLeave });
    move(root);
    expect(onPointerMove).toHaveBeenCalledOnce();
    expect(requestAnimationFrame).not.toHaveBeenCalled();
    fireEvent.pointerLeave(root);
    expect(onPointerLeave).toHaveBeenCalledOnce();
  });
  it("keeps child controls keyboard accessible when effects are disabled", async () => {
    const clicked = vi.fn();
    render(
      <ZuiGlassCard disabled>
        <ZuiGlassCard.Content>
          <button onClick={clicked}>Open project</button>
        </ZuiGlassCard.Content>
      </ZuiGlassCard>,
    );
    const user = userEvent.setup();
    await user.tab();
    expect(screen.getByRole("button")).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(clicked).toHaveBeenCalledOnce();
  });
  it("supports effect toggles, zero values, and finite limits", () => {
    const { root, surface } = setup({
      glare: false,
      glow: true,
      intensity: 0,
      depth: 0,
      perspective: Infinity,
      scale: NaN,
      glowIntensity: 0,
    });
    move(root);
    expect(root.querySelector('[data-slot="glass-card-glare"]')).toBeNull();
    expect(root.querySelector('[data-slot="glass-card-glow"]')).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    expect(root.style.perspective).toBe("1000px");
    expect(root.style.getPropertyValue("--_gc-depth")).toBe("0px");
    expect(surface.style.getPropertyValue("--_gc-ry")).toBe("0deg");
  });
  it("handles zero-size bounds without invalid transforms", () => {
    const { root, surface } = setup();
    vi.mocked(root.getBoundingClientRect).mockReturnValue({
      width: 0,
      height: 0,
    } as DOMRect);
    move(root);
    expect(surface.style.getPropertyValue("--_gc-ry")).toBe("0deg");
  });
  it("resets immediately when interaction is disabled and cleans up pending frames", () => {
    const { root, surface, rerender, unmount } = setup();
    move(root);
    rerender(<ZuiGlassCard disabled data-testid="card" />);
    expect(surface.style.getPropertyValue("--_gc-ry")).toBe("0deg");
    unmount();
    expect(frames.size).toBe(0);
    expect(mediaListeners.size).toBe(0);
  });
  it("keeps multiple cards independent", () => {
    render(
      <>
        <ZuiGlassCard data-testid="one" />
        <ZuiGlassCard data-testid="two" />
      </>,
    );
    const one = screen.getByTestId("one");
    vi.spyOn(one, "getBoundingClientRect").mockReturnValue({
      left: 0,
      top: 0,
      width: 200,
      height: 100,
    } as DOMRect);
    move(one);
    expect(
      (one.firstElementChild as HTMLElement).style.getPropertyValue("--_gc-ry"),
    ).toBe("12deg");
    expect(
      (
        screen.getByTestId("two").firstElementChild as HTMLElement
      ).style.getPropertyValue("--_gc-ry"),
    ).not.toBe("12deg");
  });
  it("only floats while visible and motion is allowed, then cancels on unmount", () => {
    let intersect: IntersectionObserverCallback;
    const disconnect = vi.fn();
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        constructor(callback: IntersectionObserverCallback) {
          intersect = callback;
        }
        observe() {}
        disconnect = disconnect;
      },
    );
    const cancel = vi.fn();
    const animate = vi.fn(() => ({ cancel }));
    Object.defineProperty(HTMLElement.prototype, "animate", {
      configurable: true,
      value: animate,
    });
    const { unmount } = setup({ floating: true });
    expect(animate).not.toHaveBeenCalled();
    act(() =>
      intersect(
        [{ isIntersecting: true }] as IntersectionObserverEntry[],
        {} as IntersectionObserver,
      ),
    );
    expect(animate).toHaveBeenCalledOnce();
    act(() =>
      intersect(
        [{ isIntersecting: false }] as IntersectionObserverEntry[],
        {} as IntersectionObserver,
      ),
    );
    expect(cancel).toHaveBeenCalledOnce();
    unmount();
    expect(disconnect).toHaveBeenCalledOnce();
    Reflect.deleteProperty(HTMLElement.prototype, "animate");
  });
});
