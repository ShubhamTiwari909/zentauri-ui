// Complete, copy-paste-ready source for the dashboard, shown in the "View code"
// drawer. Each entry is a full file so a viewer can recreate the dashboard by
// copying them in order into a fresh Next.js + Tailwind v4 app.

export type CodeSnippet = {
  id: string;
  title: string;
  description: string;
  /** Language hint for the fenced block / file extension. */
  lang: string;
  code: string;
};

export const codeSnippets: CodeSnippet[] = [
  {
    id: "install",
    title: "1. Install & configure Tailwind",
    description:
      "Add the package, then point Tailwind v4 at it so the utility classes (light + dark, paired in the same strings) are generated.",
    lang: "bash",
    code: `# 1. install (requires React 19 + Tailwind v4)
pnpm add @zentauri-ui/zentauri-components react-syntax-highlighter
pnpm add -D tailwindcss @tailwindcss/postcss @types/react-syntax-highlighter

# 2. postcss.config.mjs
const config = { plugins: { "@tailwindcss/postcss": {} } };
export default config;

# 3. app/globals.css
@import "tailwindcss";
@source "../node_modules/@zentauri-ui/zentauri-components";
@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));`,
  },
  {
    id: "themes",
    title: "2. lib/themes.ts",
    description:
      "Each theme is a map of --zui-* token overrides plus a page background/foreground per mode. Applying them at a wrapper recolors every component.",
    lang: "ts",
    code: `import type { CSSProperties } from "react";

export type ThemeMode = "light" | "dark";

export type DashboardTheme = {
  id: string;
  name: string;
  description: string;
  swatch: string;
  accentChart: string;
  background: Record<ThemeMode, string>;
  foreground: Record<ThemeMode, string>;
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
  return THEMES.find((t) => t.id === id) ?? THEMES[0]!;
}

/** Inline style for the theme root: tokens + page colors + fg variable anchors. */
export function themeRootStyle(
  theme: DashboardTheme,
  mode: ThemeMode,
): CSSProperties {
  return {
    ...theme.tokens,
    // Anchor the library's --zui-fg chain so components resolve the correct
    // foreground color regardless of what the app's globals.css sets on <body>.
    "--zui-fg": theme.foreground.light,
    "--zui-fg-dark": theme.foreground.dark,
    background: theme.background[mode],
    color: theme.foreground[mode],
  } as CSSProperties;
}

/** Chart appearance that stays legible for the active mode. */
export function chartAppearanceForMode(mode: ThemeMode): string {
  return mode === "dark" ? "glass" : "default";
}`,
  },
  {
    id: "date-range",
    title: "3. lib/date-range.ts",
    description:
      "Date range types, a deterministic cutoff helper for mock filtering, and a series slicer used by charts.",
    lang: "ts",
    code: `export type DateRange = "7d" | "30d" | "90d" | "ytd";

export const DATE_RANGES: { value: DateRange; label: string }[] = [
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
  { value: "ytd", label: "Year to date" },
];

/** Reference "today" for deterministic mock filtering. */
const REFERENCE = new Date("2026-06-21T12:00:00");

function cutoffForRange(range: DateRange): Date {
  const d = new Date(REFERENCE);
  switch (range) {
    case "7d":
      d.setDate(d.getDate() - 7);
      return d;
    case "30d":
      d.setDate(d.getDate() - 30);
      return d;
    case "90d":
      d.setDate(d.getDate() - 90);
      return d;
    case "ytd":
      return new Date(d.getFullYear(), 0, 1);
  }
}

export function filterByIsoDate<T extends { date: string }>(
  rows: readonly T[],
  range: DateRange,
): T[] {
  const cutoff = cutoffForRange(range);
  return rows.filter((row) => new Date(row.date) >= cutoff);
}

/** Slice a time series by range — longer ranges show more points. */
export function sliceSeries<T>(data: readonly T[], range: DateRange): T[] {
  const take =
    range === "7d" ? 2 : range === "30d" ? 4 : range === "90d" ? 6 : data.length;
  return data.slice(-take);
}`,
  },
  {
    id: "mock-data",
    title: "4. lib/mock-data.ts",
    description: "Static, deterministic data — swap for your API later.",
    lang: "ts",
    code: `export type SparkPoint = { i: number; v: number };

export type Kpi = {
  id: string;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  delta: number;
  trend: "up" | "down";
  sparkline: SparkPoint[];
};

export const kpis: Kpi[] = [
  {
    id: "revenue", label: "Total Revenue", value: 482, prefix: "$", suffix: "K",
    delta: 12.4, trend: "up",
    sparkline: [
      { i: 0, v: 38 }, { i: 1, v: 41 }, { i: 2, v: 39 }, { i: 3, v: 44 },
      { i: 4, v: 46 }, { i: 5, v: 48 }, { i: 6, v: 52 }, { i: 7, v: 55 },
      { i: 8, v: 58 }, { i: 9, v: 61 }, { i: 10, v: 64 }, { i: 11, v: 68 },
    ],
  },
  {
    id: "users", label: "Active Users", value: 38, suffix: "K",
    delta: 8.1, trend: "up",
    sparkline: [
      { i: 0, v: 28 }, { i: 1, v: 29 }, { i: 2, v: 30 }, { i: 3, v: 31 },
      { i: 4, v: 32 }, { i: 5, v: 33 }, { i: 6, v: 34 }, { i: 7, v: 35 },
      { i: 8, v: 36 }, { i: 9, v: 36 }, { i: 10, v: 37 }, { i: 11, v: 38 },
    ],
  },
  {
    id: "aov", label: "Avg. Order Value", value: 86, prefix: "$",
    delta: 3.2, trend: "up",
    sparkline: [
      { i: 0, v: 78 }, { i: 1, v: 79 }, { i: 2, v: 80 }, { i: 3, v: 81 },
      { i: 4, v: 82 }, { i: 5, v: 83 }, { i: 6, v: 84 }, { i: 7, v: 84 },
      { i: 8, v: 85 }, { i: 9, v: 85 }, { i: 10, v: 86 }, { i: 11, v: 86 },
    ],
  },
  {
    id: "refunds", label: "Refunds", value: 1240, prefix: "$",
    delta: 5.6, trend: "down",
    sparkline: [
      { i: 0, v: 18 }, { i: 1, v: 17 }, { i: 2, v: 19 }, { i: 3, v: 16 },
      { i: 4, v: 15 }, { i: 5, v: 14 }, { i: 6, v: 13 }, { i: 7, v: 12 },
      { i: 8, v: 11 }, { i: 9, v: 10 }, { i: 10, v: 9 }, { i: 11, v: 8 },
    ],
  },
];

export const revenueSeries = [
  { month: "Jan", revenue: 32, expenses: 21 },
  { month: "Feb", revenue: 41, expenses: 24 },
  { month: "Mar", revenue: 38, expenses: 22 },
  { month: "Apr", revenue: 52, expenses: 28 },
  { month: "May", revenue: 49, expenses: 27 },
  { month: "Jun", revenue: 63, expenses: 31 },
  { month: "Jul", revenue: 71, expenses: 34 },
  { month: "Aug", revenue: 68, expenses: 33 },
  { month: "Sep", revenue: 79, expenses: 36 },
];

export const channelSeries = [
  { channel: "Q1", organic: 24, paid: 14, referral: 8 },
  { channel: "Q2", organic: 31, paid: 18, referral: 10 },
  { channel: "Q3", organic: 28, paid: 22, referral: 13 },
  { channel: "Q4", organic: 37, paid: 26, referral: 16 },
];

export const trafficSplit = [
  { source: "Direct", visitors: 4200 },
  { source: "Search", visitors: 3100 },
  { source: "Social", visitors: 2400 },
  { source: "Referral", visitors: 1500 },
];

export const sessionsTrend = [
  { day: "Mon", sessions: 1240 },
  { day: "Tue", sessions: 1580 },
  { day: "Wed", sessions: 1390 },
  { day: "Thu", sessions: 1720 },
  { day: "Fri", sessions: 1980 },
  { day: "Sat", sessions: 1460 },
  { day: "Sun", sessions: 1120 },
];

export type CategoryPoint = { category: string; score: number; benchmark: number };

export const categoryPerformance: CategoryPoint[] = [
  { category: "Electronics", score: 88, benchmark: 72 },
  { category: "Apparel",     score: 74, benchmark: 68 },
  { category: "Home",        score: 62, benchmark: 70 },
  { category: "Sports",      score: 91, benchmark: 75 },
  { category: "Books",       score: 55, benchmark: 60 },
  { category: "Beauty",      score: 78, benchmark: 71 },
];

export type Order = {
  id: string;
  customer: string;
  plan: "Starter" | "Growth" | "Scale";
  status: "Paid" | "Pending" | "Refunded";
  amount: number;
  date: string;
};

export const orders: Order[] = [
  { id: "ord-1042", customer: "Ada Lovelace",       plan: "Scale",   status: "Paid",     amount: 480, date: "2026-06-21" },
  { id: "ord-1041", customer: "Grace Hopper",        plan: "Growth",  status: "Paid",     amount: 220, date: "2026-06-21" },
  { id: "ord-1040", customer: "Alan Turing",         plan: "Starter", status: "Pending",  amount: 49,  date: "2026-06-20" },
  { id: "ord-1039", customer: "Katherine Johnson",   plan: "Scale",   status: "Paid",     amount: 480, date: "2026-06-20" },
  { id: "ord-1038", customer: "Linus Torvalds",      plan: "Growth",  status: "Refunded", amount: 220, date: "2026-06-19" },
  { id: "ord-1037", customer: "Margaret Hamilton",   plan: "Growth",  status: "Paid",     amount: 220, date: "2026-06-19" },
  { id: "ord-1036", customer: "Dennis Ritchie",      plan: "Starter", status: "Paid",     amount: 49,  date: "2026-06-18" },
  { id: "ord-1035", customer: "Barbara Liskov",      plan: "Scale",   status: "Pending",  amount: 480, date: "2026-06-18" },
  { id: "ord-1034", customer: "Tim Berners-Lee",     plan: "Growth",  status: "Paid",     amount: 220, date: "2026-06-17" },
  { id: "ord-1033", customer: "Donald Knuth",        plan: "Scale",   status: "Paid",     amount: 480, date: "2026-06-17" },
  { id: "ord-1032", customer: "Edsger Dijkstra",     plan: "Starter", status: "Refunded", amount: 49,  date: "2026-06-16" },
  { id: "ord-1031", customer: "John von Neumann",    plan: "Growth",  status: "Paid",     amount: 220, date: "2026-06-16" },
];

export type Goal = { id: string; label: string; value: number; hint: string };

export const goals: Goal[] = [
  { id: "mrr",       label: "MRR target",     value: 78, hint: "$482K / $620K" },
  { id: "signups",   label: "New signups",     value: 64, hint: "6.4K / 10K"   },
  { id: "retention", label: "Net retention",   value: 92, hint: "92% / 95%"    },
  { id: "nps",       label: "NPS goal",        value: 48, hint: "48 / 60"      },
];

export type Activity = { id: string; title: string; description: string; when: string };

export const activities: Activity[] = [
  { id: "a1", title: "New enterprise deal",  description: "Acme Corp upgraded to Scale",       when: "2h ago" },
  { id: "a2", title: "Churn risk flagged",   description: "3 accounts inactive for 14 days",   when: "5h ago" },
  { id: "a3", title: "Revenue milestone",    description: "Crossed $480K MRR",                 when: "1d ago" },
  { id: "a4", title: "New integration",      description: "Slack connector shipped",            when: "2d ago" },
];`,
  },
  {
    id: "theme-context",
    title: "5. components/theme/theme-context.tsx",
    description:
      "Persists theme + mode via useLocalStorage, applies tokens and data-theme at a wrapper. Hydration guard avoids SSR mismatches.",
    lang: "tsx",
    code: `"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useLocalStorage } from "@zentauri-ui/zentauri-components/hooks/useLocalStorage";

import {
  chartAppearanceForMode,
  DEFAULT_MODE,
  DEFAULT_THEME_ID,
  getTheme,
  themeRootStyle,
  THEMES,
  type DashboardTheme,
  type ThemeMode,
} from "@/lib/themes";

type ThemeContextValue = {
  theme: DashboardTheme;
  themeId: string;
  setThemeId: (id: string) => void;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
  accentChart: string;
  chartAppearance: string;
  themes: DashboardTheme[];
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useDashboardTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useDashboardTheme must be used inside <ThemeProvider>");
  return ctx;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeId] = useLocalStorage<string>(
    "zentauri-dashboard:theme",
    DEFAULT_THEME_ID,
  );
  const [mode, setMode] = useLocalStorage<ThemeMode>(
    "zentauri-dashboard:mode",
    DEFAULT_MODE,
  );

  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  const activeThemeId = hydrated ? themeId : DEFAULT_THEME_ID;
  const activeMode = hydrated ? mode : DEFAULT_MODE;
  const theme = getTheme(activeThemeId);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      themeId: activeThemeId,
      setThemeId,
      mode: activeMode,
      setMode,
      toggleMode: () => setMode(activeMode === "dark" ? "light" : "dark"),
      accentChart: theme.accentChart,
      chartAppearance: chartAppearanceForMode(activeMode),
      themes: THEMES,
    }),
    [theme, activeThemeId, activeMode, setThemeId, setMode],
  );

  return (
    <ThemeContext.Provider value={value}>
      <div
        data-theme={activeMode}
        style={themeRootStyle(theme, activeMode)}
        className="flex min-h-dvh w-full flex-col transition-colors duration-300"
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}`,
  },
  {
    id: "theme-switcher",
    title: "6. components/theme/theme-switcher.tsx",
    description:
      "A scrollable Select for theme presets plus a sun/moon Toggle for light/dark mode.",
    lang: "tsx",
    code: `"use client";

import { FiMoon, FiSun } from "react-icons/fi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@zentauri-ui/zentauri-components/ui/select";
import { Toggle } from "@zentauri-ui/zentauri-components/ui/toggle";

import { useDashboardTheme } from "@/components/theme/theme-context";

function Swatch({ color }: { color: string }) {
  return (
    <span
      aria-hidden
      className="inline-block size-3 rounded-full ring-1 ring-black/10 dark:ring-white/20"
      style={{ background: color }}
    />
  );
}

export function ThemeSwitcher() {
  const { theme, themeId, setThemeId, mode, toggleMode, themes } = useDashboardTheme();

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="w-44">
        <Select
          multiple={false}
          value={[themeId]}
          onChange={(values) => {
            const next = values[0];
            if (next) setThemeId(next);
          }}
        >
          <SelectTrigger
            aria-label="Select dashboard theme"
            className="flex w-full items-center justify-between gap-2"
          >
            <span className="flex items-center gap-2">
              <Swatch color={theme.swatch} />
              <SelectValue placeholder="Theme" />
            </span>
          </SelectTrigger>
          <SelectContent appearance="glass" className="max-h-72 w-44 overflow-y-auto">
            {themes.map((t) => (
              <SelectItem key={t.id} value={t.id}>
                <span className="flex items-center gap-2">
                  <Swatch color={t.swatch} />
                  {t.name}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <FiSun aria-hidden className="size-4 opacity-70" />
        <Toggle
          appearance="gradient-purple"
          aria-label="Toggle dark mode"
          checked={mode === "dark"}
          onCheckedChange={toggleMode}
        />
        <FiMoon aria-hidden className="size-4 opacity-70" />
      </div>
    </div>
  );
}`,
  },
  {
    id: "dashboard-context",
    title: "7. components/dashboard/dashboard-context.tsx",
    description:
      "Tracks the active date range and a simulated refresh state (swap the setTimeout for a real API call).",
    lang: "tsx",
    code: `"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { DateRange } from "@/lib/date-range";

type DashboardContextValue = {
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
  isRefreshing: boolean;
  refresh: () => void;
};

const DashboardContext = createContext<DashboardContextValue | null>(null);

export function useDashboard(): DashboardContextValue {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error("useDashboard must be used inside <DashboardProvider>");
  return ctx;
}

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [dateRange, setDateRange] = useState<DateRange>("30d");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refresh = useCallback(() => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    window.setTimeout(() => setIsRefreshing(false), 900);
  }, [isRefreshing]);

  const value = useMemo(
    () => ({ dateRange, setDateRange, isRefreshing, refresh }),
    [dateRange, isRefreshing, refresh],
  );

  return (
    <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>
  );
}`,
  },
  {
    id: "kpi-cards",
    title: "8. components/dashboard/kpi-cards.tsx",
    description:
      "Card + AnimatedNumberCounter + trend Badge. Spark color reacts to the active theme; comparison label and sparkline data respond to the selected date range.",
    lang: "tsx",
    code: `"use client";

import { FiArrowDownRight, FiArrowUpRight } from "react-icons/fi";
import { AnimatedNumberCounter } from "@zentauri-ui/zentauri-components/ui/animated-number";
import { Badge } from "@zentauri-ui/zentauri-components/ui/badge";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
} from "@zentauri-ui/zentauri-components/ui/card";

import { useDashboard } from "@/components/dashboard/dashboard-context";
import { type DateRange } from "@/components/dashboard/lib/date-range";
import { kpis } from "@/components/dashboard/lib/mock-data";

const RANGE_LABEL: Record<DateRange, string> = {
  "7d": "prev 7 days",
  "30d": "last month",
  "90d": "prev 90 days",
  ytd: "last year",
};


export function KpiCards() {
  const { dateRange } = useDashboard();

  return (
    <section
      aria-label="Key metrics"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      {kpis.map((kpi) => {
        const up = kpi.trend === "up";

        return (
          <Card key={kpi.id} appearance="glass" className="p-5">
            <CardHeader>
              <CardTitle as="h3" className="text-sm font-medium opacity-70">
                {kpi.label}
              </CardTitle>
            </CardHeader>
            <CardBody className="gap-3">
              <div className="flex items-baseline gap-1 text-3xl font-semibold tabular-nums">
                {kpi.prefix ? <span>{kpi.prefix}</span> : null}
                <AnimatedNumberCounter
                  number={kpi.value}
                  className="text-inherit dark:text-inherit"
                />
                {kpi.suffix ? <span>{kpi.suffix}</span> : null}
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  appearance={up ? "green" : "destructive"}
                  size="sm"
                  className="inline-flex items-center gap-1"
                >
                  {up ? <FiArrowUpRight /> : <FiArrowDownRight />}
                  {kpi.delta}%
                </Badge>
                <span className="text-xs opacity-60">
                  vs {RANGE_LABEL[dateRange]}
                </span>
              </div>
            </CardBody>
          </Card>
        );
      })}
    </section>
  );
}`,
  },
  {
    id: "charts-grid",
    title: "9. components/dashboard/charts-grid.tsx",
    description:
      "Area / StackedBar / Pie / Radar charts. Primary series color is the theme accent and charts adapt to date range.",
    lang: "tsx",
    code: `"use client";

import { AreaChart } from "@zentauri-ui/zentauri-components/charts/area";
import { PieChart, chartPalette } from "@zentauri-ui/zentauri-components/charts/pie";
import { RadarChart } from "@zentauri-ui/zentauri-components/charts/radar";
import { StackedBarChart } from "@zentauri-ui/zentauri-components/charts/stacked-bar";
import {
  Card,
  CardBody,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@zentauri-ui/zentauri-components/ui/card";

import { useDashboard } from "@/components/dashboard/dashboard-context";
import { useDashboardTheme } from "@/components/theme/theme-context";
import { sliceSeries } from "@/lib/date-range";
import {
  categoryPerformance,
  channelSeries,
  revenueSeries,
  trafficSplit,
} from "@/lib/mock-data";

const SECONDARY = ["violet", "amber", "emerald", "rose", "cyan"] as const;

function ChartCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Card appearance="glass" className="p-5">
      <CardHeader>
        <CardTitle as="h3" className="text-base font-semibold">{title}</CardTitle>
        <CardDescription className="text-xs opacity-70">{description}</CardDescription>
      </CardHeader>
      <CardBody className="mt-3">{children}</CardBody>
    </Card>
  );
}

export function ChartsGrid() {
  const { dateRange } = useDashboard();
  const { accentChart, chartAppearance } = useDashboardTheme();

  const appearance = chartAppearance as never;
  const revenue = sliceSeries(revenueSeries, dateRange);
  const channels = sliceSeries(channelSeries, dateRange);

  const palette = chartPalette as Record<string, { fill: string }>;
  const pieData = trafficSplit.map((slice, index) => {
    const key = SECONDARY[index % SECONDARY.length];
    return { ...slice, color: key, fill: palette[key]?.fill ?? "#cbd5e1" };
  });

  return (
    <section aria-label="Charts" className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <ChartCard title="Revenue vs Expenses" description="Monthly performance ($K)">
        <AreaChart
          appearance={appearance}
          data={revenue}
          xKey="month"
          height={280}
          showGrid
          showLegend
          showTooltip
          series={[
            { dataKey: "revenue", name: "Revenue", color: accentChart },
            { dataKey: "expenses", name: "Expenses", color: "slate" },
          ]}
        />
      </ChartCard>

      <ChartCard title="Acquisition Channels" description="Sessions by channel, per quarter">
        <StackedBarChart
          appearance={appearance}
          data={channels}
          xKey="channel"
          height={280}
          showGrid
          showLegend
          showTooltip
          series={[
            { dataKey: "organic",  name: "Organic",  color: accentChart },
            { dataKey: "paid",     name: "Paid",     color: "violet" },
            { dataKey: "referral", name: "Referral", color: "amber" },
          ]}
        />
      </ChartCard>

      <ChartCard title="Traffic Sources" description="Share of total visitors">
        <PieChart
          appearance={appearance}
          data={pieData}
          dataKey="visitors"
          nameKey="source"
          colorKey="color"
          height={280}
          showLegend
          showTooltip
          label
          innerRadius={60}
          outerRadius={100}
        />
      </ChartCard>

      <ChartCard title="Category Performance" description="Score vs benchmark by product line">
        <RadarChart
          appearance={appearance}
          data={categoryPerformance}
          xKey="category"
          height={280}
          showGrid
          showLegend
          showTooltip
          series={[
            { dataKey: "score",     name: "Score",     color: accentChart },
            { dataKey: "benchmark", name: "Benchmark", color: "white" },
          ]}
        />
      </ChartCard>
    </section>
  );
}`,
  },
  {
    id: "goals-activity",
    title: "10. components/dashboard/goals-activity.tsx",
    description:
      "Progress bars for monthly goals (theme-aware via --zui-brand) and a Timeline activity feed.",
    lang: "tsx",
    code: `"use client";

import {
  Card,
  CardBody,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@zentauri-ui/zentauri-components/ui/card";
import { Progress } from "@zentauri-ui/zentauri-components/ui/progress";
import {
  Timeline,
  TimelineContent,
  TimelineDescription,
  TimelineIndicator,
  TimelineItem,
  TimelineTitle,
} from "@zentauri-ui/zentauri-components/ui/timeline";

import { activities, goals } from "@/lib/mock-data";

export function GoalsActivity() {
  return (
    <section
      aria-label="Goals and activity"
      className="grid grid-cols-1 gap-4 lg:grid-cols-2"
    >
      <Card appearance="glass" className="p-5">
        <CardHeader>
          <CardTitle as="h3" className="text-base font-semibold">
            Monthly Goals
          </CardTitle>
          <CardDescription className="text-xs opacity-70">
            Progress toward this month&apos;s targets
          </CardDescription>
        </CardHeader>
        <CardBody className="mt-4 gap-5">
          {goals.map((goal) => (
            <div key={goal.id} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{goal.label}</span>
                <span className="opacity-70">{goal.hint}</span>
              </div>
              <Progress value={goal.value} aria-label={goal.label} />
            </div>
          ))}
        </CardBody>
      </Card>

      <Card appearance="glass" className="p-5">
        <CardHeader>
          <CardTitle as="h3" className="text-base font-semibold">
            Recent Activity
          </CardTitle>
          <CardDescription className="text-xs opacity-70">
            Latest events across your workspace
          </CardDescription>
        </CardHeader>
        <CardBody className="mt-4">
          <Timeline appearance="blue">
            {activities.map((item) => (
              <TimelineItem key={item.id}>
                <TimelineIndicator />
                <TimelineContent>
                  <TimelineTitle>{item.title}</TimelineTitle>
                  <TimelineDescription>
                    {item.description} · {item.when}
                  </TimelineDescription>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </CardBody>
      </Card>
    </section>
  );
}`,
  },
  {
    id: "data-section",
    title: "11. components/dashboard/data-section.tsx",
    description:
      "Sortable, filterable DataTable with date-range filtering, bulk CSV export, row selection, skeleton loading, and a refresh button.",
    lang: "tsx",
    code: `"use client";

import { useMemo } from "react";
import { FiRefreshCw } from "react-icons/fi";
import { Badge } from "@zentauri-ui/zentauri-components/ui/badge";
import { Button } from "@zentauri-ui/zentauri-components/ui/buttons";
import {
  Card,
  CardBody,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@zentauri-ui/zentauri-components/ui/card";
import { DataTable } from "@zentauri-ui/zentauri-components/ui/data-table";
import type { DataTableColumn } from "@zentauri-ui/zentauri-components/ui/data-table";
import { Skeleton, SkeletonText } from "@zentauri-ui/zentauri-components/ui/skeleton";
import { useToast } from "@zentauri-ui/zentauri-components/ui/toast";

import { useDashboard } from "@/components/dashboard/dashboard-context";
import { filterByIsoDate } from "@/lib/date-range";
import { orders, type Order } from "@/lib/mock-data";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const statusAppearance: Record<Order["status"], "green" | "yellow" | "destructive"> = {
  Paid: "green",
  Pending: "yellow",
  Refunded: "destructive",
};

const columns: DataTableColumn<Order>[] = [
  {
    id: "id",
    header: "Order",
    accessor: "id",
    sortable: true,
    filterable: true,
    cell: ({ value }) => (
      <span className="font-mono text-xs opacity-80">{String(value)}</span>
    ),
  },
  {
    id: "customer",
    header: "Customer",
    accessor: "customer",
    sortable: true,
    filterable: true,
    cell: ({ value }) => <span className="font-medium">{String(value)}</span>,
  },
  { id: "plan", header: "Plan", accessor: "plan", filterable: true },
  {
    id: "status",
    header: "Status",
    accessor: "status",
    filterable: true,
    cell: ({ value }) => {
      const status = value as Order["status"];
      return (
        <Badge
          appearance={statusAppearance[status]}
          size="sm"
          className="text-white dark:text-white"
        >
          {status}
        </Badge>
      );
    },
  },
  {
    id: "amount",
    header: "Amount",
    accessor: "amount",
    sortable: true,
    textAlign: "right",
    cell: ({ value }) => (
      <span className="tabular-nums font-medium">
        {currency.format(Number(value))}
      </span>
    ),
  },
  { id: "date", header: "Date", accessor: "date", sortable: true },
];

function downloadCsv(filename: string, rows: Order[]) {
  const header = ["id", "customer", "plan", "status", "amount", "date"];
  const escape = (v: string | number) => \`"\${String(v).replace(/"/g, '""')}"\`;
  const lines = [
    header.join(","),
    ...rows.map((row) =>
      [row.id, row.customer, row.plan, row.status, row.amount, row.date]
        .map(escape)
        .join(","),
    ),
  ];
  const blob = new Blob([lines.join("\\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function TableSkeleton() {
  return (
    <div className="space-y-3" aria-hidden>
      <div className="flex gap-3">
        <Skeleton className="h-9 w-48" />
        <Skeleton className="h-9 w-24" />
      </div>
      <Skeleton className="h-10 w-full" />
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonText key={i} lines={1} className="h-10" />
      ))}
    </div>
  );
}

export function DataSection() {
  const { dateRange, isRefreshing, refresh } = useDashboard();
  const { toast } = useToast();

  const filteredOrders = useMemo(
    () => filterByIsoDate(orders, dateRange),
    [dateRange],
  );

  return (
    <Card appearance="glass" className="p-5">
      <CardHeader className="flex-row flex-wrap items-start justify-between gap-3">
        <div>
          <CardTitle as="h3" className="text-base font-semibold">
            Recent Orders
          </CardTitle>
          <CardDescription className="text-xs opacity-70">
            Sortable, filterable, paginated — with bulk actions and CSV export.
          </CardDescription>
        </div>
        <Button
          appearance="secondary"
          size="sm"
          type="button"
          disabled={isRefreshing}
          className="inline-flex shrink-0 items-center gap-2"
          onClick={refresh}
        >
          <FiRefreshCw
            aria-hidden
            className={isRefreshing ? "animate-spin" : undefined}
          />
          Refresh
        </Button>
      </CardHeader>
      <CardBody className="mt-3">
        <DataTable
          aria-label="Recent orders"
          columns={columns}
          data={filteredOrders}
          getRowId={(row) => row.id}
          enableRowSelection
          enableColumnVisibility
          pagination={{ pageSize: 6 }}
          search={{ placeholder: "Search orders…" }}
          defaultSortKey="date"
          defaultSortDirection="descending"
          loading={isRefreshing}
          loadingContent={<TableSkeleton />}
          bulkActions={[
            {
              label: "Export CSV",
              onSelect: (selected) => {
                downloadCsv("orders-selected.csv", selected);
                toast({
                  title: "Export started",
                  description: \`\${selected.length} order\${selected.length === 1 ? "" : "s"} saved as CSV.\`,
                  appearance: "success",
                });
              },
            },
            {
              label: "Mark reviewed",
              onSelect: (selected) => {
                toast({
                  title: "Marked reviewed",
                  description: \`\${selected.length} order\${selected.length === 1 ? "" : "s"} flagged for follow-up.\`,
                  appearance: "default",
                });
              },
            },
          ]}
        />
      </CardBody>
    </Card>
  );
}`,
  },
  {
    id: "code-highlight",
    title: "12. components/code/code-highlight.tsx",
    description:
      "Syntax-highlighted code block using react-syntax-highlighter with the nightOwl theme and a built-in copy button.",
    lang: "tsx",
    code: `"use client";

import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Button } from "@zentauri-ui/zentauri-components/ui/buttons";

type CodeHighlightProps = {
  codeString: string;
  language?: string;
};

export function CodeHighlight({
  codeString,
  language = "typescript",
}: CodeHighlightProps) {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="relative text-xs md:text-sm">
      <SyntaxHighlighter
        customStyle={{ padding: "1.5rem 1.25rem 1.5rem 1rem" }}
        language={language}
        style={nightOwl}
        wrapLongLines={true}
      >
        {codeString}
      </SyntaxHighlighter>
      <Button
        appearance="emerald"
        size="sm"
        type="button"
        className="absolute bottom-2 right-2 md:top-2"
        onClick={handleCopy}
      >
        {copySuccess ? "Copied" : "Copy"}
      </Button>
    </div>
  );
}`,
  },
  {
    id: "page",
    title: "13. app/page.tsx — assemble it",
    description:
      "Wrap everything in ThemeProvider + DashboardProvider + ToastProvider. That single wrapper makes the theme switcher recolor the whole page.",
    lang: "tsx",
    code: `import { ToastProvider } from "@zentauri-ui/zentauri-components/ui/toast";

import { DashboardProvider } from "@/components/dashboard/dashboard-context";
import { ThemeProvider } from "@/components/theme/theme-context";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { KpiCards } from "@/components/dashboard/kpi-cards";
import { ChartsGrid } from "@/components/dashboard/charts-grid";
import { GoalsActivity } from "@/components/dashboard/goals-activity";
import { DataSection } from "@/components/dashboard/data-section";

export default function Home() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <DashboardProvider>
          <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
            <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                  Analytics Overview
                </h1>
                <p className="text-sm opacity-70">
                  Built with Zentauri UI · switch themes and copy the code.
                </p>
              </div>
              <ThemeSwitcher />
            </header>
            <KpiCards />
            <ChartsGrid />
            <GoalsActivity />
            <DataSection />
          </main>
        </DashboardProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}`,
  },
];
