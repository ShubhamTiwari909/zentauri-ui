import { variantLeadComment } from "@/components/common/variant-code-prefix";

import type { BentoGridDemoProps } from "./types";

// Mirrors FILLER_ITEMS in demo.tsx so the snippet matches the live output.
const FILLER_ITEMS = [
  { id: "b", title: "Sessions", appearance: "default" },
  { id: "c", title: "Conversion", appearance: "glass" },
  { id: "d", title: "Churn", appearance: "default" },
  { id: "e", title: "Signups", appearance: "glass" },
  { id: "f", title: "NPS", appearance: "default" },
] as const;

export function bentoGridSnippet(opts: BentoGridDemoProps): string {
  const { cols, gap, animation, span, appearance } = opts;
  const lead = variantLeadComment(
    `cols · ${cols}, gap · ${gap}, span · ${span}, appearance · ${appearance}, animation · ${animation}`,
  );

  if (animation !== "none") {
    const fillers = FILLER_ITEMS.map(
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
    <Tile title="Featured" />
  </BentoGridAnimated.Item>
${fillers}
</BentoGridAnimated>`;
  }

  const fillers = FILLER_ITEMS.map(
    (
      item,
    ) => `  <BentoGrid.Item key="${item.id}" id="${item.id}" appearance="${item.appearance}">
    <Tile title="${item.title}" />
  </BentoGrid.Item>`,
  ).join("\n");

  return `import { BentoGrid } from "@zentauri-ui/zentauri-components/ui/bento-grid";

${lead}<BentoGrid cols={${cols}} gap="${gap}">
  <BentoGrid.Item id="a" span="${span}" appearance="${appearance}">
    <Tile title="Featured" />
  </BentoGrid.Item>
${fillers}
</BentoGrid>`;
}
