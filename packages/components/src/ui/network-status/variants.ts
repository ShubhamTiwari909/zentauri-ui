import { cva } from "class-variance-authority";

import {
  zuiNetworkStatusAppearances,
  zuiNetworkStatusContainerBase,
  zuiNetworkStatusDetailBase,
  zuiNetworkStatusDetailSizes,
  zuiNetworkStatusDotBase,
  zuiNetworkStatusDotSizes,
  zuiNetworkStatusDotWrapBase,
  zuiNetworkStatusLabelBase,
  zuiNetworkStatusLabelSizes,
  zuiNetworkStatusPingBase,
  zuiNetworkStatusSizes,
} from "../../design-system/network-status";

export const networkStatusVariants = cva(zuiNetworkStatusContainerBase, {
  variants: {
    size: zuiNetworkStatusSizes,
  },
  defaultVariants: {
    size: "md",
  },
});

export const networkStatusDotWrapVariants = cva(zuiNetworkStatusDotWrapBase, {
  variants: {
    size: zuiNetworkStatusDotSizes,
  },
  defaultVariants: {
    size: "md",
  },
});

export const networkStatusDotVariants = cva(zuiNetworkStatusDotBase, {
  variants: {
    appearance: zuiNetworkStatusAppearances,
    size: zuiNetworkStatusDotSizes,
  },
  defaultVariants: {
    appearance: "online",
    size: "md",
  },
});

export const networkStatusPingVariants = cva(zuiNetworkStatusPingBase, {
  variants: {
    appearance: zuiNetworkStatusAppearances,
  },
  defaultVariants: {
    appearance: "online",
  },
});

export const networkStatusLabelVariants = cva(zuiNetworkStatusLabelBase, {
  variants: {
    size: zuiNetworkStatusLabelSizes,
  },
  defaultVariants: {
    size: "md",
  },
});

export const networkStatusDetailVariants = cva(zuiNetworkStatusDetailBase, {
  variants: {
    size: zuiNetworkStatusDetailSizes,
  },
  defaultVariants: {
    size: "md",
  },
});
