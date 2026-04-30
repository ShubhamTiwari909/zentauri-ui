import {
  Blockquote,
  CodeBlock,
  Heading,
  InlineCode,
  List,
  ListItem,
  Text,
} from "@zentauri-ui/zentauri-components/ui/typography";

import type { TypographySectionSlug } from "@/lib/typography-preview-registry";

export function TypographyHeroDemo({
  section,
}: {
  section: TypographySectionSlug;
}) {
  const shell =
    "rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl";

  switch (section) {
    case "heading":
      return (
        <div className={shell}>
          <div className="space-y-3">
            <Heading level={1}>Heading level 1</Heading>
            <Heading level={2}>Heading level 2</Heading>
            <Heading level={3}>Heading level 3</Heading>
          </div>
        </div>
      );
    case "paragraph":
      return (
        <div className={shell}>
          <Text size="lg" tone="default">
            Large relaxed paragraph for intros.
          </Text>
          <Text className="mt-3" tone="muted">
            Muted supporting sentence underneath.
          </Text>
        </div>
      );
    case "lists":
      return (
        <div className={shell}>
          <List>
            <ListItem>Unordered item one</ListItem>
            <ListItem>
              <div>
                <Text>Nested steps</Text>
                <List ordered className="mt-3">
                  <ListItem>Step one</ListItem>
                  <ListItem>Step two</ListItem>
                </List>
              </div>
            </ListItem>
          </List>
        </div>
      );
    case "blockquote":
      return (
        <div className={shell}>
          <Blockquote attribution="Design Systems Weekly">
            <Text as="p">Composable primitives beat monolithic widgets.</Text>
          </Blockquote>
        </div>
      );
    case "inline":
      return (
        <div className={shell}>
          <Text>
            Run <InlineCode>pnpm install</InlineCode> then{" "}
            <Text as="span" bold italic tone="primary">
              ship
            </Text>
            .
          </Text>
        </div>
      );
    case "code-block":
      return (
        <div className={shell}>
          <CodeBlock language="bash">{`pnpm add @zentauri-ui/zentauri-components`}</CodeBlock>
        </div>
      );
    default:
      return null;
  }
}
