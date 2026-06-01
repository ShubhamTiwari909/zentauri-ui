import { Section } from "@/components/common/Section";
import { variantLeadComment } from "@/components/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import {
  Tooltip,
  TooltipTrigger,
} from "@zentauri-ui/zentauri-components/ui/tooltip";
import { TooltipContentAnimated } from "@zentauri-ui/zentauri-components/ui/tooltip/animated";

export function TooltipExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-900 dark:text-slate-400">
        Longer hover delay and danger intent for critical controls.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        <PreviewCodeShowcase
          code={`${variantLeadComment("Tooltip · delay · 400, position · bottom")}
<Tooltip position="bottom" delay={400}>
  <TooltipTrigger className="text-slate-900 dark:text-white">
    Slow hover
  </TooltipTrigger>
  <TooltipContentAnimated variant="outline" size="sm" animation="fade">
    Opens after 400ms on hover; focus still opens immediately.
  </TooltipContentAnimated>
</Tooltip>`}
        >
          <Tooltip position="bottom" delay={400}>
            <TooltipTrigger className="text-slate-900 dark:text-white">Slow hover</TooltipTrigger>
            <TooltipContentAnimated
              variant="outline"
              size="sm"
              animation="fade"
            >
              Opens after 400ms on hover; focus still opens immediately.
            </TooltipContentAnimated>
          </Tooltip>
        </PreviewCodeShowcase>

        <PreviewCodeShowcase
          code={`${variantLeadComment("TooltipContentAnimated · animation · scale")}
<Tooltip position="top">
  <TooltipTrigger className="text-slate-900 dark:text-white">
    Delete row
  </TooltipTrigger>
  <TooltipContentAnimated variant="default" size="lg" animation="scale">
    This removes the row for everyone. You cannot undo this action.
  </TooltipContentAnimated>
</Tooltip>`}
        >
          <Tooltip position="top">
            <TooltipTrigger className="text-slate-900 dark:text-white">
              Delete row
            </TooltipTrigger>
            <TooltipContentAnimated
              variant="default"
              size="lg"
              animation="scale"
            >
              This removes the row for everyone. You cannot undo this action.
            </TooltipContentAnimated>
          </Tooltip>
        </PreviewCodeShowcase>
      </div>
    </Section>
  );
}
