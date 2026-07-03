import type { Block } from "payload";

import { appearanceOptions, sizeOptions, variantOptions } from "./options";
import { basicRichTextEditor } from "./richText";

export const Card: Block = {
  slug: "card",
  interfaceName: "CardBlock",
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "appearance",
          type: "select",
          defaultValue: "default",
          options: appearanceOptions("card"),
        },
        {
          name: "bg",
          type: "select",
          defaultValue: "default",
          options: appearanceOptions("card"),
        },
        {
          name: "size",
          type: "select",
          defaultValue: "md",
          options: sizeOptions("card"),
        },
        {
          name: "rounded",
          type: "select",
          defaultValue: "md",
          options: variantOptions("card", "rounded"),
        },
      ],
    },
    {
      name: "content",
      type: "richText",
      required: true,
      editor: basicRichTextEditor(),
    },
  ],
};
