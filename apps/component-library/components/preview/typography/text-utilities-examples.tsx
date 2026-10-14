"use client";

import { useState } from "react";
import {
  Mark,
  HighlightText,
  TruncateText,
  ExpandableText,
} from "@zentauri-ui/zentauri-components/ui/typography";
import { Section } from "@/components/common/Section";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import type { TypographySectionSlug } from "@/lib/typography-preview-registry";

const sample =
  "Typography should remain readable as the layout changes. Long descriptions can stay compact while giving readers a native button to reveal the complete text. Resize the example to compare line clipping and the overflow disclosure.";

function HighlightDemo() {
  const [query, setQuery] = useState("text");
  return (
    <div className="space-y-5 text-slate-900 dark:text-slate-100">
      <label className="block text-sm">
        Literal search query
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus-visible:outline-2 focus-visible:outline-cyan-500 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
        />
      </label>
      <p>
        Use <Mark>relevance</Mark> to draw attention to a matched passage.
      </p>
      <HighlightText
        text="Text styles keep text readable. A literal query such as [text] is not a regular expression."
        query={query}
      />
      <p>
        <HighlightText
          text="🙂 CAFÉ — café — Σςσ"
          query={["🙂", "café", "σ"]}
        />
      </p>
    </div>
  );
}

function TruncationDemo() {
  const [width, setWidth] = useState(360);
  const [short, setShort] = useState(false);
  const text = short ? "A short description." : sample;
  return (
    <div className="space-y-5 text-slate-900 dark:text-slate-100">
      <label className="block text-sm">
        Example width: {width}px
        <input
          type="range"
          min={160}
          max={640}
          value={width}
          onChange={(event) => setWidth(Number(event.target.value))}
          className="mt-2 block w-full"
        />
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={short}
          onChange={(event) => setShort(event.target.checked)}
        />{" "}
        Use short content
      </label>
      <div
        style={{ width, maxWidth: "100%" }}
        className="min-w-0 space-y-6 rounded-xl border border-slate-300 p-4 dark:border-slate-700"
      >
        <div>
          <p className="mb-2 text-xs font-semibold">One line</p>
          <TruncateText>{text}</TruncateText>
        </div>
        <div>
          <p className="mb-2 text-xs font-semibold">Two lines</p>
          <TruncateText as="p" lines={2}>
            {text}
          </TruncateText>
        </div>
        <div>
          <p className="mb-2 text-xs font-semibold">Expandable description</p>
          <ExpandableText text={text} lines={2} />
        </div>
      </div>
    </div>
  );
}

function ControlledExpansionDemo() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="max-w-sm text-slate-900 dark:text-slate-100">
      <ExpandableText
        text={sample}
        lines={2}
        expanded={expanded}
        onExpandedChange={setExpanded}
        moreLabel="Read description"
        lessLabel="Collapse description"
      />
      <p className="mt-4 text-xs">
        Parent state: {expanded ? "expanded" : "collapsed"}
      </p>
    </div>
  );
}

export function TypographyTextUtilitiesHero({
  section,
}: {
  section: TypographySectionSlug;
}) {
  return section === "highlighting" ? <HighlightDemo /> : <TruncationDemo />;
}

