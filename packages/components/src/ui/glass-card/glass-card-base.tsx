"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  type CSSProperties,
  type PointerEvent,
} from "react";
import { cn } from "../../lib/utils";
import {
  zuiGlassCardSurface,
  zuiGlassCardMaterial,
  zuiGlassCardReflection,
  zuiGlassCardGlare,
  zuiGlassCardGlow,
} from "../../design-system/glass-card";
import type { GlassCardProps, GlassCardContentProps } from "./types";
import { glassCardVariants, glassCardContentVariants } from "./variants";

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));
const safe = (value: number, fallback: number, min: number, max: number) =>
  clamp(Number.isFinite(value) ? value : fallback, min, max);
const neutral = () => [0, 0, 1, 50, 50, 0];
const properties = [
  "--_gc-rx",
  "--_gc-ry",
  "--_gc-scale",
  "--_gc-px",
  "--_gc-py",
  "--_gc-glare",
];
const units = ["deg", "deg", "", "%", "%", ""];

export const GlassCardBase = forwardRef<HTMLDivElement, GlassCardProps>(
  function GlassCard(
    {
      appearance,
      variant = "glass",
      size,
      intensity = 12,
      perspective = 1000,
      scale = 1.02,
      glare = true,
      glareIntensity = 0.15,
      glow = false,
      glowIntensity = 0.2,
      depth = 20,
      floating = false,
      disabled = false,
      interactive = true,
      reducedMotion = false,
      className,
      style,
      children,
      onPointerEnter,
      onPointerMove,
      onPointerLeave,
      onPointerCancel,
      ...rest
    },
    forwardedRef,
  ) {
    const root = useRef<HTMLDivElement>(null);
    const surface = useRef<HTMLDivElement>(null);
    const motion = useRef<{
      move: (event: PointerEvent<HTMLDivElement>) => void;
      reset: () => void;
    } | null>(null);
    useImperativeHandle(forwardedRef, () => root.current!, []);

    useEffect(() => {
      const host = root.current;
      const card = surface.current;
      if (!host || !card) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
      const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
      let current = neutral();
      let target = neutral();
      let frame = 0;
      let lastTime = 0;
      let pointer: { x: number; y: number } | null = null;
      let floatAnimation: Animation | undefined;
      let visible = typeof IntersectionObserver === "undefined";
      const allowed = () =>
        !disabled &&
        interactive &&
        !reducedMotion &&
        !reduced.matches &&
        fine.matches;
      const write = () =>
        properties.forEach((property, index) =>
          card.style.setProperty(property, `${current[index]}${units[index]}`),
        );
      const stop = () => {
        cancelAnimationFrame(frame);
        frame = 0;
        lastTime = 0;
        pointer = null;
        current = neutral();
        target = neutral();
        write();
        card.style.willChange = "";
      };
      const tick = (time: number) => {
        frame = 0;
        // Read the stable, untransformed hit area once per frame, before any writes.
        if (pointer) {
          const rect = host.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0) {
            const x = clamp((pointer.x - rect.left) / rect.width, 0, 1);
            const y = clamp((pointer.y - rect.top) / rect.height, 0, 1);
            const tilt = safe(intensity, 12, 0, 30);
            target = [
              (0.5 - y) * tilt * 2,
              (x - 0.5) * tilt * 2,
              safe(scale, 1.02, 1, 1.15),
              x * 100,
              y * 100,
              glare ? safe(glareIntensity, 0.15, 0, 1) : 0,
            ];
          }
          pointer = null;
        }
        // Frame-rate independent damped interpolation; no React work on pointermove.
        const amount =
          1 - Math.exp(-Math.min(lastTime ? time - lastTime : 16.67, 64) / 65);
        lastTime = time;
        let settled = true;
        current = current.map((value, index) => {
          const next = value + (target[index]! - value) * amount;
          if (Math.abs(target[index]! - next) > 0.001) settled = false;
          return next;
        });
        if (settled) current = [...target];
        write();
        if (!settled) frame = requestAnimationFrame(tick);
        else {
          lastTime = 0;
          card.style.willChange = "";
        }
      };
      const schedule = () => {
        if (!frame) {
          card.style.willChange = "transform";
          frame = requestAnimationFrame(tick);
        }
      };
      const reset = () => {
        pointer = null;
        target = neutral();
        if (allowed()) schedule();
        else stop();
      };
      const sync = () => {
        if (!allowed() || document.hidden) stop();
        floatAnimation?.cancel();
        floatAnimation = undefined;
        if (
          floating &&
          allowed() &&
          visible &&
          !document.hidden &&
          typeof card.animate === "function"
        ) {
          floatAnimation = card.animate(
            [
              { translate: "0 0" },
              { translate: "0 -6px" },
              { translate: "0 0" },
            ],
            { duration: 6000, iterations: Infinity, easing: "ease-in-out" },
          );
        }
      };
      motion.current = {
        move: (event) => {
          if (!allowed() || event.pointerType === "touch" || !event.isPrimary)
            return;
          pointer = { x: event.clientX, y: event.clientY };
          schedule();
        },
        reset,
      };
      reduced.addEventListener("change", sync);
      fine.addEventListener("change", sync);
      document.addEventListener("visibilitychange", sync);
      const observer =
        floating && typeof IntersectionObserver !== "undefined"
          ? new IntersectionObserver(([entry]) => {
              visible = entry?.isIntersecting ?? false;
              sync();
            })
          : undefined;
      observer?.observe(host);
      sync();
      return () => {
        stop();
        floatAnimation?.cancel();
        observer?.disconnect();
        reduced.removeEventListener("change", sync);
        fine.removeEventListener("change", sync);
        document.removeEventListener("visibilitychange", sync);
        motion.current = null;
      };
    }, [
      intensity,
      scale,
      glare,
      glareIntensity,
      floating,
      disabled,
      interactive,
      reducedMotion,
    ]);

    return (
      <div
        {...rest}
        ref={root}
        data-slot="glass-card"
        data-variant={variant}
        data-disabled={disabled || undefined}
        className={cn(
          glassCardVariants({ appearance, variant, size }),
          className,
        )}
        style={
          {
            perspective: `${safe(perspective, 1000, 200, 3000)}px`,
            "--_gc-depth": `${safe(depth, 20, 0, 60)}px`,
            "--_gc-glow": safe(glowIntensity, 0.2, 0, 1),
            ...style,
          } as CSSProperties
        }
        onPointerEnter={(event) => {
          onPointerEnter?.(event);
          if (!event.defaultPrevented) motion.current?.move(event);
        }}
        onPointerMove={(event) => {
          onPointerMove?.(event);
          if (!event.defaultPrevented) motion.current?.move(event);
        }}
        onPointerLeave={(event) => {
          onPointerLeave?.(event);
          motion.current?.reset();
        }}
        onPointerCancel={(event) => {
          onPointerCancel?.(event);
          motion.current?.reset();
        }}
      >
        <div
          ref={surface}
          data-slot="glass-card-surface"
          className={zuiGlassCardSurface}
        >
          {glow && (
            <div
              aria-hidden="true"
              data-slot="glass-card-glow"
              className={zuiGlassCardGlow}
            />
          )}
          <div
            aria-hidden="true"
            data-slot="glass-card-material"
            className={zuiGlassCardMaterial}
          />
          <div
            aria-hidden="true"
            data-slot="glass-card-reflection"
            className={zuiGlassCardReflection}
          />
          {glare && (
            <div
              aria-hidden="true"
              data-slot="glass-card-glare"
              className={zuiGlassCardGlare}
            />
          )}
          {children}
        </div>
      </div>
    );
  },
);

export const GlassCardContent = forwardRef<
  HTMLDivElement,
  GlassCardContentProps
>(function GlassCardContent({ className, ...props }, ref) {
  return (
    <div
      {...props}
      ref={ref}
      data-slot="glass-card-content"
      className={cn(glassCardContentVariants(), className)}
    />
  );
});
