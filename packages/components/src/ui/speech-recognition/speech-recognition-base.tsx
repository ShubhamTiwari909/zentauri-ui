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
  SpeechRecognitionBaseProps,
  SpeechRecognitionRef,
  SpeechRecognitionState,
} from "./types";
import {
  speechRecognitionBtnActiveClasses,
  speechRecognitionBtnVariants,
  speechRecognitionStatusClasses,
  speechRecognitionTranscriptClasses,
  speechRecognitionVariants,
} from "./variants";

function getSpeechRecognition(): any {
  if (typeof window === "undefined") return undefined;
  return (
    (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition
  );
}

function DefaultMic({
  isListening,
  state,
}: {
  isListening: boolean;
  state: SpeechRecognitionState;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`size-5 ${state === "error" ? "text-red-400" : ""}`}
    >
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="22" />
      {isListening && (
        <>
          <line x1="9" y1="20" x2="7" y2="22" />
          <line x1="15" y1="20" x2="17" y2="22" />
        </>
      )}
    </svg>
  );
}

export function SpeechRecognitionBase({
  appearance,
  size,
  lang,
  continuous = false,
  interimResults = true,
  autoStart = false,
  onResult,
  onError,
  onStateChange,
  renderMic,
  className,
  children,
  ref,
  ...rest
}: SpeechRecognitionBaseProps) {
  const [state, setState] = useState<SpeechRecognitionState>("idle");
  const [transcript, setTranscript] = useState("");
  const [interimText, setInterimText] = useState("");
  const recognitionRef = useRef<any>(null);
  const stateRef = useRef<SpeechRecognitionState>("idle");
  const localRef = useRef<HTMLDivElement>(null);
  const autoStartedRef = useRef(false);

  const setStateSafe = useCallback(
    (newState: SpeechRecognitionState) => {
      stateRef.current = newState;
      setState(newState);
      onStateChange?.(newState);
    },
    [onStateChange],
  );

  const start = useCallback(() => {
    const SR = getSpeechRecognition();
    if (!SR) {
      setStateSafe("error");
      onError?.("SpeechRecognition is not supported in this browser");
      return;
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {}
    }

    const recognition = new SR();
    recognition.continuous = continuous;
    recognition.interimResults = interimResults;
    if (lang) recognition.lang = lang;

    recognition.onstart = () => {
      setStateSafe("listening");
    };

    recognition.onresult = (event: any) => {
      let finalText = "";
      let interimTextBuilder = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalText += result[0].transcript;
        } else {
          interimTextBuilder += result[0].transcript;
        }
      }

      if (finalText) {
        setTranscript((prev) => prev + finalText);
        onResult?.({ transcript: finalText, isFinal: true });
        setStateSafe("processing");
      }
      setInterimText(interimTextBuilder);
      if (interimTextBuilder) {
        onResult?.({ transcript: interimTextBuilder, isFinal: false });
      }
    };

    recognition.onerror = (event: { error: string }) => {
      setStateSafe("error");
      onError?.(event.error);
    };

    recognition.onend = () => {
      if (
        stateRef.current === "listening" ||
        stateRef.current === "processing"
      ) {
        setStateSafe("idle");
      }
    };

    try {
      recognition.start();
    } catch (err) {
      setStateSafe("error");
      onError?.(String(err));
    }

    recognitionRef.current = recognition;
  }, [continuous, interimResults, lang, onError, onResult, setStateSafe]);

  const stop = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
    }
    setStateSafe("idle");
  }, [setStateSafe]);

  const abort = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {}
    }
    setTranscript("");
    setInterimText("");
    setStateSafe("idle");
  }, [setStateSafe]);

  const imperativeHandle: SpeechRecognitionRef = {
    start,
    stop,
    abort,
    get state() {
      return stateRef.current;
    },
  };

  useImperativeHandle(ref as any, () => imperativeHandle, [start, stop, abort]);

  useEffect(() => {
    if (autoStart && !autoStartedRef.current) {
      autoStartedRef.current = true;
      start();
    }
    return () => {
      if (recognitionRef.current) {
        const old = recognitionRef.current;
        old.onstart = null;
        old.onresult = null;
        old.onerror = null;
        old.onend = null;
        try {
          old.abort();
        } catch {}
      }
    };
  }, [autoStart, start]);

  const isListening = state === "listening";

  const toggleListening = useCallback(() => {
    if (isListening) {
      stop();
    } else {
      start();
    }
  }, [isListening, start, stop]);

  const displayText = transcript + (interimText ? ` ${interimText}` : "");

  const statusText =
    state === "idle"
      ? "Click to start listening"
      : state === "listening"
        ? "Listening..."
        : state === "processing"
          ? "Processing..."
          : "Error occurred";

  return (
    <div
      ref={localRef}
      data-slot="speech-recognition"
      className={cn(speechRecognitionVariants({ size }), className)}
      {...rest}
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          data-slot="speech-recognition-btn"
          className={cn(
            speechRecognitionBtnVariants({ appearance, size }),
            isListening && speechRecognitionBtnActiveClasses,
          )}
          onClick={toggleListening}
          aria-label={isListening ? "Stop listening" : "Start listening"}
          aria-pressed={isListening}
        >
          {renderMic ? (
            renderMic({ isListening, state })
          ) : (
            <DefaultMic isListening={isListening} state={state} />
          )}
        </button>
        <span
          data-slot="speech-recognition-status"
          className={speechRecognitionStatusClasses}
        >
          {statusText}
        </span>
      </div>
      {displayText && (
        <p
          data-slot="speech-recognition-transcript"
          className={speechRecognitionTranscriptClasses}
        >
          {displayText}
        </p>
      )}
      {children}
    </div>
  );
}

SpeechRecognitionBase.displayName = "SpeechRecognition";
