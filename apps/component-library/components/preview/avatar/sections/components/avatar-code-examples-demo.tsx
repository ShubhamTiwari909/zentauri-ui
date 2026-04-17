import {
  Avatar,
  AvatarFallback,
} from "@zentauri-ui/zentauri-components/ui/avatar";

import type { AvatarDemoProps } from "./avatar-code-examples.types";

export function AvatarDemo({ size, animation, appearance }: AvatarDemoProps) {
  return (
    <Avatar size={size} animation={animation} appearance={appearance}>
      <AvatarFallback>ZU</AvatarFallback>
    </Avatar>
  );
}
