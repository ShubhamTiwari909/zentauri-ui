import {
  GRID_AREA_LAYOUT,
  GRID_AUTO_LAYOUT,
  GRID_DASHBOARD_LAYOUT,
  gridPlaygroundLayout,
  type GridPlaygroundOptions,
} from "./grid-code-examples.data";

const imports =
  'import { Grid, GridItem } from "@zentauri-ui/zentauri-components/ui/grid";';
export function gridPlaygroundSnippet(
  options: GridPlaygroundOptions,
  ids: readonly number[],
) {
  const custom = options.preset === "none" && options.mode === "custom";
  return `${imports}

const items = ${JSON.stringify(ids)};

<Grid
  className="text-slate-900 dark:text-slate-100"
  layout={${JSON.stringify(gridPlaygroundLayout(options), null, 2)}}
  stackOnMobile={${options.stackOnMobile}}
  gap="${options.gap}"${options.rowGap === "inherit" ? "" : `\n  rowGap="${options.rowGap}"`}${options.columnGap === "inherit" ? "" : `\n  columnGap="${options.columnGap}"`}
  alignItems="${options.alignItems}"
>
  {items.map((id, index) => (
    <GridItem
      key={id}
      appearance="${options.appearance}"
      padding="${options.padding}"
      colSpan={index === 0 ? ${JSON.stringify(options.span)} : 1}
      rowSpan={index === 0 ? ${options.rowSpan} : 1}
      columnStart={index === 0 ? ${JSON.stringify(options.columnStart)} : "auto"}${custom ? '\n      area={["main", "aside", "footer"][index] ?? "auto"}' : ""}
      className="min-h-24"
    >
      Item {id}
    </GridItem>
  ))}
</Grid>`;
}

export const gridAutoSnippet = `${imports}

<Grid as="ul" aria-label="Products" layout={${JSON.stringify(GRID_AUTO_LAYOUT)}}>
  {["Studio", "Team", "Enterprise"].map(name => (
    <GridItem as="li" key={name} appearance="subtle" padding="lg">
      <h3>{name}</h3>
      <p>Flexible plans for your workspace.</p>
    </GridItem>
  ))}
</Grid>`;
export const gridDashboardSnippet = `${imports}

<Grid layout={${JSON.stringify(GRID_DASHBOARD_LAYOUT, null, 2)}} gap="lg">
  <GridItem colSpan={{ base: 1, md: 4, xl: 8 }} appearance="blue" padding="lg">Revenue</GridItem>
  <GridItem colSpan={{ base: 1, md: 2, xl: 4 }} appearance="emerald" padding="lg">Summary</GridItem>
  <GridItem colSpan="full" appearance="subtle" padding="lg">Activity</GridItem>
</Grid>`;
export const gridAreasSnippet = `${imports}

<Grid as="section" aria-label="Account overview" layout={${JSON.stringify(GRID_AREA_LAYOUT, null, 2)}}>
  <GridItem area="main" appearance="subtle" padding="lg">Account details</GridItem>
  <GridItem area="aside" appearance="blue" padding="lg">Account actions</GridItem>
  <GridItem area="footer" appearance="glass" padding="lg">Account history</GridItem>
</Grid>`;
export const gridNestedSnippet = `${imports}

<Grid className="text-slate-900 dark:text-slate-100" layout={{ mode: "fixed", columns: 2 }} columnGap="lg" rowGap="sm">
  <GridItem colSpan="full" appearance="subtle" padding="lg">
    <Grid layout={{ mode: "auto", minItemWidth: 140 }} gap="sm">
      <GridItem appearance="blue" padding="md">Nested A</GridItem>
      <GridItem appearance="emerald" padding="md">Nested B</GridItem>
    </Grid>
  </GridItem>
  <GridItem><a href="#grid-installation">Installation</a></GridItem>
  <GridItem><button type="button">Native button</button></GridItem>
</Grid>`;
