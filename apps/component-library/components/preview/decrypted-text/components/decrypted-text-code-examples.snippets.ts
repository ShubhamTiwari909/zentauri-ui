import type { DecryptedTextProps } from "@zentauri-ui/zentauri-components/ui/decrypted-text";

// The generator describes configuration, not callbacks or arbitrary nodes.
const snippetKeys = [
  "as",
  "appearance",
  "trigger",
  "order",
  "effect",
  "speed",
  "iterations",
  "delay",
  "characters",
  "useOriginalChars",
  "className",
] as const satisfies readonly (keyof DecryptedTextProps)[];
type DecryptedTextSnippetProps = Partial<
  Pick<DecryptedTextProps, (typeof snippetKeys)[number]>
>;

const plainText = /^[\w\s.,!?'’-]*$/;

export function decryptedTextSnippet(
  text: string,
  props: DecryptedTextSnippetProps = {},
) {
  const attributes = snippetKeys
    .flatMap((key) => {
      const value = props[key];
      if (value === undefined) return [];
      // JSX attribute strings are literal, so only a double quote needs an expression.
      if (typeof value === "string" && !value.includes('"'))
        return [`      ${key}="${value}"`];
      return [`      ${key}={${JSON.stringify(value)}}`];
    })
    .join("\n");
  const copy = plainText.test(text) ? text : `{${JSON.stringify(text)}}`;
  return `import { DecryptedText } from "@zentauri-ui/zentauri-components/ui/decrypted-text";

export function Headline() {
  return (
    <DecryptedText${attributes ? `\n${attributes}\n    ` : ""}>
      ${copy}
    </DecryptedText>
  );
}`;
}
