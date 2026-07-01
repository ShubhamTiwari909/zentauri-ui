"use client";

import { useState } from "react";

import { cn } from "../../lib/utils";

import type {
  ApiEndpointCardBaseProps,
  ApiEndpointCardLabels,
  ApiEndpointMethod,
  EndpointExample,
} from "./types";
import {
  apiEndpointCardDescriptionVariants,
  apiEndpointCardExampleVariants,
  apiEndpointCardHeaderVariants,
  apiEndpointCardMethodVariants,
  apiEndpointCardPathVariants,
  apiEndpointCardTagVariants,
  apiEndpointCardTagsVariants,
  apiEndpointCardVariants,
  zuiApiEndpointCardMethodTones,
} from "./variants";

export const API_METHODS: readonly ApiEndpointMethod[] = [
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
  "HEAD",
  "OPTIONS",
];

type MethodTone = keyof typeof zuiApiEndpointCardMethodTones;

export function apiMethodTone(method: string): MethodTone {
  const upper = String(method).toUpperCase();
  if (upper in zuiApiEndpointCardMethodTones) {
    return upper as MethodTone;
  }
  return "neutral";
}

function formatExampleBody(body: unknown): string {
  if (body === undefined) return "";
  try {
    const result = JSON.stringify(body, null, 2);
    return result ?? String(body);
  } catch {
    return String(body);
  }
}

const DEFAULT_LABELS: Required<ApiEndpointCardLabels> = {
  request: "Request",
  response: "Response",
};

export function ApiEndpointCardHeader({
  method,
  path,
}: {
  method: ApiEndpointMethod;
  path: string;
}) {
  return (
    <div
      data-slot="api-endpoint-card-header"
      className={apiEndpointCardHeaderVariants()}
    >
      <span
        data-slot="api-endpoint-card-method"
        data-method={String(method).toUpperCase()}
        className={apiEndpointCardMethodVariants({
          tone: apiMethodTone(method),
        })}
      >
        {String(method).toUpperCase()}
      </span>
      <span
        data-slot="api-endpoint-card-path"
        className={apiEndpointCardPathVariants()}
      >
        {path}
      </span>
    </div>
  );
}

ApiEndpointCardHeader.displayName = "ApiEndpointCardHeader";

export function ApiEndpointCardTags({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null;
  return (
    <div
      data-slot="api-endpoint-card-tags"
      className={apiEndpointCardTagsVariants()}
    >
      {tags.map((tag) => (
        <span
          key={tag}
          data-slot="api-endpoint-card-tag"
          className={apiEndpointCardTagVariants()}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

ApiEndpointCardTags.displayName = "ApiEndpointCardTags";

export function ApiEndpointCardExample({
  example,
  labels,
}: {
  example: EndpointExample;
  labels: Required<ApiEndpointCardLabels>;
}) {
  const [expanded, setExpanded] = useState(false);
  const hasRequest = example.requestBody !== undefined;
  const hasResponse = example.responseBody !== undefined;

  if (!hasRequest && !hasResponse) return null;

  return (
    <div data-slot="api-endpoint-card-example-section" className="px-3 pb-2">
      {example.title && (
        <p
          data-slot="api-endpoint-card-example-title"
          className="text-xs font-medium text-[color:var(--zui-fg-muted)] dark:text-[color:var(--zui-fg-muted-dark)] mb-1"
        >
          {example.title}
        </p>
      )}
      <button
        type="button"
        data-slot="api-endpoint-card-example-toggle"
        className={apiEndpointCardExampleVariants()}
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
      >
        {expanded ? "Hide" : "Show"} examples
      </button>
      {expanded && (
        <div
          data-slot="api-endpoint-card-example-content"
          className="mt-2 space-y-2"
        >
          {hasRequest && (
            <div>
              <p
                data-slot="api-endpoint-card-example-label"
                className="text-xs font-semibold mb-1 text-[color:var(--zui-fg-muted)] dark:text-[color:var(--zui-fg-muted-dark)]"
              >
                {labels.request}
              </p>
              <pre
                data-slot="api-endpoint-card-example-body"
                className="rounded-md border border-[color:var(--zui-border,#0000001a)] dark:border-[color:var(--zui-border-dark,#ffffff1a)] bg-[var(--zui-surface-muted)] dark:bg-[var(--zui-surface-muted-dark)] p-3 text-xs overflow-x-auto"
              >
                <code>{formatExampleBody(example.requestBody)}</code>
              </pre>
            </div>
          )}
          {hasResponse && (
            <div>
              <p
                data-slot="api-endpoint-card-example-label"
                className="text-xs font-semibold mb-1 text-[color:var(--zui-fg-muted)] dark:text-[color:var(--zui-fg-muted-dark)]"
              >
                {labels.response}
              </p>
              <pre
                data-slot="api-endpoint-card-example-body"
                className="rounded-md border border-[color:var(--zui-border,#0000001a)] dark:border-[color:var(--zui-border-dark,#ffffff1a)] bg-[var(--zui-surface-muted)] dark:bg-[var(--zui-surface-muted-dark)] p-3 text-xs overflow-x-auto"
              >
                <code>{formatExampleBody(example.responseBody)}</code>
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

ApiEndpointCardExample.displayName = "ApiEndpointCardExample";

export function ApiEndpointCardBase({
  method,
  path,
  description,
  tags,
  examples,
  appearance,
  size,
  showTags = true,
  showExamples = true,
  labels,
  className,
  ref,
  ...rest
}: ApiEndpointCardBaseProps) {
  const mergedLabels = { ...DEFAULT_LABELS, ...labels };

  return (
    <div
      ref={ref}
      data-slot="api-endpoint-card"
      className={cn(apiEndpointCardVariants({ appearance, size }), className)}
      {...rest}
    >
      <ApiEndpointCardHeader method={method} path={path} />
      {description && (
        <p
          data-slot="api-endpoint-card-description"
          className={apiEndpointCardDescriptionVariants()}
        >
          {description}
        </p>
      )}
      {showTags && tags && tags.length > 0 && (
        <ApiEndpointCardTags tags={tags} />
      )}
      {showExamples &&
        examples &&
        examples.map((example, idx) => (
          <ApiEndpointCardExample
            key={idx}
            example={example}
            labels={mergedLabels}
          />
        ))}
    </div>
  );
}

ApiEndpointCardBase.displayName = "ApiEndpointCard";
