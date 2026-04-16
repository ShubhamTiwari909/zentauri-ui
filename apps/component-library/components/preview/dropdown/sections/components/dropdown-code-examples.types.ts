import {
  DROPDOWN_CONTENT_PLACEMENTS,
  DROPDOWN_CONTENT_SPACINGS,
  DROPDOWN_TRIGGER_SIZES,
  DROPDOWN_TRIGGER_VARIANTS,
} from "./dropdown-code-examples.data";

export type DropdownTriggerVariant = (typeof DROPDOWN_TRIGGER_VARIANTS)[number];
export type DropdownTriggerSize = (typeof DROPDOWN_TRIGGER_SIZES)[number];
export type DropdownContentPlacement = (typeof DROPDOWN_CONTENT_PLACEMENTS)[number];
export type DropdownContentSpacing = (typeof DROPDOWN_CONTENT_SPACINGS)[number];
