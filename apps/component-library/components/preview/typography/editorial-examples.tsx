"use client";

import { useState } from "react";
import {
  Footnotes,
  Prose,
  Heading,
  TextLink,
  NumberText,
  estimateReadingTime,
  typographyDropCapRecipe,
  typographyPermalinkRecipe,
} from "@zentauri-ui/zentauri-components/ui/typography";
import { Section } from "@/components/common/Section";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import type { TypographySectionSlug } from "@/lib/typography-preview-registry";

const articleText =
  "“Readable interfaces make room for explanations. A short article can pair a clear heading with a permalink, use an optional drop cap, and keep source notes close to the passage they support. Readers should be able to follow a note and return to the exact reference using the keyboard.”";

function EditorialArticleDemo({
  scopeId = "editorial-article",
}: {
  scopeId?: string;
}) {
  const estimate = estimateReadingTime(articleText, {
    mode: "approximate",
    wordsPerMinute: 200,
  });
  const headingId = `${scopeId}-readable-content`;
  return (
    <Footnotes scopeId={scopeId} className="text-slate-900 dark:text-slate-100">
      <p className="mb-5 text-sm">
        Excerpt estimate: about{" "}
        <NumberText
          value={estimate.minutes}
          locale="en-US"
          size="sm"
          formatOptions={{ style: "unit", unit: "minute", unitDisplay: "long" }}
        />{" "}
        at 200 words per minute.
      </p>
      <Prose as="article" measure="readable">
        <div className="group mb-4 flex items-baseline gap-3">
          <Heading id={headingId} level={2} className="min-w-0 wrap-anywhere">
            Readable content
          </Heading>
          <TextLink
            data-demo="heading-permalink"
            href={`#${headingId}`}
            aria-label="Link to Readable content"
            className={typographyPermalinkRecipe}
          >
            #
          </TextLink>
        </div>
        <p data-demo="drop-cap" className={typographyDropCapRecipe}>
          {articleText}
          <Footnotes.Reference
            noteId="public-tokens"
            referenceId="opening"
            number={1}
          />
        </p>
        <p>
          Theme tokens keep the article aligned with the surrounding interface.
          The same note can be cited again without losing its original return
          link.
          <Footnotes.Reference
            noteId="public-tokens"
            referenceId="closing"
            number={1}
          />
        </p>
        <Footnotes.List aria-label="Article notes">
          <Footnotes.Item noteId="public-tokens" number={1}>
            Use the documented typography variables for font, color and rhythm.{" "}
            <span className="inline-flex flex-wrap gap-3">
              <Footnotes.Backlink
                noteId="public-tokens"
                referenceId="opening"
                label="Back to opening reference"
              />
              <Footnotes.Backlink
                noteId="public-tokens"
                referenceId="closing"
                label="Back to closing reference"
              />
            </span>
          </Footnotes.Item>
        </Footnotes.List>
      </Prose>
    </Footnotes>
  );
}

