import { PreviewHeroSeoBlock } from "@/components/preview/seo/preview-hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import {
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@zentauri-ui/zentauri-components/ui/card";
import { CardAnimated } from "@zentauri-ui/zentauri-components/ui/card/animated";
import { Button } from "@zentauri-ui/zentauri-components/ui/buttons";
import { ButtonAnimated } from "@zentauri-ui/zentauri-components/ui/buttons/animated";

export function CardHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
      <PreviewHeroSeoBlock seo={seo} />

      <CardAnimated
        appearance="glass"
        animation="lift"
        rounded="lg"
        className="max-w-md"
      >
        <CardHeader>
          <CardTitle>Usage this month</CardTitle>
          <CardDescription>Resets on the first of next month.</CardDescription>
        </CardHeader>
        <CardBody>
          <p className="text-2xl font-semibold text-white">72%</p>
          <p className="text-sm text-slate-400">
            of included API calls consumed
          </p>
        </CardBody>
        <CardFooter className="flex gap-2">
          <Button appearance="outline" size="sm">
            Details
          </Button>
          <ButtonAnimated appearance="sky" size="sm" animation="lift">
            Upgrade
          </ButtonAnimated>
        </CardFooter>
      </CardAnimated>
    </section>
  );
}
