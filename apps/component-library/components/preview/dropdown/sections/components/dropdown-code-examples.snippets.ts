import { variantLeadComment } from "@/components/common/variant-code-prefix";

import { DROPDOWN_MENU_SURFACE_CLASS } from "./dropdown-code-examples.data";
import type {
  DropdownContentPlacement,
  DropdownContentSpacing,
  DropdownTriggerSize,
  DropdownTriggerVariant,
} from "./dropdown-code-examples.types";

export function dropdownTriggerSnippet(
  variant: DropdownTriggerVariant,
  size: DropdownTriggerSize,
): string {
  const variantAttr = variant === "default" ? "" : ` variant="${variant}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  return `${variantLeadComment(
    `DropdownTrigger · variant · ${variant}, size · ${size}`,
  )}<Dropdown>
  <DropdownTrigger${variantAttr}${sizeAttr}>
    Menu
  </DropdownTrigger>
  <DropdownContent className="${DROPDOWN_MENU_SURFACE_CLASS}">
    <DropdownItem value="one">One</DropdownItem>
    <DropdownItem value="two">Two</DropdownItem>
  </DropdownContent>
</Dropdown>`;
}

export function dropdownPlacementSnippet(
  placement: DropdownContentPlacement,
): string {
  const placementAttr =
    placement === "bottom" ? "" : ` placement="${placement}"`;
  return `${variantLeadComment(`DropdownContent · placement · ${placement}`)}<Dropdown>
  <DropdownTrigger variant="outline" size="sm">
    Menu
  </DropdownTrigger>
  <DropdownContent${placementAttr} className="${DROPDOWN_MENU_SURFACE_CLASS}">
    <DropdownItem value="a">Alpha</DropdownItem>
    <DropdownItem value="b">Beta</DropdownItem>
  </DropdownContent>
</Dropdown>`;
}

export function dropdownSpacingSnippet(
  spacing: DropdownContentSpacing,
): string {
  const spacingAttr = spacing === "default" ? "" : ` spacing="${spacing}"`;
  return `${variantLeadComment(`DropdownContent · spacing · ${spacing}`)}<Dropdown>
  <DropdownTrigger variant="outline" size="sm">
    Menu
  </DropdownTrigger>
  <DropdownContent${spacingAttr} className="${DROPDOWN_MENU_SURFACE_CLASS}">
    <DropdownItem value="a">Alpha</DropdownItem>
    <DropdownItem value="b">Beta</DropdownItem>
  </DropdownContent>
</Dropdown>`;
}

export function dropdownContentDividerSnippet(): string {
  return `${variantLeadComment(`DropdownContent · divider`)}<Dropdown>
  <DropdownTrigger variant="outline" size="sm">
    Menu
  </DropdownTrigger>
  <DropdownContent divider className="${DROPDOWN_MENU_SURFACE_CLASS}">
    <DropdownItem value="a">Alpha</DropdownItem>
    <DropdownItem value="b">Beta</DropdownItem>
  </DropdownContent>
</Dropdown>`;
}
