import type { Block } from "payload";

import { appearanceOptions, sizeOptions } from "./options";

export const TreeView: Block = {
  slug: "tree-view",
  interfaceName: "TreeViewBlock",
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "appearance",
          type: "select",
          defaultValue: "default",
          options: appearanceOptions("tree-view"),
        },
        {
          name: "size",
          type: "select",
          defaultValue: "md",
          options: sizeOptions("tree-view"),
        },
        {
          name: "showGuides",
          type: "checkbox",
          defaultValue: true,
        },
      ],
    },
    {
      name: "nodes",
      type: "array",
      required: true,
      minRows: 1,
      labels: {
        singular: "Node",
        plural: "Nodes",
      },
      // Payload array fields can't self-reference (see row.ts), so 4 levels
      // of nesting are spelled out by hand rather than expressed recursively.
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
        {
          name: "children",
          type: "array",
          labels: {
            singular: "Child node",
            plural: "Child nodes",
          },
          fields: [
            {
              name: "label",
              type: "text",
              required: true,
            },
            {
              name: "children",
              type: "array",
              labels: {
                singular: "Child node",
                plural: "Child nodes",
              },
              fields: [
                {
                  name: "label",
                  type: "text",
                  required: true,
                },
                {
                  name: "children",
                  type: "array",
                  labels: {
                    singular: "Child node",
                    plural: "Child nodes",
                  },
                  fields: [
                    {
                      name: "label",
                      type: "text",
                      required: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
