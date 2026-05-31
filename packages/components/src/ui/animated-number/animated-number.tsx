"use client";
import { animate, motion, useReducedMotion } from "framer-motion";
import { animatedNumberAppearance } from "./variants";
import { AnimatedNumberCounterProps, AnimatedNumberProps } from "./types";
import { cn } from "../../lib/utils";
import { zuiAnimatedNumberBase } from "../../design-system/animated-number";
import { animationFinalType, animationInitialType } from "./animations";
import { useEffect, useState } from "react";

const DEFAULT_VIEWPORT = { once: true, amount: 0.2 } as const;

export const AnimatedNumber = ({
  number,
  wrapperClassName,
  className,
  ref,
  appearance,
  size,
  type = "up",
  delayInSecond = 0.1,
  transition,
  initial,
  whileInView,
  viewport,
  ...rest
}: AnimatedNumberProps) => {
  const numbersList = [...number.toString()];
  const reducedMotion = useReducedMotion();
  const motionless = Boolean(reducedMotion);

  const digitVariants = {
    hidden: animationInitialType[type],
    visible: animationFinalType[type],
  };

  return (
    <motion.div
      ref={ref}
      initial={motionless ? false : "hidden"}
      whileInView={motionless ? undefined : "visible"}
      viewport={viewport ?? DEFAULT_VIEWPORT}
      transition={{
        staggerChildren: delayInSecond,
      }}
      className={cn(wrapperClassName, zuiAnimatedNumberBase)}
    >
      {numbersList.map((digit, index) => (
        <motion.span
          key={index + "-" + digit}
          className={cn(
            "inline-block",
            animatedNumberAppearance({ appearance, size }),
            className,
          )}
          variants={digitVariants}
          transition={transition}
          {...rest}
        >
          {digit}
        </motion.span>
      ))}
    </motion.div>
  );
};

export const AnimatedNumberCounter = ({
  number,
  className,
  ref,
  appearance,
  size,
  duration = 2,
  viewport,
  ...rest
}: AnimatedNumberCounterProps) => {
  const [currentNumber, setCurrentNumber] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;

    if (reducedMotion) {
      setCurrentNumber(number);
      return;
    }

    const controls = animate(currentNumber, number, {
      duration,
      ease: "circOut",
      onUpdate: (latest) => setCurrentNumber(Math.round(latest)),
    });

    return () => controls.stop();
    // currentNumber intentionally omitted — stale closure gives smooth from→to on prop changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView, number, duration, reducedMotion]);

  return (
    <motion.p
      className={cn(animatedNumberAppearance({ appearance, size }), className)}
      ref={ref}
      viewport={viewport ?? DEFAULT_VIEWPORT}
      onViewportEnter={() => setIsInView(true)}
      onViewportLeave={() => setIsInView(false)}
      {...rest}
    >
      {currentNumber}
    </motion.p>
  );
};
