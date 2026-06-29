import type { SpeechRecognitionProps } from "@zentauri-ui/zentauri-components/ui/speech-recognition";
import type { SpeechRecognitionAnimation } from "@zentauri-ui/zentauri-components/ui/speech-recognition/animated";

export type SpeechRecognitionAppearance = NonNullable<
  SpeechRecognitionProps["appearance"]
>;
export type SpeechRecognitionSize = NonNullable<SpeechRecognitionProps["size"]>;

export type SpeechRecognitionDemoProps = {
  appearance: SpeechRecognitionAppearance;
  size: SpeechRecognitionSize;
  animation?: SpeechRecognitionAnimation;
};
