import { variantLeadComment } from "@/components/common/variant-code-prefix";

import type { GaugeDemoProps } from "./types";

export function gaugeSnippet(opts: GaugeDemoProps): string {
  const parts: string[] = [`value={${opts.value}}`];
  if (opts.appearance !== "default") {
    parts.push(`appearance="${opts.appearance}"`);
  }
  if (opts.size !== "md") {
    parts.push(`size="${opts.size}"`);
  }
  if (opts.thickness !== "medium") {
    parts.push(`thickness="${opts.thickness}"`);
  }
  if (opts.variant !== "radial") {
    parts.push(`variant="${opts.variant}"`);
  }
  parts.push('label="Completion"');

  const detail = [
    `appearance · ${opts.appearance}`,
    `size · ${opts.size}`,
    `thickness · ${opts.thickness}`,
    `variant · ${opts.variant}`,
  ].join(", ");

  return `${variantLeadComment(detail)}import { Gauge } from "@zentauri-ui/zentauri-components/ui/gauge";

<Gauge ${parts.join(" ")} />`;
}
