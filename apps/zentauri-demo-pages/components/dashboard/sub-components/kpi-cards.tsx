"use client";

import { FiArrowDownRight, FiArrowUpRight } from "react-icons/fi";
import { AnimatedNumberCounter } from "@zentauri-ui/zentauri-components/ui/animated-number";
import { Badge } from "@zentauri-ui/zentauri-components/ui/badge";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
} from "@zentauri-ui/zentauri-components/ui/card";

import { useDashboard } from "@/components/dashboard/sub-components/dashboard-context";
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
}
