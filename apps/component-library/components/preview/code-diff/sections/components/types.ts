import type { CodeDiffProps } from "@zentauri-ui/zentauri-components/ui/code-diff";

export type CodeDiffViewType = NonNullable<CodeDiffProps["viewType"]>;
export type CodeDiffSize = NonNullable<CodeDiffProps["size"]>;

export type CodeDiffDemoProps = {
  oldCode: string;
  newCode: string;
  viewType: CodeDiffViewType;
  size: CodeDiffSize;
  showLineNumbers: boolean;
  showGutterMarkers: boolean;
};