export function TypographyTextUtilitiesExamples({
  section,
}: {
  section: TypographySectionSlug;
}) {
  if (section !== "highlighting" && section !== "truncation") return null;
  const rows =
    section === "highlighting"
      ? [
          {
            label: "Literal relevance highlighting",
            demo: <HighlightDemo />,
            code: highlightSnippet,
          },
        ]
      : [
          {
            label: "CSS clamping and measured disclosure",
            demo: <TruncationDemo />,
            code: truncationSnippet,
          },
          {
            label: "Controlled expansion with localized labels",
            demo: <ControlledExpansionDemo />,
            code: controlledSnippet,
          },
        ];
  return (
    <Section>
      <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
        Text utilities
      </h2>
      <p className="mt-3 text-sm leading-7 text-slate-900 dark:text-slate-400">
        HighlightText uses literal leftmost matches and selects the longest
        query at the same position. Case-insensitive matches use Unicode simple
        case folding, without accent removal or locale-specific equivalence.
        TruncateText retains the complete text in the DOM. ExpandableText
        changes its visual presentation; clipped text remains available to
        assistive technology. Use showToggle=&quot;always&quot; when measurement
        is unavailable.
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

const highlightSnippet =
  '"use client";\n\nimport { useState } from "react";\nimport { Mark, HighlightText, TruncateText, ExpandableText } from "@zentauri-ui/zentauri-components/ui/typography";\n\nexport default function HighlightDemo() {\n  const [query, setQuery] = useState("text");\n  return <div className="space-y-5 text-slate-900 dark:text-slate-100">\n    <label className="block text-sm">Literal search query\n      <input value={query} onChange={(event) => setQuery(event.target.value)} className="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus-visible:outline-2 focus-visible:outline-cyan-500 dark:border-slate-600 dark:bg-slate-900 dark:text-white" />\n    </label>\n    <p>Use <Mark>relevance</Mark> to draw attention to a matched passage.</p>\n    <HighlightText text="Text styles keep text readable. A literal query such as [text] is not a regular expression." query={query} />\n    <p><HighlightText text="\ud83d\ude42 CAF\u00c9 \u2014 caf\u00e9 \u2014 \u03a3\u03c2\u03c3" query={["\ud83d\ude42", "caf\u00e9", "\u03c3"]} /></p>\n  </div>;\n}';

const truncationSnippet =
  '"use client";\n\nimport { useState } from "react";\nimport { Mark, HighlightText, TruncateText, ExpandableText } from "@zentauri-ui/zentauri-components/ui/typography";\n\nconst sample = "Typography should remain readable as the layout changes. Long descriptions can stay compact while giving readers a native button to reveal the complete text. Resize the example to compare line clipping and the overflow disclosure.";\n\nexport default function TruncationDemo() {\n  const [width, setWidth] = useState(360);\n  const [short, setShort] = useState(false);\n  const text = short ? "A short description." : sample;\n  return <div className="space-y-5 text-slate-900 dark:text-slate-100">\n    <label className="block text-sm">Example width: {width}px\n      <input type="range" min={160} max={640} value={width} onChange={(event) => setWidth(Number(event.target.value))} className="mt-2 block w-full" />\n    </label>\n    <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={short} onChange={(event) => setShort(event.target.checked)} /> Use short content</label>\n    <div style={{ width, maxWidth: "100%" }} className="min-w-0 space-y-6 rounded-xl border border-slate-300 p-4 dark:border-slate-700">\n      <div><p className="mb-2 text-xs font-semibold">One line</p><TruncateText>{text}</TruncateText></div>\n      <div><p className="mb-2 text-xs font-semibold">Two lines</p><TruncateText as="p" lines={2}>{text}</TruncateText></div>\n      <div><p className="mb-2 text-xs font-semibold">Expandable description</p><ExpandableText text={text} lines={2} /></div>\n    </div>\n  </div>;\n}';

const controlledSnippet =
  '"use client";\n\nimport { useState } from "react";\nimport { Mark, HighlightText, TruncateText, ExpandableText } from "@zentauri-ui/zentauri-components/ui/typography";\n\nconst sample = "Typography should remain readable as the layout changes. Long descriptions can stay compact while giving readers a native button to reveal the complete text. Resize the example to compare line clipping and the overflow disclosure.";\n\nexport default function ControlledExpansionDemo() {\n  const [expanded, setExpanded] = useState(false);\n  return <div className="max-w-sm text-slate-900 dark:text-slate-100">\n    <ExpandableText text={sample} lines={2} expanded={expanded} onExpandedChange={setExpanded} moreLabel="Read description" lessLabel="Collapse description" />\n    <p className="mt-4 text-xs">Parent state: {expanded ? "expanded" : "collapsed"}</p>\n  </div>;\n}';
