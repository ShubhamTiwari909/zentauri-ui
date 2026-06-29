import { QrCode } from "@zentauri-ui/zentauri-components/ui/qr-code";

import type { QrCodeDemoProps } from "./types";

export function QrCodeDemo({ value, caption, level }: QrCodeDemoProps) {
  return (
    <QrCode
      value={value ?? "https://zentauri-ui.vercel.app"}
      caption={caption}
      level={level as "L" | "M" | "Q" | "H" | undefined}
    />
  );
}
