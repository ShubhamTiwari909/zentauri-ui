import type { Block } from "payload";

import { appearanceOptions, sizeOptions } from "./options";

export const Button: Block = {
  slug: "button",
  interfaceName: "ButtonBlock",
  fields: [
    {
      name: "label",
      type: "text",
      required: true,
    },
    {
      type: "row",
      fields: [
        {
          name: "appearance",
          type: "select",
          defaultValue: "default",
          options: appearanceOptions("buttons"),
        },
        {
          name: "size",
          type: "select",
          defaultValue: "md",
          options: sizeOptions("buttons"),
        },
      ],
    },
    {
      name: "as",
      type: "select",
      required: true,
      defaultValue: "button",
      options: ["button", "link"],
    },
    {
      type: "row",
      admin: {
        condition: (_, siblingData) => {
          return siblingData?.as === "link";
        },
      },
      fields: [
        {
          name: "href",
          type: "text",
          validate: (
            value: string | null | undefined,
            { siblingData }: { siblingData?: { as?: string } },
          ) => {
            if (siblingData?.as === "link" && !value) {
              return "href is required when rendering as a link";
            }
            return true;
          },
        },
        {
          name: "target",
          type: "select",
          defaultValue: "_self",
          options: ["_self", "_blank"],
        },
      ],
    },
  ],
};
