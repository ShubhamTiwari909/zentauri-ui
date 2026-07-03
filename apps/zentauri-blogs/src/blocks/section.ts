import type {
  Block,
  CheckboxField,
  GroupField,
  Option,
  SelectField,
} from "payload";

import { blogRichTextEditor } from "./richText";

const backgroundColorOptions = [
  { label: "White", value: "white" },
  { label: "Dark slate", value: "dark-slate" },
  { label: "Blue", value: "blue" },
  { label: "Emerald", value: "emerald" },
  { label: "Teal", value: "teal" },
  { label: "Indigo", value: "indigo" },
  { label: "Fuchsia", value: "fuchsia" },
];

const SECTION_SPACING_OPTIONS: Option[] = [
  { label: "0", value: "0" },
  { label: "20", value: "20" },
  { label: "40", value: "40" },
  { label: "60", value: "60" },
  { label: "80", value: "80" },
  { label: "120", value: "120" },
  { label: "140", value: "140" },
  { label: "160", value: "160" },
  { label: "200", value: "200" },
];

const sectionSpacing: GroupField = {
  type: "group",
  name: "verticalSpacing",
  label: "Section Vertical Spacing",
  fields: [
    {
      type: "group",
      name: "top",
      label: "Top Spacing",
      fields: [
        {
          type: "row",
          fields: [
            {
              type: "select",
              name: "desktop",
              dbName: "vs_t_dt",
              label: "Desktop",
              options: SECTION_SPACING_OPTIONS,
              defaultValue: "0",
              admin: { isClearable: false },
            },
            {
              type: "select",
              name: "tablet",
              dbName: "vs_t_tb",
              label: "Tablet",
              options: SECTION_SPACING_OPTIONS,
              defaultValue: "0",
              admin: { isClearable: false },
            },
            {
              type: "select",
              name: "mobile",
              dbName: "vs_t_mb",
              label: "Mobile",
              options: SECTION_SPACING_OPTIONS,
              defaultValue: "0",
              admin: { isClearable: false },
            },
          ],
        },
      ],
    },
    {
      type: "group",
      name: "bottom",
      label: "Bottom Spacing",
      fields: [
        {
          type: "row",
          fields: [
            {
              type: "select",
              name: "desktop",
              dbName: "vs_b_dt",
              label: "Desktop",
              options: SECTION_SPACING_OPTIONS,
              defaultValue: "0",
              admin: { isClearable: false },
            },
            {
              type: "select",
              name: "tablet",
              dbName: "vs_b_tb",
              label: "Tablet",
              options: SECTION_SPACING_OPTIONS,
              defaultValue: "0",
              admin: { isClearable: false },
            },
            {
              type: "select",
              name: "mobile",
              dbName: "vs_b_mb",
              label: "Mobile",
              options: SECTION_SPACING_OPTIONS,
              defaultValue: "0",
              admin: { isClearable: false },
            },
          ],
        },
      ],
    },
  ],
};

const bgColor: SelectField = {
  name: "bgColor",
  type: "select",
  options: backgroundColorOptions,
  required: true,
};

const fullHeight: CheckboxField = {
  name: "fullHeight",
  type: "checkbox",
  required: true,
};

export const Section: Block = {
  slug: "section",
  interfaceName: "SectionBlock",
  fields: [
    {
      name: "sectionId",
      type: "text",
      admin: {
        description:
          "Optional anchor id for in-page links (lowercase letters, numbers, and hyphens only)",
      },
      validate: (value: string | null | undefined) => {
        if (!value) return true;
        return (
          /^[a-z0-9-]+$/.test(value) ||
          "Only lowercase letters, numbers, and hyphens are allowed"
        );
      },
    },
    bgColor,
    sectionSpacing,
    fullHeight,
    {
      name: "content",
      type: "richText",
      required: true,
      editor: blogRichTextEditor(),
    },
  ],
};
