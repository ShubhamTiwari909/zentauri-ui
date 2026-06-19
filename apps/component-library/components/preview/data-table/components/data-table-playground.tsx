"use client";

import { useMemo, useState } from "react";

import { variantLeadComment } from "@/components/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { DataTable } from "@zentauri-ui/zentauri-components/ui/data-table";
import type { DataTableProps } from "@zentauri-ui/zentauri-components/ui/data-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@zentauri-ui/zentauri-components/ui/select";

import { columns, members } from "./data-table-demo";

const DATA_TABLE_APPEARANCES = [
  "default",
  "striped",
  "bordered",
  "ghost",
  "sky",
  "rose",
  "purple",
  "pink",
  "orange",
  "yellow",
  "teal",
  "indigo",
  "emerald",
  "gray",
  "amber",
  "violet",
  "blue",
  "cyan",
  "green",
  "lime",
  "mint",
  "ocean",
  "sapphire",
  "lavender",
  "ruby",
  "red",
  "slate",
  "zinc",
  "stone",
  "royal",
  "electric",
  "forest",
  "sunset",
  "magenta",
  "crimson",
  "aqua",
  "plum",
] as const satisfies readonly NonNullable<
  DataTableProps<unknown>["appearance"]
>[];

const DATA_TABLE_SIZES = [
  "sm",
  "md",
  "lg",
] as const satisfies readonly NonNullable<DataTableProps<unknown>["size"]>[];

const TOGGLE_OPTIONS = ["off", "on"] as const;

type DataTableAppearance = (typeof DATA_TABLE_APPEARANCES)[number];
type DataTableSize = (typeof DATA_TABLE_SIZES)[number];
type ToggleOption = (typeof TOGGLE_OPTIONS)[number];

type VariantSelectProps<T extends string> = {
  label: string;
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
};

function VariantSelect<T extends string>({
  label,
  value,
  options,
  onChange,
}: VariantSelectProps<T>) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold text-slate-900 dark:text-white">
        {label}
      </span>
      <Select
        multiple={false}
        value={[value]}
        onChange={(values) => {
          const next = values[0];
          if (next) {
            onChange(next as T);
          }
        }}
      >
        <SelectTrigger variant="outline" size="sm" className="w-full">
          <SelectValue placeholder={value} />
        </SelectTrigger>
        <SelectContent
          appearance="default"
          size="sm"
          className="max-h-72 overflow-y-auto"
        >
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </label>
  );
}

function dataTableSnippet({
  appearance,
  size,
  stickyHeader,
  enableRowSelection,
  enableColumnVisibility,
  showRowCount,
}: {
  appearance: DataTableAppearance;
  size: DataTableSize;
  stickyHeader: boolean;
  enableRowSelection: boolean;
  enableColumnVisibility: boolean;
  showRowCount: boolean;
}) {
  const appearanceAttr =
    appearance === "default" ? "" : `\n  appearance="${appearance}"`;
  const sizeAttr = size === "md" ? "" : `\n  size="${size}"`;
  const stickyAttr = stickyHeader ? "\n  stickyHeader" : "";
  const selectionAttr = enableRowSelection ? "\n  enableRowSelection" : "";
  const visibilityAttr = enableColumnVisibility
    ? "\n  enableColumnVisibility"
    : "";
  const rowCountAttr = showRowCount ? "" : "\n  showRowCount={false}";

  return `${variantLeadComment(
    `DataTable · appearance ${appearance}, size ${size}`,
  )}
<DataTable
  aria-label="Team members"${appearanceAttr}${sizeAttr}${stickyAttr}${selectionAttr}${visibilityAttr}${rowCountAttr}
  columns={columns}
  data={members}
  getRowId={(row) => row.id}
  pagination={{ pageSize: 5 }}
  search={{ placeholder: "Search members" }}
/>`;
}

export function DataTablePlayground() {
  const [appearance, setAppearance] = useState<DataTableAppearance>("default");
  const [size, setSize] = useState<DataTableSize>("md");
  const [sticky, setSticky] = useState<ToggleOption>("off");
  const [selection, setSelection] = useState<ToggleOption>("on");
  const [visibility, setVisibility] = useState<ToggleOption>("on");
  const [rowCount, setRowCount] = useState<ToggleOption>("on");

  const stickyHeader = sticky === "on";
  const enableRowSelection = selection === "on";
  const enableColumnVisibility = visibility === "on";
  const showRowCount = rowCount === "on";

  const code = useMemo(
    () =>
      dataTableSnippet({
        appearance,
        size,
        stickyHeader,
        enableRowSelection,
        enableColumnVisibility,
        showRowCount,
      }),
    [
      appearance,
      enableColumnVisibility,
      enableRowSelection,
      showRowCount,
      size,
      stickyHeader,
    ],
  );

  return (
    <div className="mt-6 rounded-xl">
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        <VariantSelect
          label="Appearance"
          value={appearance}
          options={DATA_TABLE_APPEARANCES}
          onChange={setAppearance}
        />
        <VariantSelect
          label="Size"
          value={size}
          options={DATA_TABLE_SIZES}
          onChange={setSize}
        />
        <VariantSelect
          label="Sticky header"
          value={sticky}
          options={TOGGLE_OPTIONS}
          onChange={setSticky}
        />
        <VariantSelect
          label="Selection"
          value={selection}
          options={TOGGLE_OPTIONS}
          onChange={setSelection}
        />
        <VariantSelect
          label="Columns"
          value={visibility}
          options={TOGGLE_OPTIONS}
          onChange={setVisibility}
        />
        <VariantSelect
          label="Row count"
          value={rowCount}
          options={TOGGLE_OPTIONS}
          onChange={setRowCount}
        />
      </div>
      <PreviewCodeShowcase code={code}>
        <DataTable
          aria-label="Team members playground"
          appearance={appearance}
          size={size}
          stickyHeader={stickyHeader}
          columns={columns}
          data={members}
          enableColumnVisibility={enableColumnVisibility}
          enableRowSelection={enableRowSelection}
          getRowId={(row) => row.id}
          pagination={{ pageSize: 5 }}
          search={{ placeholder: "Search members" }}
          showRowCount={showRowCount}
        />
      </PreviewCodeShowcase>
    </div>
  );
}
