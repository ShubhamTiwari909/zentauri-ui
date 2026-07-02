import { RichText } from "@payloadcms/richtext-lexical/react";
import type {
  JSXConverters,
  JSXConvertersFunction,
} from "@payloadcms/richtext-lexical/react";
import type { ReactNode } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@zentauri-ui/zentauri-components/ui/accordion";
import {
  Alert,
  AlertDescription,
} from "@zentauri-ui/zentauri-components/ui/alert";
import { Badge } from "@zentauri-ui/zentauri-components/ui/badge";
import { Button } from "@zentauri-ui/zentauri-components/ui/buttons";
import { Card, CardBody } from "@zentauri-ui/zentauri-components/ui/card";
import { Divider } from "@zentauri-ui/zentauri-components/ui/divider";
import {
  Blockquote,
  Heading,
  InlineCode,
  List,
  ListItem,
  Text as Typography,
} from "@zentauri-ui/zentauri-components/ui/typography";
import type {
  HeadingLevel,
  TypographyTone,
} from "@zentauri-ui/zentauri-components/ui/typography";

import type {
  AccordionBlock,
  AlertBlock,
  BadgeBlock,
  ButtonBlock,
  CardBlock,
  CodeBlock,
  DividerBlock,
  RowBlock,
  SpacerBlock,
  TextBlock,
} from "@/payload-types";

import { Code } from "./CodeBlock";
import { DismissibleAlert } from "./DismissibleAlert";
import { cn } from "@/utils/utils";

// Any lexical rich text state (Section content, Card/Alert content, etc.).
type RichTextContent = TextBlock["content"];

type AnyBlock =
  | TextBlock
  | SpacerBlock
  | CodeBlock
  | AccordionBlock
  | ButtonBlock
  | AlertBlock
  | BadgeBlock
  | CardBlock
  | DividerBlock
  | RowBlock;

// ---------------------------------------------------------------------------
// Typography
// ---------------------------------------------------------------------------

// Container styles for elements left to the default converters (links,
// horizontal rules) — headings, paragraphs, lists, quotes, and inline code are
// rendered through the typography components instead of raw HTML + classes.
const proseClassName = [
  "[&_a]:text-blue-600 dark:[&_a]:text-blue-400 [&_a]:underline [&_a]:underline-offset-2",
  "[&_hr]:my-8 [&_hr]:border-gray-200 dark:[&_hr]:border-gray-700",
].join(" ");

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

const HEADING_LEVELS: Record<HeadingTag, HeadingLevel> = {
  h1: 1,
  h2: 2,
  h3: 3,
  h4: 4,
  h5: 5,
  h6: 6,
};

// Lexical text-node format bitmask (see NodeFormat in
// @payloadcms/richtext-lexical) — reproduced here so inline code can render
// through the typography InlineCode component instead of a plain `<code>`.
const TEXT_FORMAT = {
  bold: 1,
  italic: 1 << 1,
  strikethrough: 1 << 2,
  underline: 1 << 3,
  code: 1 << 4,
  subscript: 1 << 5,
  superscript: 1 << 6,
} as const;

function renderFormattedText(
  node: { text: string; format?: number },
  tone: TypographyTone | undefined,
): ReactNode {
  const format = node.format ?? 0;
  let content: ReactNode = node.text;

  if (format & TEXT_FORMAT.bold) content = <strong>{content}</strong>;
  if (format & TEXT_FORMAT.italic) content = <em>{content}</em>;
  if (format & TEXT_FORMAT.strikethrough) content = <s>{content}</s>;
  if (format & TEXT_FORMAT.underline) content = <u>{content}</u>;
  if (format & TEXT_FORMAT.code)
    content = <InlineCode tone={tone}>{content}</InlineCode>;
  if (format & TEXT_FORMAT.subscript) content = <sub>{content}</sub>;
  if (format & TEXT_FORMAT.superscript) content = <sup>{content}</sup>;

  return content;
}

