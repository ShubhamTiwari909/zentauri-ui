import { Section } from "@/components/common/Section";
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
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />

      <CardAnimated
        appearance="outline"
        animation="lift"
        rounded="lg"
        className="max-w-md"
      >
        <CardHeader>
          <CardTitle className="text-slate-100 dark:text-slate-50">
            Usage this month
          </CardTitle>
          <CardDescription>Resets on the first of next month.</CardDescription>
        </CardHeader>
        <CardBody>
          <p className="text-2xl font-semibold text-slate-900 dark:text-white">
            72%
          </p>
          <p className="text-sm text-slate-800 dark:text-slate-400">
            of included API calls consumed
          </p>
        </CardBody>
        <CardFooter className="flex gap-2">
          <Button appearance="teal" size="sm">
            Details
          </Button>
          <ButtonAnimated appearance="sky" size="sm" animation="lift">
            Upgrade
          </ButtonAnimated>
        </CardFooter>
      </CardAnimated>
    </Section>
  );
}
