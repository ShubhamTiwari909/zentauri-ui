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
  "Align documentation with published @zentauri-ui/zentauri-components/hooks/* paths.",
];

const sharedFaqs: PreviewSeoDocument["faqs"] = [
  {
    question: "Can I import this hook from a server component?",
    answer:
      'No. These hooks rely on browser APIs or React client lifecycle. Import them from a file marked with the "use client" directive or from a client child component.',
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

function sharedSections(
  entry: HookPreviewRegistryEntry,
): PreviewSeoDocument["sections"] {
  if (entry.slug === "use-debounced-callback") {
    return [
      {
        heading: "What it does",
        body: "useDebouncedCallback(callback, delayMs) schedules trailing-edge actions. Each call replaces the arguments and restarts the timer. It complements useDebouncedValue: use the value hook for derived state and this hook for delayed actions such as search or autosave.",
      },
      {
        heading: "API notes",
        body: "Returns { debouncedCallback, cancel, flush, isPending }. The three functions keep their identity across renders. flush() invokes pending work immediately and returns the callback result (including a Promise), or undefined when idle. cancel() discards pending work. isPending is reactive timer state; it becomes false when the callback starts, even if an async request is still running. The callback uses the latest committed closure and last scheduled arguments. A finite delay from 0 through 2,147,483,647 ms is required; zero is still asynchronous. A changed delay applies to future calls and preserves an existing deadline. Unmount discards work without flushing. This hook supports trailing calls only; it has no leading-call or max-wait option.",
      },
      {
        heading: "Common use cases",
        body: "Schedule draft saves or delayed search actions after typing pauses. Flush on an explicit Save action and cancel when abandoning a draft. Handle async results and failures inside the callback; cancellation does not stop requests that have already begun.",
      },
      {
        heading: "Accessibility",
        body: "Keep text input updates immediate and debounce the action. Label controls and announce meaningful save status with a polite live region. Do not debounce focus movement or essential keyboard feedback.",
      },
      {
        heading: "Next.js integration notes",
        body: "Import from @zentauri-ui/zentauri-components/hooks/useDebouncedCallback in a client component. Invoke the controls from events or effects, never during render. Extract plain input values before scheduling rather than retaining event objects. No timers are started during server rendering. The hook does not persist pending work across navigation; use a deliberate Save action when data must be committed before leaving.",
      },
    ];
  }
  return [
    {
      heading: "What it does",
      body: `${entry.name} ships as a small client module you can import from @zentauri-ui/zentauri-components/hooks/${entry.module}. Use it when the behavior matches your integration without copying utility code.`,
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
