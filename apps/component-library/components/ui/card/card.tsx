"use client";

import { createContext, useContext, useMemo } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

import { cardAnimationPresets } from "./animations";
import type {
  CardDescriptionProps,
  CardProps,
  CardSectionProps,
  CardTitleProps,
} from "./types";
import {
  cardDescriptionVariants,
  cardFooterVariants,
  cardHeaderVariants,
  cardTitleVariants,
  cardVariants,
} from "./variants";

type CardSize = NonNullable<CardProps["size"]>;

const CardSizeContext = createContext<CardSize>("md");

function useCardSize(): CardSize {
  return useContext(CardSizeContext);
}

export function Card(props: CardProps) {
  const {
    className,
    appearance,
    size = "md",
    rounded,
    animation = "none",
    children,
    ref,
    ...rest
  } = props;
  const motionProps = cardAnimationPresets[animation];
  const ctx = useMemo(() => size ?? "md", [size]);

  return (
    <CardSizeContext.Provider value={ctx}>
      <motion.article
        ref={ref}
        data-slot="card"
        className={cn(cardVariants({ appearance, size, rounded }), className)}
        initial={false}
        {...motionProps}
        {...rest}
      >
        {children}
      </motion.article>
    </CardSizeContext.Provider>
  );
}

Card.displayName = "Card";

export function CardHeader({ className, children }: CardSectionProps) {
  const size = useCardSize();
  return (
    <header
      data-slot="card-header"
      className={cn(cardHeaderVariants({ size }), className)}
    >
      {children}
    </header>
  );
}

CardHeader.displayName = "CardHeader";

export function CardBody({ className, children }: CardSectionProps) {
  return (
    <div data-slot="card-body" className={cn("flex flex-1 flex-col gap-2", className)}>
      {children}
    </div>
  );
}

CardBody.displayName = "CardBody";

export function CardFooter({ className, children }: CardSectionProps) {
  const size = useCardSize();
  return (
    <footer
      data-slot="card-footer"
      className={cn(cardFooterVariants({ size }), className)}
    >
      {children}
    </footer>
  );
}

CardFooter.displayName = "CardFooter";

export function CardTitle({
  className,
  children,
  as = "h3",
  ref,
  ...rest
}: CardTitleProps) {
  const size = useCardSize();
  const Tag = as;
  return (
    <Tag
      ref={ref as never}
      data-slot="card-title"
      className={cn(cardTitleVariants({ size }), className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}

CardTitle.displayName = "CardTitle";

export function CardDescription({
  className,
  children,
  as = "p",
  ref,
  ...rest
}: CardDescriptionProps) {
  const size = useCardSize();
  const Tag = as;
  return (
    <Tag
      ref={ref as never}
      data-slot="card-description"
      className={cn(cardDescriptionVariants({ size }), className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}

CardDescription.displayName = "CardDescription";
