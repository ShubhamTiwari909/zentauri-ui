"use client";

import { useEffect, useRef } from "react";
import QRCode from "qrcode";

import { cn } from "../../lib/utils";

import type { QrCodeBaseProps } from "./types";
import {
  qrCodeCanvasWrapperVariants,
  qrCodeCaptionVariants,
  qrCodeVariants,
} from "./variants";

/**
 * QrCodeBase renders a QR code onto a `<canvas>` element using the `qrcode`
 * npm package. It is the static (non-animated) implementation of the public
 * `QrCode` component.
 *
 * --- Props ---
 *
 * - `value` — The string to encode. When empty/falsy the canvas is cleared.
 * - `canvasSize` — Pixel dimensions of the canvas (default: 200). Both width
 *   and height are set to this value, producing a square QR code.
 * - `level` — Error correction level (`"L"` | `"M"` | `"Q"` | `"H"`). Higher
 *   levels survive more visual damage but hold less data.
 * - `bgColor` / `fgColor` — Background and foreground colours passed to the
 *   underlying `QRCode.toCanvas` options.
 * - `margin` — Quiet-zone width in QR modules (default: 2). Passed directly
 *   to the `qrcode` library.
 * - `caption` — Optional label rendered below the QR code.
 * - `ref` — React 19 ref forwarded to the root `<div>` element.
 * - `className` / `...rest` — Spread onto the root `<div>` for layout or
 *   style overrides.
 *
 * --- Rendering lifecycle ---
 *
 * A `useEffect` watches `[value, canvasSize, level, bgColor, fgColor, margin]`.
 * On every change it:
 *   1. Grabs the canvas element from the ref.
 *   2. If `value` is empty, clears the canvas with `ctx.clearRect` so a stale
 *      QR code doesn't persist.
 *   3. Otherwise calls `QRCode.toCanvas()` which draws the QR pattern
 *       asynchronously (via callback) onto the canvas element.
 *
 * The outer `<div>` uses design-system variants (`qrCodeVariants`) for
 * consistent theming and carries `data-slot="qr-code"` for scoped styling and
 * testing.
 *
 * --- Accessibility ---
 *
 * The `<canvas>` has an `aria-label` describing it as a "QR code for {value}".
 * Screen readers will announce the purpose, though the raw value is exposed
 * (consider truncating for secrets).
 */
export function QrCodeBase({
  value,
  canvasSize = 200,
  level = "M",
  bgColor = "#ffffff",
  fgColor = "#000000",
  margin = 2,
  caption,
  className,
  ref,
  ...rest
}: QrCodeBaseProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /**
   * Draw the QR pattern whenever input props change.
   *
   * The conditional `if (!value)` branch handles the "clear" case: when the
   * user deletes the input text, we clear the canvas so a stale QR code isn't
   * displayed. Without this the old QR pattern persists because
   * `QRCode.toCanvas` is never called (it returns early for empty values).
   */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (!value) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      return;
    }

    QRCode.toCanvas(
      canvas,
      value,
      {
        width: canvasSize,
        margin,
        color: {
          dark: fgColor,
          light: bgColor,
        },
        errorCorrectionLevel: level,
      },
      (error) => {
        if (error) {
          console.error("QR Code generation error:", error);
        }
      },
    );
  }, [value, canvasSize, level, bgColor, fgColor, margin]);

  /**
   * The root element is a `<div>` (not the `<canvas>`) so consumers can apply
   * layout classes, the caption sits outside the canvas, and the component
   * plays well with flex/grid containers.
   *
   * Nested structure:
   *   <div data-slot="qr-code">          ← root (ref, className, ...rest)
   *     <div>                            ← canvas wrapper (theme rounding/overflow)
   *       <canvas data-slot="qr-code-canvas" />
   *     </div>
   *     {caption && <span data-slot="qr-code-caption" />}
   *   </div>
   */
  return (
    <div
      ref={ref}
      data-slot="qr-code"
      className={cn(qrCodeVariants(), className)}
      {...rest}
    >
      <div className={qrCodeCanvasWrapperVariants()}>
        <canvas
          ref={canvasRef}
          width={canvasSize}
          height={canvasSize}
          data-slot="qr-code-canvas"
          className="block h-auto max-w-full"
          aria-label={`QR code for ${value}`}
        />
      </div>
      {caption ? (
        <span data-slot="qr-code-caption" className={qrCodeCaptionVariants()}>
          {caption}
        </span>
      ) : null}
    </div>
  );
}

QrCodeBase.displayName = "QrCode";
