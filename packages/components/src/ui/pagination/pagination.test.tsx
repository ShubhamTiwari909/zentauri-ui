import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Pagination } from "./pagination";
import { buildPaginationItems, clampPage } from "./pagination-logic";

const PAGINATION_SLOT = '[data-slot="pagination"]';

function getPaginationRoot(container: HTMLElement = document.body) {
  const elements = container.querySelectorAll(PAGINATION_SLOT);
  expect(
    elements.length,
    `Expected exactly one element matching ${PAGINATION_SLOT}, found ${elements.length}`,
  ).toBe(1);
  return elements[0] as HTMLElement;
}

describe("buildPaginationItems", () => {
  it("should return an empty list when pageCount is zero", () => {
    expect(
      buildPaginationItems({
        pageCount: 0,
        currentPage: 1,
        siblingCount: 1,
        boundaryCount: 1,
      }),
    ).toEqual([]);
  });

  it("should enumerate all pages when pageCount is within the compact threshold", () => {
    const items = buildPaginationItems({
      pageCount: 5,
      currentPage: 3,
      siblingCount: 1,
      boundaryCount: 1,
    });
    expect(items).toEqual([
      { type: "page", value: 1 },
      { type: "page", value: 2 },
      { type: "page", value: 3 },
      { type: "page", value: 4 },
      { type: "page", value: 5 },
    ]);
  });

  it("should insert ellipses when the current page sits between boundary windows", () => {
    const items = buildPaginationItems({
      pageCount: 20,
      currentPage: 10,
      siblingCount: 1,
      boundaryCount: 1,
    });
    expect(items).toEqual([
      { type: "page", value: 1 },
      { type: "ellipsis", key: "gap-1-9" },
      { type: "page", value: 9 },
      { type: "page", value: 10 },
      { type: "page", value: 11 },
      { type: "ellipsis", key: "gap-11-20" },
      { type: "page", value: 20 },
    ]);
  });

  it("should widen the middle window when siblingCount is larger", () => {
    const items = buildPaginationItems({
      pageCount: 30,
      currentPage: 15,
      siblingCount: 2,
      boundaryCount: 1,
    });
    const pageValues = items
      .filter((item): item is { type: "page"; value: number } => item.type === "page")
      .map((item) => item.value);
    expect(pageValues).toContain(1);
    expect(pageValues).toContain(30);
    expect(pageValues).toContain(13);
    expect(pageValues).toContain(14);
    expect(pageValues).toContain(15);
    expect(pageValues).toContain(16);
    expect(pageValues).toContain(17);
  });
});

describe("clampPage", () => {
  it("should clamp values into the inclusive page range", () => {
    expect(clampPage(0, 5)).toBe(1);
    expect(clampPage(100, 5)).toBe(5);
    expect(clampPage(3, 5)).toBe(3);
  });

  it("should return 1 when pageCount is zero", () => {
    expect(clampPage(5, 0)).toBe(1);
  });
});

describe("Pagination (component library)", () => {
  it("should expose a stable displayName", () => {
    expect(Pagination.displayName).toBe("Pagination");
  });

  it("should stamp data-slot on the root nav element", () => {
    render(<Pagination pageCount={3} defaultPage={1} />);
    expect(getPaginationRoot().getAttribute("data-slot")).toBe("pagination");
  });

  it("should render navigation with an accessible name", () => {
    render(<Pagination pageCount={3} defaultPage={1} />);
    expect(screen.getByRole("navigation", { name: "Pagination" })).toBeVisible();
  });

  it("should mark the active page with aria-current", () => {
    render(<Pagination pageCount={5} page={3} />);
    expect(screen.getByRole("button", { name: "Page 3" })).toHaveAttribute("aria-current", "page");
  });

  it("should call onPageChange when a different page is activated", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Pagination pageCount={5} defaultPage={1} onPageChange={handleChange} />);
    await user.click(screen.getByRole("button", { name: "Page 4" }));
    expect(handleChange).toHaveBeenCalledWith(4);
  });

  it("should disable the previous control on the first page", () => {
    render(<Pagination pageCount={4} page={1} />);
    expect(screen.getByRole("button", { name: "Previous page" })).toBeDisabled();
  });

  it("should disable the next control on the last page", () => {
    render(<Pagination pageCount={4} page={4} />);
    expect(screen.getByRole("button", { name: "Next page" })).toBeDisabled();
  });

  it("should apply list variant classes for the selected appearance", () => {
    render(<Pagination pageCount={3} page={1} appearance="emerald" />);
    const list = document.querySelector('[data-slot="pagination-list"]');
    expect(list?.className).toMatch(/border-emerald-500/);
  });

  it("should render anchors for page controls when getPageHref is provided", () => {
    render(
      <Pagination
        pageCount={3}
        page={2}
        getPageHref={(p) => `/items?page=${p}`}
      />,
    );
    const page2 = screen.getByRole("link", { name: "Page 2" });
    expect(page2.getAttribute("href")).toBe("/items?page=2");
    expect(page2).toHaveAttribute("aria-current", "page");
  });
});
