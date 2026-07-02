import "dotenv/config";
import { getPayload } from "payload";
import config from "../src/payload.config";

const text = (t: string) => ({
  detail: 0,
  format: 0,
  mode: "normal",
  style: "",
  text: t,
  type: "text",
  version: 1,
});

const heading = (tag: string, t: string) => ({
  type: "heading",
  tag,
  version: 1,
  direction: "ltr",
  format: "",
  indent: 0,
  children: [text(t)],
});

const paragraph = (t: string) => ({
  type: "paragraph",
  version: 1,
  direction: "ltr",
  format: "",
  indent: 0,
  textFormat: 0,
  children: [text(t)],
});

const list = (items: string[]) => ({
  type: "list",
  listType: "bullet",
  tag: "ul",
  start: 1,
  version: 1,
  direction: "ltr",
  format: "",
  indent: 0,
  children: items.map((t, i) => ({
    type: "listitem",
    value: i + 1,
    version: 1,
    direction: "ltr",
    format: "",
    indent: 0,
    children: [text(t)],
  })),
});

const quote = (t: string) => ({
  type: "quote",
  version: 1,
  direction: "ltr",
  format: "",
  indent: 0,
  children: [text(t)],
});

const block = (fields: Record<string, unknown>) => ({
  type: "block",
  version: 2,
  format: "",
  fields,
});

const richText = (children: unknown[]) => ({
  root: {
    type: "root",
    version: 1,
    direction: "ltr",
    format: "",
    indent: 0,
    children,
  },
});

const nested = (t: string) => richText([paragraph(t)]);

const run = async () => {
  const payload = await getPayload({ config });

  const content = richText([
    heading("h1", "Zentauri Blocks Demo"),
    paragraph(
      "This page is rendered entirely from Payload blocks via the rich text converters.",
    ),
    heading("h2", "Typography"),
    list(["First bullet", "Second bullet", "Third bullet"]),
    quote("A blockquote rendered with tailwind typography classes."),
    block({ blockType: "spacer", height: "32", id: "sp1" }),
    heading("h2", "Code"),
    block({
      blockType: "code",
      language: "typescript",
      code: "const greet = (name: string) => `Hello, ${name}!`;",
      id: "cd1",
    }),
    heading("h2", "Components"),
    block({
      blockType: "button",
      label: "Visit Zentauri",
      appearance: "blue",
      size: "md",
      as: "link",
      href: "https://zentauri-ui.vercel.app",
      target: "_blank",
      id: "bt1",
    }),
    block({ blockType: "spacer", height: "16", id: "sp2" }),
    block({
      blockType: "badge",
      label: "New",
      appearance: "green",
      size: "md",
      shape: "pill",
      id: "bd1",
    }),
    block({ blockType: "spacer", height: "16", id: "sp3" }),
    block({
      blockType: "alert",
      appearance: "info",
      size: "md",
      closable: true,
      content: nested("This is a dismissible alert rendered from a block."),
      id: "al1",
    }),
    block({ blockType: "spacer", height: "16", id: "sp4" }),
    block({
      blockType: "card",
      appearance: "outline",
      size: "md",
      rounded: "lg",
      content: nested("Card body content rendered as nested rich text."),
      id: "cr1",
    }),
    block({
      blockType: "divider",
      appearance: "default",
      size: "md",
      orientation: "horizontal",
      label: "OR",
      id: "dv1",
    }),
    heading("h2", "Accordion"),
    block({
      blockType: "accordion",
      accordions: [
        {
          appearance: "default",
          size: "md",
          items: [
            { label: "What is Zentauri?", content: nested("A React UI kit.") },
            {
              label: "How do blocks work?",
              content: nested("Authored in Payload, rendered via converters."),
            },
          ],
        },
      ],
      id: "ac1",
    }),
    heading("h2", "Row"),
    block({
      blockType: "row",
      gap: "16",
      horizontalAlign: "center",
      verticalAlign: "center",
      stackOnMobile: true,
      items: [
        {
          blockType: "button",
          label: "Left",
          appearance: "blue",
          size: "md",
          as: "button",
          id: "rb1",
        },
        {
          blockType: "button",
          label: "Right",
          appearance: "green",
          size: "md",
          as: "button",
          id: "rb2",
        },
      ],
      id: "rw1",
    }),
  ]);

  const existing = await payload.find({
    collection: "pages",
    where: { slug: { equals: "demo-blocks" } },
    limit: 1,
  });

  const data = {
    title: "Demo Blocks",
    slug: "demo-blocks",
    _status: "published" as const,
    layout: [{ blockType: "section" as const, sectionId: "demo", content }],
  };

  if (existing.docs[0]) {
    await payload.update({
      collection: "pages",
      id: existing.docs[0].id,
      data,
    });
    console.log("Updated demo-blocks page:", existing.docs[0].id);
  } else {
    const created = await payload.create({ collection: "pages", data });
    console.log("Created demo-blocks page:", created.id);
  }

  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
