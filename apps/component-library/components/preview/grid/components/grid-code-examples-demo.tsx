"use client";
import { Grid, GridItem } from "@zentauri-ui/zentauri-components/ui/grid";
import {
  GRID_AREA_LAYOUT,
  GRID_AUTO_LAYOUT,
  GRID_DASHBOARD_LAYOUT,
  gridPlaygroundLayout,
  type GridPlaygroundOptions,
} from "./grid-code-examples.data";

export function GridPlaygroundDemo({
  options,
  ids,
}: {
  options: GridPlaygroundOptions;
  ids: readonly number[];
}) {
  const custom = options.preset === "none" && options.mode === "custom";
  return (
    <Grid
      layout={gridPlaygroundLayout(options)}
      stackOnMobile={options.stackOnMobile}
      className="text-slate-900 dark:text-slate-100"
      gap={options.gap}
      rowGap={options.rowGap === "inherit" ? undefined : options.rowGap}
      columnGap={
        options.columnGap === "inherit" ? undefined : options.columnGap
      }
      alignItems={options.alignItems}
    >
      {ids.map((id, index) => (
        <GridItem
          key={id}
          appearance={options.appearance}
          padding={options.padding}
          colSpan={index === 0 ? options.span : 1}
          rowSpan={index === 0 ? options.rowSpan : 1}
          columnStart={index === 0 ? options.columnStart : "auto"}
          area={
            custom ? (["main", "aside", "footer"][index] ?? "auto") : "auto"
          }
          className="min-h-24"
        >
          Item {id}
        </GridItem>
      ))}
    </Grid>
  );
}

export function GridAutoDemo() {
  return (
    <Grid as="ul" aria-label="Products" layout={GRID_AUTO_LAYOUT}>
      {["Studio", "Team", "Enterprise"].map((name) => (
        <GridItem as="li" key={name} appearance="subtle" padding="lg">
          <h3>{name}</h3>
          <p>Flexible plans for your workspace.</p>
        </GridItem>
      ))}
    </Grid>
  );
}
export function GridDashboardDemo() {
  return (
    <Grid layout={GRID_DASHBOARD_LAYOUT} gap="lg">
      <GridItem
        colSpan={{ base: 1, md: 4, xl: 8 }}
        appearance="blue"
        padding="lg"
      >
        Revenue
      </GridItem>
      <GridItem
        colSpan={{ base: 1, md: 2, xl: 4 }}
        appearance="emerald"
        padding="lg"
      >
        Summary
      </GridItem>
      <GridItem colSpan="full" appearance="subtle" padding="lg">
        Activity
      </GridItem>
    </Grid>
  );
}
export function GridAreasDemo() {
  return (
    <Grid as="section" aria-label="Account overview" layout={GRID_AREA_LAYOUT}>
      <GridItem area="main" appearance="subtle" padding="lg">
        Account details
      </GridItem>
      <GridItem area="aside" appearance="blue" padding="lg">
        Account actions
      </GridItem>
      <GridItem area="footer" appearance="glass" padding="lg">
        Account history
      </GridItem>
    </Grid>
  );
}
export function GridNestedDemo() {
  return (
    <Grid
      className="text-slate-900 dark:text-slate-100"
      layout={{ mode: "fixed", columns: 2 }}
      columnGap="lg"
      rowGap="sm"
    >
      <GridItem colSpan="full" appearance="subtle" padding="lg">
        <Grid layout={{ mode: "auto", minItemWidth: 140 }} gap="sm">
          <GridItem appearance="blue" padding="md">
            Nested A
          </GridItem>
          <GridItem appearance="emerald" padding="md">
            Nested B
          </GridItem>
        </Grid>
      </GridItem>
      <GridItem>
        <a href="#grid-installation">Installation</a>
      </GridItem>
      <GridItem>
        <button type="button">Native button</button>
      </GridItem>
    </Grid>
  );
}
