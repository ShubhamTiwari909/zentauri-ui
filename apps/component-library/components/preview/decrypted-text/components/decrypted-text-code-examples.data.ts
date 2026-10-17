import type { DecryptedTextProps } from "@zentauri-ui/zentauri-components/ui/decrypted-text";

export const appearances = [
  "default",
  "muted",
  "matrix",
  "cyan",
  "amber",
  "violet",
  "rose",
] as const;
export const triggers = ["view", "mount", "hover"] as const;
export const orders = ["start", "end", "center", "random", "together"] as const;
export const effects = ["scramble", "fade", "flip"] as const;
export const characterSets = {
  default: undefined,
  binary: "01",
  hex: "0123456789ABCDEF",
  symbols: "!@#$%&*+=?<>/\\|[]{}",
} as const;

export type DecryptedTextExampleProps = Omit<DecryptedTextProps, "children">;

export const examples = [
  {
    label: "Decodes from the start once it scrolls into view",
    text: "Access granted to the mainframe",
    props: {},
  },
  {
    label: "Resolves from the centre and flips each letter into place",
    text: "Signal acquired",
    props: { order: "center", effect: "flip", appearance: "cyan" },
  },
  {
    label: "Binary noise that resolves all at once",
    text: "Handshake complete",
    props: {
      order: "together",
      iterations: 14,
      characters: "01",
      appearance: "matrix",
      className: "font-mono",
    },
  },
  {
    label: "Faint glyphs brighten into letters in a random order",
    text: "Quietly revealing the plan",
    props: { order: "random", effect: "fade", appearance: "violet", speed: 40 },
  },
] as const satisfies readonly {
  label: string;
  text: string;
  props: DecryptedTextExampleProps;
}[];
