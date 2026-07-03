import type { Block } from "payload";

// Not part of the shared design-system facade (see options.ts) — its
// component slug registry doesn't include secret-reveal — so the appearance
// and size keys are listed directly from
// `@zentauri-ui/zentauri-components/design-system/secret-reveal`.
const SECRET_REVEAL_APPEARANCES = [
  "default",
  "subtle",
  "muted",
  "primary",
  "blue",
  "cyan",
  "green",
  "lime",
  "emerald",
  "indigo",
  "purple",
  "pink",
  "rose",
  "sky",
  "teal",
  "yellow",
  "orange",
  "red",
  "slate",
  "gray",
  "zinc",
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

export const SecretReveal: Block = {
  slug: "secret-reveal",
  interfaceName: "SecretRevealBlock",
  fields: [
    {
      name: "value",
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
          options: SECRET_REVEAL_APPEARANCES,
        },
        {
          name: "size",
          type: "select",
          defaultValue: "md",
          options: ["sm", "md", "lg"],
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "label",
          type: "text",
        },
        {
          name: "labelPosition",
          type: "select",
          defaultValue: "top",
          options: ["top", "side"],
        },
        {
          name: "muteChar",
          type: "text",
          maxLength: 1,
          admin: {
            description: 'Mask character, e.g. "•"',
          },
        },
      ],
    },
    {
      name: "initiallyRevealed",
      type: "checkbox",
      defaultValue: false,
    },
  ],
};
