import type { SecretRevealProps } from "@zentauri-ui/zentauri-components/ui/secret-reveal";
import type { SecretRevealAnimation } from "@zentauri-ui/zentauri-components/ui/secret-reveal/animated";

export type SecretRevealAppearance = NonNullable<
  SecretRevealProps["appearance"]
>;
export type SecretRevealSize = NonNullable<SecretRevealProps["size"]>;

export type SecretRevealDemoProps = {
  appearance: SecretRevealAppearance;
  size: SecretRevealSize;
  value?: string;
  label?: string;
  animation?: SecretRevealAnimation;
  initiallyRevealed?: boolean;
};
