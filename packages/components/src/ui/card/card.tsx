// card.tsx — default static entry (no framer-motion)
import {
  CardBase,
} from "./card-base";
import type { CardProps } from "./types";

export function Card(props: CardProps) {
  return <CardBase {...props} />;
}

Card.displayName = "Card";
