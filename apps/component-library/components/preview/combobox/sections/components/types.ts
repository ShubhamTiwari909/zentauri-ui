import type {
  ComboboxContentProps,
  ComboboxTriggerProps,
} from "@zentauri-ui/zentauri-components/ui/combobox";

export type ComboboxTriggerDemoProps = {
  triggerVariant: NonNullable<ComboboxTriggerProps["variant"]>;
  triggerSize: NonNullable<ComboboxTriggerProps["size"]>;
};

export type ComboboxContentDemoProps = {
  contentAppearance: NonNullable<ComboboxContentProps["appearance"]>;
  contentSize: NonNullable<ComboboxContentProps["size"]>;
};
