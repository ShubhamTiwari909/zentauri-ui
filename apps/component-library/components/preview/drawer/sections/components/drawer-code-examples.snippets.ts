import { variantLeadComment } from "@/components/common/variant-code-prefix";

import { DRAWER_TRIGGER_CLASS } from "./drawer-code-examples.data";
import type { DrawerDemoProps } from "./drawer-code-examples.types";

export function drawerSnippet(opts: DrawerDemoProps): string {
  const { side, size, appearance, label } = opts;
  const sideAttr = side === "right" ? "" : ` side="${side}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  const appearanceAttr =
    appearance === "default" ? "" : ` appearance="${appearance}"`;
  return `import { Drawer, DrawerBody, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@zentauri-ui/zentauri-components/ui/drawer/animated";

${variantLeadComment(`DrawerContent · side · ${side}, size · ${size}, appearance · ${appearance}`)}<Drawer>
  <DrawerTrigger appearance="${appearance}" className="${DRAWER_TRIGGER_CLASS}">
    ${label}
  </DrawerTrigger>
  <DrawerContent${sideAttr}${sizeAttr}${appearanceAttr} animation="fade">
    <DrawerClose />
    <DrawerHeader>
      <DrawerTitle>Panel</DrawerTitle>
    </DrawerHeader>
    <DrawerBody>
      <p className="text-sm text-slate-300">Drawer body copy.</p>
    </DrawerBody>
  </DrawerContent>
</Drawer>`;
}