function ReadingTimeDemo() {
  const [text, setText] = useState(articleText);
  const [rate, setRate] = useState(200);
  const [locale, setLocale] = useState("en-US");
  const [mode, setMode] = useState<"auto" | "approximate">("approximate");
  const estimate = estimateReadingTime(text, {
    wordsPerMinute: rate,
    locale,
    mode,
  });
  return (
    <div className="space-y-5 text-slate-900 dark:text-slate-100">
      <label className="block text-sm">
        Plain text
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          rows={5}
          className="mt-2 block w-full rounded-lg border border-slate-300 bg-white p-3 text-slate-900 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
        />
      </label>
      <label className="block text-sm">
        Reading speed: {rate} words per minute
        <input
          type="range"
          min={100}
          max={350}
          step={10}
          value={rate}
          onChange={(event) => setRate(Number(event.target.value))}
          className="mt-2 block w-full"
        />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          Word-counting locale
          <select
            value={locale}
            onChange={(event) => setLocale(event.target.value)}
            className="mt-2 block w-full rounded-lg border border-slate-300 bg-white p-2 text-slate-900 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
          >
            {["en-US", "ja-JP", "ar"].map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          Word counting
          <select
            value={mode}
            onChange={(event) =>
              setMode(event.target.value as "auto" | "approximate")
            }
            className="mt-2 block w-full rounded-lg border border-slate-300 bg-white p-2 text-slate-900 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
          >
            <option value="approximate">Approximate word runs</option>
            <option value="auto">Automatic locale-aware counting</option>
          </select>
        </label>
      </div>
      <p data-demo="reading-time" role="status">
        {estimate.wordCount === 0 ? (
          "No readable words"
        ) : (
          <>
            About{" "}
            <NumberText
              value={estimate.minutes}
              locale="en-US"
              formatOptions={{
                style: "unit",
                unit: "minute",
                unitDisplay: "long",
              }}
            />{" "}
            to read
          </>
        )}
      </p>
      <p data-demo="word-count" className="text-sm">
        {estimate.wordCount} {estimate.wordCount === 1 ? "word" : "words"} ·{" "}
        {estimate.seconds} estimated{" "}
        {estimate.seconds === 1 ? "second" : "seconds"} ·{" "}
        {estimate.method === "segmenter"
          ? "Locale-aware counting"
          : "Approximate word runs"}
      </p>
      <p className="text-sm">
        This is an estimate from plain text. Automatic counting uses
        Intl.Segmenter when available; approximate mode counts Unicode
        letter/number runs and may undercount languages without spaces. Pin
        approximate mode or reuse a precomputed result when server and browser
        segmentation support differs.
      </p>
    </div>
  );
}

function DropCapDemo() {
  return (
    <Prose className="text-slate-900 dark:text-slate-100">
      <p data-demo="punctuation-drop-cap" className={typographyDropCapRecipe}>
        “Punctuation stays part of the original paragraph. The first-letter
        recipe lets the browser choose the initial letter and its punctuation;
        the text stays selectable, copyable and accessible.”
      </p>
      <p
        data-demo="rtl-drop-cap"
        dir="rtl"
        lang="ar"
        className={typographyDropCapRecipe}
      >
        تساعد الفقرات الواضحة القارئ على متابعة المحتوى وفهم الملاحظات دون تغيير
        ترتيب النص أو تقسيمه إلى عناصر إضافية.
      </p>
    </Prose>
  );
}

export function TypographyEditorialHero() {
  return <EditorialArticleDemo scopeId="editorial-hero" />;
}
export function TypographyEditorialExamples({
  section,
}: {
  section: TypographySectionSlug;
}) {
  if (section !== "editorial") return null;
  const rows = [
    {
      label: "Article, explicit heading link and repeated footnote references",
      demo: <EditorialArticleDemo />,
      code: articleSnippet,
    },
    {
      label: "Estimated reading time from plain text",
      demo: <ReadingTimeDemo />,
      code: readingSnippet,
    },
    {
      label: "Opt-in first-letter styling with punctuation and RTL",
      demo: <DropCapDemo />,
      code: dropCapSnippet,
    },
  ];
  return (
    <Section>
      <h2 className="wrap-anywhere text-2xl font-semibold text-slate-900 dark:text-white">
        Editorial composition
      </h2>
      <p className="mt-3 text-sm leading-7 text-slate-900 dark:text-slate-400">
        Choose heading IDs, note IDs, reference IDs and numbers explicitly.
        Footnotes scopes fragment targets to each article and provides native
        links back to each citation. Use a stable, unique scopeId for published
        article links. Heading permalinks and drop caps are class-string
        recipes; they do not generate slugs or rewrite content.
      </p>
      <div className="mt-6 space-y-8">
        {rows.map((row) => (
          <div key={row.label}>
            <p
              role="heading"
              aria-level={3}
              className="mb-3 text-sm font-semibold text-slate-900 dark:text-white"
            >
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

const articleSnippet =
  '"use client";\n\nimport { useState } from "react";\nimport { Footnotes, Prose, Heading, TextLink, NumberText, estimateReadingTime, typographyDropCapRecipe, typographyPermalinkRecipe } from "@zentauri-ui/zentauri-components/ui/typography";\n\nconst articleText =\n  "\u201cReadable interfaces make room for explanations. A short article can pair a clear heading with a permalink, use an optional drop cap, and keep source notes close to the passage they support. Readers should be able to follow a note and return to the exact reference using the keyboard.\u201d";\n\nexport default function EditorialArticleDemo({\n  scopeId = "editorial-article",\n}: {\n  scopeId?: string;\n}) {\n  const estimate = estimateReadingTime(articleText, {\n    mode: "approximate",\n    wordsPerMinute: 200,\n  });\n  const headingId = `${scopeId}-readable-content`;\n  return (\n    <Footnotes scopeId={scopeId} className="text-slate-900 dark:text-slate-100">\n      <p className="mb-5 text-sm">\n        Excerpt estimate: about{" "}\n        <NumberText\n          value={estimate.minutes}\n          locale="en-US"\n          size="sm"\n          formatOptions={{ style: "unit", unit: "minute", unitDisplay: "long" }}\n        />{" "}\n        at 200 words per minute.\n      </p>\n      <Prose as="article" measure="readable">\n        <div className="group mb-4 flex items-baseline gap-3">\n          <Heading id={headingId} level={2} className="min-w-0 wrap-anywhere">\n            Readable content\n          </Heading>\n          <TextLink\n            data-demo="heading-permalink"\n            href={`#${headingId}`}\n            aria-label="Link to Readable content"\n            className={typographyPermalinkRecipe}\n          >\n            #\n          </TextLink>\n        </div>\n        <p data-demo="drop-cap" className={typographyDropCapRecipe}>\n          {articleText}\n          <Footnotes.Reference\n            noteId="public-tokens"\n            referenceId="opening"\n            number={1}\n          />\n        </p>\n        <p>\n          Theme tokens keep the article aligned with the surrounding interface.\n          The same note can be cited again without losing its original return\n          link.\n          <Footnotes.Reference\n            noteId="public-tokens"\n            referenceId="closing"\n            number={1}\n          />\n        </p>\n        <Footnotes.List aria-label="Article notes">\n          <Footnotes.Item noteId="public-tokens" number={1}>\n            Use the documented typography variables for font, color and rhythm.{" "}\n            <span className="inline-flex flex-wrap gap-3">\n              <Footnotes.Backlink\n                noteId="public-tokens"\n                referenceId="opening"\n                label="Back to opening reference"\n              />\n              <Footnotes.Backlink\n                noteId="public-tokens"\n                referenceId="closing"\n                label="Back to closing reference"\n              />\n            </span>\n          </Footnotes.Item>\n        </Footnotes.List>\n      </Prose>\n    </Footnotes>\n  );\n}';

const readingSnippet =
  '"use client";\n\nimport { useState } from "react";\nimport { Footnotes, Prose, Heading, TextLink, NumberText, estimateReadingTime, typographyDropCapRecipe, typographyPermalinkRecipe } from "@zentauri-ui/zentauri-components/ui/typography";\n\nconst articleText =\n  "\u201cReadable interfaces make room for explanations. A short article can pair a clear heading with a permalink, use an optional drop cap, and keep source notes close to the passage they support. Readers should be able to follow a note and return to the exact reference using the keyboard.\u201d";\n\nexport default function ReadingTimeDemo() {\n  const [text, setText] = useState(articleText);\n  const [rate, setRate] = useState(200);\n  const [locale, setLocale] = useState("en-US");\n  const [mode, setMode] = useState<"auto" | "approximate">("approximate");\n  const estimate = estimateReadingTime(text, {\n    wordsPerMinute: rate,\n    locale,\n    mode,\n  });\n  return (\n    <div className="space-y-5 text-slate-900 dark:text-slate-100">\n      <label className="block text-sm">\n        Plain text\n        <textarea\n          value={text}\n          onChange={(event) => setText(event.target.value)}\n          rows={5}\n          className="mt-2 block w-full rounded-lg border border-slate-300 bg-white p-3 text-slate-900 dark:border-slate-600 dark:bg-slate-900 dark:text-white"\n        />\n      </label>\n      <label className="block text-sm">\n        Reading speed: {rate} words per minute\n        <input\n          type="range"\n          min={100}\n          max={350}\n          step={10}\n          value={rate}\n          onChange={(event) => setRate(Number(event.target.value))}\n          className="mt-2 block w-full"\n        />\n      </label>\n      <div className="grid gap-4 sm:grid-cols-2">\n        <label className="block text-sm">\n          Word-counting locale\n          <select\n            value={locale}\n            onChange={(event) => setLocale(event.target.value)}\n            className="mt-2 block w-full rounded-lg border border-slate-300 bg-white p-2 text-slate-900 dark:border-slate-600 dark:bg-slate-900 dark:text-white"\n          >\n            {["en-US", "ja-JP", "ar"].map((item) => (\n              <option key={item} value={item}>\n                {item}\n              </option>\n            ))}\n          </select>\n        </label>\n        <label className="block text-sm">\n          Word counting\n          <select\n            value={mode}\n            onChange={(event) =>\n              setMode(event.target.value as "auto" | "approximate")\n            }\n            className="mt-2 block w-full rounded-lg border border-slate-300 bg-white p-2 text-slate-900 dark:border-slate-600 dark:bg-slate-900 dark:text-white"\n          >\n            <option value="approximate">Approximate word runs</option>\n            <option value="auto">Automatic locale-aware counting</option>\n          </select>\n        </label>\n      </div>\n      <p data-demo="reading-time" role="status">\n        {estimate.wordCount === 0 ? (\n          "No readable words"\n        ) : (\n          <>\n            About{" "}\n            <NumberText\n              value={estimate.minutes}\n              locale="en-US"\n              formatOptions={{\n                style: "unit",\n                unit: "minute",\n                unitDisplay: "long",\n              }}\n            />{" "}\n            to read\n          </>\n        )}\n      </p>\n      <p data-demo="word-count" className="text-sm">\n        {estimate.wordCount} {estimate.wordCount === 1 ? "word" : "words"} \u00b7 {estimate.seconds} estimated {estimate.seconds === 1 ? "second" : "seconds"} \u00b7{" "}\n        {estimate.method === "segmenter"\n          ? "Locale-aware counting"\n          : "Approximate word runs"}\n      </p>\n      <p className="text-sm">\n        This is an estimate from plain text. Automatic counting uses\n        Intl.Segmenter when available; approximate mode counts Unicode\n        letter/number runs and may undercount languages without spaces. Pin\n        approximate mode or reuse a precomputed result when server and browser\n        segmentation support differs.\n      </p>\n    </div>\n  );\n}';

const dropCapSnippet =
  '"use client";\n\nimport { useState } from "react";\nimport { Footnotes, Prose, Heading, TextLink, NumberText, estimateReadingTime, typographyDropCapRecipe, typographyPermalinkRecipe } from "@zentauri-ui/zentauri-components/ui/typography";\n\nexport default function DropCapDemo() {\n  return (\n    <Prose className="text-slate-900 dark:text-slate-100">\n      <p data-demo="punctuation-drop-cap" className={typographyDropCapRecipe}>\n        \u201cPunctuation stays part of the original paragraph. The first-letter\n        recipe lets the browser choose the initial letter and its punctuation;\n        the text stays selectable, copyable and accessible.\u201d\n      </p>\n      <p\n        data-demo="rtl-drop-cap"\n        dir="rtl"\n        lang="ar"\n        className={typographyDropCapRecipe}\n      >\n        \u062a\u0633\u0627\u0639\u062f \u0627\u0644\u0641\u0642\u0631\u0627\u062a \u0627\u0644\u0648\u0627\u0636\u062d\u0629 \u0627\u0644\u0642\u0627\u0631\u0626 \u0639\u0644\u0649 \u0645\u062a\u0627\u0628\u0639\u0629 \u0627\u0644\u0645\u062d\u062a\u0648\u0649 \u0648\u0641\u0647\u0645 \u0627\u0644\u0645\u0644\u0627\u062d\u0638\u0627\u062a \u062f\u0648\u0646 \u062a\u063a\u064a\u064a\u0631\n        \u062a\u0631\u062a\u064a\u0628 \u0627\u0644\u0646\u0635 \u0623\u0648 \u062a\u0642\u0633\u064a\u0645\u0647 \u0625\u0644\u0649 \u0639\u0646\u0627\u0635\u0631 \u0625\u0636\u0627\u0641\u064a\u0629.\n      </p>\n    </Prose>\n  );\n}';
