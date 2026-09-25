import type { GlassCardProps } from "@zentauri-ui/zentauri-components/ui/glass-card";

// The generator describes configuration, not arbitrary React nodes or callbacks.
const snippetKeys = [
  "variant",
  "appearance",
  "size",
  "intensity",
  "perspective",
  "scale",
  "depth",
  "glare",
  "glareIntensity",
  "glow",
  "glowIntensity",
  "floating",
  "disabled",
  "interactive",
  "reducedMotion",
  "className",
  "style",
] as const satisfies readonly (keyof GlassCardProps)[];
type GlassCardSnippetProps = Pick<GlassCardProps, (typeof snippetKeys)[number]>;

export function glassCardSnippet(props: GlassCardSnippetProps = {}) {
  const attributes = snippetKeys
    .flatMap((key) => {
      const value = props[key];
      return value === undefined ? [] : [`  ${key}={${JSON.stringify(value)}}`];
    })
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
