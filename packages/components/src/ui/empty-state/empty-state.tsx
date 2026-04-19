// empty-state.tsx — default static entry (no framer-motion)
import { EmptyStateBase } from "./empty-state-base";
import type { EmptyStateProps } from "./types";

export function EmptyState(props: EmptyStateProps) {
  return <EmptyStateBase {...props} />;
}

EmptyState.displayName = "EmptyState";
