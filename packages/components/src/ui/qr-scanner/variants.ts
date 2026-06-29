import { cva } from "class-variance-authority";

import {
  zuiQrScannerAppearances,
  zuiQrScannerBase,
  zuiQrScannerFallbackBase,
  zuiQrScannerOverlay,
  zuiQrScannerStatusBase,
  zuiQrScannerViewfinder,
  zuiQrScannerVideo,
} from "../../design-system/qr-scanner";

export const qrScannerVariants = cva(zuiQrScannerBase, {
  variants: {
    appearance: zuiQrScannerAppearances,
  },
  defaultVariants: {
    appearance: "default",
  },
});

export const qrScannerVideoVariants = cva(zuiQrScannerVideo);
export const qrScannerOverlayVariants = cva(zuiQrScannerOverlay);
export const qrScannerViewfinderVariants = cva(zuiQrScannerViewfinder);
export const qrScannerStatusVariants = cva(zuiQrScannerStatusBase);
export const qrScannerFallbackVariants = cva(zuiQrScannerFallbackBase);
