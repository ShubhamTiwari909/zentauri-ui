import { siteChromeNavItems } from "@/components/common/site-chrome-nav";
import {
  sidebarComponentsData,
  sidebarHooksData,
  sidebarTypographyData,
} from "@/components/sidebar/sidebar-data";
import { HOOK_PREVIEW_REGISTRY } from "@/lib/constants";

export type SiteSearchEntryRecord = {
  id: string;
  label: string;
  href: string;
  group?: string;
  description?: string;
  keywords?: readonly string[];
  external?: boolean;
};

const HOOK_SLUG_PREFIX = "/preview/hooks/";

const navKeywords: Record<string, readonly string[]> = {
  "/": ["home", "landing", "zentauri"],
  "/preview/installation": ["install", "setup", "npm", "package", "getting started"],
  "/preview/components": ["components", "ui", "catalog"],
  "/preview/hooks": ["hooks", "react hooks", "catalog"],
  "/preview/typography": ["typography", "text", "styles", "catalog"],
  "https://github.com/ShubhamTiwari909/zentauri-ui": [
    "github",
    "repository",
    "repo",
    "source",
    "code",
    "issues",
  ],
};

function hookSlugFromHref(href: string): string | undefined {
  if (!href.startsWith(HOOK_SLUG_PREFIX)) {
    return undefined;
  }
  const slug = href.slice(HOOK_SLUG_PREFIX.length);
  return slug.length > 0 ? slug : undefined;
}

function hookMetaForHref(href: string) {
  const slug = hookSlugFromHref(href);
  if (!slug) {
    return undefined;
  }
  return HOOK_PREVIEW_REGISTRY.find((h) => h.slug === slug);
}

function pathKeywordTokens(href: string): string[] {
  return href.split("/").filter(Boolean);
}

function buildSiteSearchEntries(): SiteSearchEntryRecord[] {
  const byHref = new Map<string, SiteSearchEntryRecord>();

  for (const group of sidebarComponentsData) {
    for (const item of group.items) {
      if (byHref.has(item.href)) {
        continue;
      }
      const hookMeta = hookMetaForHref(item.href);
      const keywords = hookMeta
        ? [hookMeta.name, hookMeta.module, hookMeta.slug]
        : pathKeywordTokens(item.href);
      byHref.set(item.href, {
        id: item.href,
        label: item.title,
        href: item.href,
        group: group.title,
        external: item.external,
        description: hookMeta?.description,
        keywords: keywords.length > 0 ? keywords : undefined,
      });
    }
  }

  for (const group of sidebarHooksData) {
    for (const item of group.items) {
      if (byHref.has(item.href)) {
        continue;
      }
      const hookMeta = hookMetaForHref(item.href);
      const keywords = hookMeta
        ? [hookMeta.name, hookMeta.module, hookMeta.slug]
        : pathKeywordTokens(item.href);
      byHref.set(item.href, {
        id: item.href,
        label: item.title,
        href: item.href,
        group: group.title,
        external: item.external,
        description: hookMeta?.description,
        keywords: keywords.length > 0 ? keywords : undefined,
      });
    }
  }

  for (const group of sidebarTypographyData) {
    for (const item of group.items) {
      if (byHref.has(item.href)) {
        continue;
      }
      byHref.set(item.href, {
        id: item.href,
        label: item.title,
        href: item.href,
        group: group.title,
        external: item.external,
        keywords: pathKeywordTokens(item.href),
      });
    }
  }

  for (const nav of siteChromeNavItems) {
    const extra = navKeywords[nav.href];
    const existing = byHref.get(nav.href);
    if (existing) {
      byHref.set(nav.href, {
        ...existing,
        keywords: extra
          ? [...new Set([...(existing.keywords ?? []), ...extra])]
          : existing.keywords,
        external: nav.external ?? existing.external,
      });
      continue;
    }
    byHref.set(nav.href, {
      id: nav.href,
      label: nav.label,
      href: nav.href,
      group: "Site",
      external: nav.external,
      keywords: extra,
    });
  }

  return [...byHref.values()];
}

let cachedEntries: SiteSearchEntryRecord[] | undefined;

export function getSiteSearchEntries(): SiteSearchEntryRecord[] {
  if (!cachedEntries) {
    cachedEntries = buildSiteSearchEntries();
  }
  return cachedEntries;
}
