import { variantLeadComment } from "@/components/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@zentauri-ui/zentauri-components/ui/drawer";
import { DrawerContentAnimated } from "@zentauri-ui/zentauri-components/ui/drawer/animated";

export function DrawerExamplesSection() {
  return (
    <section className="rounded-3xl border dark:border-white/10 border-slate-900/10 bg-slate-100 dark:bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40">
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-900 dark:text-slate-400">
        Bottom drawer for mobile-friendly sheets.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        <PreviewCodeShowcase
          code={`import { Drawer, DrawerTrigger, DrawerContent, DrawerClose, DrawerHeader, DrawerTitle, DrawerBody } from "@zentauri-ui/zentauri-components/ui/drawer";
import { DrawerContentAnimated } from "@zentauri-ui/zentauri-components/ui/drawer/animated";

${variantLeadComment(`DrawerContent · side · bottom, animation · slide, size · md (preview)`)}
<Drawer>
  <DrawerTrigger>Open - Animated</DrawerTrigger>
  <DrawerContentAnimated side="bottom" animation="slide" size="md">
    <DrawerClose />
    <DrawerHeader>
      <DrawerTitle>Shortcuts</DrawerTitle>
    </DrawerHeader>
    <DrawerBody>
      <p className="text-sm text-slate-900 dark:text-slate-300">
        Swipe down or press Escape to dismiss.
      </p>
    </DrawerBody>
  </DrawerContentAnimated>
</Drawer>`}
        >
          <Drawer>
            <DrawerTrigger>Open bottom drawer - Animated</DrawerTrigger>
            <DrawerContentAnimated side="bottom" animation="slide" size="md">
              <DrawerClose />
              <DrawerHeader>
                <DrawerTitle>Shortcuts</DrawerTitle>
              </DrawerHeader>
              <DrawerBody>
                <p className="text-sm text-slate-900 dark:text-slate-300">
                  Swipe down or press Escape to dismiss.
                </p>
              </DrawerBody>
            </DrawerContentAnimated>
          </Drawer>
        </PreviewCodeShowcase>
      </div>
    </section>
  );
}
