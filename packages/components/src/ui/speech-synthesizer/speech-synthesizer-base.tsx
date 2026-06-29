"use client";

import {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { cn } from "../../lib/utils";

import type {
  SpeechSynthesizerBaseProps,
  SpeechSynthesizerRef,
  SpeechSynthesizerState,
} from "./types";
import {
  speechSynthesizerBtnActiveClasses,
  speechSynthesizerBtnVariants,
  speechSynthesizerControlsClasses,
  speechSynthesizerProgressBarClasses,
  speechSynthesizerProgressClasses,
  speechSynthesizerTextClasses,
  speechSynthesizerVariants,
} from "./variants";

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

export function SpeechSynthesizerBase({
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
  className,
  children,
  ref,
  ...rest
}: SpeechSynthesizerBaseProps) {
  const [state, setState] = useState<SpeechSynthesizerState>("idle");
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const stateRef = useRef<SpeechSynthesizerState>("idle");
  const localRef = useRef<HTMLDivElement>(null);
  const autoStartedRef = useRef(false);

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

  const pause = useCallback(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.pause();
    }
  }, []);

  const resume = useCallback(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.resume();
    }
  }, []);

  const stop = useCallback(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setStateSafe("idle");
  }, [setStateSafe]);

  const imperativeHandle: SpeechSynthesizerRef = {
    speak,
    pause,
    resume,
    stop,
    get state() {
      return stateRef.current;
    },
  };

  useImperativeHandle(ref as any, () => imperativeHandle, [
    speak,
    pause,
    resume,
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
    <div
      ref={localRef}
      data-slot="speech-synthesizer"
      className={cn(speechSynthesizerVariants({ size }), className)}
      {...rest}
    >
      {text && (
        <p
          data-slot="speech-synthesizer-text"
          className={speechSynthesizerTextClasses}
        >
          {text}
        </p>
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
            style={{ width: "100%" }}
          />
        </div>
      )}
      <div
        data-slot="speech-synthesizer-controls"
        className={speechSynthesizerControlsClasses}
      >
        {showPlay && (
          <button
            type="button"
            data-slot="speech-synthesizer-play-btn"
            className={cn(
              speechSynthesizerBtnVariants({ appearance, size }),
              isPaused && speechSynthesizerBtnActiveClasses,
            )}
            onClick={isPaused ? resume : speak}
            aria-label={isPaused ? "Resume" : "Play"}
          >
            {renderPlay ? (
              renderPlay({ isSpeaking, isPaused, state })
            ) : (
              <DefaultPlayIcon />
            )}
          </button>
        )}
        {showPause && (
          <button
            type="button"
            data-slot="speech-synthesizer-pause-btn"
            className={speechSynthesizerBtnVariants({ appearance, size })}
            onClick={pause}
            aria-label="Pause"
          >
            {renderPause ? (
              renderPause({ isSpeaking, isPaused, state })
            ) : (
              <DefaultPauseIcon />
            )}
          </button>
        )}
        {(isSpeaking || isPaused) && (
          <button
            type="button"
            data-slot="speech-synthesizer-stop-btn"
            className={speechSynthesizerBtnVariants({ appearance, size })}
            onClick={stop}
            aria-label="Stop"
          >
            {renderStop ? (
              renderStop({ isSpeaking, isPaused, state })
            ) : (
              <DefaultStopIcon />
            )}
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

SpeechSynthesizerBase.displayName = "SpeechSynthesizer";
