import { Section, SectionCard } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
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
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />

      <SectionCard variant="panel">
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
      </SectionCard>
    </Section>
  );
}
