import type { Block } from "payload";

import { appearanceOptions, sizeOptions } from "./options";

export const Kbd: Block = {
  slug: "kbd",
  interfaceName: "KbdBlock",
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "appearance",
          type: "select",
          defaultValue: "outline",
          options: appearanceOptions("kbd", "key"),
        },
        {
          name: "size",
          type: "select",
          defaultValue: "md",
          options: sizeOptions("kbd", "key"),
        },
        {
          name: "separator",
          type: "text",
          admin: {
            description: 'Rendered between keycaps, e.g. "+"',
          },
        },
      ],
    },
    {
      name: "keys",
      type: "array",
      required: true,
      minRows: 1,
      labels: {
        singular: "Key",
        plural: "Keys",
      },
      fields: [
        {
          name: "key",
          type: "text",
          required: true,
          admin: {
            description: 'e.g. "⌘" or "K"',
          },
        },
      ],
    },
  ],
};
