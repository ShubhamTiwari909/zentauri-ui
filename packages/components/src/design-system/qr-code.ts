export const zuiQrCodeBase = [
  "inline-flex flex-col items-center gap-3 rounded-2xl border p-6",
  "border-[color:var(--zui-qr-code-border,var(--zui-border,#0000001a))] dark:border-[color:var(--zui-qr-code-border-dark,var(--zui-border-dark,#ffffff1a))]",
  "bg-[var(--zui-qr-code-bg,var(--zui-surface,oklch(98.4%_0.003_247.858)))] dark:bg-[var(--zui-qr-code-bg-dark,var(--zui-surface-dark,oklch(12.9%_0.042_264.695)))]",
] as const;

export const zuiQrCodeCanvasWrapper = [
  "overflow-hidden rounded-xl",
  "bg-[var(--zui-qr-code-canvas-bg,var(--zui-surface-muted,oklch(92.9%_0.013_255.508)))] dark:bg-[var(--zui-qr-code-canvas-bg-dark,var(--zui-surface-muted-dark,oklch(27.9%_0.041_260.031)))]",
] as const;

export const zuiQrCodeCaptionBase =
  "text-xs text-center text-[color:var(--zui-qr-code-caption-fg,var(--zui-fg-muted,oklch(55.2%_0.046_257.417)))] dark:text-[color:var(--zui-qr-code-caption-fg-dark,var(--zui-fg-muted-dark,oklch(70.8%_0.015_256.243)))] max-w-full truncate px-2";
