import { Section } from "@/components/common/Section";
import { variantLeadComment } from "@/components/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@zentauri-ui/zentauri-components/ui/context-menu";

const tasks = [
  ["Design review", "Owner: Priya", "In progress"],
  ["Webhook audit", "Owner: Mateo", "Ready"],
  ["Usage limits", "Owner: Lin", "Queued"],
];

export function ContextMenuExamplesSection() {
  return (
    <Section className="max-w-7xl">
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-900 dark:text-slate-400">
        ContextMenu gives dashboards and work surfaces a predictable right-click
        action model with labels, separators, disabled items, and nested
        actions.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        <PreviewCodeShowcase
          code={`${variantLeadComment("file row actions with submenu")}
<ContextMenu>
  <ContextMenuTrigger>
    <article className="cursor-context-menu">Right-click billing.tsx</article>
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuLabel>File actions</ContextMenuLabel>
    <ContextMenuItem>Open</ContextMenuItem>
    <ContextMenuItem>Copy path</ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuSub>
      <ContextMenuSubTrigger>Move to</ContextMenuSubTrigger>
      <ContextMenuSubContent>
        <ContextMenuItem>Routes</ContextMenuItem>
        <ContextMenuItem>Archive</ContextMenuItem>
      </ContextMenuSubContent>
    </ContextMenuSub>
  </ContextMenuContent>
</ContextMenu>`}
        >
          <ContextMenu>
            <ContextMenuTrigger>
              <article className="cursor-context-menu rounded-2xl border border-slate-900/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
                <p className="font-mono text-sm font-semibold text-slate-950 dark:text-white">
                  billing.tsx
                </p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  Right-click this file row to open actions.
                </p>
              </article>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuLabel>File actions</ContextMenuLabel>
              <ContextMenuItem>Open</ContextMenuItem>
              <ContextMenuItem>Copy path</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuSub>
                <ContextMenuSubTrigger>Move to</ContextMenuSubTrigger>
                <ContextMenuSubContent>
                  <ContextMenuItem>Routes</ContextMenuItem>
                  <ContextMenuItem>Archive</ContextMenuItem>
                </ContextMenuSubContent>
              </ContextMenuSub>
            </ContextMenuContent>
          </ContextMenu>
        </PreviewCodeShowcase>

        <PreviewCodeShowcase
          code={`${variantLeadComment("task table rows with destructive action")}
<div className="divide-y">
  {tasks.map(([title, owner, status]) => (
    <ContextMenu key={title}>
      <ContextMenuTrigger>
        <div className="grid grid-cols-3">...</div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>Task actions</ContextMenuLabel>
        <ContextMenuItem>Assign to me</ContextMenuItem>
        <ContextMenuItem disabled>Blocked by review</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant="rose">Delete task</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ))}
</div>`}
        >
          <div className="overflow-hidden rounded-2xl border border-slate-900/10 bg-white dark:border-white/10 dark:bg-white/5">
            {tasks.map(([title, owner, status]) => (
              <ContextMenu key={title}>
                <ContextMenuTrigger>
                  <div className="grid cursor-context-menu grid-cols-1 gap-2 border-b border-slate-900/10 p-4 last:border-b-0 dark:border-white/10 md:grid-cols-3">
                    <p className="font-medium text-slate-950 dark:text-white">
                      {title}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {owner}
                    </p>
                    <p className="text-sm font-semibold text-cyan-700 dark:text-cyan-200">
                      {status}
                    </p>
                  </div>
                </ContextMenuTrigger>
                <ContextMenuContent>
                  <ContextMenuLabel>Task actions</ContextMenuLabel>
                  <ContextMenuItem>Assign to me</ContextMenuItem>
                  <ContextMenuItem disabled>Blocked by review</ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuItem variant="rose">Delete task</ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            ))}
          </div>
        </PreviewCodeShowcase>
      </div>
    </Section>
  );
}
