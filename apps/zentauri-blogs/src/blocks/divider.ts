import type { Block } from "payload";

import { appearanceOptions, sizeOptions, variantOptions } from "./options";

export const Divider: Block = {
  slug: "divider",
  interfaceName: "DividerBlock",
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "appearance",
          type: "select",
          defaultValue: "default",
          options: appearanceOptions("divider"),
        },
        {
          name: "size",
          type: "select",
          defaultValue: "md",
          options: sizeOptions("divider"),
        },
        {
          name: "orientation",
          type: "select",
          defaultValue: "horizontal",
          options: variantOptions("divider", "orientation"),
        },
      ],
    },
    {
      name: "label",
      type: "text",
      admin: {
        description: "Optional label between divider lines",
      },
    },
  ],
};
