"use client";

import {
  forwardRef,
  useId,
  useImperativeHandle,
  useRef,
  type CSSProperties,
} from "react";
import { cn } from "../../lib/utils";
import { useIsomorphicLayoutEffect } from "../../hooks/useIsomorphicLayoutEffect";
import {
  zuiScrollExpandFrame,
  zuiScrollExpandHint,
  zuiScrollExpandMedia,
  zuiScrollExpandOverlay,
  zuiScrollExpandScrim,
  zuiScrollExpandStage,
  zuiScrollExpandTitle,
  zuiScrollExpandTrack,
} from "../../design-system/scroll-expand";
import type {
  ScrollExpandLevel,
  ScrollExpandProps,
  ScrollExpandState,
} from "./types";
import { scrollExpandVariants } from "./variants";

// Phase windows over the expansion progress (0 → 1).
const HINT_PHASE = [0, 0.12] as const;
const TITLE_PHASE = [0.4, 0.88] as const;
const OVERLAY_PHASE = [0.68, 1] as const;
// The overlay becomes interactive once it is mostly visible.
const OVERLAY_INTERACTIVE = 0.5;
const SETTLE = 0.0005;
const MAX_FRAME = 64;

const levels: readonly ScrollExpandLevel[] = [1, 2, 3, 4, 5, 6];

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));
const safe = (value: number, fallback: number, min: number, max: number) =>
  clamp(Number.isFinite(value) ? value : fallback, min, max);
/** Smoothstep of `value` between `from` and `to`. */
const ease = (from: number, to: number, value: number) => {
  const t = clamp((value - from) / (to - from || 1e-6), 0, 1);
  return t * t * (3 - 2 * t);
};

const insetFor = (width: number, height: number, open: number) => {
  const w = width + (100 - width) * open;
  const h = height + (100 - height) * open;
  const x = Math.max(0, (100 - w) / 2).toFixed(3);
  const y = Math.max(0, (100 - h) / 2).toFixed(3);
  return `inset(${y}% ${x}% round calc(var(--_se-radius, 24px) * ${(1 - open).toFixed(4)}))`;
};

