import { HiCloudArrowUp } from "react-icons/hi2";
import { EmptyState, EmptyStateDescription, EmptyStateIcon, EmptyStateTitle } from "@zentauri-ui/zentauri-components/ui/empty-state";

import type { EmptyStateDemoProps } from "./empty-state-code-examples.types";

export function EmptyStateDemo({ appearance, size, align }: EmptyStateDemoProps) {
  return (
    <div>
      <p className="mb-5 text-xs md:text-sm">
        Appearance: <span className="font-bold">{appearance.toUpperCase()}</span>, Size:{" "}
        <span className="font-bold">{size.toUpperCase()}</span>, Align:{" "}
        <span className="font-bold">{align.toUpperCase()}</span>
      </p>
      <EmptyState appearance={appearance} size={size} align={align} animation="none">
        <EmptyStateIcon>
          <HiCloudArrowUp className="size-8 text-slate-400" aria-hidden />
        </EmptyStateIcon>
        <EmptyStateTitle>No uploads</EmptyStateTitle>
        <EmptyStateDescription>Drag files here to add them.</EmptyStateDescription>
      </EmptyState>
    </div>
  );
}
