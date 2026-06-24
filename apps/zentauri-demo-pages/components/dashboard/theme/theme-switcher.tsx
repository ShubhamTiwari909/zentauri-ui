"use client";

import { FiMoon, FiSun } from "react-icons/fi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@zentauri-ui/zentauri-components/ui/select";
import { Toggle } from "@zentauri-ui/zentauri-components/ui/toggle";

import { useDashboardTheme } from "@/components/dashboard/theme/theme-context";

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
  const { theme, themeId, setThemeId, mode, toggleMode, themes } =
    useDashboardTheme();

  return (
    <div className="flex flex-wrap items-center justify-between w-full md:w-fit gap-3">
      <div className="w-44">
        <Select
          multiple={false}
          value={[theme.id]}
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
          <SelectContent
            appearance="glass"
            className="max-h-72 w-44 overflow-y-auto"
          >
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
}
