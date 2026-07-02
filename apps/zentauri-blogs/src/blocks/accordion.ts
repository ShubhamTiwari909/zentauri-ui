import type { Block } from "payload";

import { appearanceOptions, sizeOptions } from "./options";
import { basicRichTextEditor } from "./richText";

export const Accordion: Block = {
  slug: "accordion",
  interfaceName: "AccordionBlock",
  fields: [
    {
      name: "accordions",
      type: "array",
      minRows: 1,
      maxRows: 20,
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "appearance",
              type: "select",
              defaultValue: "default",
              options: appearanceOptions("accordion"),
            },
            {
              name: "size",
              type: "select",
              defaultValue: "md",
              options: sizeOptions("accordion"),
            },
          ],
        },
        {
          name: "items",
          type: "array",
          required: true,
          minRows: 1,
          labels: {
            singular: "Item",
            plural: "Items",
          },
          fields: [
            {
              name: "label",
              type: "text",
              required: true,
              admin: {
                description: "Trigger text",
              },
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
    },
  ],
};
