import type { GlassCardProps } from "@zentauri-ui/zentauri-components/ui/glass-card";

export function glassCardSnippet(props: GlassCardProps = {}) {
  const attributes = Object.entries(props)
    .map(([key, value]) =>
      typeof value === "string" ? `  ${key}="${value}"` : `  ${key}={${value}}`,
    )
    .join("\n");
  return `"use client";

import { ZuiGlassCard } from "@zentauri-ui/zentauri-components/ui/glass-card";

<ZuiGlassCard${attributes ? `\n${attributes}\n` : ""}>
  <ZuiGlassCard.Content>
    <h3>A different dimension</h3>
    <p>Light, depth, and your content.</p>
    <a href="#details">Explore the surface</a>
  </ZuiGlassCard.Content>
</ZuiGlassCard>`;
}
