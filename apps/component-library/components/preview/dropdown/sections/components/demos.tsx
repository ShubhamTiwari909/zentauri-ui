import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "@zentauri-ui/zentauri-components/ui/dropdown";

import type {
  DropdownContentPlacement,
  DropdownContentSpacing,
  DropdownTriggerSize,
  DropdownTriggerVariant,
} from "./types";

export function DropdownTriggerDemo({
  variant,
  size,
}: {
  variant: DropdownTriggerVariant;
  size: DropdownTriggerSize;
}) {
  return (
    <Dropdown>
      <DropdownTrigger variant={variant} size={size}>
        Menu {variant} {size}
      </DropdownTrigger>
      <DropdownContent>
        <DropdownItem value="one" variant={variant}>
          One
        </DropdownItem>
        <DropdownItem value="two" variant={variant}>
          Two
        </DropdownItem>
      </DropdownContent>
    </Dropdown>
  );
}

const placementLayoutClass: Record<DropdownContentPlacement, string> = {
  top: "justify-start",
  bottom: "justify-start",
  left: "justify-end",
  right: "justify-start",
};

export function DropdownPlacementDemo({
  placement,
}: {
  placement: DropdownContentPlacement;
}) {
  return (
    <div
      className={`flex ${placementLayoutClass[placement]} min-h-40 w-full max-w-xl items-center`}
    >
      <Dropdown>
        <DropdownTrigger variant="outline" size="sm">
          Menu {placement}
        </DropdownTrigger>
        <DropdownContent placement={placement}>
          <DropdownItem value="a">Alpha</DropdownItem>
          <DropdownItem value="b">Beta</DropdownItem>
        </DropdownContent>
      </Dropdown>
    </div>
  );
}

export function DropdownSpacingDemo({
  spacing,
}: {
  spacing: DropdownContentSpacing;
}) {
  return (
    <div className="flex min-h-40 w-full max-w-xl items-center">
      <Dropdown>
        <DropdownTrigger variant="outline" size="sm">
          Menu {spacing}
        </DropdownTrigger>
        <DropdownContent spacing={spacing}>
          <DropdownItem value="a">Alpha</DropdownItem>
          <DropdownItem value="b">Beta</DropdownItem>
        </DropdownContent>
      </Dropdown>
    </div>
  );
}

export function DropdownContentDividerDemo() {
  return (
    <Dropdown>
      <DropdownTrigger variant="outline" size="sm">
        Menu divider
      </DropdownTrigger>
      <DropdownContent divider>
        <DropdownItem value="a">Alpha</DropdownItem>
        <DropdownItem value="b">Beta</DropdownItem>
        <DropdownItem value="c">Charlie</DropdownItem>
        <DropdownItem value="d">Delta</DropdownItem>
      </DropdownContent>
    </Dropdown>
  );
}
