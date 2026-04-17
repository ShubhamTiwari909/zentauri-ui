import {
  Avatar,
  AvatarFallback,
} from "@zentauri-ui/zentauri-components/ui/avatar";

export function AvatarExamplesSection() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold text-white">Sizes</h2>
      <div className="flex flex-wrap items-end gap-4 rounded-2xl border border-white/10 bg-white/5 p-5">
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
