"use client";

import { motion } from "framer-motion";
import {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { cn } from "../../../lib/utils";

import type { SpeechSynthesizerRef, SpeechSynthesizerState } from "../types";
import {
  speechSynthesizerBtnActiveClasses,
  speechSynthesizerBtnVariants,
  speechSynthesizerControlsClasses,
  speechSynthesizerProgressBarClasses,
  speechSynthesizerProgressClasses,
  speechSynthesizerTextClasses,
  speechSynthesizerVariants,
} from "../variants";

import { speechSynthesizerAnimationPresets } from "./animations";
import type { SpeechSynthesizerAnimatedProps } from "./types";

function DefaultPlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function DefaultPauseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </svg>
  );
}

function DefaultStopIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
      <rect x="6" y="6" width="12" height="12" />
    </svg>
  );
}

export function SpeechSynthesizerAnimated({
  appearance,
  size,
  text,
  lang,
  rate = 1,
  pitch = 1,
  volume = 1,
  autoSpeak = false,
  onStart,
  onEnd,
  onError,
  onStateChange,
  renderPlay,
  renderPause,
  renderStop,
  showProgress = false,
  animation = "pulse",
  className,
  children,
  ...rest
}: SpeechSynthesizerAnimatedProps) {
  const [state, setState] = useState<SpeechSynthesizerState>("idle");
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const stateRef = useRef<SpeechSynthesizerState>("idle");
  const autoStartedRef = useRef(false);
  const preset = speechSynthesizerAnimationPresets[animation];

  const setStateSafe = useCallback(
    (newState: SpeechSynthesizerState) => {
      stateRef.current = newState;
      setState(newState);
      onStateChange?.(newState);
    },
    [onStateChange],
  );

  const speak = useCallback(() => {
    if (!text || typeof window === "undefined" || !window.speechSynthesis)
      return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    if (lang) utterance.lang = lang;
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;

    utterance.onstart = () => {
      setStateSafe("speaking");
      onStart?.();
    };
    utterance.onend = () => {
      setStateSafe("idle");
      onEnd?.();
    };
    utterance.onerror = (event) => {
      setStateSafe("idle");
      onError?.(event.error);
    };
    utterance.onpause = () => setStateSafe("paused");
    utterance.onresume = () => setStateSafe("speaking");

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [text, lang, rate, pitch, volume, onStart, onEnd, onError, setStateSafe]);

  const pauseFn = useCallback(() => {
    if (typeof window !== "undefined" && window.speechSynthesis)
      window.speechSynthesis.pause();
  }, []);

  const resumeFn = useCallback(() => {
    if (typeof window !== "undefined" && window.speechSynthesis)
      window.speechSynthesis.resume();
  }, []);

  const stop = useCallback(() => {
    if (typeof window !== "undefined" && window.speechSynthesis)
      window.speechSynthesis.cancel();
    setStateSafe("idle");
  }, [setStateSafe]);

  const imperativeHandle: SpeechSynthesizerRef = {
    speak,
    pause: pauseFn,
    resume: resumeFn,
    stop,
    get state() {
      return stateRef.current;
    },
  };

  useImperativeHandle((rest as any).ref, () => imperativeHandle, [
    speak,
    pauseFn,
    resumeFn,
    stop,
  ]);

  useEffect(() => {
    if (autoSpeak && text && !autoStartedRef.current) {
      autoStartedRef.current = true;
      speak();
    }
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        if (stateRef.current === "speaking" || stateRef.current === "paused") {
          window.speechSynthesis.cancel();
        }
      }
    };
  }, [autoSpeak, text, speak]);

  const isSpeaking = state === "speaking";
  const isPaused = state === "paused";
  const showPlay = state === "idle" || state === "paused";
  const showPause = state === "speaking";

  return (
    <motion.div
      data-slot="speech-synthesizer"
      className={cn(speechSynthesizerVariants({ size }), className)}
      {...(rest as any)}
    >
      {text && (
        <motion.p
          data-slot="speech-synthesizer-text"
          className={speechSynthesizerTextClasses}
          initial="initial"
          animate={isSpeaking ? "animate" : "initial"}
          variants={preset.variants}
          transition={preset.transition}
        >
          {text}
        </motion.p>
      )}
      {showProgress && isSpeaking && (
        <div
          data-slot="speech-synthesizer-progress"
          className={speechSynthesizerProgressClasses}
        >
          <div
            data-slot="speech-synthesizer-progress-bar"
            className={cn(
              speechSynthesizerProgressBarClasses,
              "w-full animate-pulse",
            )}
          />
        </div>
      )}
      <motion.div
        data-slot="speech-synthesizer-controls"
        className={speechSynthesizerControlsClasses}
      >
        {showPlay && (
          <motion.button
            type="button"
            data-slot="speech-synthesizer-play-btn"
            className={cn(
              speechSynthesizerBtnVariants({ appearance, size }),
              isPaused && speechSynthesizerBtnActiveClasses,
            )}
            onClick={isPaused ? resumeFn : speak}
            aria-label={isPaused ? "Resume" : "Play"}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {renderPlay ? (
              renderPlay({ isSpeaking, isPaused, state })
            ) : (
              <DefaultPlayIcon />
            )}
          </motion.button>
        )}
        {showPause && (
          <motion.button
            type="button"
            data-slot="speech-synthesizer-pause-btn"
            className={speechSynthesizerBtnVariants({ appearance, size })}
            onClick={pauseFn}
            aria-label="Pause"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {renderPause ? (
              renderPause({ isSpeaking, isPaused, state })
            ) : (
              <DefaultPauseIcon />
            )}
          </motion.button>
        )}
        {(isSpeaking || isPaused) && (
          <motion.button
            type="button"
            data-slot="speech-synthesizer-stop-btn"
            className={speechSynthesizerBtnVariants({ appearance, size })}
            onClick={stop}
            aria-label="Stop"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {renderStop ? (
              renderStop({ isSpeaking, isPaused, state })
            ) : (
              <DefaultStopIcon />
            )}
          </motion.button>
        )}
      </motion.div>
      {children}
    </motion.div>
  );
}

SpeechSynthesizerAnimated.displayName = "SpeechSynthesizerAnimated";
