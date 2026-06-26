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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !value) return;

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
