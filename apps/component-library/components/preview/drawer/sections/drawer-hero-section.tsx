import { PreviewHeroSeoBlock } from "@/components/preview/seo/preview-hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { ButtonAnimated } from "@zentauri-ui/zentauri-components/ui/buttons/animated";
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@zentauri-ui/zentauri-components/ui/drawer";
import { DrawerContentAnimated } from "@zentauri-ui/zentauri-components/ui/drawer/animated";

export function DrawerHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
      <PreviewHeroSeoBlock seo={seo} />

      <div className="rounded-3xl border dark:border-white/10 border-slate-900/10 bg-slate-100 dark:bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40">
        <Drawer defaultOpen={false}>
          <DrawerTrigger appearance="sky">Open drawer</DrawerTrigger>
          <DrawerContentAnimated
            side="right"
            animation="slide"
            appearance="sky"
            size="md"
          >
            <DrawerClose />
            <DrawerHeader>
              <DrawerTitle>Filters</DrawerTitle>
            </DrawerHeader>
            <DrawerBody>
              <p className="text-sm text-slate-800 dark:text-slate-300">
                Refine the list by status, owner, or date range.
              </p>
            </DrawerBody>
            <DrawerFooter>
              <ButtonAnimated appearance="sky" size="sm" animation="lift">
                Apply
              </ButtonAnimated>
            </DrawerFooter>
          </DrawerContentAnimated>
        </Drawer>
      </div>
    </section>
  );
}
