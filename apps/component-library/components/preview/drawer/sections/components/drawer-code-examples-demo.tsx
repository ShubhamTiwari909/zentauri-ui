import { Drawer, DrawerBody, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@zentauri-ui/zentauri-components/ui/drawer";

import { DRAWER_TRIGGER_CLASS } from "./drawer-code-examples.data";
import type { DrawerDemoProps } from "./drawer-code-examples.types";

export function DrawerDemo({ side, size, appearance, label }: DrawerDemoProps) {
  return (
    <Drawer>
      <DrawerTrigger appearance={appearance} className={DRAWER_TRIGGER_CLASS}>
        {label}
      </DrawerTrigger>
      <DrawerContent
        side={side}
        size={size}
        appearance={appearance}
        animation="fade"
      >
        <DrawerClose />
        <DrawerHeader>
          <DrawerTitle>Panel</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <p className="text-sm text-slate-300">Drawer body copy.</p>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
