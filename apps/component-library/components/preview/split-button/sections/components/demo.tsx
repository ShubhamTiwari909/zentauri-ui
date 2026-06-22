import { FiDownload, FiCopy } from "react-icons/fi";

import { SplitButton } from "@zentauri-ui/zentauri-components/ui/split-button";

import type { SplitButtonDemoProps } from "./types";

const demoItems = [
  { id: "save-as", label: "Save As" },
  { id: "export", label: "Export", icon: <FiDownload aria-hidden /> },
  { id: "duplicate", label: "Duplicate", icon: <FiCopy aria-hidden /> },
];

export function SplitButtonDemo({
  appearance,
  size,
  disabled,
  loading,
  triggerOn,
}: SplitButtonDemoProps) {
  return (
    <SplitButton
      label={loading ? "Saving" : "Save"}
      appearance={appearance}
      size={size}
      disabled={disabled}
      loading={loading}
      triggerOn={triggerOn}
      items={demoItems}
    />
  );
}
