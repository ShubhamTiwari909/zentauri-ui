import { RichText } from "@payloadcms/richtext-lexical/react";
import JSON5 from "json5";
import type {
  JSXConverters,
  JSXConvertersFunction,
} from "@payloadcms/richtext-lexical/react";
import { Fragment } from "react";
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
import {
  Breadcrumb as BreadcrumbRoot,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@zentauri-ui/zentauri-components/ui/breadcrumb";
import { Button } from "@zentauri-ui/zentauri-components/ui/buttons";
import { Card, CardBody } from "@zentauri-ui/zentauri-components/ui/card";
import { Divider } from "@zentauri-ui/zentauri-components/ui/divider";
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@zentauri-ui/zentauri-components/ui/drawer";
import { JsonViewer } from "@zentauri-ui/zentauri-components/ui/json-viewer";
import { Kbd } from "@zentauri-ui/zentauri-components/ui/kbd";
import {
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@zentauri-ui/zentauri-components/ui/modal";
import { PackageInstallCommand } from "@zentauri-ui/zentauri-components/ui/package-install-command";
import { QrCode } from "@zentauri-ui/zentauri-components/ui/qr-code";
import { SecretReveal } from "@zentauri-ui/zentauri-components/ui/secret-reveal";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@zentauri-ui/zentauri-components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@zentauri-ui/zentauri-components/ui/table";
import {
  Timeline,
  TimelineContent,
  TimelineDescription,
  TimelineIndicator,
  TimelineItem,
  TimelineTitle,
} from "@zentauri-ui/zentauri-components/ui/timeline";
import { TreeView } from "@zentauri-ui/zentauri-components/ui/tree-view";
import type { TreeNode } from "@zentauri-ui/zentauri-components/ui/tree-view";
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
  BreadcrumbBlock,
  ButtonBlock,
  CardBlock,
  CodeBlock,
  DividerBlock,
  DrawerBlock,
  JsonViewerBlock,
  KbdBlock,
  ModalBlock,
  PackageInstallCommandBlock,
  QrCodeBlock,
  RowBlock,
  SecretRevealBlock,
  SpacerBlock,
  TableBlock,
  TabsBlock,
  TextBlock,
  TimelineBlock,
  TreeViewBlock,
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
  | RowBlock
  | TableBlock
  | BreadcrumbBlock
  | DrawerBlock
  | JsonViewerBlock
  | KbdBlock
  | ModalBlock
  | PackageInstallCommandBlock
  | QrCodeBlock
  | SecretRevealBlock
  | TabsBlock
  | TimelineBlock
  | TreeViewBlock;

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
        table: block,
        breadcrumb: block,
        drawer: block,
        "json-viewer": block,
        kbd: block,
        modal: block,
        "package-install-command": block,
        "qr-code": block,
        "secret-reveal": block,
        tabs: block,
        timeline: block,
        "tree-view": block,
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

type TreeViewNodeInput = {
  id?: string | null;
  label: string;
  children?: TreeViewNodeInput[] | null;
};

/** Recursively maps a TreeViewBlock's 4-level-deep node shape into TreeView's TreeNode[]. */
function toTreeNodes(
  nodes: TreeViewNodeInput[] | null | undefined,
  parentPath = "",
): TreeNode[] {
  if (!nodes) return [];
  return nodes.map((node, index) => {
    const path = parentPath ? `${parentPath}-${index}` : `node-${index}`;
    return {
      id: node.id ?? path,
      label: node.label,
      children: node.children?.length
        ? toTreeNodes(node.children, path)
        : undefined,
    };
  });
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

    case "table":
      return (
        <Table
          key={key}
          appearance={block.appearance ?? undefined}
          size={block.size ?? undefined}
          textAlign={block.textAlign ?? undefined}
          stickyHeader={block.stickyHeader ?? undefined}
          // Table's own wrapper already scrolls (`overflow-auto`), but its
          // `<table>` is forced to `min-w-0` — which lets narrow viewports
          // squeeze columns instead of scrolling. `min-w-max` restores the
          // table's natural content width so it overflows and scrolls
          // horizontally on mobile instead of clipping cell content.
          className="min-w-max"
        >
          <TableHeader>
            <TableRow>
              {block.columns?.map((column, index) => (
                <TableHead key={column.id ?? index}>{column.label}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {block.rows?.map((row, rowIndex) => (
              <TableRow key={row.id ?? rowIndex}>
                {row.cells?.map((cell, cellIndex) => (
                  <TableCell key={cell.id ?? cellIndex}>{cell.value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );

    case "breadcrumb": {
      const appearance = block.appearance ?? undefined;
      const items = block.items ?? [];
      return (
        <BreadcrumbRoot key={key}>
          <BreadcrumbList>
            {items.map((item, index) => {
              const isLast = index === items.length - 1;
              const safeHref = item.href ? sanitizeHref(item.href) : null;
              return (
                <Fragment key={item.id ?? index}>
                  <BreadcrumbItem>
                    {safeHref && !isLast ? (
                      <BreadcrumbLink href={safeHref} appearance={appearance}>
                        {item.label}
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage appearance={appearance}>
                        {item.label}
                      </BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                  {!isLast && <BreadcrumbSeparator />}
                </Fragment>
              );
            })}
          </BreadcrumbList>
        </BreadcrumbRoot>
      );
    }

    case "drawer":
      return (
        <Drawer key={key}>
          <DrawerTrigger appearance={block.triggerAppearance ?? undefined}>
            {block.triggerLabel}
          </DrawerTrigger>
          <DrawerContent
            side={block.side ?? undefined}
            size={block.size ?? undefined}
            appearance={block.contentAppearance ?? undefined}
          >
            <DrawerClose />
            {block.title ? (
              <DrawerHeader>
                <DrawerTitle>{block.title}</DrawerTitle>
              </DrawerHeader>
            ) : null}
            <DrawerBody>{renderContent(block.content)}</DrawerBody>
          </DrawerContent>
        </Drawer>
      );

    case "json-viewer": {
      let parsed: unknown = null;
      try {
        parsed = block.data ? JSON5.parse(block.data) : null;
      } catch (error) {
        return (
          <div
            key={key}
            className="border-red-500 bg-red-50 text-red-500 rounded border p-4 text-sm"
          >
            Failed to parse JSON5 data:{" "}
            {error instanceof Error ? error.message : String(error)}
          </div>
        );
      }
      return (
        <JsonViewer
          key={key}
          data={parsed}
          appearance={block.appearance ?? undefined}
          size={block.size ?? undefined}
          defaultExpandedDepth={block.defaultExpandedDepth ?? undefined}
          showToolbar={block.showToolbar ?? undefined}
          enableClipboard={block.enableClipboard ?? undefined}
          showItemCount={block.showItemCount ?? undefined}
          quoteStrings={block.quoteStrings ?? undefined}
        />
      );
    }

    case "kbd":
      return (
        <Kbd
          key={key}
          appearance={block.appearance ?? undefined}
          size={block.size ?? undefined}
          separator={block.separator ?? undefined}
          keys={block.keys?.map((item) => item.key) ?? []}
        />
      );

    case "modal":
      return (
        <Modal key={key}>
          <ModalTrigger
            appearance={block.triggerAppearance ?? undefined}
            className="px-5 py-3"
          >
            {block.triggerLabel}
          </ModalTrigger>
          <ModalContent
            size={block.size ?? undefined}
            position={block.position ?? undefined}
            appearance={block.contentAppearance ?? undefined}
          >
            <ModalClose className="">×</ModalClose>
            {block.title ? (
              <ModalHeader>
                <ModalTitle>{block.title}</ModalTitle>
              </ModalHeader>
            ) : null}
            <ModalBody>{renderContent(block.content)}</ModalBody>
          </ModalContent>
        </Modal>
      );

    case "package-install-command":
      return (
        <PackageInstallCommand
          key={key}
          packageName={block.packageName}
          defaultManager={block.defaultManager ?? undefined}
          appearance={block.appearance ?? undefined}
          size={block.size ?? undefined}
          enableClipboard={block.enableClipboard ?? undefined}
        />
      );

    case "qr-code":
      return (
        <QrCode
          key={key}
          value={block.value}
          canvasSize={block.canvasSize ?? undefined}
          level={block.level ?? undefined}
          margin={block.margin ?? undefined}
          bgColor={block.bgColor ?? undefined}
          fgColor={block.fgColor ?? undefined}
          caption={block.caption ?? undefined}
        />
      );

    case "secret-reveal":
      return (
        <SecretReveal
          key={key}
          value={block.value}
          appearance={block.appearance ?? undefined}
          size={block.size ?? undefined}
          label={block.label ?? undefined}
          labelPosition={block.labelPosition ?? undefined}
          muteChar={block.muteChar ?? undefined}
          initiallyRevealed={block.initiallyRevealed ?? undefined}
        />
      );

    case "tabs":
      return (
        <Tabs
          key={key}
          appearance={block.appearance ?? undefined}
          variant={block.variant ?? undefined}
          size={block.size ?? undefined}
          orientation={block.orientation ?? undefined}
          defaultValue={block.tabs?.[0]?.id ?? "tab-0"}
        >
          <TabsList>
            {block.tabs?.map((tab, index) => (
              <TabsTrigger
                key={tab.id ?? index}
                value={tab.id ?? `tab-${index}`}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {block.tabs?.map((tab, index) => (
            <TabsContent
              key={tab.id ?? index}
              value={tab.id ?? `tab-${index}`}
              className="pl-4"
            >
              {renderContent(tab.content)}
            </TabsContent>
          ))}
        </Tabs>
      );

    case "timeline":
      return (
        <Timeline
          key={key}
          appearance={block.appearance ?? undefined}
          size={block.size ?? undefined}
        >
          {block.items?.map((item, index) => (
            <TimelineItem key={item.id ?? index}>
              <TimelineIndicator appearance={item.appearance ?? undefined} />
              <TimelineContent>
                <TimelineTitle>{item.title}</TimelineTitle>
                {item.description ? (
                  <TimelineDescription>{item.description}</TimelineDescription>
                ) : null}
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      );

    case "tree-view":
      return (
        <TreeView
          key={key}
          data={toTreeNodes(block.nodes)}
          appearance={block.appearance ?? undefined}
          size={block.size ?? undefined}
          showGuides={block.showGuides ?? undefined}
        />
      );

    default:
      return null;
  }
}
