"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "../../lib/utils";

import type {
  ApiResponseStatusTone,
  ApiResponseViewerBaseProps,
  ApiResponseViewerLabels,
  ApiResponseViewerTab,
} from "./types";
import {
  apiResponseViewerHeaderVariants,
  apiResponseViewerStatusVariants,
  apiResponseViewerTabsVariants,
  apiResponseViewerVariants,
  zuiApiResponseViewerActionBase,
  zuiApiResponseViewerBodyBase,
  zuiApiResponseViewerEmpty,
  zuiApiResponseViewerHeaderKey,
  zuiApiResponseViewerHeaderValue,
  zuiApiResponseViewerMetaBase,
  zuiApiResponseViewerMethodBase,
  zuiApiResponseViewerPanelBase,
  zuiApiResponseViewerTabActive,
  zuiApiResponseViewerTabBase,
  zuiApiResponseViewerUrlBase,
} from "./variants";

const DEFAULT_LABELS: Required<ApiResponseViewerLabels> = {
  copy: "Copy",
  copied: "Copied",
  bodyTab: "Body",
  headersTab: "Headers",
};

/** A small map of common HTTP reason phrases used when `statusText` is omitted. */
const REASON_PHRASES: Record<number, string> = {
  100: "Continue",
  101: "Switching Protocols",
  200: "OK",
  201: "Created",
  202: "Accepted",
  204: "No Content",
  301: "Moved Permanently",
  302: "Found",
  304: "Not Modified",
  307: "Temporary Redirect",
  308: "Permanent Redirect",
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  409: "Conflict",
  410: "Gone",
  422: "Unprocessable Entity",
  429: "Too Many Requests",
  500: "Internal Server Error",
  501: "Not Implemented",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout",
};

/** Coarse, human label for a status class, used as the last reason-phrase fallback. */
function statusClassLabel(status: number): string {
  switch (apiResponseStatusTone(status)) {
    case "info":
      return "Informational";
    case "success":
      return "Success";
    case "redirect":
      return "Redirect";
    case "clientError":
      return "Client Error";
    case "serverError":
      return "Server Error";
    default:
      return "Unknown";
  }
}

/** Derive the semantic tone of an HTTP status code. */
export function apiResponseStatusTone(status: number): ApiResponseStatusTone {
  if (status >= 100 && status < 200) return "info";
  if (status >= 200 && status < 300) return "success";
  if (status >= 300 && status < 400) return "redirect";
  if (status >= 400 && status < 500) return "clientError";
  if (status >= 500 && status < 600) return "serverError";
  return "neutral";
}

/** Resolve a reason phrase: explicit text, then the common-codes map, then the class label. */
export function apiResponseReasonPhrase(
  status: number,
  statusText?: string,
): string {
  if (statusText && statusText.trim()) return statusText;
  return REASON_PHRASES[status] ?? statusClassLabel(status);
}

/** Pretty-print a response body as JSON, falling back to String() for non-serializable values. */
export function formatApiResponseBody(body: unknown): string {
  if (body === undefined) return "";
  try {
    return JSON.stringify(body, null, 2);
  } catch {
    return String(body);
  }
}

/** Header strip: method badge, status pill, url, and meta (time / size). Shared by both entries. */
export function ApiResponseViewerHeader({
  status,
  statusText,
  method,
  url,
  time,
  responseSize,
}: {
  status: number;
  statusText?: string;
  method?: string;
  url?: string;
  time?: number;
  responseSize?: string;
}) {
  const tone = apiResponseStatusTone(status);
  const reason = apiResponseReasonPhrase(status, statusText);
  const hasMeta =
    time !== undefined || (responseSize !== undefined && responseSize !== "");

  return (
    <div
      data-slot="api-response-viewer-header"
      className={apiResponseViewerHeaderVariants()}
    >
      {method && (
        <span
          data-slot="api-response-viewer-method"
          className={zuiApiResponseViewerMethodBase}
        >
          {method}
        </span>
      )}
      <span
        data-slot="api-response-viewer-status"
        data-tone={tone}
        className={apiResponseViewerStatusVariants({ tone })}
      >
        {status} {reason}
      </span>
      {url && (
        <span
          data-slot="api-response-viewer-url"
          className={zuiApiResponseViewerUrlBase}
          title={url}
        >
          {url}
        </span>
      )}
      {hasMeta && (
        <span
          data-slot="api-response-viewer-meta"
          className={zuiApiResponseViewerMetaBase}
        >
          {time !== undefined && <span>{time} ms</span>}
          {responseSize !== undefined && responseSize !== "" && (
            <span>{responseSize}</span>
          )}
        </span>
      )}
    </div>
  );
}

