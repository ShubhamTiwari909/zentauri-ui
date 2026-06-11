import { DesignSystem } from "@zentauri-ui/zentauri-components/design-system/facade";
import {
  zuiCssVariablePattern,
  zuiFocusRing,
  zuiGlobalThemeTokens,
  zuiRadius,
  zuiRingOffset,
} from "@zentauri-ui/zentauri-components/design-system/tokens";

import { ComponentTokenReferenceGroup, ZuiTokenReferenceGroup } from "./types";

// All token metadata is derived from the design-system facade
// (@zentauri-ui/zentauri-components/design-system/facade). The facade reads the
// `--zui-*` contract straight from the token strings, so this page stays in sync
// with the library without any hand-maintained variable lists.

export const zuiTokenPattern = zuiCssVariablePattern;

const globalSources = [
  {
    source: "zuiGlobalThemeTokens.foundation",
    description:
      "Shared foundation tokens for radius, focus rings, ring offsets, and shadows.",
    tokens: [
      zuiGlobalThemeTokens.radius,
      zuiGlobalThemeTokens.ringOffset,
      zuiGlobalThemeTokens.ringOffsetDark,
      zuiGlobalThemeTokens.focusRing,
      zuiGlobalThemeTokens.focusRingDark,
      zuiGlobalThemeTokens.shadow,
      zuiGlobalThemeTokens.shadowDark,
    ],
  },
  {
    source: "zuiGlobalThemeTokens.brand",
    description:
      "Brand, foreground, border, and surface tokens used as fallbacks by component-level variables.",
    tokens: [
      zuiGlobalThemeTokens.surfaceMuted,
      zuiGlobalThemeTokens.surfaceMutedDark,
      zuiGlobalThemeTokens.surfaceSoft,
      zuiGlobalThemeTokens.surfaceSoftDark,
      zuiGlobalThemeTokens.surfaceHover,
      zuiGlobalThemeTokens.surfaceHoverDark,
      zuiGlobalThemeTokens.border,
      zuiGlobalThemeTokens.borderDark,
      zuiGlobalThemeTokens.fg,
      zuiGlobalThemeTokens.fgDark,
      zuiGlobalThemeTokens.fgMuted,
      zuiGlobalThemeTokens.fgMutedDark,
      zuiGlobalThemeTokens.brand,
      zuiGlobalThemeTokens.brandDark,
      zuiGlobalThemeTokens.brandHover,
      zuiGlobalThemeTokens.brandHoverDark,
      zuiGlobalThemeTokens.brandFg,
      zuiGlobalThemeTokens.brandFgDark,
    ],
  },
  {
    source: "zuiGlobalThemeTokens.status",
    description:
      "Semantic status colors shared by success, warning, error, and info appearances.",
    tokens: [
      zuiGlobalThemeTokens.statusSuccess,
      zuiGlobalThemeTokens.statusSuccessDark,
      zuiGlobalThemeTokens.statusWarning,
      zuiGlobalThemeTokens.statusWarningDark,
      zuiGlobalThemeTokens.statusError,
      zuiGlobalThemeTokens.statusErrorDark,
      zuiGlobalThemeTokens.statusInfo,
      zuiGlobalThemeTokens.statusInfoDark,
    ],
  },
  {
    source: "zuiGlobalThemeTokens.palette",
    description:
      "Appearance palette tokens used by named color variants across components.",
    tokens: Object.entries(zuiGlobalThemeTokens)
      .filter(([key]) => key.startsWith("color"))
      .map(([, token]) => token),
  },
  {
    source: "zuiFocusRing.default",
    description: "Focus indicator color used by keyboard-visible focus states.",
    className: zuiFocusRing.default,
  },
  {
    source: "zuiRingOffset.default",
    description:
      "Surface color used behind focus rings when a ring offset is applied.",
    className: zuiRingOffset.default,
  },
  {
    source: "zuiRadius.xl",
    description:
      "Shared large radius primitive used by rounded component surfaces.",
    className: zuiRadius.xl,
  },
] as const;

