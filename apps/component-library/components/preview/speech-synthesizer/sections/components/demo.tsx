import { SpeechSynthesizer } from "@zentauri-ui/zentauri-components/ui/speech-synthesizer";
import { SpeechSynthesizerAnimated } from "@zentauri-ui/zentauri-components/ui/speech-synthesizer/animated";
import type { SpeechSynthesizerDemoProps } from "./types";

export function SpeechSynthesizerDemo({
  appearance,
  size,
  text,
  animation = "none",
}: SpeechSynthesizerDemoProps) {
  if (animation === "none") {
    return (
      <SpeechSynthesizer
        appearance={appearance}
        size={size}
        text={text || "Speech synthesis demo"}
      />
    );
  }
  return (
    <SpeechSynthesizerAnimated
      appearance={appearance}
      size={size}
      text={text || "Speech synthesis demo"}
      animation={animation}
    />
  );
}
