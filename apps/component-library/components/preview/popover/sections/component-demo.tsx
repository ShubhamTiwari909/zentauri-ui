import { Section } from "@/components/common/Section";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { variantLeadComment } from "@/components/common/variant-code-prefix";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@zentauri-ui/zentauri-components/ui/popover";

const triggerClass =
  "rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100";

export function PopoverExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Interactive popover examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        Popovers are for focusable content: quick edits, notification previews,
        and dense status panels that need click or keyboard interaction.
      </p>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <PreviewCodeShowcase
          code={`${variantLeadComment("Popover · quick action form")}
<Popover>
  <PopoverTrigger>
    <button type="button">Add note</button>
  </PopoverTrigger>
  <PopoverContent align="start" width="sm">
    <label htmlFor="note">Release note</label>
    <textarea id="note" rows={3} />
    <button type="button">Save note</button>
  </PopoverContent>
</Popover>`}
        >
          <Popover>
            <PopoverTrigger>
              <button type="button" className={triggerClass}>
                Add note
              </button>
            </PopoverTrigger>
            <PopoverContent align="start" width="sm">
              <div className="space-y-3">
                <label htmlFor="popover-note" className="text-sm font-semibold">
                  Release note
                </label>
                <textarea
                  id="popover-note"
                  rows={3}
                  className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 dark:border-white/10 dark:bg-slate-950 dark:text-white"
                  defaultValue="Follow up with design after QA."
                />
                <button type="button" className={triggerClass}>
                  Save note
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </PreviewCodeShowcase>
        <PreviewCodeShowcase
          code={`${variantLeadComment("Popover · notification preview")}
<Popover>
  <PopoverTrigger>
    <button type="button">View alerts</button>
  </PopoverTrigger>
  <PopoverContent side="top" variant="glass">
    <p>Deployment ready</p>
    <p>Preview checks finished 2 minutes ago.</p>
  </PopoverContent>
</Popover>`}
        >
          <Popover>
            <PopoverTrigger>
              <button type="button" className={triggerClass}>
                View alerts
              </button>
            </PopoverTrigger>
            <PopoverContent side="top" variant="glass">
              <div className="space-y-2">
                <p className="text-sm font-semibold">Deployment ready</p>
                <p className="text-sm opacity-85">
                  Preview checks finished 2 minutes ago.
                </p>
              </div>
            </PopoverContent>
          </Popover>
        </PreviewCodeShowcase>
      </div>
    </Section>
  );
}
