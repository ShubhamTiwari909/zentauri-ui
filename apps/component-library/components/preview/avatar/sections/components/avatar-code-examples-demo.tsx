import {
  Avatar,
  AvatarFallback,
} from "@zentauri-ui/zentauri-components/ui/avatar";
import { AvatarAnimated } from "@zentauri-ui/zentauri-components/ui/avatar/animated";

import type { AvatarDemoProps } from "./avatar-code-examples.types";

export function AvatarDemo({ size, animation, appearance }: AvatarDemoProps) {
  if (animation === "none") {
    return (
      <Avatar size={size} appearance={appearance}>
        <AvatarFallback>ZU</AvatarFallback>
      </Avatar>
    );
  }
  return (
    <AvatarAnimated size={size} animation={animation} appearance={appearance}>
      <AvatarFallback>ZU</AvatarFallback>
    </AvatarAnimated>
  );
}
