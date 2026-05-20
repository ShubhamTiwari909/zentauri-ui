import { Section } from "@/components/common/Section";
import {
  Avatar,
  AvatarFallback,
} from "@zentauri-ui/zentauri-components/ui/avatar";

export function AvatarExamplesSection() {
  return (
    <Section variant="plain" className="space-y-6">
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
    </Section>
  );
}
