import type { Block } from "payload";

import { appearanceOptions, sizeOptions } from "./options";
import { basicRichTextEditor } from "./richText";

export const Alert: Block = {
  slug: "alert",
  interfaceName: "AlertBlock",
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "appearance",
          type: "select",
          defaultValue: "default",
          options: appearanceOptions("alert"),
        },
        {
          name: "size",
          type: "select",
          defaultValue: "md",
          options: sizeOptions("alert"),
        },
      ],
    },
    {
      name: "closable",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "content",
      type: "richText",
      required: true,
      editor: basicRichTextEditor(),
    },
  ],
};
