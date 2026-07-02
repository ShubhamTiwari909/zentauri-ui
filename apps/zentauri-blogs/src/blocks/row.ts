import type { Block } from "payload";

import { GAP_SIZES, pxOptions } from "./options";
import { ROW_ITEM_BLOCK_SLUGS } from "./richText";

/**
 * Row children are a plain blocks field so each flex child is a discrete
 * block. Rows are one level deep: a row offers every content block except
 * itself (self-reference through a lexical editor also crashes
 * `generate:types` in this Payload version).
 */
export const Row: Block = {
  slug: "row",
  interfaceName: "RowBlock",
  fields: [
    {
      name: "items",
      type: "blocks",
      required: true,
      minRows: 1,
      blockReferences: ROW_ITEM_BLOCK_SLUGS,
      blocks: [],
      admin: {
        description: "Each item is a flex child of the row",
      },
    },
    {
      name: "gap",
      type: "select",
      required: true,
      defaultValue: "16",
      options: pxOptions(GAP_SIZES),
    },
    {
      type: "row",
      fields: [
        {
          name: "horizontalAlign",
          type: "select",
          defaultValue: "flex-start",
          options: [
            "flex-start",
            "center",
            "flex-end",
            "space-between",
            "space-around",
            "space-evenly",
          ],
          admin: {
            description: "justify-content",
          },
        },
        {
          name: "verticalAlign",
          type: "select",
          defaultValue: "stretch",
          options: ["stretch", "flex-start", "center", "flex-end", "baseline"],
          admin: {
            description: "align-items",
          },
        },
      ],
    },
    {
      name: "stackOnMobile",
      type: "checkbox",
      defaultValue: true,
      admin: {
        description: "Render as a column on mobile viewports",
      },
    },
  ],
};
