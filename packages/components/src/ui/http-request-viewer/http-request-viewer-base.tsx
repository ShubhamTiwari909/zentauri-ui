"use client";

import { useCallback, useState } from "react";

import { cn } from "../../lib/utils";
import { useClipboard } from "../../hooks/useClipboard";
import { zuiHttpRequestViewerMethodTones } from "../../design-system/http-request-viewer";

import type {
  HttpRequestViewerBaseProps,
  HttpRequestViewerLabels,
  HttpRequestViewerTab,
} from "./types";
import {
  httpRequestViewerActionVariants,
  httpRequestViewerHeaderVariants,
  httpRequestViewerMethodVariants,
  httpRequestViewerTabVariants,
  httpRequestViewerTabsVariants,
  httpRequestViewerVariants,
  zuiHttpRequestViewerBodyBase,
  zuiHttpRequestViewerEmptyBase,
  zuiHttpRequestViewerPanelBase,
  zuiHttpRequestViewerRowBase,
  zuiHttpRequestViewerRowKey,
  zuiHttpRequestViewerRowValue,
  zuiHttpRequestViewerUrlBase,
} from "./variants";

const DEFAULT_LABELS: Required<HttpRequestViewerLabels> = {
  headers: "Headers",
  query: "Query",
  body: "Body",
  copy: "Copy",
  copied: "Copied",
};

export const HTTP_REQUEST_VIEWER_TABS: readonly HttpRequestViewerTab[] = [
  "headers",
  "query",
  "body",
];

type MethodTone = keyof typeof zuiHttpRequestViewerMethodTones;

/** Map an HTTP method to its badge tone, falling back to `neutral`. */
export function httpMethodTone(method: string): MethodTone {
  const upper = String(method).toUpperCase();
  if (upper in zuiHttpRequestViewerMethodTones) {
    return upper as MethodTone;
  }
  return "neutral";
}

/** Pretty-print a request body as JSON, falling back to String(). */
export function formatRequestBody(body: unknown): string {
  try {
    return JSON.stringify(body, null, 2);
  } catch {
    return String(body);
  }
}

function KeyValuePanel({
  slot,
  record,
  emptyLabel,
}: {
  slot: string;
  record: Record<string, string | string[]> | undefined;
  emptyLabel: string;
}) {
  const entries = record ? Object.entries(record) : [];
  if (entries.length === 0) {
    return (
      <p
        data-slot="http-request-viewer-empty"
        className={zuiHttpRequestViewerEmptyBase}
      >
        {emptyLabel}
      </p>
    );
  }
  return (
    <div data-slot={slot}>
      {entries.map(([key, value]) => (
        <div
          key={key}
          data-slot="http-request-viewer-row"
          className={zuiHttpRequestViewerRowBase}
        >
          <span className={zuiHttpRequestViewerRowKey}>{key}:</span>
          <span className={zuiHttpRequestViewerRowValue}>
            {Array.isArray(value) ? value.join(", ") : value}
          </span>
        </div>
      ))}
    </div>
  );
}

export function HttpRequestViewerCopyButton({
  labels,
  getCopyText,
}: {
  labels: Required<HttpRequestViewerLabels>;
  getCopyText: () => string;
}) {
  const { copied, copy } = useClipboard(2000);

  const handleCopy = useCallback(async () => {
    await copy(getCopyText());
  }, [copy, getCopyText]);

  return (
    <button
      type="button"
      data-slot="http-request-viewer-copy"
      className={httpRequestViewerActionVariants()}
      onClick={handleCopy}
    >
      {copied ? labels.copied : labels.copy}
    </button>
  );
}

export function HttpRequestViewerTabs({
  tab,
  labels,
  onSelect,
}: {
  tab: HttpRequestViewerTab;
  labels: Required<HttpRequestViewerLabels>;
  onSelect: (tab: HttpRequestViewerTab) => void;
}) {
  return (
    <div
      role="tablist"
      data-slot="http-request-viewer-tabs"
      className={httpRequestViewerTabsVariants()}
    >
      {HTTP_REQUEST_VIEWER_TABS.map((value) => {
        const active = tab === value;
        return (
          <button
            key={value}
            role="tab"
            type="button"
            data-slot="http-request-viewer-tab"
            data-active={active}
            aria-selected={active}
            className={httpRequestViewerTabVariants({
              state: active ? "active" : "inactive",
            })}
            onClick={() => onSelect(value)}
          >
            {labels[value]}
          </button>
        );
      })}
    </div>
  );
}

/** Render the active panel's content. Shared by the static and animated viewers. */
export function HttpRequestViewerPanelContent({
  tab,
  headers,
  query,
  body,
}: {
  tab: HttpRequestViewerTab;
  headers?: Record<string, string>;
  query?: Record<string, string | string[]>;
  body?: unknown;
}) {
  if (tab === "headers") {
    return (
      <KeyValuePanel
        slot="http-request-viewer-headers"
        record={headers}
        emptyLabel="No headers"
      />
    );
  }
  if (tab === "query") {
    return (
      <KeyValuePanel
        slot="http-request-viewer-query"
        record={query}
        emptyLabel="No query parameters"
      />
    );
  }
  if (body === undefined) {
    return (
      <p
        data-slot="http-request-viewer-empty"
        className={zuiHttpRequestViewerEmptyBase}
      >
        No body
      </p>
    );
  }
  return (
    <pre
      data-slot="http-request-viewer-body"
      className={zuiHttpRequestViewerBodyBase}
    >
      {formatRequestBody(body)}
    </pre>
  );
}

export function HttpRequestViewerBase({
  method,
  url,
  headers,
  query,
  body,
  appearance,
  size,
  defaultTab = "headers",
  enableClipboard = true,
  labels,
  className,
  ref,
  ...rest
}: HttpRequestViewerBaseProps) {
  const mergedLabels = { ...DEFAULT_LABELS, ...labels };
  const [tab, setTab] = useState<HttpRequestViewerTab>(defaultTab);

  const getCopyText = useCallback(() => {
    if (body !== undefined) return formatRequestBody(body);
    return `${String(method).toUpperCase()} ${url}`;
  }, [body, method, url]);

  return (
    <div
      ref={ref}
      data-slot="http-request-viewer"
      className={cn(httpRequestViewerVariants({ appearance, size }), className)}
      {...rest}
    >
      <div
        data-slot="http-request-viewer-header"
        className={httpRequestViewerHeaderVariants()}
      >
        <span
          data-slot="http-request-viewer-method"
          data-method={String(method).toUpperCase()}
          className={httpRequestViewerMethodVariants({
            tone: httpMethodTone(method),
          })}
        >
          {String(method).toUpperCase()}
        </span>
        <span
          data-slot="http-request-viewer-url"
          className={zuiHttpRequestViewerUrlBase}
        >
          {url}
        </span>
        {enableClipboard && (
          <HttpRequestViewerCopyButton
            labels={mergedLabels}
            getCopyText={getCopyText}
          />
        )}
      </div>
      <HttpRequestViewerTabs
        tab={tab}
        labels={mergedLabels}
        onSelect={setTab}
      />
      <div
        data-slot="http-request-viewer-panel"
        className={zuiHttpRequestViewerPanelBase}
      >
        <HttpRequestViewerPanelContent
          tab={tab}
          headers={headers}
          query={query}
          body={body}
        />
      </div>
    </div>
  );
}

HttpRequestViewerBase.displayName = "HttpRequestViewer";
