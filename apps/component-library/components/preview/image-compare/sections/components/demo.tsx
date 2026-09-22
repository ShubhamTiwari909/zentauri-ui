import { ImageCompare } from "@zentauri-ui/zentauri-components/ui/image-compare";
import Image from "next/image";

import type { ImageCompareDemoProps } from "./types";

export function ImageCompareDemo({
  appearance,
  size,
  radius,
  defaultPosition,
}: ImageCompareDemoProps) {
  return (
    <ImageCompare
      appearance={appearance}
      size={size}
      radius={radius}
      defaultPosition={defaultPosition}
      className="mx-auto w-full max-w-3xl"
      before={
        <Image
          src="/mountain-space-bg.jpg"
          alt="Mountain landscape before color grading"
          fill
          sizes="(min-width: 768px) 48rem, 100vw"
          className="grayscale contrast-75"
        />
      }
      after={
        <Image
          src="/mountain-space-bg.jpg"
          alt="Mountain landscape after color grading"
          fill
          sizes="(min-width: 768px) 48rem, 100vw"
          className="saturate-150 contrast-125"
        />
      }
    />
  );
}
