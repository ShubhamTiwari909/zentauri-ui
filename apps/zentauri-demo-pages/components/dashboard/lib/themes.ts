import type { CSSProperties } from "react";

export type ThemeMode = "light" | "dark";

/**
 * A dashboard theme is just a set of `--zui-*` token overrides plus a page
 * background/foreground per mode. Because every Zentauri component reads its
 * colors from `var(--zui-*, fallback)` (with the `dark:` variant paired in the
 * same class), applying these variables at the theme root recolors the entire
 * dashboard — no component code changes.
 */
export type DashboardTheme = {
  id: string;
  name: string;
  description: string;
  /** Accent swatch shown in the theme switcher. */
  swatch: string;
  /** Chart series color — a key from the library chart palette. */
  accentChart: string;
  /** Page background per mode (the theme root). */
  background: Record<ThemeMode, string>;
  /** Base text color per mode (for content outside cards). */
  foreground: Record<ThemeMode, string>;
  /** `--zui-*` overrides applied to the theme root for every mode. */
  tokens: Record<string, string>;
};

const brandFgLight = "#000000";

export const THEMES: DashboardTheme[] = [
  {
    id: "midnight",
    name: "Midnight",
    description: "Indigo accent on deep navy — the default.",
    swatch: "#818cf8",
    accentChart: "indigo",
    background: { dark: "#070b1a", light: "#f4f6fb" },
    foreground: { dark: "#e2e8f0", light: "#111827" },
    tokens: {
      "--zui-radius": "0.85rem",
      "--zui-brand": "#4f46e5",
      "--zui-brand-dark": "#818cf8",
      "--zui-focus-ring": "#6366f1",
      "--zui-focus-ring-dark": "#818cf8",
    },
  },
  {
    id: "emerald",
    name: "Emerald",
    description: "Fresh green accent for growth metrics.",
    swatch: "#34d399",
    accentChart: "emerald",
    background: { dark: "#04140e", light: "#f1faf5" },
    foreground: { dark: "#d1fae5", light: "#111827" },
    tokens: {
      "--zui-radius": "1rem",
      "--zui-brand": "#059669",
      "--zui-brand-dark": "#34d399",
      "--zui-brand-fg": brandFgLight,
      "--zui-brand-fg-dark": "#ffffff",
      "--zui-focus-ring": "#10b981",
      "--zui-focus-ring-dark": "#34d399",
    },
  },
  {
    id: "violet",
    name: "Violet",
    description: "Bold violet accent with a premium feel.",
    swatch: "#a78bfa",
    accentChart: "violet",
    background: { dark: "#120a1f", light: "#f7f4fd" },
    foreground: { dark: "#ede9fe", light: "#111827" },
    tokens: {
      "--zui-radius": "0.75rem",
      "--zui-brand": "#7c3aed",
      "--zui-brand-dark": "#a78bfa",
      "--zui-brand-fg": brandFgLight,
      "--zui-brand-fg-dark": "#ffffff",
      "--zui-focus-ring": "#8b5cf6",
      "--zui-focus-ring-dark": "#a78bfa",
    },
  },
  {
    id: "sunset",
    name: "Sunset",
    description: "Warm amber accent for an energetic look.",
    swatch: "#fb923c",
    accentChart: "amber",
    background: { dark: "#1a0f06", light: "#fff8f1" },
    foreground: { dark: "#ffedd5", light: "#111827" },
    tokens: {
      "--zui-radius": "0.65rem",
      "--zui-brand": "#ea580c",
      "--zui-brand-dark": "#fb923c",
      "--zui-brand-fg": brandFgLight,
      "--zui-brand-fg-dark": "#ffffff",
      "--zui-focus-ring": "#f97316",
      "--zui-focus-ring-dark": "#fb923c",
    },
  },
  {
    id: "rose",
    name: "Rose",
    description: "Vivid rose accent with a playful tone.",
    swatch: "#fb7185",
    accentChart: "rose",
    background: { dark: "#1a0711", light: "#fff5f7" },
    foreground: { dark: "#ffe4e6", light: "#111827" },
    tokens: {
      "--zui-radius": "1.1rem",
      "--zui-brand": "#e11d48",
      "--zui-brand-dark": "#fb7185",
      "--zui-brand-fg": brandFgLight,
      "--zui-brand-fg-dark": "#ffffff",
      "--zui-focus-ring": "#f43f5e",
      "--zui-focus-ring-dark": "#fb7185",
    },
  },
  {
    id: "ocean",
    name: "Ocean",
    description: "Cool cyan accent with an airy feel.",
    swatch: "#22d3ee",
    accentChart: "cyan",
    background: { dark: "#04141a", light: "#f0fbff" },
    foreground: { dark: "#cffafe", light: "#111827" },
    tokens: {
      "--zui-radius": "0.9rem",
      "--zui-brand": "#0891b2",
      "--zui-brand-dark": "#22d3ee",
      "--zui-brand-fg": brandFgLight,
      "--zui-brand-fg-dark": "#ffffff",
      "--zui-focus-ring": "#06b6d4",
      "--zui-focus-ring-dark": "#22d3ee",
    },
  },
  {
    id: "crimson",
    name: "Crimson",
    description: "Deep red accent with high energy.",
    swatch: "#f87171",
    accentChart: "rose",
    background: { dark: "#1a0808", light: "#fff5f5" },
    foreground: { dark: "#fee2e2", light: "#111827" },
    tokens: {
      "--zui-radius": "0.7rem",
      "--zui-brand": "#dc2626",
      "--zui-brand-dark": "#f87171",
      "--zui-brand-fg": brandFgLight,
      "--zui-brand-fg-dark": "#ffffff",
      "--zui-focus-ring": "#ef4444",
      "--zui-focus-ring-dark": "#f87171",
    },
  },
  {
    id: "slate",
    name: "Slate",
    description: "Understated monochrome for a neutral look.",
    swatch: "#94a3b8",
    accentChart: "slate",
    background: { dark: "#0b1120", light: "#f1f5f9" },
    foreground: { dark: "#e2e8f0", light: "#111827" },
    tokens: {
      "--zui-radius": "0.6rem",
      "--zui-brand": "#475569",
      "--zui-brand-dark": "#94a3b8",
      "--zui-brand-fg": brandFgLight,
      "--zui-brand-fg-dark": "#ffffff",
      "--zui-focus-ring": "#64748b",
      "--zui-focus-ring-dark": "#94a3b8",
    },
  },
  {
    id: "sapphire",
    name: "Sapphire",
    description: "Classic blue accent with a corporate feel.",
    swatch: "#60a5fa",
    accentChart: "sky",
    background: { dark: "#07101f", light: "#f1f6fe" },
    foreground: { dark: "#dbeafe", light: "#111827" },
    tokens: {
      "--zui-radius": "0.85rem",
      "--zui-brand": "#1d4ed8",
      "--zui-brand-dark": "#60a5fa",
      "--zui-brand-fg": brandFgLight,
      "--zui-brand-fg-dark": "#ffffff",
      "--zui-focus-ring": "#3b82f6",
      "--zui-focus-ring-dark": "#60a5fa",
    },
  },
  {
    id: "aurora",
    name: "Aurora",
    description: "Teal accent inspired by northern lights.",
    swatch: "#2dd4bf",
    accentChart: "emerald",
    background: { dark: "#04140f", light: "#f0fdf9" },
    foreground: { dark: "#ccfbf1", light: "#111827" },
    tokens: {
      "--zui-radius": "1rem",
      "--zui-brand": "#0d9488",
      "--zui-brand-dark": "#2dd4bf",
      "--zui-brand-fg": brandFgLight,
      "--zui-brand-fg-dark": "#ffffff",
      "--zui-focus-ring": "#14b8a6",
      "--zui-focus-ring-dark": "#2dd4bf",
    },
  },
  {
    id: "plum",
    name: "Plum",
    description: "Rich purple accent with a moody base.",
    swatch: "#c084fc",
    accentChart: "violet",
    background: { dark: "#14091c", light: "#faf5ff" },
    foreground: { dark: "#f3e8ff", light: "#111827" },
    tokens: {
      "--zui-radius": "0.95rem",
      "--zui-brand": "#9333ea",
      "--zui-brand-dark": "#c084fc",
      "--zui-brand-fg": brandFgLight,
      "--zui-brand-fg-dark": "#ffffff",
      "--zui-focus-ring": "#a855f7",
      "--zui-focus-ring-dark": "#c084fc",
    },
  },
  {
    id: "gold",
    name: "Gold",
    description: "Warm gold accent with a luxe finish.",
    swatch: "#fcd34d",
    accentChart: "amber",
    background: { dark: "#161003", light: "#fffbeb" },
    foreground: { dark: "#fef3c7", light: "#111827" },
    tokens: {
      "--zui-radius": "0.8rem",
      "--zui-brand": "#ca8a04",
      "--zui-brand-dark": "#fcd34d",
      "--zui-brand-fg": brandFgLight,
      "--zui-brand-fg-dark": "#ffffff",
      "--zui-focus-ring": "#eab308",
      "--zui-focus-ring-dark": "#fcd34d",
    },
  },
];

export const DEFAULT_THEME_ID = THEMES[0]!.id;
export const DEFAULT_MODE: ThemeMode = "dark";

export function getTheme(id: string): DashboardTheme {
  return THEMES.find((theme) => theme.id === id) ?? THEMES[0]!;
}

/** Builds the inline style for the theme root: token overrides + page colors. */
export function themeRootStyle(
  theme: DashboardTheme,
  mode: ThemeMode,
): CSSProperties {
  return {
    ...theme.tokens,
    // Anchor the library's --zui-fg chain to this theme's foreground values so
    // every component resolves the correct color in both light and dark modes,
    // regardless of what the surrounding app's globals.css sets on <body>.
    "--zui-fg": theme.foreground.light,
    "--zui-fg-dark": theme.foreground.dark,
    background: theme.background[mode],
    color: theme.foreground[mode],
  } as CSSProperties;
}

/** Chart appearance that stays legible for the active mode. */
export function chartAppearanceForMode(mode: ThemeMode): string {
  return mode === "dark" ? "glass" : "default";
}
