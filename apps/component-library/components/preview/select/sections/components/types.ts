import type {
  SelectContentProps,
  SelectTriggerProps,
} from "@zentauri-ui/zentauri-components/ui/select";

export type SelectTriggerDemoProps = {
  triggerVariant: NonNullable<SelectTriggerProps["variant"]>;
  triggerSize: NonNullable<SelectTriggerProps["size"]>;
};

export type SelectContentDemoProps = {
  contentAppearance: NonNullable<SelectContentProps["appearance"]>;
  contentSize: NonNullable<SelectContentProps["size"]>;
  contentSpacing?: NonNullable<SelectContentProps["spacing"]>;
};
