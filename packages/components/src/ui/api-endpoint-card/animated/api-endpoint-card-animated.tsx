"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "../../../lib/utils";

import type { ApiEndpointCardLabels, EndpointExample } from "../types";
import {
  ApiEndpointCardExample,
  ApiEndpointCardHeader,
  ApiEndpointCardTags,
} from "../api-endpoint-card-base";
import {
  apiEndpointCardDescriptionVariants,
  apiEndpointCardVariants,
} from "../variants";

import { apiEndpointCardAnimationPresets } from "./animations";
import type { ApiEndpointCardAnimatedProps } from "./types";

const DEFAULT_LABELS: Required<ApiEndpointCardLabels> = {
  request: "Request",
  response: "Response",
};

export function ApiEndpointCardAnimated({
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
  animation = "none",
  className,
  ref,
  ...rest
}: ApiEndpointCardAnimatedProps) {
  const mergedLabels = { ...DEFAULT_LABELS, ...labels };
  const preset = apiEndpointCardAnimationPresets[animation];

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
      {showExamples && examples && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={preset.variants}
          transition={preset.transition}
        >
          {examples.map((example, idx) => (
            <ApiEndpointCardExample
              key={idx}
              example={example}
              labels={mergedLabels}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}

ApiEndpointCardAnimated.displayName = "ApiEndpointCardAnimated";
