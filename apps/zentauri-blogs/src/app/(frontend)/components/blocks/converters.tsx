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

const headingClasses: Record<string, string> = {
  h1: "text-4xl md:text-5xl font-bold tracking-tight",
  h2: "text-3xl md:text-4xl font-bold tracking-tight",
  h3: "text-2xl md:text-3xl font-semibold",
  h4: "text-xl md:text-2xl font-semibold",
  h5: "text-lg md:text-xl font-semibold",
  h6: "text-base md:text-lg font-semibold uppercase tracking-wide",
};

// Container styles for elements left to the default converters (lists, quotes,
// links, inline code, rules) so typography stays consistent.
const proseClassName = [
  "[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-4",
  "[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-4",
  "[&_li]:my-1",
  "[&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 dark:[&_blockquote]:border-gray-600 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-4 [&_blockquote]:text-gray-600 dark:[&_blockquote]:text-gray-300",
  "[&_a]:text-blue-600 dark:[&_a]:text-blue-400 [&_a]:underline [&_a]:underline-offset-2",
  "[&_hr]:my-8 [&_hr]:border-gray-200 dark:[&_hr]:border-gray-700",
  "[&_:not(pre)>code]:rounded [&_:not(pre)>code]:bg-gray-100 dark:[&_:not(pre)>code]:bg-gray-800 [&_:not(pre)>code]:px-1.5 [&_:not(pre)>code]:py-0.5 [&_:not(pre)>code]:text-[0.9em]",
].join(" ");

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

// Route every embedded block node through the shared renderer.
const block = ({ node }: { node: { fields: { id?: string | null } } }) =>
  renderBlock(node.fields as unknown as AnyBlock, node.fields?.id ?? undefined);

export const blogConverters: JSXConvertersFunction = ({
  defaultConverters,
}) => {
  const converters: JSXConverters = {
    ...defaultConverters,
    heading: ({ node, nodesToJSX }) => {
      const Tag = (node.tag as HeadingTag) ?? "h2";
      return (
        <Tag className={headingClasses[Tag] ?? headingClasses.h2}>
          {nodesToJSX({ nodes: node.children })}
        </Tag>
      );
    },
    paragraph: ({ node, nodesToJSX }) => {
      if (node.children.length === 0) return <br />;
      return (
        <p className="leading-7">{nodesToJSX({ nodes: node.children })}</p>
      );
    },

    list: ({ node, nodesToJSX }) => {
      // @aw-fe-primitive
      const Tag = node.tag;

      const listClassNames = cn(
        Tag === "ol" ? "list-decimal" : "list-disc",
        {
          "[&>li:has(ul,ol)]:list-none":
            node.listType === "bullet" || node.listType === "number",
        },
        "[&>li:has(ul,ol)]:mb-2 font-proxima-regular text-body-md",
        "pl-6 my-4",
      );

      return (
        <Tag className={listClassNames}>
          {nodesToJSX({ nodes: node.children })}
        </Tag>
      );
    },
    quote: ({ node, nodesToJSX }) => {
      if (node.children.length === 0) return null;
      return (
        <blockquote className="pl-3 border-l border-solid border-l-gray-300">
          {nodesToJSX({ nodes: node.children })}
        </blockquote>
      );
    },
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

// ---------------------------------------------------------------------------
// Rich text renderer
// ---------------------------------------------------------------------------

/** Renders a full lexical rich text field with typography + block support. */
export function RichTextRenderer({
  content,
  className,
}: {
  content: RichTextContent;
  className?: string;
}) {
  if (!content?.root?.children?.length) return null;
  return (
    <RichText
      // Generated content type is structurally the lexical editor state.
      data={content as never}
      converters={blogConverters}
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

export function renderBlock(block: AnyBlock, key?: React.Key): ReactNode {
  switch (block.blockType) {
    case "text":
      return renderContent(block.content);

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
            renderBlock(item as AnyBlock, item.id ?? index),
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
      if (block.as === "link" && block.href) {
        return (
          <Button
            key={key}
            as="link"
            href={block.href}
            target={block.target ?? undefined}
            appearance={appearance}
            size={size}
            className="block"
          >
            {block.label}
          </Button>
        );
      }
      return (
        <Button key={key} appearance={appearance} size={size} className="block">
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
        <Alert
          key={key}
          appearance={appearance}
          size={size}
          className={cn("block")}
        >
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
