import type { ScrollExpandProps } from "@zentauri-ui/zentauri-components/ui/scroll-expand";

// The generator describes configuration, not callbacks or arbitrary nodes.
const snippetKeys = [
  "src",
  "mediaType",
  "poster",
  "alt",
  "title",
  "level",
  "hint",
  "appearance",
  "scroller",
  "startWidth",
  "startHeight",
  "zoom",
  "distance",
  "hold",
  "smoothing",
  "className",
] as const satisfies readonly (keyof ScrollExpandProps)[];
type ScrollExpandSnippetProps = Partial<
  Pick<ScrollExpandProps, (typeof snippetKeys)[number]>
>;

const escapeText = (value: string) =>
  /^[\w\s.,!?'’-]*$/.test(value) ? value : `{${JSON.stringify(value)}}`;

export function scrollExpandSnippet(
  props: ScrollExpandSnippetProps,
  overlay?: { heading: string; body: string },
) {
  const attributes = snippetKeys
    .flatMap((key) => {
      const value = props[key];
      if (value === undefined || value === null) return [];
      if (typeof value === "string" && !value.includes('"'))
        return [`      ${key}="${value}"`];
      if (typeof value === "string" || typeof value === "number")
        return [`      ${key}={${JSON.stringify(value)}}`];
      return [];
    })
    .join("\n");
  const body = overlay
    ? `\n      <h3>${escapeText(overlay.heading)}</h3>\n      <p>${escapeText(overlay.body)}</p>\n    `
    : "";
  return `import { ScrollExpand } from "@zentauri-ui/zentauri-components/ui/scroll-expand";

export function Showcase() {
  return (
    <ScrollExpand${attributes ? `\n${attributes}\n    ` : ""}${body ? `>${body}</ScrollExpand>` : " />"}
  );
}`;
}
