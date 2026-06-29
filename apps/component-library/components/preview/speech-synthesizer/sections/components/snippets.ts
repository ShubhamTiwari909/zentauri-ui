import { variantLeadComment } from "@/components/common/variant-code-prefix";
import type { SpeechSynthesizerDemoProps } from "./types";

export function speechSynthesizerSnippet(
  opts: SpeechSynthesizerDemoProps,
): string {
  const { appearance, size, text, animation = "none" } = opts;
  const appearanceAttr =
    appearance === "default" ? "" : ` appearance="${appearance}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  const textAttr = text ? ` text="${text}"` : "";
  const lead = variantLeadComment(
    `appearance · ${appearance}, size · ${size}${text ? `, text · ${text}` : ""}${animation !== "none" ? `, animation · ${animation}` : ""}`,
  );

  if (animation !== "none") {
    return `import { SpeechSynthesizerAnimated } from "@zentauri-ui/zentauri-components/ui/speech-synthesizer/animated";\n\n${lead}<SpeechSynthesizerAnimated${appearanceAttr}${sizeAttr}${textAttr} animation="${animation}" />`;
  }

  return `import { SpeechSynthesizer } from "@zentauri-ui/zentauri-components/ui/speech-synthesizer";\n\n${lead}<SpeechSynthesizer${appearanceAttr}${sizeAttr}${textAttr} />`;
}
