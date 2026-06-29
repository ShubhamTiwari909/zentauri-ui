import { variantLeadComment } from "@/components/common/variant-code-prefix";
import type { SpeechRecognitionDemoProps } from "./types";

export function speechRecognitionSnippet(
  opts: SpeechRecognitionDemoProps,
): string {
  const { appearance, size, animation = "none" } = opts;
  const appearanceAttr =
    appearance === "default" ? "" : ` appearance="${appearance}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  const lead = variantLeadComment(
    `appearance · ${appearance}, size · ${size}${animation !== "none" ? `, animation · ${animation}` : ""}`,
  );

  if (animation !== "none") {
    return `import { SpeechRecognitionAnimated } from "@zentauri-ui/zentauri-components/ui/speech-recognition/animated";\n\n${lead}<SpeechRecognitionAnimated${appearanceAttr}${sizeAttr} animation="${animation}" />`;
  }

  return `import { SpeechRecognition } from "@zentauri-ui/zentauri-components/ui/speech-recognition";\n\n${lead}<SpeechRecognition${appearanceAttr}${sizeAttr} />`;
}
