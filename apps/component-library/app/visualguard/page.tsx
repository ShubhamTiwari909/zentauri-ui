import type { Metadata } from "next";
import Link from "next/link";
import {
  FiArrowRight,
  FiCheckCircle,
  FiGithub,
  FiLayers,
  FiMonitor,
  FiShield,
  FiTerminal,
} from "react-icons/fi";

import { SiteHeader } from "@/components/common/site-header";
import { getPreviewSiteUrl } from "@/lib/utils";

const repository = "https://github.com/ShubhamTiwari909/visualguard-ai-testing";
const description =
  "VisualGuard is an open-source visual testing package by Shubham Tiwari. Compare interfaces with Playwright, inspect changes, and add optional AI analysis.";

export const metadata: Metadata = {
  metadataBase: new URL(getPreviewSiteUrl()),
  title: "VisualGuard — Open-source visual testing | Zentauri UI",
  description,
  alternates: { canonical: "/visualguard" },
  openGraph: {
    title: "VisualGuard — Open-source visual testing",
    description,
    url: "/visualguard",
    type: "website",
  },
  twitter: { card: "summary", title: "VisualGuard", description },
};

const capabilities = [
  {
    icon: FiLayers,
    title: "Compare your interfaces",
    body: "Compare two environments, saved baselines, or checkpoints in Playwright tests.",
  },
  {
    icon: FiMonitor,
    title: "Cover different screens",
    body: "Configure viewports and browser settings to inspect responsive changes.",
  },
  {
    icon: FiCheckCircle,
    title: "Inspect the evidence",
    body: "Review screenshots, pixel differences, and DOM findings together in an interactive report.",
  },
  {
    icon: FiShield,
    title: "Choose optional AI",
    body: "Use deterministic comparisons on their own, or add Gemini or Ollama analysis.",
  },
];

const setup = `npm install -D visualguard playwright
npx playwright install chromium
npx visualguard init
npx visualguard doctor
npx visualguard test
npx visualguard report`;

const focus =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950";

export default function VisualGuardPage() {
  return (
    <div className="flex flex-1 flex-col bg-slate-950 text-slate-50">
      <SiteHeader />
      <main id="visualguard-main" className="min-w-0">
        <section
          aria-labelledby="visualguard-title"
          className="border-b border-white/10 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.12),transparent_60%)]"
        >
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:py-24">
            <div>
              <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/5 px-3 py-1.5 text-xs font-medium text-emerald-200">
                <FiShield aria-hidden /> Open source · MIT license
              </p>
              <h1
                id="visualguard-title"
                className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
              >
                VisualGuard
              </h1>
              <p className="mt-4 max-w-xl text-2xl leading-snug tracking-tight text-slate-200 sm:text-3xl">
                See what changed.
                <br />
                Review with confidence.
              </p>
              <p className="mt-6 max-w-xl text-base leading-7 text-slate-400">
                An open-source visual testing package by Shubham Tiwari, the
                creator of Zentauri UI. Bring visual evidence into your
                development workflow.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={repository}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 rounded-xl bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 ${focus}`}
                >
                  <FiGithub aria-hidden /> View on GitHub
                </a>
                <a
                  href="#getting-started"
                  className={`inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/5 ${focus}`}
                >
                  Get started <FiArrowRight aria-hidden />
                </a>
              </div>
            </div>
            <aside
              aria-label="Visual testing workflow"
              className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-2xl shadow-black/20 sm:p-8"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">
                A review workflow
              </p>
              <ol className="mt-7 space-y-6">
                {[
                  [
                    "01",
                    "Choose a reference",
                    "A deployed site or a saved baseline.",
                  ],
                  [
                    "02",
                    "Capture the candidate",
                    "The same route, state, and viewport.",
                  ],
                  [
                    "03",
                    "Review the difference",
                    "Inspect evidence before accepting a change.",
                  ],
                ].map(([number, title, body]) => (
                  <li key={number} className="flex gap-4">
                    <span
                      className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-emerald-300/20 bg-emerald-300/5 font-mono text-xs text-emerald-200"
                      aria-hidden
                    >
                      {number}
                    </span>
                    <div>
                      <p className="font-medium text-slate-100">{title}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-400">
                        {body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </aside>
          </div>
        </section>

        <section
          aria-labelledby="capabilities-title"
          className="mx-auto max-w-6xl px-5 py-16 sm:px-8"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
            What it does
          </p>
          <h2
            id="capabilities-title"
            className="mt-3 text-3xl font-semibold tracking-tight"
          >
            A closer look at your UI.
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {capabilities.map(({ icon: Icon, title, body }) => (
              <article
                key={title}
                className="rounded-xl border border-white/10 bg-white/[0.02] p-6"
              >
                <Icon aria-hidden className="mb-5 size-5 text-cyan-200" />
                <h3 className="text-lg font-medium">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-400">{body}</p>
              </article>
            ))}
          </div>
          <p className="mt-5 text-sm leading-6 text-slate-400">
            These capabilities reflect the{" "}
            <a
              href={`${repository}#readme`}
              className={`rounded-sm text-cyan-200 underline underline-offset-4 ${focus}`}
            >
              current source documentation
            </a>
            . Check the documentation for your installed version; the source
            README includes changes planned for a future major release.
          </p>
        </section>

        <section
          id="getting-started"
          aria-labelledby="setup-title"
          className="scroll-mt-28 border-y border-white/10 bg-white/[0.02]"
        >
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
                Getting started
              </p>
              <h2
                id="setup-title"
                className="mt-3 text-3xl font-semibold tracking-tight"
              >
                Start with a visual check.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-400">
                The current source requires Node.js 22.12 or newer and
                Playwright browser binaries. After initialization, set your URLs
                and routes before running a comparison.
              </p>
              <a
                href={`${repository}/blob/main/PUBLISHING-AND-USING.md`}
                className={`mt-6 inline-flex items-center gap-2 rounded-sm text-sm text-cyan-200 underline underline-offset-4 ${focus}`}
              >
                Installation guide <FiArrowRight aria-hidden />
              </a>
            </div>
            <div className="min-w-0 overflow-hidden rounded-xl border border-white/10 bg-slate-950">
              <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3 text-xs text-slate-400">
                <FiTerminal aria-hidden /> Quick start from the source README
              </div>
              <pre
                tabIndex={0}
                aria-label="VisualGuard setup commands"
                className={`overflow-x-auto p-5 text-sm leading-8 text-emerald-200 ${focus}`}
              >
                <code>{setup}</code>
              </pre>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="zentauri-workflow-title"
          className="mx-auto max-w-6xl px-5 py-16 sm:px-8"
        >
          <div className="rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.03] p-6 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
              Alongside Zentauri UI
            </p>
            <h2
              id="zentauri-workflow-title"
              className="mt-3 text-3xl font-semibold tracking-tight"
            >
              Build the component. Review its appearance.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">
              Use typography previews as candidates for visual checks when
              changing font scales, content rhythm, or responsive layouts. Our
              typography plan includes VisualGuard coverage as a follow-up
              verification step.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-4">
              <Link
                href="/preview/typography"
                className={`inline-flex items-center gap-2 rounded-sm text-sm font-medium text-cyan-200 ${focus}`}
              >
                Explore typography <FiArrowRight aria-hidden />
              </Link>
              <a
                href={`${repository}/blob/main/CONTRIBUTING.md`}
                className={`inline-flex items-center gap-2 rounded-sm text-sm font-medium text-cyan-200 ${focus}`}
              >
                Contribute to VisualGuard <FiArrowRight aria-hidden />
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
