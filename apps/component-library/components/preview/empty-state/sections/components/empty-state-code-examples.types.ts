import type { EmptyStateProps } from "@zentauri-ui/zentauri-components/ui";

export type EmptyStateAppearance = NonNullable<EmptyStateProps["appearance"]>;
export type EmptyStateSize = NonNullable<EmptyStateProps["size"]>;
export type EmptyStateAlign = NonNullable<EmptyStateProps["align"]>;

export type EmptyStateDemoProps = {
  appearance: EmptyStateAppearance;
  size: EmptyStateSize;
  align: EmptyStateAlign;
};
