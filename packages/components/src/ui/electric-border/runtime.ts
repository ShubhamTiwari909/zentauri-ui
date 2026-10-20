import {
  createPerimeter,
  nearestPoint,
  sparkPath,
  strandPath,
  type Perimeter,
} from "./geometry";

export type CurrentConfig = {
  active: boolean;
  interactive: boolean;
  speed: number;
  intensity: number;
  radius: number;
  sparks: boolean;
  intro: boolean;
  reducedMotion: boolean;
};

/** Owns only decorative attributes, subscriptions, and one animation frame. */
export function createCurrent(host: HTMLDivElement, svg: SVGSVGElement) {
  let config: CurrentConfig = {
    active: false,
    interactive: true,
    speed: 1,
    intensity: 1,
    radius: 24,
    sparks: true,
    intro: true,
    reducedMotion: false,
  };
  const strands = [...svg.querySelectorAll<SVGPathElement>("[data-eb-strand]")];
  const sparks = [...svg.querySelectorAll<SVGPathElement>("[data-eb-spark]")];
  const current = svg.querySelector<SVGGElement>(
    '[data-slot="electric-border-current"]',
  )!;
  const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)");
  const fine = window.matchMedia?.("(hover: hover) and (pointer: fine)");
  let visible = typeof IntersectionObserver === "undefined";
  let frame = 0;
  let disposed = false;
  let lastDraw: number | null = null;
  let elapsed = 0;
  let width = 0,
    height = 0;
  let geometry: Perimeter = { points: [], length: 0 };
  let client: { x: number; y: number } | null = null;
  const pointer = { x: 0, y: 0, strength: 0 };
  let over = false;
  let pendingPulse = false;
  let pulse: { origin: number; start: number } | null = null;

  const motionAllowed = () =>
    config.active &&
    config.speed > 0 &&
    !config.reducedMotion &&
    reduced != null &&
    !reduced.matches;
  const runnable = () =>
    !disposed &&
    motionAllowed() &&
    visible &&
    !document.hidden &&
    geometry.points.length > 0;
  const setState = (state: string) => {
    if (host.dataset.motion !== state) host.dataset.motion = state;
  };
  const resetPointer = () => {
    over = false;
    client = null;
  };
  const stop = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    lastDraw = null;
    resetPointer();
    pointer.strength = 0;
    pendingPulse = false;
    pulse = null;
  };
  const tick = (timestamp: number) => {
    frame = 0;
    // Media/visibility event delivery can lag a frame (notably in background tabs).
    if (!runnable()) {
      sync();
      return;
    }
    // One scheduling loop; path writes are bounded to 30 Hz on high-refresh displays too.
    if (lastDraw !== null && timestamp - lastDraw < 1000 / 30) {
      frame = requestAnimationFrame(tick);
      return;
    }
    const delta =
      lastDraw === null ? 1000 / 30 : Math.min(timestamp - lastDraw, 64);
    lastDraw = timestamp;
    elapsed += (delta / 1000) * config.speed;
    if (client) {
      // Batch the latest pointer event into one read, before any decorative writes.
      const rect = host.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        pointer.x = ((client.x - rect.left) / rect.width) * width;
        pointer.y = ((client.y - rect.top) / rect.height) * height;
      }
      client = null;
    }
    const target = over && config.interactive && fine?.matches ? 1 : 0;
    pointer.strength +=
      (target - pointer.strength) * (1 - Math.exp(-delta / 65));
    if (pointer.strength < 0.001) pointer.strength = 0;
    if (pendingPulse) {
      pulse = {
        origin: over
          ? (nearestPoint(geometry.points, pointer.x, pointer.y)?.u ?? 0)
          : 0,
        start: elapsed,
      };
      pendingPulse = false;
    }
    const progress = pulse ? (elapsed - pulse.start) / 0.4 : 1;
    if (progress >= 1) pulse = null;
    const introProgress = config.intro ? Math.min(elapsed / 0.6, 1) : 1;
    const field = {
      time: elapsed,
      intensity: config.intensity,
      pointer,
      pulse: pulse ? { origin: pulse.origin, progress } : null,
    };
    strands.forEach((path, index) =>
      path.setAttribute("d", strandPath(geometry.points, index, field)),
    );
    current.setAttribute(
      "stroke-dashoffset",
      String((1 - introProgress) * 1000),
    );
    sparks.forEach((path, index) => {
      const cycle = elapsed + index * 1.1;
      const age = (cycle % 2.2) / 0.32;
      const fromPulse = index === 0 && pulse !== null;
      const sparkProgress = fromPulse ? Math.min(progress * 1.6, 1) : age;
      const origin = fromPulse
        ? pulse!.origin
        : (Math.floor(cycle / 2.2) * 0.618 + index * 0.37) % 1;
      path.setAttribute(
        "d",
        config.sparks && introProgress === 1
          ? sparkPath(geometry.points, origin, sparkProgress, config.intensity)
          : "",
      );
      path.setAttribute(
        "opacity",
        String(
          sparkProgress > 0 && sparkProgress < 1
            ? Math.sin(sparkProgress * Math.PI) * 0.8
            : 0,
        ),
      );
    });
    svg.style.opacity = "1";
    setState(
      introProgress < 1
        ? "intro"
        : pulse
          ? "pulse"
          : pointer.strength > 0.02
            ? "surge"
            : "running",
    );
    frame = requestAnimationFrame(tick);
  };
  const sync = () => {
    if (!runnable()) {
      stop();
      svg.style.opacity = "0";
      setState(motionAllowed() ? "suspended" : "static");
    } else if (!frame) {
      lastDraw = null;
      frame = requestAnimationFrame(tick);
    }
  };
  const measure = () => {
    const rect = host.getBoundingClientRect();
    width = host.offsetWidth || rect.width;
    height = host.offsetHeight || rect.height;
    const cssRadius = getComputedStyle(host).borderTopLeftRadius;
    const radius = cssRadius.endsWith("px")
      ? parseFloat(cssRadius)
      : config.radius;
    geometry = createPerimeter(width, height, radius);
    resetPointer();
    sync();
  };
  const onMediaChange = () => {
    if (!fine?.matches) {
      resetPointer();
      pointer.strength = 0;
    }
    sync();
  };
  const resize =
    typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measure);
  const intersection =
    typeof IntersectionObserver === "undefined"
      ? null
      : new IntersectionObserver(([entry]) => {
          visible = entry?.isIntersecting ?? false;
          sync();
        });
  resize?.observe(host);
  intersection?.observe(host);
  // Also covers older environments without ResizeObserver and content loaded after mount.
  window.addEventListener("resize", measure);
  host.addEventListener("load", measure, true);
  window.addEventListener("scroll", resetPointer, {
    passive: true,
    capture: true,
  });
  document.addEventListener("visibilitychange", sync);
  reduced?.addEventListener?.("change", onMediaChange);
  fine?.addEventListener?.("change", onMediaChange);

  return {
    update(next: CurrentConfig) {
      const activate =
        next.active &&
        (!config.active || (config.speed === 0 && next.speed > 0));
      if (activate) {
        elapsed = 0;
        pulse = null;
        pendingPulse = false;
      }
      if (!next.interactive) {
        resetPointer();
        pendingPulse = false;
        pulse = null;
      }
      config = next;
      measure();
    },
    move(event: {
      clientX: number;
      clientY: number;
      pointerType: string;
      isPrimary: boolean;
    }) {
      if (
        !runnable() ||
        !config.interactive ||
        !fine?.matches ||
        event.pointerType === "touch" ||
        !event.isPrimary
      )
        return;
      over = true;
      client = { x: event.clientX, y: event.clientY };
    },
    reset: resetPointer,
    pulse() {
      if (runnable() && config.interactive) pendingPulse = true;
    },
    destroy() {
      disposed = true;
      stop();
      svg.style.opacity = "0";
      resize?.disconnect();
      intersection?.disconnect();
      window.removeEventListener("resize", measure);
      host.removeEventListener("load", measure, true);
      window.removeEventListener("scroll", resetPointer, true);
      document.removeEventListener("visibilitychange", sync);
      reduced?.removeEventListener?.("change", onMediaChange);
      fine?.removeEventListener?.("change", onMediaChange);
    },
  };
}
