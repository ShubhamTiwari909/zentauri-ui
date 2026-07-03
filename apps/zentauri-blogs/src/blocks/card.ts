import type { Block } from "payload";

import { appearanceOptions, sizeOptions, variantOptions } from "./options";
import { basicRichTextEditor } from "./richText";

// The design-system facade doesn't expose a slot for
// `zuiCardAppearancesWithBg` (its export name doesn't match any recognized
// group suffix — see DesignSystem.getComponent("card").slots()), so its keys
// are listed directly rather than through `appearanceOptions`.
const CARD_BG_OPTIONS = [
  "default",
  "outline",
  "glass",
  "ghost",
  "elevated",
  "blue",
  "cyan",
  "green",
  "lime",
  "mint",
  "ocean",
  "sapphire",
  "lavender",
  "ruby",
  "red",
  "slate",
  "zinc",
  "stone",
  "royal",
  "electric",
  "forest",
  "sunset",
  "magenta",
  "crimson",
  "aqua",
  "plum",
  "sky",
  "rose",
  "purple",
  "pink",
  "orange",
  "yellow",
  "teal",
  "indigo",
  "emerald",
  "gray",
  "amber",
  "violet",
  "gradient-blue",
  "gradient-green",
  "gradient-red",
  "gradient-yellow",
  "gradient-purple",
  "gradient-teal",
  "gradient-indigo",
  "gradient-pink",
  "gradient-orange",
];

export const Card: Block = {
  slug: "card",
  interfaceName: "CardBlock",
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "appearance",
          type: "select",
          defaultValue: "default",
          options: appearanceOptions("card"),
        },
        {
          name: "bg",
          type: "select",
          // No default: `bg` classes are applied after `appearance` in
          // cardVariants, so any value here (even "default") would always
          // win the background and silently override the chosen appearance
          // (e.g. "glass" or "gradient-blue") unless explicitly opted into.
          options: CARD_BG_OPTIONS,
        },
        {
          name: "size",
          type: "select",
          defaultValue: "md",
          options: sizeOptions("card"),
        },
        {
          name: "rounded",
          type: "select",
          defaultValue: "md",
          options: variantOptions("card", "rounded"),
        },
      ],
    },
    {
      name: "content",
      type: "richText",
      required: true,
      editor: basicRichTextEditor(),
    },
  ],
};
