"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import QRCode from "qrcode";

import { cn } from "../../../lib/utils";
import { qrCodeAnimationPresets } from "./animations";
import type { QrCodeAnimatedProps } from "./types";
import { QrCodeBase } from "../qr-code-base";

export function QrCodeAnimated({
  animation = "none",
  value,
  canvasSize = 200,
  level = "M",
  bgColor = "#ffffff",
  fgColor = "#000000",
  margin = 2,
  caption,
  className,
  ...props
}: QrCodeAnimatedProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || animation === "none") return;

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
  }, [value, canvasSize, level, bgColor, fgColor, margin, animation]);

  if (animation === "none") {
    return (
      <QrCodeBase
        value={value}
        canvasSize={canvasSize}
        level={level}
        bgColor={bgColor}
        fgColor={fgColor}
        margin={margin}
        caption={caption}
        className={className}
        {...props}
      />
    );
  }

  const preset = qrCodeAnimationPresets[animation];

  return (
    <motion.div
      data-slot="qr-code"
      className={cn(
        "inline-flex flex-col items-center gap-3 rounded-2xl border p-6 border-[color:var(--zui-qr-code-border,var(--zui-border,#0000001a))] dark:border-[color:var(--zui-qr-code-border-dark,var(--zui-border-dark,#ffffff1a))] bg-[var(--zui-qr-code-bg,var(--zui-surface,oklch(98.4%_0.003_247.858)))] dark:bg-[var(--zui-qr-code-bg-dark,var(--zui-surface-dark,oklch(12.9%_0.042_264.695)))]",
        className,
      )}
      variants={preset.variants}
      initial="initial"
      animate="animate"
      transition={preset.transition}
      {...(props as Record<string, unknown>)}
    >
      <div className="overflow-hidden rounded-xl bg-[var(--zui-qr-code-canvas-bg,var(--zui-surface-muted,oklch(92.9%_0.013_255.508)))] dark:bg-[var(--zui-qr-code-canvas-bg-dark,var(--zui-surface-muted-dark,oklch(27.9%_0.041_260.031)))]">
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
        <span
          data-slot="qr-code-caption"
          className="text-xs text-center text-[color:var(--zui-qr-code-caption-fg,var(--zui-fg-muted,oklch(55.2%_0.046_257.417)))] dark:text-[color:var(--zui-qr-code-caption-fg-dark,var(--zui-fg-muted-dark,oklch(70.8%_0.015_256.243)))] max-w-full truncate px-2"
        >
          {caption}
        </span>
      ) : null}
    </motion.div>
  );
}

QrCodeAnimated.displayName = "QrCodeAnimated";
