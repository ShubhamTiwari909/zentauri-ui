import {
  AnimatedNumber,
  AnimatedNumberCounter,
} from "@zentauri-ui/zentauri-components/ui/animated-number";

import { ANIMATED_NUMBER_DEMO_VALUE } from "./data";
import type { AnimatedNumberDemoProps } from "./types";

export function AnimatedNumberDemo({
  appearance,
  size = "md",
  type = "up",
  counter = false,
}: AnimatedNumberDemoProps) {
  if (counter) {
    return (
      <AnimatedNumberCounter
        number={ANIMATED_NUMBER_DEMO_VALUE}
        appearance={appearance}
        size={size}
        duration={2}
      />
    );
  }
  return (
    <AnimatedNumber
      number={ANIMATED_NUMBER_DEMO_VALUE}
      appearance={appearance}
      size={size}
      type={type}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      delayInSecond={0.15}
    />
  );
}
