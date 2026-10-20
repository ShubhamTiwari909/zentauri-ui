"use client";

import {
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  type CSSProperties,
} from "react";
import {
  zuiElectricBorderCore,
  zuiElectricBorderEffect,
  zuiElectricBorderFallback,
  zuiElectricBorderFallbackGlow,
  zuiElectricBorderGlow,
  zuiElectricBorderGradientEnd,
  zuiElectricBorderGradientStart,
} from "../../design-system/electric-border";
import { cn } from "../../lib/utils";
import { safeNumber } from "./geometry";
import { createCurrent } from "./runtime";
import type { ElectricBorderProps } from "./types";
import { electricBorderVariants } from "./variants";

export const ElectricBorderBase = forwardRef<
  HTMLDivElement,
  ElectricBorderProps
>(function ZuiElectricBorder(
  {
    appearance,
    active = true,
    interactive = true,
    speed = 1,
    intensity = 1,
    thickness = 1.5,
    radius = 24,
    glow = true,
    sparks = true,
    intro = true,
    reducedMotion = false,
    className,
    style,
    children,
    onPointerEnter,
    onPointerMove,
    onPointerLeave,
    onPointerCancel,
    onClick,
    ...rest
  },
  forwardedRef,
) {
  const host = useRef<HTMLDivElement>(null);
  const effect = useRef<SVGSVGElement>(null);
  const current = useRef<ReturnType<typeof createCurrent> | null>(null);
  const id = `eb-${useId().replace(/:/g, "")}`;
  const stroke = safeNumber(thickness, 1.5, 0.5, 4);
  const corner = safeNumber(radius, 24, 0, 9999);
  useImperativeHandle(forwardedRef, () => host.current!, []);
  useEffect(() => {
    const controller = createCurrent(host.current!, effect.current!);
    current.current = controller;
    return () => {
      controller.destroy();
      current.current = null;
    };
  }, []);
  useEffect(() => {
    current.current?.update({
      active,
      interactive,
      speed: safeNumber(speed, 1, 0, 3),
      intensity: safeNumber(intensity, 1, 0, 2),
      radius: corner,
      sparks,
      intro,
      reducedMotion,
    });
  }, [
    active,
    interactive,
    speed,
    intensity,
    corner,
    sparks,
    intro,
    reducedMotion,
    className,
    style?.borderRadius,
    style?.borderTopLeftRadius,
  ]);
  return (
    <div
      {...rest}
      ref={host}
      data-slot="electric-border"
      data-motion="static"
      className={cn(
        electricBorderVariants({ appearance: appearance ?? "default" }),
        className,
      )}
      style={
        {
          "--_eb-radius": `${corner}px`,
          "--_eb-thickness": `${stroke}px`,
          ...style,
        } as CSSProperties
      }
      onPointerEnter={(event) => {
        onPointerEnter?.(event);
        if (!event.defaultPrevented) current.current?.move(event);
      }}
      onPointerMove={(event) => {
        onPointerMove?.(event);
        if (!event.defaultPrevented) current.current?.move(event);
      }}
      onPointerLeave={(event) => {
        onPointerLeave?.(event);
        current.current?.reset();
      }}
      onPointerCancel={(event) => {
        onPointerCancel?.(event);
        current.current?.reset();
      }}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) current.current?.pulse();
      }}
    >
      {children}
      <div
        aria-hidden="true"
        data-slot="electric-border-rim"
        className={cn(
          zuiElectricBorderFallback,
          glow && zuiElectricBorderFallbackGlow,
        )}
      />
      <svg
        ref={effect}
        aria-hidden="true"
        focusable="false"
        fill="none"
        data-slot="electric-border-effect"
        className={zuiElectricBorderEffect}
        style={{ opacity: 0 }}
      >
        <defs>
          <linearGradient
            id={`${id}-paint`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" className={zuiElectricBorderGradientStart} />
            <stop offset="100%" className={zuiElectricBorderGradientEnd} />
          </linearGradient>
        </defs>
        <g
          data-slot="electric-border-current"
          stroke={`url(#${id}-paint)`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="1000"
          strokeDashoffset="1000"
        >
          {glow && (
            <g className={zuiElectricBorderGlow}>
              {[0, 1, 2].map((index) => (
                <use
                  key={index}
                  href={`#${id}-${index}`}
                  strokeWidth={stroke * 5}
                />
              ))}
            </g>
          )}
          {[1, 0.65, 0.45].map((opacity, index) => (
            <path
              key={index}
              id={`${id}-${index}`}
              data-eb-strand=""
              pathLength="1000"
              opacity={opacity}
            />
          ))}
          <g
            className={zuiElectricBorderCore}
            opacity=".65"
            strokeWidth={stroke * 0.45}
          >
            <use href={`#${id}-0`} />
          </g>
        </g>
        <g
          stroke={`url(#${id}-paint)`}
          strokeWidth={stroke * 0.8}
          strokeLinecap="round"
        >
          <path data-eb-spark="" />
          <path data-eb-spark="" />
        </g>
      </svg>
    </div>
  );
});
