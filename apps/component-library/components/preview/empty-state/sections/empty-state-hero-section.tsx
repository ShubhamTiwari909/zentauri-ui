import { HiInbox } from "react-icons/hi2";
import {
  EmptyState,
  EmptyStateAction,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "@/components/ui/empty-state";
import { Button } from "@/components/ui/buttons";

export function EmptyStateHeroSection() {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
      <div className="max-w-2xl space-y-6">
        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-cyan-200">
          Layout
        </span>
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Empty states for zero-data moments.
          </h1>
          <p className="max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
            Icon, title, description, and action slots with subtle motion presets
            so blank screens still feel intentional.
          </p>
        </div>
      </div>

      <EmptyState appearance="card" animation="float" size="md" className="max-w-lg">
        <EmptyStateIcon>
          <HiInbox className="size-10 text-slate-300" aria-hidden />
        </EmptyStateIcon>
        <EmptyStateTitle>No messages yet</EmptyStateTitle>
        <EmptyStateDescription>
          When conversations arrive, they will show up here.
        </EmptyStateDescription>
        <EmptyStateAction>
          <Button appearance="sky" size="sm" animation="lift">
            Compose
          </Button>
        </EmptyStateAction>
      </EmptyState>
    </section>
  );
}
