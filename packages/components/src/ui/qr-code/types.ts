import type { ComponentPropsWithRef, ReactNode } from "react";

export type QrCodeLevel = "L" | "M" | "Q" | "H";

export interface QrCodeBaseProps extends ComponentPropsWithRef<"div"> {
  value: string;
  canvasSize?: number;
  level?: QrCodeLevel;
  bgColor?: string;
  fgColor?: string;
  margin?: number;
  caption?: ReactNode;
}

export type QrCodeProps = QrCodeBaseProps;

export const QR_CODE_LEVEL_LABELS: Record<QrCodeLevel, string> = {
  L: "Low (7%)",
  M: "Medium (15%)",
  Q: "Quartile (25%)",
  H: "High (30%)",
} as const;
