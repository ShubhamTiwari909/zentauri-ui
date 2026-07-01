import type {
  LogViewerProps,
  LogEntry,
} from "@zentauri-ui/zentauri-components/ui/log-viewer";
import type { LogViewerAnimation } from "@zentauri-ui/zentauri-components/ui/log-viewer/animated";

export const LOG_VIEWER_APPEARANCES = [
  "default",
  "subtle",
  "contrast",
  "glass",
] as const satisfies readonly NonNullable<LogViewerProps["appearance"]>[];

export const LOG_VIEWER_SIZES = [
  "sm",
  "md",
  "lg",
] as const satisfies readonly NonNullable<LogViewerProps["size"]>[];

export const LOG_VIEWER_ANIMATIONS = [
  "none",
  "fade",
  "stagger",
] as const satisfies readonly LogViewerAnimation[];

/** Sample datasets the playground can render. */
export const LOG_VIEWER_DATASETS = {
  Startup: [
    {
      level: "info",
      timestamp: "2025-06-01T10:00:00.000Z",
      message: "Application starting…",
      meta: "mode=production",
    },
    {
      level: "info",
      timestamp: "2025-06-01T10:00:01.200Z",
      message: "Connected to database",
      meta: "host=db.internal, latency=4ms",
    },
    {
      level: "info",
      timestamp: "2025-06-01T10:00:02.100Z",
      message: "Listening on port 3000",
      meta: "host=0.0.0.0",
    },
  ] satisfies readonly LogEntry[],

  Errors: [
    {
      level: "error",
      timestamp: "2025-06-01T10:05:00.000Z",
      message: "Unhandled promise rejection",
      meta: "TypeError: Cannot read properties of undefined",
      stack:
        "  at Query.execute (/app/src/db/query.ts:48:12)\n  at processTicksAndRejections (node:internal/process/task_queues:95:5)",
    },
    {
      level: "warn",
      timestamp: "2025-06-01T10:05:01.000Z",
      message: "Retry attempt 1/3 for query #a3f8",
    },
    {
      level: "info",
      timestamp: "2025-06-01T10:05:02.500Z",
      message: "Retry succeeded — query #a3f8 completed",
      meta: "duration=120ms",
    },
    {
      level: "error",
      timestamp: "2025-06-01T10:06:00.000Z",
      message: "HTTP 500 on POST /api/orders",
      meta: "stack trace truncated",
    },
  ] satisfies readonly LogEntry[],

  Debug: [
    {
      level: "debug",
      timestamp: "2025-06-01T10:10:00.000Z",
      message: "Cache miss for key user:8f21",
      meta: "duration=2ms",
    },
    {
      level: "debug",
      timestamp: "2025-06-01T10:10:00.010Z",
      message: "Fetching from database",
      meta: "query=SELECT * FROM users WHERE id = $1",
    },
    {
      level: "verbose",
      timestamp: "2025-06-01T10:10:00.020Z",
      message: "Result set: 1 row(s)",
      meta: "rows=1",
    },
    {
      level: "debug",
      timestamp: "2025-06-01T10:10:00.030Z",
      message: "Setting cache key user:8f21",
      meta: "ttl=300s",
    },
  ] satisfies readonly LogEntry[],

  Mixed: [
    {
      level: "info",
      timestamp: "2025-06-01T10:15:00.000Z",
      message: "GET /api/health — 200 OK",
      meta: "duration=4ms",
    },
    {
      level: "info",
      timestamp: "2025-06-01T10:15:01.000Z",
      message: "GET /api/users — 200 OK",
      meta: "duration=32ms, count=12",
    },
    {
      level: "warn",
      timestamp: "2025-06-01T10:15:02.000Z",
      message: "Rate limit approaching threshold",
      meta: "current=950/1000 req/min",
    },
    {
      level: "info",
      timestamp: "2025-06-01T10:15:03.000Z",
      message: "POST /api/orders — 201 Created",
      meta: "duration=120ms, order_id=ord_42",
    },
  ] satisfies readonly LogEntry[],
} as const satisfies Record<string, readonly LogEntry[]>;

export const LOG_VIEWER_DATASET_KEYS = Object.keys(
  LOG_VIEWER_DATASETS,
) as readonly (keyof typeof LOG_VIEWER_DATASETS)[];
