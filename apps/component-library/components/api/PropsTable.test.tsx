import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PropsTable } from "./PropsTable";

describe("PropsTable", () => {
  it("renders generated accordion API data with variant options and defaults", () => {
    render(<PropsTable slug="accordion" />);

    expect(
      screen.getByRole("heading", { name: "Accordion API" }),
    ).toBeInTheDocument();

    const rootRegion = screen.getByRole("region", { name: "Accordion props" });
    expect(
      within(rootRegion).queryByRole("columnheader", { name: "Description" }),
    ).not.toBeInTheDocument();
    expect(
      within(rootRegion).queryByText("No description provided."),
    ).not.toBeInTheDocument();
    const firstTable = rootRegion.querySelector("table");
    expect(firstTable).toHaveClass("w-full", "table-fixed");
    expect(firstTable?.querySelectorAll("col")).toHaveLength(3);
    expect(firstTable?.querySelector("col:nth-child(1)")).toHaveClass(
      "w-[18rem]",
    );
    expect(firstTable?.querySelector("col:nth-child(2)")).toHaveClass("w-auto");
    expect(firstTable?.querySelector("col:nth-child(3)")).toHaveClass(
      "w-[12rem]",
    );
    expect(within(rootRegion).getByText("appearance")).toBeInTheDocument();
    expect(within(rootRegion).getAllByText("default").length).toBeGreaterThan(
      0,
    );
    expect(within(rootRegion).getByText("blue")).toBeInTheDocument();
    expect(within(rootRegion).getByText("ghost")).toBeInTheDocument();
    expect(
      within(rootRegion).getByText("Controlled value for `single` mode."),
    ).toBeInTheDocument();

    const itemRegion = screen.getByRole("region", {
      name: "AccordionItem props",
    });
    expect(within(itemRegion).getByText("value")).toBeInTheDocument();
  });
});
