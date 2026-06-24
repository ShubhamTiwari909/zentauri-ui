"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@zentauri-ui/zentauri-components/ui/select";

import { useDashboard } from "@/components/dashboard/sub-components/dashboard-context";
import { ThemeSwitcher } from "@/components/dashboard/theme/theme-switcher";
import {
  DATE_RANGES,
  type DateRange,
} from "@/components/dashboard/lib/date-range";
import { CodeDrawer } from "@/components/dashboard/code/code-drawer";

export function DashboardHeader() {
  const { dateRange, setDateRange } = useDashboard();
  const range = [dateRange];

  return (
    <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Analytics Overview
        </h1>
        <p className="text-sm opacity-70">
          Built with Zentauri UI · switch themes and copy the code.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="w-40">
          <Select
            multiple={false}
            value={range}
            onChange={(next) => setDateRange(next[0] as DateRange)}
          >
            <SelectTrigger aria-label="Select date range" className="w-full">
              <SelectValue placeholder="Date range" />
            </SelectTrigger>
            <SelectContent appearance="glass" className="w-40">
              {DATE_RANGES.map((r) => (
                <SelectItem key={r.value} value={r.value}>
                  {r.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <ThemeSwitcher />
        <CodeDrawer />
      </div>
    </header>
  );
}
