import type { Block } from "payload";

import { appearanceOptions, variantOptions } from "./options";
import { basicRichTextEditor } from "./richText";

export const Tabs: Block = {
  slug: "tabs",
  interfaceName: "TabsBlock",
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "appearance",
          type: "select",
          defaultValue: "default",
          options: appearanceOptions("tabs", "trigger"),
        },
        {
          name: "variant",
          type: "select",
          defaultValue: "default",
          options: ["default", "underline", "pills"],
        },
        {
          name: "size",
          type: "select",
          defaultValue: "md",
          options: ["sm", "md", "lg"],
        },
        {
          name: "orientation",
          type: "select",
          defaultValue: "horizontal",
          options: variantOptions("tabs", "orientation"),
        },
      ],
    },
    {
      name: "tabs",
      type: "array",
      required: true,
      minRows: 1,
      labels: {
        singular: "Tab",
        plural: "Tabs",
      },
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
        {
          name: "content",
          type: "richText",
          required: true,
          editor: basicRichTextEditor(),
        },
      ],
    },
  ],
};
