import type { PreviewSeoDocument } from "@/lib/preview-seo";
import {
  getHookPreviewEntry,
  type HookPreviewRegistryEntry,
  type HookPreviewSlug,
} from "@/lib/hook-preview-registry";

const sharedHeadingsH2 = [
  "What it does",
  "API notes",
  "Common use cases",
  "Accessibility",
  "Next.js integration notes",
  "FAQ",
] as const;

const sharedUseCases = [
  "Reuse the same hook in client components across Next.js App Router routes.",
  "Keep server components free of browser APIs; colocate interactive demos in client files.",
  "Compose hooks with Zentauri UI primitives for overlays, forms, and data views.",
  "Align documentation with published @zentauri-ui/zentauri-components/lib/* paths.",
];

const sharedFaqs: PreviewSeoDocument["faqs"] = [
  {
    question: "Can I import this hook from a server component?",
    answer:
      "No. These hooks rely on browser APIs or React client lifecycle. Import them from a file marked with the \"use client\" directive or from a client child component.",
  },
  {
    question: "Does the preview site bundle the same code as npm?",
    answer:
      "The component library app depends on the workspace package. Published builds resolve the same export paths under @zentauri-ui/zentauri-components.",
  },
  {
    question: "Where should I validate accessibility for hook-driven UI?",
    answer:
      "Hooks do not replace semantics. Test focus order, labels, and keyboard flows in your real layout with assistive technologies you support.",
  },
];

function sharedSections(entry: HookPreviewRegistryEntry): PreviewSeoDocument["sections"] {
  return [
    {
      heading: "What it does",
      body: `${entry.name} ships as a small client module you can import from @zentauri-ui/zentauri-components/lib/${entry.module}. Use it when the behavior matches your integration without copying utility code.`,
    },
    {
      heading: "API notes",
      body: "Read the interactive demo on this page for the parameters used in typical flows. Refer to TypeScript types exported next to the hook for exhaustive options.",
    },
    {
      heading: "Common use cases",
      body: "",
    },
    {
      heading: "Accessibility",
      body: "Hooks manipulate behavior, not roles. Pair them with appropriate elements, ARIA attributes, and keyboard handlers so assistive technologies receive a coherent experience.",
    },
    {
      heading: "Next.js integration notes",
      body: "Keep interactive subtrees in client components. When you only need static copy, leave it in the server layout and pass children into a client boundary that calls the hook.",
    },
  ];
}

export function getHookPreviewSeo(slug: HookPreviewSlug): PreviewSeoDocument {
  const entry = getHookPreviewEntry(slug);
  const path = `/preview/hooks/${slug}`;
  const title = `${entry.name} · Zentauri UI hooks`;
  const ogTitle = `${entry.name} · Zentauri UI`;

  return {
    category: "Hooks",
    title,
    description: entry.description,
    keywords: [
      entry.name,
      "React hook",
      "Zentauri UI",
      "Next.js",
      "client component",
      "TypeScript",
    ],
    og: {
      title: ogTitle,
      description: entry.description,
      type: "website",
    },
    twitter: {
      title: ogTitle,
      description: entry.description,
      card: "summary_large_image",
    },
    canonicalPath: path,
    headings: {
      h1: entry.name,
      h2: [...sharedHeadingsH2],
    },
    intro: entry.intro,
    useCases: sharedUseCases,
    faqs: sharedFaqs,
    sections: sharedSections(entry),
    useCasesSectionHeading: "Common use cases",
  };
}
