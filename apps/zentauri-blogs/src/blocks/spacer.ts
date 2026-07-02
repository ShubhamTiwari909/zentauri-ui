import type { Block } from "payload";

import { pxOptions, SPACER_SIZES } from "./options";

export const Spacer: Block = {
  slug: "spacer",
  interfaceName: "SpacerBlock",
  fields: [
    {
      name: "height",
      type: "select",
      required: true,
      defaultValue: "16",
      options: pxOptions(SPACER_SIZES),
    },
  ],
};