const globalThemeFallbacks: Record<string, string> = {
  "--zui-radius": "0.75rem",
  "--zui-ring-offset": "#f8fafc",
  "--zui-ring-offset-dark": "#020617",
  "--zui-focus-ring": "color-mix(in oklch, var(--zui-brand) 72%, #475569)",
  "--zui-focus-ring-dark":
    "color-mix(in oklch, var(--zui-brand-dark) 72%, #cbd5e1)",
  "--zui-shadow": "0 8px 24px rgba(15, 23, 42, 0.12)",
  "--zui-shadow-dark": "0 18px 48px rgba(15, 23, 42, 0.45)",
  "--zui-surface-muted": "#e2e8f0",
  "--zui-surface-muted-dark": "#1e293b",
  "--zui-surface-soft": "color-mix(in oklch, var(--zui-brand) 8%, transparent)",
  "--zui-surface-soft-dark":
    "color-mix(in oklch, var(--zui-brand-dark) 12%, transparent)",
  "--zui-surface-hover":
    "color-mix(in oklch, var(--zui-brand) 14%, transparent)",
  "--zui-surface-hover-dark":
    "color-mix(in oklch, var(--zui-brand-dark) 18%, transparent)",
  "--zui-border": "color-mix(in oklch, var(--zui-brand) 24%, transparent)",
  "--zui-border-dark":
    "color-mix(in oklch, var(--zui-brand-dark) 28%, transparent)",
  "--zui-fg": "#0f172a",
  "--zui-fg-dark": "#f8fafc",
  "--zui-fg-muted": "#475569",
  "--zui-fg-muted-dark": "#cbd5e1",
  "--zui-brand": "#2563eb",
  "--zui-brand-dark": "#60a5fa",
  "--zui-brand-hover": "color-mix(in oklch, var(--zui-brand) 88%, #000000)",
  "--zui-brand-hover-dark":
    "color-mix(in oklch, var(--zui-brand-dark) 88%, #ffffff)",
  "--zui-brand-fg": "#ffffff",
  "--zui-brand-fg-dark": "#020617",
  "--zui-status-success": "#16a34a",
  "--zui-status-success-dark": "#22c55e",
  "--zui-status-warning": "#d97706",
  "--zui-status-warning-dark": "#f59e0b",
  "--zui-status-error": "#e11d48",
  "--zui-status-error-dark": "#fb7185",
  "--zui-status-info": "#0284c7",
  "--zui-status-info-dark": "#38bdf8",
};

function getGlobalThemeFallback(token: string) {
  if (globalThemeFallbacks[token]) {
    return globalThemeFallbacks[token];
  }

  if (/^--zui-color-[a-z-]+-dark$/.test(token)) {
    return "var(--zui-brand-dark)";
  }

  if (/^--zui-color-[a-z-]+$/.test(token)) {
    return "var(--zui-brand)";
  }

  return "set in your theme";
}

function getThemePairName(token: string) {
  if (token.endsWith("-dark")) {
    return token.replace(/-dark$/, "") as `--zui-${string}`;
  }

  return `${token}-dark` as `--zui-${string}`;
}

export const zuiTokenReferenceGroups = globalSources.map((group) => ({
  source: group.source,
  description: group.description,
  tokens:
    "tokens" in group
      ? group.tokens.map((token) => ({
          name: token,
          fallback: getGlobalThemeFallback(token),
          source: group.source,
          description: group.description,
          theme: token.endsWith("-dark") ? "dark" : "light",
          pairName: getThemePairName(token),
        }))
      : DesignSystem.parse(group.className).map((token) => ({
          ...token,
          source: group.source,
          description: group.description,
        })),
})) as readonly ZuiTokenReferenceGroup[];

export const zuiTokenReferences = zuiTokenReferenceGroups.flatMap(
  (group) => group.tokens,
);

export const componentTokenReferenceGroups = DesignSystem.listComponents().map(
  (component) => {
    const description = `${component.title} component CSS variables.`;

    return {
      slug: component.slug,
      title: component.title,
      description,
      tokens: component.variables().map((token) => ({
        ...token,
        source: component.title,
        description,
      })),
    };
  },
) as readonly ComponentTokenReferenceGroup[];

export const componentTokenReferences = componentTokenReferenceGroups.flatMap(
  (group) => group.tokens,
);
