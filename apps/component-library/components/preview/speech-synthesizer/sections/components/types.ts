import type { SpeechSynthesizerProps } from "@zentauri-ui/zentauri-components/ui/speech-synthesizer";
import type { SpeechSynthesizerAnimation } from "@zentauri-ui/zentauri-components/ui/speech-synthesizer/animated";

export type SpeechSynthesizerAppearance = NonNullable<
  SpeechSynthesizerProps["appearance"]
>;
export type SpeechSynthesizerSize = NonNullable<SpeechSynthesizerProps["size"]>;

export type SpeechSynthesizerDemoProps = {
  appearance: SpeechSynthesizerAppearance;
  size: SpeechSynthesizerSize;
  text?: string;
  animation?: SpeechSynthesizerAnimation;
};
