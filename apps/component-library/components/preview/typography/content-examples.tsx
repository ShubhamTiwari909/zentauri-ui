"use client";

import Link from "next/link";
import { Section } from "@/components/common/Section";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import {
  Prose,
  Text,
  Heading,
  TextLink,
  DescriptionList,
  InlineCode,
  Blockquote,
  VisuallyHidden,
  textLinkVariants,
} from "@zentauri-ui/zentauri-components/ui/typography";
import { CodeBlock as RichCodeBlock } from "@zentauri-ui/zentauri-components/ui/code-block";
import { Kbd } from "@zentauri-ui/zentauri-components/ui/kbd";
import type { TypographySectionSlug } from "@/lib/typography-preview-registry";

export function ArticleDemo() {
  return (
    <Prose as="article" measure="none">
      <h2>A simpler publishing workflow</h2>
      <p>
        Style rendered content with a consistent type scale, links, lists and
        quotations.{" "}
        <Link href="/preview/typography/scale">
          Adjust the typography tokens
        </Link>{" "}
        to match your brand.
      </p>
      <ul>
        <li>
          Keep semantic headings.
          <ul>
            <li>Use a separate visual scale when necessary.</li>
          </ul>
        </li>
        <li>Compose your existing components.</li>
      </ul>
      <blockquote>
        <p>Good defaults should leave room for useful overrides.</p>
      </blockquote>
      <p>
        Install the family with <code>zentauri-ui add typography</code>.
      </p>
      <pre>
        <code>
          {'const article = { title: "Release notes", published: true };'}
        </code>
      </pre>
      <div className="overflow-x-auto">
        <table>
          <caption>Publishing checklist</caption>
          <thead>
            <tr>
              <th scope="col">Step</th>
              <th scope="col">Owner</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Review copy</td>
              <td>Editor</td>
            </tr>
            <tr>
              <td>Publish article</td>
              <td>Author</td>
            </tr>
          </tbody>
        </table>
      </div>
      <figure>
        <svg
          role="img"
          aria-label="Three publishing stages"
          viewBox="0 0 480 80"
          className="h-auto w-full text-cyan-600 dark:text-cyan-300"
        >
          <rect
            x="0"
            y="0"
            width="480"
            height="80"
            rx="12"
            fill="currentColor"
            opacity="0.1"
          />
          <text x="30" y="47" fill="currentColor" fontSize="18">
            Draft → Review → Publish
          </text>
        </svg>
        <figcaption>A short workflow with clear ownership.</figcaption>
      </figure>
      <dl>
        <dt>Format</dt>
        <dd>Rendered HTML or MDX</dd>
      </dl>
      <Heading level={3} tone="primary">
        Embedded components keep their styles
      </Heading>
      <Blockquote attribution="Editorial team">
        <Text>A Zentauri quotation keeps its own spacing and tones.</Text>
      </Blockquote>
      <p>
        Use <Kbd keys={["⌘", "K"]} /> to open search.
      </p>
      <RichCodeBlock
        code={"export const published = true;"}
        language="ts"
        showLineNumbers
      />
      <div
        data-prose="ignore"
        className="mt-6 rounded-lg border border-slate-300 p-4 dark:border-slate-700"
      >
        <p className="text-sm font-medium">
          An embedded panel controls its own text styles.
        </p>
        <TextLink href="/preview/components/code-block">
          Explore the richer code viewer
        </TextLink>
      </div>
    </Prose>
  );
}
export function LinkDemo() {
  return (
    <div className="flex flex-wrap gap-4">
      <TextLink href="/preview/typography">Typography overview</TextLink>
      <TextLink
        href="https://developer.mozilla.org/"
        target="_blank"
        externalIndicator
      >
        HTML reference<VisuallyHidden> (opens in a new tab)</VisuallyHidden>
      </TextLink>
      <TextLink
        href="/preview/typography/prose"
        underline="hover"
        tone="accent"
      >
        Underline on hover or focus
      </TextLink>
      <Link
        href="/preview/typography/description-list"
        className={textLinkVariants({ tone: "primary" })}
      >
        Next.js navigation
      </Link>
    </div>
  );
}
export function DetailsDemo({
  layout = "responsive",
}: {
  layout?: "responsive" | "stacked" | "inline";
}) {
  return (
    <DescriptionList layout={layout} separators>
      <DescriptionList.Item>
        <DescriptionList.Term>Project</DescriptionList.Term>
        <DescriptionList.Details>Zentauri UI</DescriptionList.Details>
      </DescriptionList.Item>
      <DescriptionList.Item>
        <DescriptionList.Term>Documentation</DescriptionList.Term>
        <DescriptionList.Details>
          <TextLink href="/preview/typography/prose">
            Read the prose guide
          </TextLink>
        </DescriptionList.Details>
        <DescriptionList.Details>
          Examples and API references included.
        </DescriptionList.Details>
      </DescriptionList.Item>
      <DescriptionList.Item>
        <DescriptionList.Term>Endpoint</DescriptionList.Term>
        <DescriptionList.Details>
          <InlineCode>/api/projects/zentauri-ui/typography/content</InlineCode>
        </DescriptionList.Details>
      </DescriptionList.Item>
      <DescriptionList.Item>
        <DescriptionList.Term>Owner</DescriptionList.Term>
        <DescriptionList.Details>Not assigned</DescriptionList.Details>
      </DescriptionList.Item>
    </DescriptionList>
  );
}
export function TypographyContentHero({
  section,
}: {
  section: TypographySectionSlug;
}) {
  if (section === "prose")
    return (
      <Prose size="sm" measure="none">
        <h3>Content with a consistent rhythm</h3>
        <p>Native paragraphs, lists and links share a readable style.</p>
        <ul>
          <li>Semantic markup</li>
          <li>Scoped theme tokens</li>
        </ul>
      </Prose>
    );
  if (section === "links") return <LinkDemo />;
  if (section === "description-list") return <DetailsDemo layout="stacked" />;
  return null;
}
const articleSnippet =
  'import Link from "next/link";\nimport { Prose, Heading, Text, TextLink, DescriptionList, InlineCode, Blockquote } from "@zentauri-ui/zentauri-components/ui/typography";\nimport { CodeBlock as RichCodeBlock } from "@zentauri-ui/zentauri-components/ui/code-block";\nimport { Kbd } from "@zentauri-ui/zentauri-components/ui/kbd";\n\n<Prose as="article" measure="none">\n  <h2>A simpler publishing workflow</h2>\n  <p>\n    Style rendered content with a consistent type scale, links, lists and\n    quotations.{" "}\n    <Link href="/preview/typography/scale">Adjust the typography tokens</Link> to\n    match your brand.\n  </p>\n  <ul>\n    <li>\n      Keep semantic headings.\n      <ul>\n        <li>Use a separate visual scale when necessary.</li>\n      </ul>\n    </li>\n    <li>Compose your existing components.</li>\n  </ul>\n  <blockquote>\n    <p>Good defaults should leave room for useful overrides.</p>\n  </blockquote>\n  <p>\n    Install the family with <code>zentauri-ui add typography</code>.\n  </p>\n  <pre>\n    <code>\n      {\'const article = { title: "Release notes", published: true };\'}\n    </code>\n  </pre>\n  <div className="overflow-x-auto">\n    <table>\n      <caption>Publishing checklist</caption>\n      <thead>\n        <tr>\n          <th scope="col">Step</th>\n          <th scope="col">Owner</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr>\n          <td>Review copy</td>\n          <td>Editor</td>\n        </tr>\n        <tr>\n          <td>Publish article</td>\n          <td>Author</td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n  <figure>\n    <svg\n      role="img"\n      aria-label="Three publishing stages"\n      viewBox="0 0 480 80"\n      className="h-auto w-full text-cyan-600 dark:text-cyan-300"\n    >\n      <rect\n        x="0"\n        y="0"\n        width="480"\n        height="80"\n        rx="12"\n        fill="currentColor"\n        opacity="0.1"\n      />\n      <text x="30" y="47" fill="currentColor" fontSize="18">\n        Draft \u2192 Review \u2192 Publish\n      </text>\n    </svg>\n    <figcaption>A short workflow with clear ownership.</figcaption>\n  </figure>\n  <dl>\n    <dt>Format</dt>\n    <dd>Rendered HTML or MDX</dd>\n  </dl>\n  <Heading level={3} tone="primary">\n    Embedded components keep their styles\n  </Heading>\n  <Blockquote attribution="Editorial team">\n    <Text>A Zentauri quotation keeps its own spacing and tones.</Text>\n  </Blockquote>\n  <p>\n    Use <Kbd keys={["\u2318", "K"]} /> to open search.\n  </p>\n  <RichCodeBlock\n    code={"export const published = true;"}\n    language="ts"\n    showLineNumbers\n  />\n  <div\n    data-prose="ignore"\n    className="mt-6 rounded-lg border border-slate-300 p-4 dark:border-slate-700"\n  >\n    <p className="text-sm font-medium">\n      An embedded panel controls its own text styles.\n    </p>\n    <TextLink href="/preview/components/code-block">\n      Explore the richer code viewer\n    </TextLink>\n  </div>\n</Prose>';
