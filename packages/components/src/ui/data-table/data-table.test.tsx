import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { DataTable } from "./data-table";
import type { DataTableColumn } from "./types";

type Person = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Invited";
  score: number;
};

const people: Person[] = [
  {
    id: "ada",
    name: "Ada Lovelace",
    email: "ada@example.com",
    role: "Engineer",
    status: "Active",
    score: 92,
  },
  {
    id: "grace",
    name: "Grace Hopper",
    email: "grace@example.com",
    role: "Architect",
    status: "Invited",
    score: 98,
  },
  {
    id: "katherine",
    name: "Katherine Johnson",
    email: "katherine@example.com",
    role: "Analyst",
    status: "Active",
    score: 95,
  },
];

const columns: DataTableColumn<Person>[] = [
  {
    id: "name",
    header: "Name",
    accessor: "name",
    sortable: true,
    filterable: true,
    cell: ({ value }) => <strong>{String(value)}</strong>,
  },
  {
    id: "email",
    header: "Email",
    accessor: "email",
    filterable: true,
  },
  {
    id: "role",
    header: "Role",
    accessor: "role",
    filterable: true,
  },
  {
    id: "score",
    header: "Score",
    accessor: "score",
    sortable: true,
    textAlign: "right",
  },
];

function renderPeopleTable(
  props: Partial<React.ComponentProps<typeof DataTable<Person>>> = {},
) {
  return render(
    <DataTable
      aria-label="People"
      columns={columns}
      data={people}
      getRowId={(row) => row.id}
      {...props}
    />,
  );
}

function getBodyRows() {
  return screen
    .getAllByRole("row")
    .filter((row) => within(row).queryAllByRole("cell").length > 0);
}

describe("DataTable", () => {
  it("should expose a stable displayName", () => {
    expect(DataTable.displayName).toBe("DataTable");
  });

  it("should render typed columns and rows with custom cells", () => {
    renderPeopleTable();

    expect(screen.getByRole("table", { name: "People" })).toBeVisible();
    expect(screen.getByRole("columnheader", { name: "Name" })).toBeVisible();
    expect(screen.getByRole("columnheader", { name: "Email" })).toBeVisible();
    expect(
      screen.getByRole("rowheader", { name: "Ada Lovelace" }),
    ).toContainHTML("strong");
    expect(screen.getByRole("cell", { name: "Engineer" })).toBeVisible();
  });

  it("should filter rows through the built-in search control", async () => {
    const user = userEvent.setup();
    renderPeopleTable({ search: { placeholder: "Search people" } });

    await user.type(
      screen.getByRole("searchbox", { name: "Search table" }),
      "grace",
    );

    expect(
      screen.getByRole("rowheader", { name: "Grace Hopper" }),
    ).toBeVisible();
    expect(
      screen.queryByRole("rowheader", { name: "Ada Lovelace" }),
    ).toBeNull();
    expect(
      screen.queryByRole("rowheader", { name: "Katherine Johnson" }),
    ).toBeNull();
  });

  it("should require at least one filter column when filterColumnIds is provided", () => {
    expect(() =>
      renderPeopleTable({
        search: { filterColumnIds: [], placeholder: "Search people" },
      }),
    ).toThrow(
      "DataTable search.filterColumnIds must include at least one column id.",
    );
  });

  it("should sort rows when sortable headers are activated", async () => {
    const user = userEvent.setup();
    renderPeopleTable();

    await user.click(screen.getByRole("columnheader", { name: "Score" }));
    expect(getBodyRows().map((row) => row.textContent)).toEqual([
      expect.stringContaining("Ada Lovelace"),
      expect.stringContaining("Katherine Johnson"),
      expect.stringContaining("Grace Hopper"),
    ]);

    await user.click(screen.getByRole("columnheader", { name: "Score" }));
    expect(getBodyRows().map((row) => row.textContent)).toEqual([
      expect.stringContaining("Grace Hopper"),
      expect.stringContaining("Katherine Johnson"),
      expect.stringContaining("Ada Lovelace"),
    ]);
  });

  it("should support row selection and bulk actions", async () => {
    const user = userEvent.setup();
    const handleArchive = vi.fn();
    renderPeopleTable({
      enableRowSelection: true,
      bulkActions: [{ label: "Archive selected", onSelect: handleArchive }],
    });

    await user.click(
      screen.getByRole("checkbox", { name: "Select Ada Lovelace" }),
    );
    await user.click(screen.getByRole("button", { name: "Archive selected" }));

    expect(handleArchive).toHaveBeenCalledWith([
      expect.objectContaining({ id: "ada", name: "Ada Lovelace" }),
    ]);
  });

  it("should let users hide optional columns", async () => {
    const user = userEvent.setup();
    renderPeopleTable({ enableColumnVisibility: true });

    await user.click(screen.getByRole("button", { name: "Columns" }));
    await user.click(screen.getByRole("checkbox", { name: "Email column" }));

    expect(screen.queryByRole("columnheader", { name: "Email" })).toBeNull();
    expect(screen.queryByRole("cell", { name: "ada@example.com" })).toBeNull();
    expect(screen.getByRole("columnheader", { name: "Name" })).toBeVisible();
  });

  it("should paginate processed rows", async () => {
    const user = userEvent.setup();
    renderPeopleTable({ pagination: { pageSize: 2 } });

    expect(
      screen.getByRole("rowheader", { name: "Ada Lovelace" }),
    ).toBeVisible();
    expect(
      screen.queryByRole("rowheader", { name: "Katherine Johnson" }),
    ).toBeNull();

    await user.click(screen.getByRole("button", { name: "Page 2" }));

    expect(
      screen.getByRole("rowheader", { name: "Katherine Johnson" }),
    ).toBeVisible();
    expect(
      screen.queryByRole("rowheader", { name: "Ada Lovelace" }),
    ).toBeNull();
  });

  it("should hide the row count when showRowCount is false", () => {
    renderPeopleTable({ pagination: { pageSize: 2 }, showRowCount: false });

    expect(screen.queryByText("Showing 2 of 3")).toBeNull();
    expect(screen.getByRole("button", { name: "Page 2" })).toBeVisible();
  });

  it("should render loading and empty states", () => {
    const { rerender } = render(
      <DataTable
        columns={columns}
        data={[]}
        loading
        loadingContent="Loading people"
      />,
    );

    expect(screen.getByText("Loading people")).toBeVisible();

    rerender(
      <DataTable columns={columns} data={[]} emptyContent="No people found" />,
    );

    expect(screen.getByText("No people found")).toBeVisible();
  });
});
