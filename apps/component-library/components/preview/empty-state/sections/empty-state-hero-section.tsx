import { PreviewHeroSeoBlock } from "@/components/preview/seo/preview-hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { HiInbox } from "react-icons/hi2";
import { ButtonAnimated } from "@zentauri-ui/zentauri-components/ui/buttons/animated";
import {
  EmptyStateAction,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "@zentauri-ui/zentauri-components/ui/empty-state";
import {
  EmptyStateAnimated,
} from "@zentauri-ui/zentauri-components/ui/empty-state/animated";

export function EmptyStateHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
      <PreviewHeroSeoBlock seo={seo} />

      <EmptyStateAnimated
        appearance="card"
        animation="float"
        size="md"
        className="max-w-lg"
      >
        <EmptyStateIcon>
          <HiInbox className="size-10 text-slate-300" aria-hidden />
        </EmptyStateIcon>
        <EmptyStateTitle>No messages yet</EmptyStateTitle>
        <EmptyStateDescription>
          When conversations arrive, they will show up here.
        </EmptyStateDescription>
        <EmptyStateAction>
          <ButtonAnimated appearance="sky" size="sm" animation="lift">
            Compose
          </ButtonAnimated>
        </EmptyStateAction>
      </EmptyStateAnimated>
    </section>
  );
}