const linkSnippet =
  '"use client";\n\nimport Link from "next/link";\nimport { Prose, Heading, Text, TextLink, DescriptionList, InlineCode, Blockquote, VisuallyHidden, textLinkVariants } from "@zentauri-ui/zentauri-components/ui/typography";\n\n<div className="flex flex-wrap gap-4">\n  <TextLink href="/preview/typography">Typography overview</TextLink>\n  <TextLink\n    href="https://developer.mozilla.org/"\n    target="_blank"\n    externalIndicator\n  >\n    HTML reference<VisuallyHidden> (opens in a new tab)</VisuallyHidden>\n  </TextLink>\n  <TextLink\n    href="/preview/typography/prose"\n    underline="hover"\n    tone="accent"\n  >\n    Underline on hover or focus\n  </TextLink>\n  <Link\n    href="/preview/typography/description-list"\n    className={textLinkVariants({ tone: "primary" })}\n  >\n    Next.js navigation\n  </Link>\n</div>';
const definitionSnippet =
  'import { Prose, Heading, Text, TextLink, DescriptionList, InlineCode, Blockquote, VisuallyHidden, textLinkVariants } from "@zentauri-ui/zentauri-components/ui/typography";\n\n<DescriptionList layout={layout} separators>\n  <DescriptionList.Item>\n    <DescriptionList.Term>Project</DescriptionList.Term>\n    <DescriptionList.Details>Zentauri UI</DescriptionList.Details>\n  </DescriptionList.Item>\n  <DescriptionList.Item>\n    <DescriptionList.Term>Documentation</DescriptionList.Term>\n    <DescriptionList.Details>\n      <TextLink href="/preview/typography/prose">\n        Read the prose guide\n      </TextLink>\n    </DescriptionList.Details>\n    <DescriptionList.Details>\n      Examples and API references included.\n    </DescriptionList.Details>\n  </DescriptionList.Item>\n  <DescriptionList.Item>\n    <DescriptionList.Term>Endpoint</DescriptionList.Term>\n    <DescriptionList.Details>\n      <InlineCode>/api/projects/zentauri-ui/typography/content</InlineCode>\n    </DescriptionList.Details>\n  </DescriptionList.Item>\n  <DescriptionList.Item>\n    <DescriptionList.Term>Owner</DescriptionList.Term>\n    <DescriptionList.Details>Not assigned</DescriptionList.Details>\n  </DescriptionList.Item>\n</DescriptionList>';
