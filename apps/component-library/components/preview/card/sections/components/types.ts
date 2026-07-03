import type { CardProps } from "@zentauri-ui/zentauri-components/ui/card";

export type CardAppearance = NonNullable<CardProps["appearance"]>;
export type CardBgAppearance = NonNullable<CardProps["bg"]>;
export type CardSize = NonNullable<CardProps["size"]>;
export type CardRounded = NonNullable<CardProps["rounded"]>;

export type CardDemoProps = {
  appearance: CardAppearance;
  bg?: CardBgAppearance;
  size: CardSize;
  rounded: CardRounded;
};
