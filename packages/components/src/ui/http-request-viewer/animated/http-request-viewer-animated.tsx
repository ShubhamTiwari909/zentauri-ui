"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useId, useState } from "react";

import { cn } from "../../../lib/utils";

import {
  formatRequestBody,
  httpMethodTone,
  HttpRequestViewerCopyButton,
  HttpRequestViewerPanelContent,
  HttpRequestViewerTabs,
} from "../http-request-viewer-base";
import type { HttpRequestViewerLabels, HttpRequestViewerTab } from "../types";
import {
  httpRequestViewerHeaderVariants,
  httpRequestViewerMethodVariants,
  httpRequestViewerVariants,
  zuiHttpRequestViewerPanelBase,
  zuiHttpRequestViewerUrlBase,
} from "../variants";

import { httpRequestViewerAnimationPresets } from "./animations";
import type { HttpRequestViewerAnimatedProps } from "./types";

const DEFAULT_LABELS: Required<HttpRequestViewerLabels> = {
  headers: "Headers",
  query: "Query",
  body: "Body",
  copy: "Copy",
  copied: "Copied",
};

export function HttpRequestViewerAnimated({
  method,
  url,
  headers,
  query,
  body,
  appearance,
  size,
  defaultTab = "headers",
  enableClipboard = true,
  animation = "fade",
  labels,
  className,
  ref,
  ...rest
}: HttpRequestViewerAnimatedProps) {
  const baseId = useId();
  const panelId = `${baseId}-panel`;
  const mergedLabels = { ...DEFAULT_LABELS, ...labels };
  const [tab, setTab] = useState<HttpRequestViewerTab>(defaultTab);
  const preset = httpRequestViewerAnimationPresets[animation];

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
        panelId={panelId}
        baseId={baseId}
      />
      <div
        id={panelId}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${tab}`}
        data-slot="http-request-viewer-panel"
        className={zuiHttpRequestViewerPanelBase}
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={tab}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={preset.variants}
            transition={preset.transition}
          >
            <HttpRequestViewerPanelContent
              tab={tab}
              headers={headers}
              query={query}
              body={body}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

HttpRequestViewerAnimated.displayName = "HttpRequestViewerAnimated";
