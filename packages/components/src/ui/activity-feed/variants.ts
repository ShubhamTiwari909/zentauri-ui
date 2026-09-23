import { cva } from "class-variance-authority";

import {
  zuiActivityFeedAppearances,
  zuiActivityFeedAvatarBase,
  zuiActivityFeedAvatarSizes,
  zuiActivityFeedBase,
  zuiActivityFeedItemBase,
  zuiActivityFeedItemSizes,
  zuiActivityFeedSizes,
} from "../../design-system/activity-feed";

export const activityFeedVariants = cva(zuiActivityFeedBase, {
  variants: {
    appearance: zuiActivityFeedAppearances,
    size: zuiActivityFeedSizes,
  },
  defaultVariants: { appearance: "default", size: "md" },
});

export const activityFeedItemVariants = cva(zuiActivityFeedItemBase, {
  variants: { size: zuiActivityFeedItemSizes },
  defaultVariants: { size: "md" },
});

export const activityFeedAvatarVariants = cva(zuiActivityFeedAvatarBase, {
  variants: { size: zuiActivityFeedAvatarSizes },
  defaultVariants: { size: "md" },
});

export {
  zuiActivityFeedActorBase,
  zuiActivityFeedAvatarImageBase,
  zuiActivityFeedContentBase,
  zuiActivityFeedCountBase,
  zuiActivityFeedEmptyBase,
  zuiActivityFeedListBase,
  zuiActivityFeedMetaBase,
  zuiActivityFeedObjectBase,
  zuiActivityFeedSummaryBase,
  zuiActivityFeedVerbBase,
} from "../../design-system/activity-feed";
