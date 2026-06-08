import type {
  TabsListAppearance,
  TabsListSize,
  TabsListVariant,
} from "./types";

export { PREVIEW_SECTION_CLASS as TABS_CODE_EXAMPLES_SECTION_CLASS } from "@/components/common/Section";

export const TABS_LIST_VARIANTS = [
  "default",
  "pills",
  "underline",
] as const satisfies readonly TabsListVariant[];

export const TABS_LIST_SIZES = [
  "sm",
  "md",
  "lg",
] as const satisfies readonly TabsListSize[];

export const TABS_LIST_APPEARANCES = [
  "default",
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
  "gradient-blue",
  "gradient-green",
  "gradient-red",
  "gradient-yellow",
  "gradient-purple",
  "gradient-teal",
  "gradient-indigo",
  "gradient-pink",
  "gradient-orange",
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
] as const satisfies readonly TabsListAppearance[];
