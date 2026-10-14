import { ProseBase } from "./prose-base";
import type { ProseProps } from "./types";
export const Prose = (props: ProseProps) => <ProseBase {...props} />;
Prose.displayName = "Prose";
