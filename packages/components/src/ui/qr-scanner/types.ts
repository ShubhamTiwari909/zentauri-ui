import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ReactNode, Ref } from "react";

import type { qrScannerVariants } from "./variants";

export type QrScannerVariantProps = VariantProps<typeof qrScannerVariants>;

export interface QrScannerBaseProps extends ComponentPropsWithoutRef<"div"> {
  ref?: Ref<QrScannerRef>;
  onResult: (data: string) => void;
  onError?: (error: unknown) => void;
  onStart?: () => void;
  onStop?: () => void;
  facingMode?: "user" | "environment";
  constraints?: MediaTrackConstraints;
  scanDelay?: number;
  continuous?: boolean;
  fallbackText?: ReactNode;
  loadingText?: ReactNode;
  noCameraText?: ReactNode;
  appearance?: QrScannerVariantProps["appearance"];
  autoStart?: boolean;
}

export type QrScannerProps = QrScannerBaseProps;

export interface QrScannerRef {
  start: () => Promise<void>;
  stop: () => void;
  scanImage: (file: File) => Promise<string | null>;
  isScanning: boolean;
}
