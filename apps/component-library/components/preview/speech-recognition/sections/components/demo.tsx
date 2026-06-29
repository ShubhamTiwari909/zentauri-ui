import { SpeechRecognition } from "@zentauri-ui/zentauri-components/ui/speech-recognition";
import { SpeechRecognitionAnimated } from "@zentauri-ui/zentauri-components/ui/speech-recognition/animated";
import type { SpeechRecognitionDemoProps } from "./types";

export function SpeechRecognitionDemo({
  appearance,
  size,
  animation = "none",
}: SpeechRecognitionDemoProps) {
  if (animation === "none") {
    return <SpeechRecognition appearance={appearance} size={size} />;
  }
  return (
    <SpeechRecognitionAnimated
      appearance={appearance}
      size={size}
      animation={animation}
    />
  );
}
