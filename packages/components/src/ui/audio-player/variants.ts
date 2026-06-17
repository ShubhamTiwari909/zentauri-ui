import { cva } from "class-variance-authority";

import {
  zuiAudioPlayerAppearances,
  zuiAudioPlayerBarBase,
  zuiAudioPlayerBase,
  zuiAudioPlayerShapes,
  zuiAudioPlayerSizes,
  zuiAudioPlayerTimeBase,
  zuiAudioPlayerTrackBase,
  zuiAudioPlayerTrackSizes,
} from "../../design-system/audio-player";

export const audioPlayerVariants = cva(
  [...zuiAudioPlayerBase, "flex flex-col"],
  {
    variants: {
      appearance: zuiAudioPlayerAppearances,
      size: zuiAudioPlayerSizes,
      shape: zuiAudioPlayerShapes,
    },
    defaultVariants: {
      appearance: "default",
      size: "md",
      shape: "rounded",
    },
  },
);

export const audioPlayerTrackVariants = cva([...zuiAudioPlayerTrackBase], {
  variants: {
    size: zuiAudioPlayerTrackSizes,
    shape: zuiAudioPlayerShapes,
  },
  defaultVariants: {
    size: "md",
    shape: "rounded",
  },
});

export const audioPlayerBarVariants = cva(zuiAudioPlayerBarBase);

export const audioPlayerTimeVariants = cva(zuiAudioPlayerTimeBase);
