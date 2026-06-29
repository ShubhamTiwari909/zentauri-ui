import { QR_CODE_LEVEL_LABELS } from "@zentauri-ui/zentauri-components/ui/qr-code";

export const QR_CODE_LEVELS = Object.keys(
  QR_CODE_LEVEL_LABELS,
) as (keyof typeof QR_CODE_LEVEL_LABELS)[];
