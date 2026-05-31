"use client";
import { animate, motion, stagger, useReducedMotion } from "framer-motion";
import { animatedNumberAppearance } from "./variants";
import { AnimatedNumberCounterProps, AnimatedNumberProps } from "./types";
import { cn } from "../../lib/utils";
import { zuiAnimatedNumberBase } from "../../design-system/animated-number";
import { animationFinalType, animationInitialType } from "./animations";
import { useRef, useState } from "react";

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
          key={index}
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
  duration = 10,
  viewport,
  ...rest
}: AnimatedNumberCounterProps) => {
  const [currentNumber, setCurrentNumber] = useState(0);
  const reducedMotion = useReducedMotion();
  const hasStarted = useRef(false);

  const startCount = () => {
    if (hasStarted.current) return;
    hasStarted.current = true;
    if (reducedMotion) {
      setCurrentNumber(number);
      return;
    }
    animate(0, number, {
      duration,
      ease: "circOut",
      onUpdate: (latest) => setCurrentNumber(Math.round(latest)),
    });
  };

  return (
    <motion.p
      className={cn(animatedNumberAppearance({ appearance, size }), className)}
      ref={ref}
      viewport={viewport ?? DEFAULT_VIEWPORT}
      onViewportEnter={startCount}
      {...rest}
    >
      {currentNumber}
    </motion.p>
  );
};
