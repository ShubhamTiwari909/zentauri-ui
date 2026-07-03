import type { Block } from "payload";

import { appearanceOptions, sizeOptions } from "./options";

export const Timeline: Block = {
  slug: "timeline",
  interfaceName: "TimelineBlock",
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "appearance",
          type: "select",
          defaultValue: "default",
          options: appearanceOptions("timeline", "indicator"),
        },
        {
          name: "size",
          type: "select",
          defaultValue: "md",
          options: sizeOptions("timeline", "indicator"),
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
          type: "row",
          fields: [
            {
              name: "title",
              type: "text",
              required: true,
            },
            {
              name: "appearance",
              type: "select",
              options: appearanceOptions("timeline", "indicator"),
              admin: {
                description: "Overrides the timeline's default indicator color",
              },
            },
          ],
        },
        {
          name: "description",
          type: "textarea",
        },
      ],
    },
  ],
};
