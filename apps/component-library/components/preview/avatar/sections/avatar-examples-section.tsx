import {
  Avatar,
  AvatarFallback,
} from "@zentauri-ui/zentauri-components/ui/avatar";

export function AvatarExamplesSection() {
  return (
    <section className="space-y-6 rounded-2xl border border-slate-900/10 dark:border-white/10 bg-white dark:bg-white/5 p-5">
      <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
        Sizes
      </h2>
      <div className="flex flex-wrap items-end gap-4 ">
        <Avatar size="sm">
          <AvatarFallback>SM</AvatarFallback>
        </Avatar>
        <Avatar size="md">
          <AvatarFallback>MD</AvatarFallback>
        </Avatar>
        <Avatar size="lg">
          <AvatarFallback>LG</AvatarFallback>
        </Avatar>
        <Avatar size="xl">
          <AvatarFallback>XL</AvatarFallback>
        </Avatar>
      </div>
    </section>
  );
}
