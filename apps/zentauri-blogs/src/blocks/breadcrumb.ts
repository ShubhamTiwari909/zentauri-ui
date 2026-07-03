import type { Block } from "payload";

import { appearanceOptions } from "./options";

export const Breadcrumb: Block = {
  slug: "breadcrumb",
  interfaceName: "BreadcrumbBlock",
  fields: [
    {
      name: "appearance",
      type: "select",
      defaultValue: "default",
      options: appearanceOptions("breadcrumb"),
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
              name: "label",
              type: "text",
              required: true,
            },
            {
              name: "href",
              type: "text",
              admin: {
                description:
                  "Leave empty to render as the current (non-linked) page",
              },
            },
          ],
        },
      ],
    },
  ],
};
