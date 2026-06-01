import { variantLeadComment } from "@/components/common/variant-code-prefix";

import { ANIMATED_NUMBER_DEMO_VALUE } from "./data";
import type { AnimatedNumberDemoProps } from "./types";

export function animatedNumberSnippet({
  appearance,
  size = "md",
  type = "up",
  counter = false,
}: AnimatedNumberDemoProps): string {
  if (counter) {
    return `${variantLeadComment(`counter · appearance ${appearance}, size ${size}`)}<AnimatedNumberCounter
  number={${ANIMATED_NUMBER_DEMO_VALUE}}
  appearance="${appearance}"
  size="${size}"
  duration={2}
/>`;
  }

  return `${variantLeadComment(`appearance · ${appearance}, size · ${size}, type · ${type}`)}<AnimatedNumber
  number={${ANIMATED_NUMBER_DEMO_VALUE}}
  appearance="${appearance}"
  size="${size}"
  type="${type}"
  transition={{ duration: 0.5, ease: "easeInOut" }}
  delayInSecond={0.15}
/>`;
}
