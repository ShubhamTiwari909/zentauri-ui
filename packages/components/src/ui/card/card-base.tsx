"use client";

import {
  createContext,
  useContext,
  useMemo,
  type ElementType,
} from "react";

import { cn } from "../../lib/utils";

import type {
  CardBaseProps,
  CardDescriptionProps,
  CardSectionProps,
  CardSize,
  CardTitleProps,
} from "./types";
import {
  cardDescriptionVariants,
  cardFooterVariants,
  cardHeaderVariants,
  cardTitleVariants,
  cardVariants,
} from "./variants";

const CardSizeContext = createContext<CardSize>("md");

function useCardSize(): CardSize {
  return useContext(CardSizeContext);
}

export function CardBase({
  className,
  appearance,
  size = "md",
  rounded,
  children,
  ref,
  as: Wrapper = "article",
  ...rest
}: CardBaseProps) {
  const ctx = useMemo(() => size ?? "md", [size]);

  return (
    <CardSizeContext.Provider value={ctx}>
      <Wrapper
        ref={ref}
        data-slot="card"
        className={cn(cardVariants({ appearance, size, rounded }), className)}
        {...rest}
      >
        {children}
      </Wrapper>
    </CardSizeContext.Provider>
  );
}

CardBase.displayName = "Card";

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
    <div
      data-slot="card-body"
      className={cn("flex flex-1 flex-col gap-2", className)}
    >
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
  const Tag = as as ElementType;
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
  const Tag = as as ElementType;
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
