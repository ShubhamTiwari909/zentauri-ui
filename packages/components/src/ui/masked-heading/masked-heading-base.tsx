"use client";

import {
  forwardRef,
  Fragment,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { cn } from "../../lib/utils";
import { useIsomorphicLayoutEffect } from "../../hooks/useIsomorphicLayoutEffect";
import {
  zuiMaskedHeadingBaseline,
  zuiMaskedHeadingClip,
  zuiMaskedHeadingDefs,
  zuiMaskedHeadingMedia,
  zuiMaskedHeadingMesh,
  zuiMaskedHeadingReveal,
  zuiMaskedHeadingSource,
  zuiMaskedHeadingWord,
} from "../../design-system/masked-heading";
import type { MaskedHeadingLevel, MaskedHeadingProps } from "./types";
import { maskedHeadingTextVariants, maskedHeadingVariants } from "./variants";

// Geometry in em. BLEED must match the reveal layer's `inset-y-[-0.5em]`.
const BLEED = 0.5;
// Each word is clipped to its own line band, so `rise` lifts it out of an
// invisible slit instead of sliding across the line below.
const BAND_ASCENT = 1;
const BAND_DESCENT = 0.32;
const RISE = BAND_ASCENT + BAND_DESCENT;
const FADE_SCALE = 0.06;
const VIEW_THRESHOLD = 0.25;
// Damping time constant for the pointer parallax, in ms.
const PARALLAX_EASE = 220;
const MAX_FRAME = 64;
const MAX_OVERSCAN = 1.6;

const levels: readonly MaskedHeadingLevel[] = [1, 2, 3, 4, 5, 6];

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));
const safe = (value: number, fallback: number, min: number, max: number) =>
  clamp(Number.isFinite(value) ? value : fallback, min, max);
const easeOutQuint = (t: number) => 1 - (1 - t) ** 5;
const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2;

type WordBox = { center: number; baseline: number; width: number };
type Phase = "hidden" | "revealing" | "revealed";

export const MaskedHeadingBase = forwardRef<
  HTMLHeadingElement,
  MaskedHeadingProps