function detailsSnippet(layout: "responsive" | "stacked" | "inline") {
  return definitionSnippet.replace("layout={layout}", `layout="${layout}"`);
}

export function TypographyContentExamples({
  section,
}: {
  section: TypographySectionSlug;
}) {
  if (!["prose", "links", "description-list"].includes(section)) return null;
  const rows =
    section === "prose"
      ? [
          {
            label: "Rendered article and embedded components",
            demo: <ArticleDemo />,
            code: articleSnippet,
          },
        ]
      : section === "links"
        ? [
            {
              label:
                "Native links, external indicators and framework composition",
              demo: <LinkDemo />,
              code: linkSnippet,
            },
          ]
        : [
            ...(["responsive", "stacked", "inline"] as const).map((layout) => ({
              label: `${layout} definition layout`,
              demo: <DetailsDemo layout={layout} />,
              code: detailsSnippet(layout),
            })),
          ];
  return (
    <Section>
      <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
        Content composition
      </h2>
      <p className="mt-2 text-sm leading-6 text-slate-900 dark:text-slate-400">
        Prose styles already-rendered markup. Embedded component slots and{" "}
        <code>{'data-prose="ignore"'}</code> subtrees skip descendant styles.
        Put wide tables in a scrolling wrapper; use the existing CodeBlock and
        Kbd entries for richer content.
      </p>
      <div className="mt-6 space-y-8">
        {rows.map((row) => (
          <div key={row.label}>
            <p className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">
              {row.label}
            </p>
            <PreviewCodeShowcase code={row.code}>
              {row.demo}
            </PreviewCodeShowcase>
          </div>
        ))}
      </div>
    </Section>
  );
}
