import { HashGenerator } from "@zentauri-ui/zentauri-components/ui/hash-generator";

import type { HashGeneratorDemoProps } from "./types";

export function HashGeneratorDemo({ algorithm }: HashGeneratorDemoProps) {
  return <HashGenerator algorithm={algorithm} />;
}
