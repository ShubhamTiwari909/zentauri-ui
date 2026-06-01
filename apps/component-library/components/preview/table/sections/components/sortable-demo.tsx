"use client";

import { useMemo } from "react";

import { useTableSort } from "@zentauri-ui/zentauri-components/hooks/useTableSort";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@zentauri-ui/zentauri-components/ui/table";
import { FiArrowDown, FiArrowUp, FiMinus } from "react-icons/fi";

type SortableInvoice = {
  id: string;
  customer: string;
  status: "Paid" | "Pending" | "Overdue";
  amount: number;
};

type SortKey = "customer" | "status" | "amount";

const invoices: SortableInvoice[] = [
  { id: "INV-1048", customer: "Acme Labs", status: "Paid", amount: 1840 },
  { id: "INV-1049", customer: "Northstar Co.", status: "Pending", amount: 960 },
  { id: "INV-1050", customer: "Orbit Works", status: "Overdue", amount: 2260 },
  { id: "INV-1051", customer: "Pixel Forge", status: "Paid", amount: 1280 },
];

function compareValues(a: string | number, b: string | number) {
  if (typeof a === "number" && typeof b === "number") {
    return a - b;
  }
  return String(a).localeCompare(String(b));
}

function SortIndicator({
  active,
  direction,
}: {
  active: boolean;
  direction: "ascending" | "descending" | "none";
}) {
  const Icon =
    !active || direction === "none"
      ? FiMinus
      : direction === "ascending"
        ? FiArrowUp
        : FiArrowDown;
  const colorClass =
    !active || direction === "none" ? "text-slate-500" : "text-cyan-300";

  return <Icon className={`h-3.5 w-3.5 ${colorClass}`} aria-hidden="true" />;
}

export function SortableTableDemo() {
  const { sortKey, sortDirection, getSortProps } = useTableSort<SortKey>({
    defaultSortKey: "customer",
    defaultSortDirection: "ascending",
  });

  const sortedInvoices = useMemo(() => {
    if (!sortKey || sortDirection === "none") {
      return invoices;
    }

    const activeSortKey = sortKey as SortKey;
    return [...invoices].sort((a, b) => {
      const result = compareValues(a[activeSortKey], b[activeSortKey]);
      return sortDirection === "ascending" ? result : -result;
    });
  }, [sortDirection, sortKey]);

  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-600 dark:text-slate-400">
        Click a sortable header to cycle ascending, descending, and none. The
        active state stays outside the Table primitive.
      </p>
      <Table appearance="bordered" size="sm" stickyHeader>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead {...getSortProps("customer")}>
              <span className="inline-flex items-center gap-2">
                Customer
                <SortIndicator
                  active={sortKey === "customer"}
                  direction={sortDirection}
                />
              </span>
            </TableHead>
            <TableHead {...getSortProps("status")}>
              <span className="inline-flex items-center gap-2">
                Status
                <SortIndicator
                  active={sortKey === "status"}
                  direction={sortDirection}
                />
              </span>
            </TableHead>
            <TableHead {...getSortProps("amount")} className="text-right">
              <span className="inline-flex w-full items-center justify-end gap-2">
                Amount
                <SortIndicator
                  active={sortKey === "amount"}
                  direction={sortDirection}
                />
              </span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedInvoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-mono text-xs">{invoice.id}</TableCell>
              <TableCell className="font-medium">{invoice.customer}</TableCell>
              <TableCell>{invoice.status}</TableCell>
              <TableCell className="text-right tabular-nums">
                ${invoice.amount.toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
