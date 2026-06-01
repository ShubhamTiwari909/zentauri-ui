import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Table } from "./table";
import {
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./table-base";

function renderBasicTable() {
  return render(
    <Table>
      <TableCaption>Quarterly revenue</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Company</TableHead>
          <TableHead>ARR</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell scope="row">Zentauri</TableCell>
          <TableCell>$42k</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell>$42k</TableCell>
        </TableRow>
      </TableFooter>
    </Table>,
  );
}

describe("Table", () => {
  it("should set displayName on compound parts", () => {
    expect(Table.displayName).toBe("Table");
    expect(TableHeader.displayName).toBe("TableHeader");
    expect(TableBody.displayName).toBe("TableBody");
    expect(TableFooter.displayName).toBe("TableFooter");
    expect(TableRow.displayName).toBe("TableRow");
    expect(TableHead.displayName).toBe("TableHead");
    expect(TableCell.displayName).toBe("TableCell");
    expect(TableCaption.displayName).toBe("TableCaption");
  });

  it("should render semantic table structure inside a focusable scroll region", () => {
    const { container } = renderBasicTable();
    expect(
      screen.getByRole("region", { name: "Scrollable table" }),
    ).toHaveAttribute("data-slot", "table-scroll");
    expect(screen.getByRole("table")).toHaveAttribute("data-slot", "table");
    expect(
      container.querySelector('[data-slot="table-caption"]'),
    ).toHaveTextContent("Quarterly revenue");
  });

  it("should support a custom scroll region label", () => {
    render(<Table scrollAreaAriaLabel="Usage table" />);
    expect(screen.getByRole("region", { name: "Usage table" })).toBeVisible();
  });

  it("should apply sticky header classes when stickyHeader is enabled", () => {
    const { container } = render(
      <Table stickyHeader>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
      </Table>,
    );
    expect(
      container.querySelector('[data-slot="table-header"]')?.className,
    ).toMatch(/sticky/);
    expect(container.querySelector('[data-slot="table"]')?.className).toMatch(
      /table-auto/,
    );
  });

  it("should expose sort state on sortable header cells", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead sortKey="name" sortDirection="ascending">
              Name
            </TableHead>
          </TableRow>
        </TableHeader>
      </Table>,
    );
    const header = screen.getByRole("columnheader", { name: "Name" });
    expect(header).toHaveAttribute("aria-sort", "ascending");
    expect(header).toHaveAttribute("data-sort-key", "name");
    expect(header).toHaveAttribute("data-sort-direction", "ascending");
  });

  it("should call onSortChange with the next direction on click", async () => {
    const user = userEvent.setup();
    const handleSortChange = vi.fn();
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              sortKey="name"
              sortDirection="ascending"
              onSortChange={handleSortChange}
            >
              Name
            </TableHead>
          </TableRow>
        </TableHeader>
      </Table>,
    );

    await user.click(screen.getByRole("columnheader", { name: "Name" }));
    expect(handleSortChange).toHaveBeenCalledWith({
      sortKey: "name",
      sortDirection: "descending",
    });
  });

  it("should support keyboard sorting", async () => {
    const user = userEvent.setup();
    const handleSortChange = vi.fn();
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              sortKey="createdAt"
              sortDirection="none"
              onSortChange={handleSortChange}
            >
              Created
            </TableHead>
          </TableRow>
        </TableHeader>
      </Table>,
    );

    screen.getByRole("columnheader", { name: "Created" }).focus();
    await user.keyboard("{Enter}");
    expect(handleSortChange).toHaveBeenCalledWith({
      sortKey: "createdAt",
      sortDirection: "ascending",
    });
  });

  it("should render scoped body cells as row headers", () => {
    renderBasicTable();
    expect(screen.getByRole("rowheader", { name: "Zentauri" })).toHaveAttribute(
      "data-slot",
      "table-cell",
    );
  });

  it("should not leak rowAnimation onto the rendered row", () => {
    const { container } = render(
      <Table>
        <TableBody>
          <TableRow rowAnimation="hover">
            <TableCell>Animated elsewhere</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    expect(
      container.querySelector('[data-slot="table-row"]'),
    ).not.toHaveAttribute("rowAnimation");
  });

  it("should forward refs to the table element", () => {
    const ref = createRef<HTMLTableElement>();
    render(<Table ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLTableElement);
    expect(ref.current?.getAttribute("data-slot")).toBe("table");
  });
});
