import { Section } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { ConsoleViewer } from "@zentauri-ui/zentauri-components/ui/console-viewer";
import type { ConsoleEntry } from "@zentauri-ui/zentauri-components/ui/console-viewer";

const HERO_ENTRIES: ConsoleEntry[] = [
  { type: "info", message: "Zentauri UI library loaded successfully" },
  { type: "log", message: "Building components…" },
  {
    type: "warn",
    message: "Deprecated API: use `appearance` instead of `variant`",
  },
  {
    type: "error",
    message: "Uncaught TypeError: Cannot read properties of undefined",
    stack: "    at Component (file.tsx:42:12)",
  },
  { type: "debug", message: "useEffect dependency array changed" },
  {
    type: "groupCollapsed",
    message: "ConsoleGroup (3)",
    children: [
      { type: "log", message: "Child entry one" },
      { type: "log", message: "Child entry two" },
      { type: "log", message: "Child entry three" },
    ],
  },
  { type: "groupEnd", message: "" },
  { type: "dir", message: "{ name: 'Zentauri', version: '1.0.0' }" },
];

export function ConsoleViewerHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />
      <div className="rounded-3xl border border-slate-900/10 dark:border-white/10 bg-slate-100 dark:bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <ConsoleViewer entries={HERO_ENTRIES} />
      </div>
    </Section>
  );
}
