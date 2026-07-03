import type { Block } from "payload";

import { appearanceOptions, sizeOptions } from "./options";

export const Table: Block = {
  slug: "table",
  interfaceName: "TableBlock",
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "appearance",
          type: "select",
          defaultValue: "default",
          options: appearanceOptions("table"),
        },
        {
          name: "size",
          type: "select",
          defaultValue: "md",
          options: sizeOptions("table"),
        },
        {
          name: "textAlign",
          type: "select",
          defaultValue: "left",
          options: ["left", "center", "right"],
        },
        {
          name: "stickyHeader",
          type: "checkbox",
          defaultValue: false,
        },
      ],
    },
    {
      name: "columns",
      type: "array",
      required: true,
      minRows: 1,
      labels: {
        singular: "Column",
        plural: "Columns",
      },
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "rows",
      type: "array",
      required: true,
      minRows: 1,
      labels: {
        singular: "Row",
        plural: "Rows",
      },
      fields: [
        {
          name: "cells",
          type: "array",
          required: true,
          minRows: 1,
          labels: {
            singular: "Cell",
            plural: "Cells",
          },
          fields: [
            {
              name: "value",
              type: "text",
              required: true,
            },
          ],
        },
      ],
    },
  ],
};
