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
      validate: (value: unknown, { siblingData }) => {
        const rows = value as { cells?: unknown[] }[] | undefined;
        if (!rows) return true;
        const colCount =
          (siblingData as { columns?: unknown[] })?.columns?.length ?? 0;
        for (let i = 0; i < rows.length; i++) {
          if ((rows[i]?.cells?.length ?? 0) !== colCount) {
            return `Row ${i + 1} has ${rows[i]?.cells?.length ?? 0} cells but there are ${colCount} columns. Each row must have exactly ${colCount} cells.`;
          }
        }
        return true;
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
