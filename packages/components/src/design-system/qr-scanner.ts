export const zuiQrScannerBase = [
  "relative overflow-hidden rounded-2xl",
  "bg-[var(--zui-qr-scanner-bg,var(--zui-surface,oklch(98.4%_0.003_247.858)))] dark:bg-[var(--zui-qr-scanner-bg-dark,var(--zui-surface-dark,oklch(12.9%_0.042_264.695)))]",
] as const;

export const zuiQrScannerVideo = "block w-full h-full object-cover";

export const zuiQrScannerOverlay = [
  "absolute inset-0 flex flex-col items-center justify-center pointer-events-none",
] as const;

export const zuiQrScannerViewfinder = [
  "size-48 rounded-2xl border-2",
  "border-[var(--zui-qr-scanner-viewfinder-border,#ffffff80)]",
  "shadow-[0_0_0_9999px_rgba(0,0,0,0.3)]",
] as const;

export const zuiQrScannerStatusBase = [
  "absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-xs font-medium",
  "bg-[var(--zui-qr-scanner-status-bg,var(--zui-surface,oklch(98.4%_0.003_247.858)))] dark:bg-[var(--zui-qr-scanner-status-bg-dark,var(--zui-surface-dark,oklch(12.9%_0.042_264.695)))]",
  "text-[color:var(--zui-qr-scanner-status-fg,var(--zui-fg-muted,oklch(55.2%_0.046_257.417)))] dark:text-[color:var(--zui-qr-scanner-status-fg-dark,var(--zui-fg-muted-dark,oklch(70.8%_0.015_256.243)))]",
] as const;

export const zuiQrScannerFallbackBase = [
  "flex flex-col items-center justify-center gap-4 p-8 text-center",
] as const;

export const zuiQrScannerAppearances = {
  default: "",
  muted:
    "bg-[var(--zui-qr-scanner-bg,var(--zui-surface-muted,oklch(92.9%_0.013_255.508)))] dark:bg-[var(--zui-qr-scanner-bg-dark,var(--zui-surface-muted-dark,oklch(27.9%_0.041_260.031)))]",
} as const;
