"use client";

import { useState } from "react";
import { NumberText } from "@zentauri-ui/zentauri-components/ui/typography";
import { AnimatedNumber } from "@zentauri-ui/zentauri-components/ui/animated-number";
import { Section } from "@/components/common/Section";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import type { TypographySectionSlug } from "@/lib/typography-preview-registry";

function NumberControlsDemo() {
  const [locale, setLocale] = useState("en-IN");
  const [currency, setCurrency] = useState("INR");
  return (
    <div className="space-y-5 text-slate-900 dark:text-slate-100">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          Number locale
          <select
            value={locale}
            onChange={(event) => setLocale(event.target.value)}
            className="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
          >
            {["en-IN", "en-US", "fr-FR", "ja-JP"].map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          Currency
          <select
            value={currency}
            onChange={(event) => setCurrency(event.target.value)}
            className="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
          >
            {["INR", "USD", "EUR", "JPY"].map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>
      <NumberText
        as="p"
        data-demo="controlled-number"
        value={1234567.89}
        locale={locale}
        formatOptions={{ style: "currency", currency }}
        size="xl"
        className="wrap-anywhere"
      />
      <p className="text-sm">
        The formatter chooses grouping, symbols, spacing and rounding. Changing
        the currency can change its default fractional precision.
      </p>
    </div>
  );
}

function NumberFormatsDemo() {
  const examples: {
    label: string;
    value: number | bigint;
    locale: string;
    options?: Intl.NumberFormatOptions;
  }[] = [
    { label: "US grouping", value: 1234567.89, locale: "en-US" },
    { label: "Indian grouping", value: 1234567.89, locale: "en-IN" },
    {
      label: "USD",
      value: 1234.5,
      locale: "en-US",
      options: { style: "currency", currency: "USD" },
    },
    {
      label: "INR",
      value: 123456.75,
      locale: "en-IN",
      options: { style: "currency", currency: "INR" },
    },
    {
      label: "JPY",
      value: 1234.5,
      locale: "ja-JP",
      options: { style: "currency", currency: "JPY" },
    },
    {
      label: "Percentage",
      value: 0.125,
      locale: "en-US",
      options: { style: "percent", maximumFractionDigits: 1 },
    },
    {
      label: "Compact",
      value: 1200000,
      locale: "en-US",
      options: { notation: "compact" },
    },
    {
      label: "Speed",
      value: 90,
      locale: "en-US",
      options: { style: "unit", unit: "kilometer-per-hour" },
    },
    {
      label: "Large bigint",
      value: BigInt("9007199254740993123"),
      locale: "en-US",
    },
    { label: "Negative zero", value: -0, locale: "en-US" },
    { label: "Not a number", value: NaN, locale: "en-US" },
    { label: "Infinity", value: Infinity, locale: "en-US" },
  ];
  return (
    <dl className="grid gap-3 text-slate-900 dark:text-slate-100 sm:grid-cols-2">
      {examples.map((item) => (
        <div
          key={item.label}
          className="min-w-0 rounded-xl border border-slate-300 p-4 dark:border-slate-700"
        >
          <dt className="mb-2 text-xs font-semibold">{item.label}</dt>
          <dd>
            <NumberText
              data-demo={item.label}
              value={item.value}
              locale={item.locale}
              formatOptions={item.options}
              className="wrap-anywhere"
            />
          </dd>
        </div>
      ))}
    </dl>
  );
}

function NumberPartsDemo() {
  return (
    <div className="space-y-3 text-slate-900 dark:text-slate-100">
      <NumberText
        data-demo="styled-parts"
        value={1234.56}
        locale="fr-FR"
        formatOptions={{ style: "currency", currency: "EUR" }}
        size="xl"
        partClassNames={{
          fraction: "text-sm",
          currency: "text-cyan-700 dark:text-cyan-300",
        }}
      />
      <p className="text-sm">
        Part spans retain the native text and order, including French grouping
        and the space before the currency symbol.
      </p>
    </div>
  );
}

function NumberMotionDemo() {
  return (
    <div className="space-y-4 text-slate-900 dark:text-slate-100">
      <div>
        <p className="mb-2 text-sm">Localized static count</p>
        <NumberText value={1234} locale="en-US" size="lg" />
      </div>
      <div>
        <p className="mb-2 text-sm">Decorative integer motion</p>
        <div aria-hidden="true">
          <AnimatedNumber number={1234} appearance="blue" size="md" />
        </div>
        <span className="sr-only">
          <NumberText value={1234} locale="en-US" /> requests
        </span>
      </div>
      <p className="text-sm">
        AnimatedNumber animates plain digit strings. Its decorative output stays
        separate from the localized accessible count. NumberText itself has no
        Motion dependency.
      </p>
    </div>
  );
}

export function TypographyNumberHero() {
  return <NumberControlsDemo />;
}
export function TypographyNumberExamples({
  section,
}: {
  section: TypographySectionSlug;
}) {
  if (section !== "number-formatting") return null;
  const rows = [
    {
      label: "Explicit locale and currency",
      demo: <NumberControlsDemo />,
      code: controlsSnippet,
    },
    {
      label: "Grouping, currencies, percent, compact, units and edge values",
      demo: <NumberFormatsDemo />,
      code: formatsSnippet,
    },
    {
      label: "Styling native formatter parts",
      demo: <NumberPartsDemo />,
      code: partsSnippet,
    },
    {
      label: "Optional integer motion composition",
      demo: <NumberMotionDemo />,
      code: motionSnippet,
    },
  ];
  return (
    <Section>
      <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
        Numeric presentation
      </h2>
      <p className="mt-3 text-sm leading-7 text-slate-900 dark:text-slate-400">
        Use explicit locales for server-rendered content. The default and final
        locale fallback is en-US. Intl rounds displayed output; it does not
        change the source value or provide a money-storage calculation model.
        NaN, infinity and negative zero retain native localized output.
        NumberText and the hook accept numbers or bigint values and reject
        numeric strings.
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

const controlsSnippet =
  '"use client";\n\nimport { useState } from "react";\nimport { NumberText } from "@zentauri-ui/zentauri-components/ui/typography";\n\nexport default function NumberControlsDemo() {\n  const [locale, setLocale] = useState("en-IN");\n  const [currency, setCurrency] = useState("INR");\n  return (\n    <div className="space-y-5 text-slate-900 dark:text-slate-100">\n      <div className="grid gap-4 sm:grid-cols-2">\n        <label className="block text-sm">\n          Number locale\n          <select\n            value={locale}\n            onChange={(event) => setLocale(event.target.value)}\n            className="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 dark:border-slate-600 dark:bg-slate-900 dark:text-white"\n          >\n            {["en-IN", "en-US", "fr-FR", "ja-JP"].map((item) => (\n              <option key={item} value={item}>\n                {item}\n              </option>\n            ))}\n          </select>\n        </label>\n        <label className="block text-sm">\n          Currency\n          <select\n            value={currency}\n            onChange={(event) => setCurrency(event.target.value)}\n            className="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 dark:border-slate-600 dark:bg-slate-900 dark:text-white"\n          >\n            {["INR", "USD", "EUR", "JPY"].map((item) => (\n              <option key={item} value={item}>\n                {item}\n              </option>\n            ))}\n          </select>\n        </label>\n      </div>\n      <NumberText\n        as="p"\n        data-demo="controlled-number"\n        value={1234567.89}\n        locale={locale}\n        formatOptions={{ style: "currency", currency }}\n        size="xl"\n        className="wrap-anywhere"\n      />\n      <p className="text-sm">\n        The formatter chooses grouping, symbols, spacing and rounding. Changing\n        the currency can change its default fractional precision.\n      </p>\n    </div>\n  );\n}';

const formatsSnippet =
  '"use client";\n\nimport { useState } from "react";\nimport { NumberText } from "@zentauri-ui/zentauri-components/ui/typography";\n\nexport default function NumberFormatsDemo() {\n  const examples: {\n    label: string;\n    value: number | bigint;\n    locale: string;\n    options?: Intl.NumberFormatOptions;\n  }[] = [\n    { label: "US grouping", value: 1234567.89, locale: "en-US" },\n    { label: "Indian grouping", value: 1234567.89, locale: "en-IN" },\n    {\n      label: "USD",\n      value: 1234.5,\n      locale: "en-US",\n      options: { style: "currency", currency: "USD" },\n    },\n    {\n      label: "INR",\n      value: 123456.75,\n      locale: "en-IN",\n      options: { style: "currency", currency: "INR" },\n    },\n    {\n      label: "JPY",\n      value: 1234.5,\n      locale: "ja-JP",\n      options: { style: "currency", currency: "JPY" },\n    },\n    {\n      label: "Percentage",\n      value: 0.125,\n      locale: "en-US",\n      options: { style: "percent", maximumFractionDigits: 1 },\n    },\n    {\n      label: "Compact",\n      value: 1200000,\n      locale: "en-US",\n      options: { notation: "compact" },\n    },\n    {\n      label: "Speed",\n      value: 90,\n      locale: "en-US",\n      options: { style: "unit", unit: "kilometer-per-hour" },\n    },\n    { label: "Large bigint", value: BigInt("9007199254740993123"), locale: "en-US" },\n    { label: "Negative zero", value: -0, locale: "en-US" },\n    { label: "Not a number", value: NaN, locale: "en-US" },\n    { label: "Infinity", value: Infinity, locale: "en-US" },\n  ];\n  return (\n    <dl className="grid gap-3 text-slate-900 dark:text-slate-100 sm:grid-cols-2">\n      {examples.map((item) => (\n        <div\n          key={item.label}\n          className="min-w-0 rounded-xl border border-slate-300 p-4 dark:border-slate-700"\n        >\n          <dt className="mb-2 text-xs font-semibold">{item.label}</dt>\n          <dd>\n            <NumberText\n              data-demo={item.label}\n              value={item.value}\n              locale={item.locale}\n              formatOptions={item.options}\n              className="wrap-anywhere"\n            />\n          </dd>\n        </div>\n      ))}\n    </dl>\n  );\n}';

const partsSnippet =
  '"use client";\n\nimport { useState } from "react";\nimport { NumberText } from "@zentauri-ui/zentauri-components/ui/typography";\n\nexport default function NumberPartsDemo() {\n  return (\n    <div className="space-y-3 text-slate-900 dark:text-slate-100">\n      <NumberText\n        data-demo="styled-parts"\n        value={1234.56}\n        locale="fr-FR"\n        formatOptions={{ style: "currency", currency: "EUR" }}\n        size="xl"\n        partClassNames={{\n          fraction: "text-sm",\n          currency: "text-cyan-700 dark:text-cyan-300",\n        }}\n      />\n      <p className="text-sm">\n        Part spans retain the native text and order, including French grouping\n        and the space before the currency symbol.\n      </p>\n    </div>\n  );\n}';

const motionSnippet =
  '"use client";\n\nimport { useState } from "react";\nimport { NumberText } from "@zentauri-ui/zentauri-components/ui/typography";\nimport { AnimatedNumber } from "@zentauri-ui/zentauri-components/ui/animated-number";\n\nexport default function NumberMotionDemo() {\n  return (\n    <div className="space-y-4 text-slate-900 dark:text-slate-100">\n      <div>\n        <p className="mb-2 text-sm">Localized static count</p>\n        <NumberText value={1234} locale="en-US" size="lg" />\n      </div>\n      <div>\n        <p className="mb-2 text-sm">Decorative integer motion</p>\n        <div aria-hidden="true">\n          <AnimatedNumber number={1234} appearance="blue" size="md" />\n        </div>\n        <span className="sr-only">\n          <NumberText value={1234} locale="en-US" /> requests\n        </span>\n      </div>\n      <p className="text-sm">\n        AnimatedNumber animates plain digit strings. Its decorative output stays\n        separate from the localized accessible count. NumberText itself has no\n        Motion dependency.\n      </p>\n    </div>\n  );\n}';
