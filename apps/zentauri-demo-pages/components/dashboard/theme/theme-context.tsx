"use client";

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
} from "@/components/dashboard/lib/themes";

type ThemeContextValue = {
  theme: DashboardTheme;
  themeId: string;
  setThemeId: (id: string) => void;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
  /** Chart series color key for the active theme. */
  accentChart: string;
  /** Chart container appearance for the active mode. */
  chartAppearance: string;
  themes: DashboardTheme[];
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useDashboardTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useDashboardTheme must be used inside <ThemeProvider>");
  }
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

  // Avoid a hydration mismatch: the server renders the defaults, so the first
  // client render must too. After mount we switch to the persisted values.
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
}
