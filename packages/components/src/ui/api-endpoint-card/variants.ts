import { cva } from "class-variance-authority";

import {
  zuiApiEndpointCardAppearances,
  zuiApiEndpointCardBase,
  zuiApiEndpointCardDescriptionBase,
  zuiApiEndpointCardExampleBase,
  zuiApiEndpointCardHeaderBase,
  zuiApiEndpointCardMethodBase,
  zuiApiEndpointCardMethodTones,
  zuiApiEndpointCardPathBase,
  zuiApiEndpointCardSizes,
  zuiApiEndpointCardTagBase,
  zuiApiEndpointCardTagsBase,
} from "../../design-system/api-endpoint-card";

export const apiEndpointCardVariants = cva(zuiApiEndpointCardBase, {
  variants: {
    appearance: zuiApiEndpointCardAppearances,
    size: zuiApiEndpointCardSizes,
  },
  defaultVariants: {
    appearance: "default",
    size: "md",
  },
});

export const apiEndpointCardHeaderVariants = cva(zuiApiEndpointCardHeaderBase);

export const apiEndpointCardMethodVariants = cva(zuiApiEndpointCardMethodBase, {
  variants: {
    tone: zuiApiEndpointCardMethodTones,
  },
  defaultVariants: {
    tone: "neutral",
  },
});

export const apiEndpointCardPathVariants = cva(zuiApiEndpointCardPathBase);

export const apiEndpointCardDescriptionVariants = cva(
  zuiApiEndpointCardDescriptionBase,
);

export const apiEndpointCardTagsVariants = cva(zuiApiEndpointCardTagsBase);

export const apiEndpointCardTagVariants = cva(zuiApiEndpointCardTagBase);

export const apiEndpointCardExampleVariants = cva(
  zuiApiEndpointCardExampleBase,
);

export {
  zuiApiEndpointCardExampleBase,
  zuiApiEndpointCardMethodTones,
} from "../../design-system/api-endpoint-card";
