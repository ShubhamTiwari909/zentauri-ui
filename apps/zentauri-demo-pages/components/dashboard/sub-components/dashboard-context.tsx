"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { DateRange } from "@/components/dashboard/lib/date-range";

type DashboardContextValue = {
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
  isRefreshing: boolean;
  refresh: () => void;
};

const DashboardContext = createContext<DashboardContextValue | null>(null);

export function useDashboard(): DashboardContextValue {
  const ctx = useContext(DashboardContext);
  if (!ctx) {
    throw new Error("useDashboard must be used inside <DashboardProvider>");
  }
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
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}
