import { Section } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { LogViewer } from "@zentauri-ui/zentauri-components/ui/log-viewer";
import type { LogEntry } from "@zentauri-ui/zentauri-components/ui/log-viewer";

const HERO_ENTRIES: LogEntry[] = [
  {
    level: "info",
    timestamp: "2025-06-01T10:00:00.000Z",
    message: "Application started successfully",
    meta: "port=3000",
  },
  {
    level: "info",
    timestamp: "2025-06-01T10:00:01.200Z",
    message: "Connected to database",
    meta: "host=db.internal, latency=4ms",
  },
  {
    level: "warn",
    timestamp: "2025-06-01T10:00:02.100Z",
    message: "Rate limit approaching threshold",
    meta: "current=950/1000 req/min",
  },
  {
    level: "info",
    timestamp: "2025-06-01T10:00:03.500Z",
    message: "GET /api/users/8f21 — 200 OK",
    meta: "duration=42ms",
  },
  {
    level: "info",
    timestamp: "2025-06-01T10:00:04.000Z",
    message: "GET /api/health — 200 OK",
    meta: "duration=8ms",
  },
  {
    level: "error",
    timestamp: "2025-06-01T10:00:05.800Z",
    message: "Unhandled promise rejection",
    meta: "TypeError: Cannot read properties of undefined",
    stack:
      "  at Query.execute (/app/src/db/query.ts:48:12)\n  at processTicksAndRejections (node:internal/process/task_queues:95:5)",
  },
  {
    level: "debug",
    timestamp: "2025-06-01T10:00:06.100Z",
    message: "Retry attempt 1/3 for query #a3f8",
  },
  {
    level: "info",
    timestamp: "2025-06-01T10:00:07.200Z",
    message: "Retry succeeded — query #a3f8 completed",
    meta: "duration=120ms",
  },
];

export function LogViewerHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />
      <div className="rounded-3xl border border-slate-900/10 dark:border-white/10 bg-slate-100 dark:bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <LogViewer
          entries={HERO_ENTRIES}
          showSummary
          enableSearch
          enableClipboard
        />
      </div>
    </Section>
  );
}
