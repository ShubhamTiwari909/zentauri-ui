import type { VariantProps } from "class-variance-authority";
import type {
  ComponentPropsWithRef,
  ElementType,
  HTMLAttributes,
  ReactNode,
  Ref,
} from "react";

import type { cardVariants } from "./variants";

export type CardVariantProps = VariantProps<typeof cardVariants>;

export interface CardBaseProps extends ComponentPropsWithRef<"article"> {
  appearance?: CardVariantProps["appearance"];
  size?: CardVariantProps["size"];
  rounded?: CardVariantProps["rounded"];
  as?: ElementType;
}

export type CardProps = Omit<CardBaseProps, "as">;

export type CardSectionProps = {
  className?: string;
  children?: ReactNode;
};

export type CardTitleProps = {
  as?: "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
  children?: ReactNode;
  ref?: Ref<HTMLHeadingElement>;
} & Omit<HTMLAttributes<HTMLHeadingElement>, "className" | "children">;

export type CardDescriptionProps = {
  as?: "p" | "span" | "div";
  className?: string;
  children?: ReactNode;
  ref?: Ref<HTMLElement>;
} & Omit<HTMLAttributes<HTMLElement>, "className" | "children">;

export type CardSize = NonNullable<CardProps["size"]>;