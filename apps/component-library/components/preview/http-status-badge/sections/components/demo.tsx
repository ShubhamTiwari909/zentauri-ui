import { HttpStatusBadge } from "@zentauri-ui/zentauri-components/ui/http-status-badge";
import type { HttpStatusBadgeDemoProps } from "./types";

export function HttpStatusBadgeDemo(props: HttpStatusBadgeDemoProps) {
  const { status, appearance, size, showText } = props;
  return (
    <div className="flex items-center justify-center py-6">
      <HttpStatusBadge
        status={status}
        appearance={appearance}
        size={size}
        showText={showText}
      />
    </div>
  );
}
