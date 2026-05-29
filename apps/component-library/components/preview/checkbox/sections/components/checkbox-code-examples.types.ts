import type { CheckboxProps } from "@zentauri-ui/zentauri-components/ui/checkbox";

export type CheckboxDemoProps = {
  appearance: NonNullable<CheckboxProps["appearance"]>;
  size: NonNullable<CheckboxProps["size"]>;
  indeterminate?: boolean;
  controlled?: boolean;
};
