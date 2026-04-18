import type { ComponentHighlight } from "./types";
import { HOOK_PREVIEW_REGISTRY } from "@/lib/constants";

export const hooksData: ComponentHighlight[] = HOOK_PREVIEW_REGISTRY.map((hook) => ({
  id: hook.slug,
  name: hook.name,
  description: hook.description,
  href: `/preview/hooks/${hook.slug}`,
  badge: "Hook",
}));
