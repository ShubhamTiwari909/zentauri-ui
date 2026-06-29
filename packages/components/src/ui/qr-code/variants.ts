import { cva } from "class-variance-authority";

import {
  zuiQrCodeBase,
  zuiQrCodeCanvasWrapper,
  zuiQrCodeCaptionBase,
} from "../../design-system/qr-code";

export const qrCodeVariants = cva(zuiQrCodeBase);
export const qrCodeCanvasWrapperVariants = cva(zuiQrCodeCanvasWrapper);
export const qrCodeCaptionVariants = cva(zuiQrCodeCaptionBase);
