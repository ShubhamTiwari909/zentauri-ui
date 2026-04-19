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

      <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <Drawer defaultOpen={false}>
          <DrawerTrigger className="rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/15">
            Open drawer
          </DrawerTrigger>
          <DrawerContentAnimated
            side="right"
            animation="slide"
            appearance="glass"
            size="md"
          >
            <DrawerClose />
            <DrawerHeader>
              <DrawerTitle>Filters</DrawerTitle>
            </DrawerHeader>
            <DrawerBody>
              <p className="text-sm text-slate-300">
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
