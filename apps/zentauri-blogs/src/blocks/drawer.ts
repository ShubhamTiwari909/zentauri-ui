import type { Block } from "payload";

import { appearanceOptions, sizeOptions, variantOptions } from "./options";
import { basicRichTextEditor } from "./richText";

export const Drawer: Block = {
  slug: "drawer",
  interfaceName: "DrawerBlock",
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "triggerLabel",
          type: "text",
          required: true,
        },
        {
          name: "triggerAppearance",
          type: "select",
          defaultValue: "default",
          options: appearanceOptions("drawer", "trigger"),
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "side",
          type: "select",
          defaultValue: "right",
          options: variantOptions("drawer", "side", "content"),
        },
        {
          name: "size",
          type: "select",
          defaultValue: "md",
          options: sizeOptions("drawer", "content"),
        },
        {
          name: "contentAppearance",
          type: "select",
          defaultValue: "default",
          options: appearanceOptions("drawer", "content"),
        },
      ],
    },
    {
      name: "title",
      type: "text",
      admin: {
        description: "Optional drawer header title",
      },
    },
    {
      name: "content",
      type: "richText",
      required: true,
      editor: basicRichTextEditor(),
    },
  ],
};