// Route every embedded block node through the shared renderer.
const block = ({ node }: { node: { fields: { id?: string | null } } }) =>
  renderBlock(node.fields as unknown as AnyBlock, node.fields?.id ?? undefined);

type TypographyOverrides = {
  tone?: TypographyTone;
};

const createBlogConverters =
  ({ tone }: TypographyOverrides = {}): JSXConvertersFunction =>
  ({ defaultConverters }) => {
    const converters: JSXConverters = {
      ...defaultConverters,
      heading: ({ node, nodesToJSX }) => {
        const level = HEADING_LEVELS[node.tag as HeadingTag] ?? 2;
        return (
          <Heading level={level} tone={tone}>
            {nodesToJSX({ nodes: node.children })}
          </Heading>
        );
      },
      paragraph: ({ node, nodesToJSX }) => {
        if (node.children.length === 0) return <br />;
        return (
          <Typography as="p" tone={tone}>
            {nodesToJSX({ nodes: node.children })}
          </Typography>
        );
      },
      list: ({ node, nodesToJSX }) => {
        const children = nodesToJSX({ nodes: node.children });
        if (node.tag === "ol") {
          return (
            <List ordered tone={tone}>
              {children}
            </List>
          );
        }
        return <List tone={tone}>{children}</List>;
      },
      listitem: ({ node, nodesToJSX }) => (
        <ListItem>{nodesToJSX({ nodes: node.children })}</ListItem>
      ),
      quote: ({ node, nodesToJSX }) => {
        if (node.children.length === 0) return null;
        return (
          <Blockquote tone={tone}>
            {nodesToJSX({ nodes: node.children })}
          </Blockquote>
        );
      },
      text: ({ node }) => renderFormattedText(node, tone),
      blocks: {
        text: block,
        spacer: block,
        code: block,
        row: block,
        accordion: block,
        button: block,
        alert: block,
        badge: block,
        card: block,
        divider: block,
      },
    };

    return converters;
  };

export const blogConverters = createBlogConverters();

// ---------------------------------------------------------------------------
// Rich text renderer
// ---------------------------------------------------------------------------

/** Renders a full lexical rich text field with typography + block support. */
export function RichTextRenderer({
  content,
  className,
  tone,
}: {
  content: RichTextContent;
  className?: string;
} & TypographyOverrides) {
  if (!content?.root?.children?.length) return null;
  return (
    <RichText
      // Generated content type is structurally the lexical editor state.
      data={content as never}
      converters={tone ? createBlogConverters({ tone }) : blogConverters}
      disableContainer
      className={cn(proseClassName, className)}
    />
  );
}

/** Nested rich text (inside cards, alerts, accordion items). */
function renderContent(content: RichTextContent): ReactNode {
  return <RichTextRenderer content={content} />;
}

// ---------------------------------------------------------------------------
// Block renderer — shared by lexical block nodes and Payload block arrays
// ---------------------------------------------------------------------------

const justifyClass: Record<string, string> = {
  "flex-start": "justify-start",
  center: "justify-center",
  "flex-end": "justify-end",
  "space-between": "justify-between",
  "space-around": "justify-around",
  "space-evenly": "justify-evenly",
};

const alignClass: Record<string, string> = {
  stretch: "items-stretch",
  "flex-start": "items-start",
  center: "items-center",
  "flex-end": "items-end",
  baseline: "items-baseline",
};

const SAFE_URL_PROTOCOLS = new Set(["http:", "https:", "mailto:", "tel:"]);

/**
 * Rejects CMS-authored hrefs using unsafe schemes (javascript:, data:, etc).
 * Relative paths and fragments pass through untouched; absolute URLs must
 * use an allowed protocol.
 */
