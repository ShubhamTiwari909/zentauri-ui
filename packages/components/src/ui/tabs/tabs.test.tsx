import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import { tabsTriggerVariants } from "./variants";

describe("Tabs", () => {
  it("should stamp data-slot on root", () => {
    render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">A</TabsTrigger>
        </TabsList>
        <TabsContent value="a">Panel A</TabsContent>
      </Tabs>,
    );
    expect(document.querySelector('[data-slot="tabs"]')).toBeTruthy();
  });

  it("should show matching tab panel", () => {
    render(
      <Tabs defaultValue="b">
        <TabsList>
          <TabsTrigger value="a">A</TabsTrigger>
          <TabsTrigger value="b">B</TabsTrigger>
        </TabsList>
        <TabsContent value="a">Panel A</TabsContent>
        <TabsContent value="b">Panel B</TabsContent>
      </Tabs>,
    );
    expect(screen.getByRole("tabpanel", { name: "B" })).toHaveTextContent(
      "Panel B",
    );
  });

  it("should switch tab on trigger click", async () => {
    const user = userEvent.setup();
    render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">A</TabsTrigger>
          <TabsTrigger value="b">B</TabsTrigger>
        </TabsList>
        <TabsContent value="a">Panel A</TabsContent>
        <TabsContent value="b">Panel B</TabsContent>
      </Tabs>,
    );
    await user.click(screen.getByRole("tab", { name: "B" }));
    await waitFor(() => {
      expect(screen.getByText("Panel B")).toBeInTheDocument();
    });
  });
});

describe("Tabs appearance variants", () => {
  it("uses solid active states for extended color appearances", () => {
    expect(
      tabsTriggerVariants({ appearance: "lime", variant: "pills" }),
    ).toContain("--zui-tabs-trigger-lime-bg-active");
    expect(
      tabsTriggerVariants({ appearance: "mint", variant: "pills" }),
    ).toContain("--zui-tabs-trigger-mint-bg-active");
    expect(
      tabsTriggerVariants({ appearance: "lime", variant: "pills" }),
    ).not.toContain("#65a30d10");
  });
});
