"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useState } from "react";

import { cn } from "../../../lib/utils";

import {
  ApiResponseViewerBody,
  ApiResponseViewerHeader,
  ApiResponseViewerHeaders,
  ApiResponseViewerTabs,
  formatApiResponseBody,
  useApiResponseCopy,
} from "../api-response-viewer-base";
import type { ApiResponseViewerLabels, ApiResponseViewerTab } from "../types";
import {
  apiResponseViewerVariants,
  zuiApiResponseViewerPanelBase,
} from "../variants";

import { apiResponseViewerAnimationPresets } from "./animations";
import type { ApiResponseViewerAnimatedProps } from "./types";

const DEFAULT_LABELS: Required<ApiResponseViewerLabels> = {
  copy: "Copy",
  copied: "Copied",
  bodyTab: "Body",
  headersTab: "Headers",
};

export function ApiResponseViewerAnimated({
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
  animation = "fade",
  labels,
  className,
  ref,
  ...rest
}: ApiResponseViewerAnimatedProps) {
  const mergedLabels = { ...DEFAULT_LABELS, ...labels };
  const [active, setActive] = useState<ApiResponseViewerTab>(defaultTab);
  const getCopyText = useCallback(() => formatApiResponseBody(body), [body]);
  const { copied, handleCopy } = useApiResponseCopy(getCopyText);
  const preset = apiResponseViewerAnimationPresets[animation];

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
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={active}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={preset.variants}
            transition={preset.transition}
          >
            {active === "body" ? (
              <ApiResponseViewerBody body={body} />
            ) : (
              <ApiResponseViewerHeaders headers={headers} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

ApiResponseViewerAnimated.displayName = "ApiResponseViewerAnimated";
