"use client";

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
import {
  Skeleton,
  SkeletonText,
} from "@zentauri-ui/zentauri-components/ui/skeleton";
import { useToast } from "@zentauri-ui/zentauri-components/ui/toast";

import { useDashboard } from "@/components/dashboard/sub-components/dashboard-context";
import { filterByIsoDate } from "@/components/dashboard/lib/date-range";
import { orders, type Order } from "@/components/dashboard/lib/mock-data";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const statusAppearance: Record<
  Order["status"],
  "green" | "yellow" | "destructive"
> = {
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
  {
    id: "plan",
    header: "Plan",
    accessor: "plan",
    filterable: true,
  },
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
  {
    id: "date",
    header: "Date",
    accessor: "date",
    sortable: true,
  },
];

function downloadCsv(filename: string, rows: Order[]) {
  const header = ["id", "customer", "plan", "status", "amount", "date"];
  const escape = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;
  const lines = [
    header.join(","),
    ...rows.map((row) =>
      [row.id, row.customer, row.plan, row.status, row.amount, row.date]
        .map(escape)
        .join(","),
    ),
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
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
          appearance="default"
          size="md"
          stickyHeader={false}
          textAlign="left"
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
                  description: `${selected.length} order${selected.length === 1 ? "" : "s"} saved as CSV.`,
                  appearance: "success",
                });
              },
            },
            {
              label: "Mark reviewed",
              onSelect: (selected) => {
                toast({
                  title: "Marked reviewed",
                  description: `${selected.length} order${selected.length === 1 ? "" : "s"} flagged for follow-up.`,
                  appearance: "default",
                });
              },
            },
          ]}
        />
      </CardBody>
    </Card>
  );
}