function sanitizeHref(href: string): string | null {
  const trimmed = href.trim();
  if (!trimmed) return null;
  if (
    trimmed.startsWith("/") ||
    trimmed.startsWith("#") ||
    trimmed.startsWith("?")
  ) {
    return trimmed;
  }
  try {
    const url = new URL(trimmed, "https://placeholder.invalid");
    return SAFE_URL_PROTOCOLS.has(url.protocol) ? trimmed : null;
  } catch {
    return null;
  }
}

export function renderBlock(block: AnyBlock, key?: React.Key): ReactNode {
  if (!block) return null;

  switch (block.blockType) {
    case "text":
      return (
        <div key={key}>
          <RichTextRenderer
            content={block.content}
            tone={(block.appearance as TypographyTone) ?? undefined}
          />
        </div>
      );

    case "spacer":
      return (
        <div key={key} aria-hidden style={{ height: `${block.height}px` }} />
      );

    case "code":
      return (
        <Code key={key} codeString={block.code} language={block.language} />
      );

    case "row": {
      const stack = block.stackOnMobile !== false;
      return (
        <div
          key={key}
          className={[
            "flex",
            stack ? "flex-col md:flex-row" : "flex-row",
            block.horizontalAlign ? justifyClass[block.horizontalAlign] : "",
            block.verticalAlign ? alignClass[block.verticalAlign] : "",
          ]
            .filter(Boolean)
            .join(" ")}
          style={{ gap: `${block.gap}px` }}
        >
          {block.items?.map((item, index) =>
            item ? renderBlock(item as AnyBlock, item.id ?? index) : null,
          )}
        </div>
      );
    }

    case "accordion":
      return (
        <div key={key} className="my-4 flex flex-col gap-4">
          {block.accordions?.map((group, groupIndex) => (
            <Accordion
              key={group.id ?? groupIndex}
              type="single"
              appearance={group.appearance ?? undefined}
              size={group.size ?? undefined}
            >
              {group.items?.map((item, index) => {
                if (!item) return null;
                const value = item.id ?? `item-${index}`;
                return (
                  <AccordionItem key={value} value={value}>
                    <AccordionTrigger>{item.label}</AccordionTrigger>
                    <AccordionContent>
                      {renderContent(item.content)}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          ))}
        </div>
      );

    case "button": {
      const appearance = block.appearance ?? undefined;
      const size = block.size ?? undefined;
      const safeHref = block.href ? sanitizeHref(block.href) : null;
      if (block.as === "link" && safeHref) {
        return (
          <Button
            key={key}
            as="link"
            href={safeHref}
            target={block.target ?? undefined}
            appearance={appearance}
            size={size}
          >
            {block.label}
          </Button>
        );
      }
      return (
        <Button key={key} appearance={appearance} size={size}>
          {block.label}
        </Button>
      );
    }

    case "alert": {
      const appearance = block.appearance ?? undefined;
      const size = block.size ?? undefined;
      if (block.closable) {
        return (
          <DismissibleAlert key={key} appearance={appearance} size={size}>
            {renderContent(block.content)}
          </DismissibleAlert>
        );
      }
      return (
        <Alert key={key} appearance={appearance} size={size}>
          <AlertDescription>{renderContent(block.content)}</AlertDescription>
        </Alert>
      );
    }

    case "badge":
      return (
        <Badge
          key={key}
          appearance={block.appearance ?? undefined}
          size={block.size ?? undefined}
          shape={block.shape ?? undefined}
        >
          {block.label}
        </Badge>
      );

    case "card":
      return (
        <Card
          key={key}
          appearance={block.appearance ?? undefined}
          size={block.size ?? undefined}
          rounded={block.rounded ?? undefined}
        >
          <CardBody>{renderContent(block.content)}</CardBody>
        </Card>
      );

    case "divider":
      return (
        <Divider
          key={key}
          appearance={block.appearance ?? undefined}
          size={block.size ?? undefined}
          orientation={block.orientation ?? undefined}
          label={block.label ?? undefined}
        />
      );

    default:
      return null;
  }
}
