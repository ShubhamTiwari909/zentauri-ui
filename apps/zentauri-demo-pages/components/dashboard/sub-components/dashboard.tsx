"use client";

import { ChartsGrid } from "@/components/dashboard/sub-components/charts-grid";
import { DashboardProvider } from "@/components/dashboard/sub-components/dashboard-context";
import { DashboardHeader } from "@/components/dashboard/sub-components/dashboard-header";
import { DataSection } from "@/components/dashboard/sub-components/data-section";
import { GoalsActivity } from "@/components/dashboard/sub-components/goals-activity";
import { KpiCards } from "@/components/dashboard/sub-components/kpi-cards";

export function Dashboard() {
  return (
    <DashboardProvider>
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <DashboardHeader />
        <KpiCards />
        <ChartsGrid />
        <GoalsActivity />
        <DataSection />
      </main>
    </DashboardProvider>
  );
}