export const ScrollExpandBase = forwardRef<HTMLElement, ScrollExpandProps>(
  function ScrollExpand(
    {
      src,
      mediaType = "image",
      poster,
      alt = "",
      title,
      level = 2,
      hint,
      children,
      appearance,
      scroller = "window",
      startWidth = 42,
      startHeight = 58,
      zoom = 1.35,
      distance = 1.2,
      hold = 0.35,
      smoothing = 100,
      className,
      ...rest
    },
    forwardedRef,
  ) {
    const root = useRef<HTMLElement>(null);
    const track = useRef<HTMLDivElement>(null);
    const stage = useRef<HTMLDivElement>(null);
    const frameLayer = useRef<HTMLDivElement>(null);
    const mediaLayer = useRef<HTMLImageElement & HTMLVideoElement>(null);
    const scrim = useRef<HTMLDivElement>(null);
    const overlay = useRef<HTMLDivElement>(null);
    const heading = useRef<HTMLHeadingElement>(null);
    const cue = useRef<HTMLDivElement>(null);
    useImperativeHandle(forwardedRef, () => root.current!, []);

    const titleId = useId();
    const self = scroller === "self";
    const width = safe(startWidth, 42, 10, 100);
    const height = safe(startHeight, 58, 10, 100);
    const restZoom = safe(zoom, 1.35, 1, 3);
    const travel = safe(distance, 1.2, 0.2, 5);
    const pause = safe(hold, 0.35, 0, 5);
    const follow = safe(smoothing, 100, 0, 1000);
    const Heading = `h${levels.includes(level) ? level : 2}` as const;

    useIsomorphicLayoutEffect(() => {
      const host = root.current;
      const rail = track.current;
      const pinned = stage.current;
      const frame = frameLayer.current;
      const media = mediaLayer.current;
      if (!host || !rail || !pinned || !frame || !media) return;

      const reducedQuery = window.matchMedia?.(
        "(prefers-reduced-motion: reduce)",
      );
      const isReduced = () => reducedQuery?.matches ?? false;
      let current = 0;
      let target = 0;
      let frameId = 0;
      let lastTime = 0;
      let visible = typeof IntersectionObserver === "undefined";
      let state: ScrollExpandState | "" = "";
      let interactive: boolean | null = null;
      // Last value written per element and property, so idle frames do no style work.
      const written = new WeakMap<HTMLElement, Record<string, string>>();

      const write = (
        element: HTMLElement | null,
        property: "clipPath" | "transform" | "opacity",
        value: string,
      ) => {
        if (!element) return;
        const last = written.get(element) ?? {};
        if (last[property] === value) return;
        last[property] = value;
        written.set(element, last);
        element.style[property] = value;
      };

      const paint = (progress: number) => {
        const reduced = isReduced();
        const open = reduced ? 1 : ease(0, 1, progress);
        write(frame, "clipPath", reduced ? "" : insetFor(width, height, open));
        write(
          media,
          "transform",
          reduced
            ? ""
            : `scale(${(restZoom + (1 - restZoom) * open).toFixed(4)})`,
        );
        write(scrim.current, "opacity", open.toFixed(4));

        const lift = reduced
          ? 0
          : ease(TITLE_PHASE[0], TITLE_PHASE[1], progress);
        write(heading.current, "opacity", (1 - lift).toFixed(4));
        write(
          heading.current,
          "transform",
          lift > 0
            ? `translate3d(0, ${(-28 * lift).toFixed(2)}px, 0) scale(${(1 + 0.06 * lift).toFixed(4)})`
            : "",
        );
        const fade = reduced ? 1 : ease(HINT_PHASE[0], HINT_PHASE[1], progress);
        write(cue.current, "opacity", (1 - fade).toFixed(4));
        write(
          cue.current,
          "transform",
          fade > 0 ? `translate3d(0, ${(8 * fade).toFixed(2)}px, 0)` : "",
        );
        const reveal = reduced
          ? 1
          : ease(OVERLAY_PHASE[0], OVERLAY_PHASE[1], progress);
        write(overlay.current, "opacity", reveal.toFixed(4));
        write(
          overlay.current,
          "transform",
          reveal < 1
            ? `translate3d(0, ${(18 * (1 - reveal)).toFixed(2)}px, 0)`
            : "",
        );
        // Hidden content must not be reachable by keyboard or pointer.
        const usable = reveal >= OVERLAY_INTERACTIVE;
        if (overlay.current && usable !== interactive) {
          interactive = usable;
          overlay.current.inert = !usable;
          overlay.current.style.pointerEvents = usable ? "" : "none";
        }

        const next: ScrollExpandState = reduced
          ? "expanded"
          : progress <= 0
            ? "resting"
            : progress >= 1
              ? "expanded"
              : "expanding";
        if (next !== state) {
          state = next;
          host.setAttribute("data-state", next);
        }
      };

      const read = () => {
        if (isReduced()) return 1;
        const span = pinned.clientHeight * travel;
        if (span <= 0) return 0;
        const scrolled = self
          ? host.scrollTop
          : -rail.getBoundingClientRect().top;
        return clamp(scrolled / span, 0, 1);
      };

      const tick = (now: number) => {
        frameId = 0;
        target = read();
        if (follow === 0 || isReduced()) current = target;
        else {
          const delta = lastTime ? Math.min(now - lastTime, MAX_FRAME) : 16.67;
          current += (target - current) * (1 - Math.exp(-delta / follow));
          if (Math.abs(target - current) < SETTLE) current = target;
        }
        lastTime = now;
        paint(current);
        if (current !== target) frameId = requestAnimationFrame(tick);
        else lastTime = 0;
      };

      const schedule = () => {
        if (!frameId) frameId = requestAnimationFrame(tick);
      };

      const syncVideo = () => {
        if (mediaType !== "video") return;
        media.muted = true;
        if (isReduced() || !visible || document.hidden) {
          media.pause();
          return;
        }
        try {
          void media.play()?.catch(() => {});
        } catch {
          // Autoplay can be refused; the poster stays visible.
        }
      };

      const onReducedChange = () => {
        host.setAttribute("data-motion", isReduced() ? "reduced" : "full");
        current = target = read();
        paint(current);
        syncVideo();
      };
      const onVisibility = () => syncVideo();

      // Jump straight to the current scroll position so a reload mid-page
      // never animates from the resting frame.
      host.setAttribute("data-motion", isReduced() ? "reduced" : "full");
      current = target = read();
      paint(current);

      // Capture page scrolls and those of any scrolling ancestor (app shells
      // often scroll an inner element rather than the window).
      const source: HTMLElement | Window = self ? host : window;
      const listen = { passive: true, capture: !self };
      source.addEventListener("scroll", schedule, listen);
      window.addEventListener("resize", schedule);
      reducedQuery?.addEventListener?.("change", onReducedChange);
      document.addEventListener("visibilitychange", onVisibility);
      const observer =
        typeof IntersectionObserver === "undefined"
          ? undefined
          : new IntersectionObserver(([entry]) => {
              visible = entry?.isIntersecting ?? false;
              syncVideo();
            });
      observer?.observe(host);
      syncVideo();

      return () => {
        cancelAnimationFrame(frameId);
        frameId = 0;
        source.removeEventListener("scroll", schedule, listen);
        window.removeEventListener("resize", schedule);
        reducedQuery?.removeEventListener?.("change", onReducedChange);
        document.removeEventListener("visibilitychange", onVisibility);
        observer?.disconnect();
        if (mediaType === "video") media.pause();
      };
    }, [self, width, height, restZoom, travel, follow, mediaType, src]);

    const labelled = title != null && !rest["aria-label"];
    return (
      <section
        {...rest}
        ref={root}
        data-slot="scroll-expand"
        data-scroller={scroller}
        aria-labelledby={
          rest["aria-labelledby"] ?? (labelled ? titleId : undefined)
        }
        tabIndex={self ? (rest.tabIndex ?? 0) : rest.tabIndex}
        className={cn(
          scrollExpandVariants({ appearance, scroller }),
          className,
        )}
      >
        <div
          ref={track}
          data-slot="scroll-expand-track"
          className={zuiScrollExpandTrack}
          style={{ height: `calc(var(--_se-stage) * ${1 + travel + pause})` }}
        >
          <div
            ref={stage}
            data-slot="scroll-expand-stage"
            className={zuiScrollExpandStage}
          >
            <div
              ref={frameLayer}
              data-slot="scroll-expand-frame"
              className={zuiScrollExpandFrame}
              style={{ clipPath: insetFor(width, height, 0) }}
            >
              {mediaType === "video" ? (
                <video
                  ref={mediaLayer}
                  src={src}
                  poster={poster}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-hidden="true"
                  tabIndex={-1}
                  disablePictureInPicture
                  data-slot="scroll-expand-media"
                  className={zuiScrollExpandMedia}
                  style={{ transform: `scale(${restZoom})` }}
                />
              ) : (
                <img
                  ref={mediaLayer}
                  src={src}
                  alt={alt}
                  draggable={false}
                  decoding="async"
                  data-slot="scroll-expand-media"
                  className={zuiScrollExpandMedia}
                  style={{ transform: `scale(${restZoom})` }}
                />
              )}
              <div
                ref={scrim}
                aria-hidden="true"
                data-slot="scroll-expand-scrim"
                className={zuiScrollExpandScrim}
              />
              {children != null ? (
                <div
                  ref={overlay}
                  data-slot="scroll-expand-overlay"
                  className={zuiScrollExpandOverlay}
                  style={
                    { transform: "translate3d(0, 18px, 0)" } as CSSProperties
                  }
                >
                  {children}
                </div>
              ) : null}
            </div>
            {title != null ? (
              <Heading
                ref={heading}
                id={titleId}
                data-slot="scroll-expand-title"
                className={zuiScrollExpandTitle}
              >
                {title}
              </Heading>
            ) : null}
            {hint != null ? (
              <div
                ref={cue}
                aria-hidden="true"
                data-slot="scroll-expand-hint"
                className={zuiScrollExpandHint}
              >
                {hint}
              </div>
            ) : null}
          </div>
        </div>
      </section>
    );
  },
);
