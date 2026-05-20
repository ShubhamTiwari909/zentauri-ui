import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@zentauri-ui/zentauri-components/ui/drawer";

import type { DrawerDemoProps } from "./drawer-code-examples.types";

export function DrawerDemo({ side, size, appearance, label }: DrawerDemoProps) {
  return (
    <Drawer>
      <DrawerTrigger appearance={appearance}>{label}</DrawerTrigger>
      <DrawerContent side={side} size={size} appearance={appearance}>
        <DrawerClose />
        <DrawerHeader>
          <DrawerTitle>Panel</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <p className="text-sm text-slate-900 dark:text-slate-300">
            Drawer body copy.
          </p>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
