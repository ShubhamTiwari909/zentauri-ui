import type { RadioGroupProps } from "@zentauri-ui/zentauri-components/ui/radio-group";

export type RadioGroupDemoProps = {
  appearance: NonNullable<RadioGroupProps["appearance"]>;
  size: NonNullable<RadioGroupProps["size"]>;
  orientation?: NonNullable<RadioGroupProps["orientation"]>;
  controlled?: boolean;
};
