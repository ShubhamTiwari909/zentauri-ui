import type { CardProps } from "@zentauri-ui/zentauri-components/ui";

export type CardAppearance = NonNullable<CardProps["appearance"]>;
export type CardSize = NonNullable<CardProps["size"]>;
export type CardRounded = NonNullable<CardProps["rounded"]>;

export type CardDemoProps = {
  appearance: CardAppearance;
  size: CardSize;
  rounded: CardRounded;
};
