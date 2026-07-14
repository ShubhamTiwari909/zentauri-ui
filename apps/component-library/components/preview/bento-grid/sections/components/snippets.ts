import { variantLeadComment } from "@/components/common/variant-code-prefix";

import { BENTO_GRID_FILLER_ITEMS } from "./data";
import type { BentoGridDemoProps } from "./types";

export function bentoGridSnippet(opts: BentoGridDemoProps): string {
  const { cols, gap, animation, span, appearance } = opts;
  const lead = variantLeadComment(
    `cols · ${cols}, gap · ${gap}, span · ${span}, appearance · ${appearance}, animation · ${animation}`,
  );

  if (animation !== "none") {
    // Same conditional body text as the live demo's featured tile.
    const featuredBody =
      animation === "morph"
        ? "Hover to expand · click for detail"
        : animation === "bento"
          ? "Hover to expand"
          : `span ${span}`;

    const fillers = BENTO_GRID_FILLER_ITEMS.map(
      (
        item,
      ) => `  <BentoGridAnimated.Item key="${item.id}" id="${item.id}" appearance="${item.appearance}">
    <Tile title="${item.title}" />
  </BentoGridAnimated.Item>`,
    ).join("\n");

    return `import { BentoGridAnimated } from "@zentauri-ui/zentauri-components/ui/bento-grid/animated";

${lead}<BentoGridAnimated cols={${cols}} gap="${gap}" animation="${animation}">
  <BentoGridAnimated.Item
    key="a"
    id="a"
    span="${span}"
    appearance="${appearance}"
    expandable
    detail={<FeaturedDetail />}
  >
    <Tile title="Featured" body="${featuredBody}" />
  </BentoGridAnimated.Item>
${fillers}
</BentoGridAnimated>`;
  }

  const fillers = BENTO_GRID_FILLER_ITEMS.map(
    (
      item,
    ) => `  <BentoGrid.Item key="${item.id}" id="${item.id}" appearance="${item.appearance}">
    <Tile title="${item.title}" />
  </BentoGrid.Item>`,
  ).join("\n");

  return `import { BentoGrid } from "@zentauri-ui/zentauri-components/ui/bento-grid";

${lead}<BentoGrid cols={${cols}} gap="${gap}">
  <BentoGrid.Item id="a" span="${span}" appearance="${appearance}">
    <Tile title="Featured" body="span ${span}" />
  </BentoGrid.Item>
${fillers}
</BentoGrid>`;
}
