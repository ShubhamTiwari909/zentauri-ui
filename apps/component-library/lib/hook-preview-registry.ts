import { HOOK_PREVIEW_REGISTRY } from "./constants";


export type HookPreviewRegistryEntry = (typeof HOOK_PREVIEW_REGISTRY)[number];

export type HookPreviewSlug = HookPreviewRegistryEntry["slug"];

export const HOOK_PREVIEW_SLUGS: HookPreviewSlug[] =
  HOOK_PREVIEW_REGISTRY.map((entry) => entry.slug);

export function isHookPreviewSlug(value: string): value is HookPreviewSlug {
  return HOOK_PREVIEW_SLUGS.includes(value as HookPreviewSlug);
}

export function getHookPreviewEntry(
  slug: HookPreviewSlug,
): HookPreviewRegistryEntry {
  const entry = HOOK_PREVIEW_REGISTRY.find((item) => item.slug === slug);
  if (!entry) {
    throw new Error(`Unknown hook preview slug: ${slug}`);
  }
  return entry;
}

export function hookImportPath(moduleName: string): string {
  return `@zentauri-ui/zentauri-components/lib/${moduleName}`;
}