>(function MaskedHeading(
  {
    children,
    level = 2,
    appearance,
    size,
    align,
    src,
    mediaType = "image",
    poster,
    reveal = "rise",
    trigger = "view",
    duration = 1100,
    stagger = 90,
    delay = 0,
    parallax = 24,
    drift = 16,
    outline = false,
    onRevealComplete,
    className,
    ...rest
  },
  forwardedRef,
) {
  const root = useRef<HTMLHeadingElement>(null);
  const revealLayer = useRef<HTMLSpanElement>(null);
  const mediaLayer = useRef<HTMLSpanElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const wordNodes = useRef<(HTMLSpanElement | null)[]>([]);
  const baselineNodes = useRef<(HTMLSpanElement | null)[]>([]);
  const clipTexts = useRef<(SVGTextElement | null)[]>([]);
  const bands = useRef<(SVGRectElement | null)[]>([]);
  const onComplete = useRef(onRevealComplete);
  useImperativeHandle(forwardedRef, () => root.current!, []);

  const id = `zui-mh-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const words = useMemo(
    () =>
      (typeof children === "string" ? children : "")
        .trim()
        .split(/\s+/)
        .filter(Boolean),
    [children],
  );
  const Tag = `h${levels.includes(level) ? level : 2}` as const;

  useIsomorphicLayoutEffect(() => {
    onComplete.current = onRevealComplete;
  });

  useIsomorphicLayoutEffect(() => {
    const host = root.current;
    const layer = revealLayer.current;
    const media = mediaLayer.current;
    if (!host || !layer || !media) return;

    const reducedQuery = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    );
    const isReduced = () => reducedQuery?.matches ?? false;
    const entrance = safe(duration, 1100, 0, 10000);
    const step = safe(stagger, 90, 0, 1000);
    const wait = safe(delay, 0, 0, 10000);
    const travel = safe(parallax, 24, 0, 120);
    const wander = safe(drift, 16, 0, 120);
    const total =
      wait + entrance + (reveal === "rise" ? step * (words.length - 1) : 0);

    let alive = true;
    let phase: Phase = reveal === "none" || isReduced() ? "revealed" : "hidden";
    let startedAt: number | null = null;
    let completed = false;
    let boxes: (WordBox | null)[] = [];
    let em = 16;
    let limitX = 0;
    let limitY = 0;
    let mediaScale = 1;
    let wipeFromEnd = false;
    let frame = 0;
    let lastTime = 0;
    let clock = 0;
    let visible = typeof IntersectionObserver === "undefined";
    let pointer: { x: number; y: number } | null = null;
    const target = { x: 0, y: 0 };
    const offset = { x: 0, y: 0 };
    let lastTransform = "";

    const progress = (index: number, now: number) => {
      if (phase === "revealed") return 1;
      if (startedAt === null) return 0;
      const local =
        now - startedAt - wait - (reveal === "rise" ? index * step : 0);
      return entrance === 0
        ? local >= 0
          ? 1
          : 0
        : clamp(local / entrance, 0, 1);
    };

    const paint = (now: number) => {
      boxes.forEach((box, index) => {
        const text = clipTexts.current[index];
        if (!box || !text) return;
        const lift =
          reveal === "rise" ? 1 - easeOutQuint(progress(index, now)) : 0;
        text.setAttribute("y", (box.baseline + lift * RISE * em).toFixed(2));
      });

      const amount = progress(0, now);
      if (reveal === "wipe") {
        const hidden = ((1 - easeInOutCubic(amount)) * 100).toFixed(2);
        layer.style.clipPath =
          amount >= 1
            ? ""
            : wipeFromEnd
              ? `inset(0 0 0 ${hidden}%)`
              : `inset(0 ${hidden}% 0 0)`;
      } else if (reveal === "fade") {
        const eased = easeOutCubic(amount);
        layer.style.opacity = amount >= 1 ? "" : eased.toFixed(3);
        layer.style.transform =
          amount >= 1
            ? ""
            : `scale(${(1 + FADE_SCALE * (1 - eased)).toFixed(4)})`;
      }

      const still = isReduced();
      const swayX = still ? 0 : Math.sin(clock * 0.31) * wander;
      const swayY = still ? 0 : Math.sin(clock * 0.19 + 1.3) * wander * 0.55;
      const x = clamp(offset.x + swayX, -limitX, limitX);
      const y = clamp(offset.y + swayY, -limitY, limitY);
      const transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) scale(${mediaScale.toFixed(4)})`;
      if (transform !== lastTransform) {
        lastTransform = transform;
        media.style.transform = transform;
      }
    };

    const measure = () => {
      if (!alive) return;
      const rect = host.getBoundingClientRect();
      const ratio =
        host.offsetWidth > 0 && rect.width > 0
          ? rect.width / host.offsetWidth
          : 1;
      const style = window.getComputedStyle(host);
      em = parseFloat(style.fontSize) || 16;
      wipeFromEnd = style.direction === "rtl";
      const bleed = em * BLEED;
      // Read every box first, then write, so measuring costs one layout.
      boxes = words.map((_, index) => {
        const word = wordNodes.current[index];
        const mark = baselineNodes.current[index];
        if (!word || !mark) return null;
        const box = word.getBoundingClientRect();
        const base = mark.getBoundingClientRect();
        return {
          center:
            (box.left + box.width / 2 - rect.left) / ratio - host.clientLeft,
          baseline: (base.top - rect.top) / ratio - host.clientTop + bleed,
          width: box.width / ratio,
        };
      });
      const width = layer.clientWidth;
      const height = layer.clientHeight;
      const reach = travel + wander;
      mediaScale =
        reach > 0 && width > 0 && height > 0
          ? Math.min(1 + (2 * reach) / Math.min(width, height), MAX_OVERSCAN)
          : 1;
      limitX = ((mediaScale - 1) / 2) * width;
      limitY = ((mediaScale - 1) / 2) * height;

      boxes.forEach((box, index) => {
        const text = clipTexts.current[index];
        const band = bands.current[index];
        if (!box || !text) return;
        // Glyphs are written here rather than rendered, so server HTML and
        // crawlers see the heading text once.
        if (text.textContent !== words[index]) text.textContent = words[index]!;
        text.setAttribute("x", box.center.toFixed(2));
        if (box.width > 0)
          text.setAttribute("textLength", box.width.toFixed(2));
        else text.removeAttribute("textLength");
        band?.setAttribute("x", "0");
        band?.setAttribute("y", (box.baseline - BAND_ASCENT * em).toFixed(2));
        band?.setAttribute("width", `${Math.max(width, 0)}`);
        band?.setAttribute("height", (RISE * em).toFixed(2));
      });
      host.setAttribute("data-measured", "");
      paint(lastTime);
    };

    const syncVideo = () => {
      const element = video.current;
      if (!element) return;
      element.muted = true;
      if (isReduced() || !visible || document.hidden) {
        element.pause();
        return;
      }
      try {
        void element.play()?.catch(() => {});
      } catch {
        // Autoplay can be refused; the poster or first frame still shows.
      }
    };

    const finish = () => {
      phase = "revealed";
      host.setAttribute("data-state", "revealed");
      if (completed) return;
      completed = true;
      onComplete.current?.();
    };

    const tick = (now: number) => {
      frame = 0;
      const delta = lastTime ? Math.min(now - lastTime, MAX_FRAME) : 16.67;
      lastTime = now;
      const still = isReduced();

      if (pointer) {
        const rect = host.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          const nx = clamp((pointer.x - rect.left) / rect.width, 0, 1) * 2 - 1;
          const ny = clamp((pointer.y - rect.top) / rect.height, 0, 1) * 2 - 1;
          target.x = -nx * travel;
          target.y = -ny * travel;
        }
        pointer = null;
      }

      if (!still && wander > 0) clock += delta / 1000;
      const ease = 1 - Math.exp(-delta / PARALLAX_EASE);
      offset.x += (target.x - offset.x) * ease;
      offset.y += (target.y - offset.y) * ease;
      const settled =
        Math.abs(target.x - offset.x) < 0.05 &&
        Math.abs(target.y - offset.y) < 0.05;
      if (settled) {
        offset.x = target.x;
        offset.y = target.y;
      }

      if (phase === "revealing") {
        startedAt ??= now;
        if (now - startedAt >= total) finish();
      }
      paint(now);

      const drifting = wander > 0 && !still && visible && !document.hidden;
      if (phase === "revealing" || !settled || drifting) {
        frame = requestAnimationFrame(tick);
      } else {
        lastTime = 0;
        media.style.willChange = "";
      }
    };

    const schedule = () => {
      if (frame || !alive) return;
      media.style.willChange = "transform";
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (phase !== "hidden") return;
      if (isReduced()) {
        finish();
        paint(lastTime);
        return;
      }
      phase = "revealing";
      startedAt = null;
      host.setAttribute("data-state", "revealing");
      schedule();
    };

    const onPointer = (event: PointerEvent) => {
      if (
        event.pointerType === "touch" ||
        !event.isPrimary ||
        travel === 0 ||
        isReduced()
      )
        return;
      pointer = { x: event.clientX, y: event.clientY };
      schedule();
    };
    const onPointerExit = () => {
      pointer = null;
      target.x = 0;
      target.y = 0;
      schedule();
    };
    const onReducedChange = () => {
      if (isReduced()) {
        if (phase !== "revealed") finish();
        pointer = null;
        target.x = offset.x = 0;
        target.y = offset.y = 0;
        paint(lastTime);
      } else {
        schedule();
      }
      syncVideo();
    };
    const onVisibility = () => {
      if (!document.hidden) schedule();
      syncVideo();
    };

    host.setAttribute("data-state", phase);
    measure();
    if (phase === "revealed") finish();

    const observer =
      typeof IntersectionObserver === "undefined"
        ? undefined
        : new IntersectionObserver(
            (entries) => {
              const entry = entries[entries.length - 1];
              if (!entry) return;
              visible = entry.isIntersecting;
              const viewport = entry.rootBounds?.height ?? 0;
              if (
                trigger === "view" &&
                visible &&
                (entry.intersectionRatio >= VIEW_THRESHOLD ||
                  (viewport > 0 &&
                    entry.intersectionRect.height >= viewport * VIEW_THRESHOLD))
              ) {
                start();
              }
              if (visible) schedule();
              syncVideo();
            },
            { threshold: [0, VIEW_THRESHOLD] },
          );
    observer?.observe(host);
    if (trigger === "mount" || !observer) start();

    const resize =
      typeof ResizeObserver === "undefined"
        ? undefined
        : new ResizeObserver(() => measure());
    resize?.observe(host);
    const fonts = document.fonts as FontFaceSet | undefined;
    fonts?.ready?.then(measure).catch(() => {});
    fonts?.addEventListener?.("loadingdone", measure);

    host.addEventListener("pointerenter", onPointer);
    host.addEventListener("pointermove", onPointer);
    host.addEventListener("pointerleave", onPointerExit);
    host.addEventListener("pointercancel", onPointerExit);
    reducedQuery?.addEventListener?.("change", onReducedChange);
    document.addEventListener("visibilitychange", onVisibility);
    syncVideo();
    schedule();

    return () => {
      alive = false;
      cancelAnimationFrame(frame);
      frame = 0;
      observer?.disconnect();
      resize?.disconnect();
      fonts?.removeEventListener?.("loadingdone", measure);
      host.removeEventListener("pointerenter", onPointer);
      host.removeEventListener("pointermove", onPointer);
      host.removeEventListener("pointerleave", onPointerExit);
      host.removeEventListener("pointercancel", onPointerExit);
      reducedQuery?.removeEventListener?.("change", onReducedChange);
      document.removeEventListener("visibilitychange", onVisibility);
      host.removeAttribute("data-measured");
      host.removeAttribute("data-state");
      layer.style.clipPath = "";
      layer.style.opacity = "";
      layer.style.transform = "";
      media.style.transform = "";
      media.style.willChange = "";
      video.current?.pause();
    };
  }, [
    words,
    reveal,
    trigger,
    duration,
    stagger,
    delay,
    parallax,
    drift,
    src,
    mediaType,
  ]);

  return (
    <Tag
      {...rest}
      ref={root}
      data-slot="masked-heading"
      data-reveal={reveal}
      className={cn(
        maskedHeadingVariants({ appearance, size, align }),
        className,
      )}
    >
      <span
        data-slot="masked-heading-text"
        className={maskedHeadingTextVariants({ outline })}
      >
        {words.map((word, index) => (
          <Fragment key={`${index}-${word}`}>
            {index > 0 ? " " : null}
            <span
              ref={(node) => {
                wordNodes.current[index] = node;
              }}
              data-slot="masked-heading-word"
              className={zuiMaskedHeadingWord}
            >
              <span
                ref={(node) => {
                  baselineNodes.current[index] = node;
                }}
                className={zuiMaskedHeadingBaseline}
              />
              {word}
            </span>
          </Fragment>
        ))}
      </span>
      <svg
        aria-hidden="true"
        focusable="false"
        data-slot="masked-heading-defs"
        className={zuiMaskedHeadingDefs}
      >
        <defs>
          {words.map((word, index) => (
            <clipPath
              key={`${index}-${word}`}
              id={`${id}-band-${index}`}
              clipPathUnits="userSpaceOnUse"
            >
              <rect
                ref={(node) => {
                  bands.current[index] = node;
                }}
              />
            </clipPath>
          ))}
          <clipPath id={id} clipPathUnits="userSpaceOnUse">
            {words.map((word, index) => (
              <text
                key={`${index}-${word}`}
                ref={(node) => {
                  clipTexts.current[index] = node;
                }}
                textAnchor="middle"
                lengthAdjust="spacing"
                clipPath={`url(#${id}-band-${index})`}
              />
            ))}
          </clipPath>
        </defs>
      </svg>
      <span
        ref={revealLayer}
        aria-hidden="true"
        data-slot="masked-heading-reveal"
        className={zuiMaskedHeadingReveal}
      >
        <span
          data-slot="masked-heading-clip"
          className={zuiMaskedHeadingClip}
          style={{ clipPath: `url(#${id})` }}
        >
          <span
            ref={mediaLayer}
            data-slot="masked-heading-media"
            className={zuiMaskedHeadingMedia}
          >
            {src ? (
              mediaType === "video" ? (
                <video
                  ref={video}
                  src={src}
                  poster={poster}
                  muted
                  loop
                  playsInline
                  preload="auto"
                  tabIndex={-1}
                  disablePictureInPicture
                  data-slot="masked-heading-source"
                  className={zuiMaskedHeadingSource}
                />
              ) : (
                <img
                  src={src}
                  alt=""
                  draggable={false}
                  decoding="async"
                  data-slot="masked-heading-source"
                  className={zuiMaskedHeadingSource}
                />
              )
            ) : (
              <span
                data-slot="masked-heading-mesh"
                className={zuiMaskedHeadingMesh}
              />
            )}
          </span>
        </span>
      </span>
    </Tag>
  );
});
