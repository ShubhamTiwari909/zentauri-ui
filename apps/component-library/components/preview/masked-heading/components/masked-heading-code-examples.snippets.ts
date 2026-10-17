import type { MaskedHeadingProps } from "@zentauri-ui/zentauri-components/ui/masked-heading";

// The generator describes configuration, not callbacks or arbitrary nodes.
const snippetKeys = [
  "level",
  "appearance",
  "size",
  "align",
  "src",
  "mediaType",
  "poster",
  "reveal",
  "trigger",
  "duration",
  "stagger",
  "delay",
  "parallax",
  "drift",
  "outline",
  "className",
] as const satisfies readonly (keyof MaskedHeadingProps)[];
type MaskedHeadingSnippetProps = Partial<
  Pick<MaskedHeadingProps, (typeof snippetKeys)[number]>
>;

const plainText = /^[\w\s.,!?'’-]*$/;

export function maskedHeadingSnippet(
  text: string,
  props: MaskedHeadingSnippetProps = {},
) {
  const attributes = snippetKeys
    .flatMap((key) => {
      const value = props[key];
      if (value === undefined) return [];
      return typeof value === "string"
        ? [`      ${key}=${JSON.stringify(value)}`]
        : [`      ${key}={${JSON.stringify(value)}}`];
    })
    .join("\n");
  const copy = plainText.test(text) ? text : `{${JSON.stringify(text)}}`;
  return `import { MaskedHeading } from "@zentauri-ui/zentauri-components/ui/masked-heading";

export function Hero() {
  return (
    <MaskedHeading${attributes ? `\n${attributes}\n    ` : ""}>
      ${copy}
    </MaskedHeading>
  );
}`;
}
