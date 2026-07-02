import type { Block } from "payload";

import { appearanceOptions, sizeOptions, variantOptions } from "./options";

export const Badge: Block = {
  slug: "badge",
  interfaceName: "BadgeBlock",
  fields: [
    {
      name: "label",
      type: "text",
      required: true,
    },
    {
      type: "row",
      fields: [
        {
          name: "appearance",
          type: "select",
          defaultValue: "default",
          options: appearanceOptions("badge"),
        },
        {
          name: "size",
          type: "select",
          defaultValue: "md",
          options: sizeOptions("badge"),
        },
        {
          name: "shape",
          type: "select",
          defaultValue: "pill",
          options: variantOptions("badge", "shape"),
        },
      ],
    },
  ],
};
