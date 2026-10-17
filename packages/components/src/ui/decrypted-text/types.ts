import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef } from "react";
import type { decryptedTextVariants } from "./variants";

/**
 * When decoding starts. `hover` also starts on keyboard focus, and inside a link
 * or button it follows that control's hover and focus.
 */
export type DecryptedTextTrigger = "mount" | "view" | "hover";
/**
 * Which letters resolve first. `together` scrambles every letter for
 * `iterations` steps and then resolves them all at once.
 */
export type DecryptedTextOrder =
  | "start"
  | "end"
  | "center"
  | "random"
  | "together";
/** How a letter lands: swap in place, brighten from faint, or roll in vertically. */
export type DecryptedTextEffect = "scramble" | "fade" | "flip";
export type DecryptedTextElement =
  | "span"
  | "p"
  | "div"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6";

export type DecryptedTextVariantProps = VariantProps<
  typeof decryptedTextVariants
>;
export type DecryptedTextAppearance = NonNullable<
  DecryptedTextVariantProps["appearance"]
>;

export interface DecryptedTextProps
  extends
    Omit<ComponentPropsWithRef<"span">, "children">,
    DecryptedTextVariantProps {
  /** The text to decode. Assistive tech always reads it as plain text. */
  children: string;
  /** Element to render. @default "span" */
  as?: DecryptedTextElement;
  /** When decoding starts. @default "view" */
  trigger?: DecryptedTextTrigger;
  /** Which letters resolve first. @default "start" */
  order?: DecryptedTextOrder;
  /** Time between steps in milliseconds. Clamped to 16–1000. @default 50 */
  speed?: number;
  /** Scramble steps before every letter resolves with `order="together"`. Clamped to 1–100. @default 10 */
  iterations?: number;
  /** Delay before decoding starts, in milliseconds. Clamped to 0–10000. @default 0 */
  delay?: number;
  /** Pool of glyphs used while scrambling. */
  characters?: string;
  /** Scramble with only the letters that appear in the text. @default false */
  useOriginalChars?: boolean;
  /** How each letter lands. @default "scramble" */
  effect?: DecryptedTextEffect;
  /** Called each time decoding finishes, or immediately when motion is reduced. */
  onComplete?: () => void;
}
