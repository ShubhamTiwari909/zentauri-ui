import { variantLeadComment } from "@/components/common/variant-code-prefix";

import type { QrCodeDemoProps } from "./types";

export function qrCodeSnippet(opts: QrCodeDemoProps): string {
  const { value = "https://zentauri-ui.vercel.app", caption, level } = opts;

  const captionAttr = caption ? ` caption="${caption}"` : "";
  const levelAttr = level ? ` level="${level}"` : "";
  const lead = variantLeadComment(`level · ${level ?? "M"}`);

  return `import { QrCode } from "@zentauri-ui/zentauri-components/ui/qr-code";

${lead}<QrCode value="${value}"${captionAttr}${levelAttr} />`;
}