/** Tabs row with Body / Headers buttons and an optional copy action. Shared by both entries. */
export function ApiResponseViewerTabs({
  active,
  onSelect,
  labels,
  enableClipboard,
  onCopy,
  copied,
}: {
  active: ApiResponseViewerTab;
  onSelect: (tab: ApiResponseViewerTab) => void;
  labels: Required<ApiResponseViewerLabels>;
  enableClipboard: boolean;
  onCopy: () => void;
  copied: boolean;
}) {
  return (
    <div
      data-slot="api-response-viewer-tabs"
      className={apiResponseViewerTabsVariants()}
    >
      <button
        type="button"
        data-slot="api-response-viewer-tab"
        data-active={active === "body"}
        aria-selected={active === "body"}
        className={cn(
          zuiApiResponseViewerTabBase,
          active === "body" && zuiApiResponseViewerTabActive,
        )}
        onClick={() => onSelect("body")}
      >
        {labels.bodyTab}
      </button>
      <button
        type="button"
        data-slot="api-response-viewer-tab"
        data-active={active === "headers"}
        aria-selected={active === "headers"}
        className={cn(
          zuiApiResponseViewerTabBase,
          active === "headers" && zuiApiResponseViewerTabActive,
        )}
        onClick={() => onSelect("headers")}
      >
        {labels.headersTab}
      </button>
      {enableClipboard && (
        <button
          type="button"
          data-slot="api-response-viewer-copy"
          className={zuiApiResponseViewerActionBase}
          onClick={onCopy}
        >
          {copied ? labels.copied : labels.copy}
        </button>
      )}
    </div>
  );
}

/** Pretty-printed JSON body panel content. */
export function ApiResponseViewerBody({ body }: { body: unknown }) {
  return (
    <pre
      data-slot="api-response-viewer-body"
      className={zuiApiResponseViewerBodyBase}
    >
      {formatApiResponseBody(body)}
    </pre>
  );
}

/** Definition-list rows of header key / value pairs. */
export function ApiResponseViewerHeaders({
  headers,
}: {
  headers?: Record<string, string>;
}) {
  const entries = headers ? Object.entries(headers) : [];
  if (entries.length === 0) {
    return (
      <p
        data-slot="api-response-viewer-headers-empty"
        className={zuiApiResponseViewerEmpty}
      >
        No headers
      </p>
    );
  }
  return (
    <dl data-slot="api-response-viewer-headers" className="grid gap-1">
      {entries.map(([key, value]) => (
        <div key={key} className="flex flex-wrap gap-x-2 gap-y-0.5">
          <dt className={zuiApiResponseViewerHeaderKey}>{key}:</dt>
          <dd className={zuiApiResponseViewerHeaderValue}>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Manage the copy-to-clipboard state for the pretty body. Shared by both entries. */
export function useApiResponseCopy(getCopyText: () => string) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(getCopyText());
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [getCopyText]);

  return { copied, handleCopy };
}

export function ApiResponseViewerBaseComponent({
  status,
  statusText,
  method,
  url,
  time,
  size,
  responseSize,
  headers,
  body,
  appearance,
  defaultTab = "body",
  enableClipboard = true,
  labels,
  className,
  ref,
  ...rest
}: ApiResponseViewerBaseProps) {
  const mergedLabels = { ...DEFAULT_LABELS, ...labels };
  const [active, setActive] = useState<ApiResponseViewerTab>(defaultTab);
  const getCopyText = useCallback(() => formatApiResponseBody(body), [body]);
  const { copied, handleCopy } = useApiResponseCopy(getCopyText);

  return (
    <div
      ref={ref}
      data-slot="api-response-viewer"
      className={cn(apiResponseViewerVariants({ appearance, size }), className)}
      {...rest}
    >
      <ApiResponseViewerHeader
        status={status}
        statusText={statusText}
        method={method}
        url={url}
        time={time}
        responseSize={responseSize}
      />
      <ApiResponseViewerTabs
        active={active}
        onSelect={setActive}
        labels={mergedLabels}
        enableClipboard={enableClipboard}
        onCopy={handleCopy}
        copied={copied}
      />
      <div
        data-slot="api-response-viewer-panel"
        className={zuiApiResponseViewerPanelBase}
      >
        {active === "body" ? (
          <ApiResponseViewerBody body={body} />
        ) : (
          <ApiResponseViewerHeaders headers={headers} />
        )}
      </div>
    </div>
  );
}

ApiResponseViewerBaseComponent.displayName = "ApiResponseViewer";
