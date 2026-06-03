import { layoutRoutes } from "@/app/demo/landing-data";
import { siteChromeNavItems } from "@/components/common/site-chrome-nav";

export type SiteSearchEntryRecord = {
  id: string;
  label: string;
  href: string;
  group?: string;
  description?: string;
  keywords?: readonly string[];
  external?: boolean;
};

const componentLibraryEntries = [
  {
    id: "/preview/installation",
    label: "Installation",
    href: "/preview/installation",
    group: "Component Library",
    keywords: ["setup", "install", "npm", "package"],
  },
  {
    id: "/preview/components",
    label: "Components",
    href: "/preview/components",
    group: "Component Library",
    keywords: ["ui", "catalog", "buttons", "cards", "tabs"],
  },
  {
    id: "/preview/hooks",
    label: "Hooks",
    href: "/preview/hooks",
    group: "Component Library",
    keywords: ["react", "hooks", "utilities"],
  },
  {
    id: "/preview/typography",
    label: "Typography",
    href: "/preview/typography",
    group: "Component Library",
    keywords: ["text", "heading", "styles"],
  },
  {
    id: "/preview/charts",
    label: "Charts",
    href: "/preview/charts",
    group: "Component Library",
    keywords: ["data", "recharts", "visualization"],
  },
] satisfies SiteSearchEntryRecord[];

export function getSiteSearchEntries(): SiteSearchEntryRecord[] {
  const layoutEntries = layoutRoutes.map((route) => ({
    id: `/demo/${route.slug}`,
    label: route.label,
    href: `/demo/${route.slug}`,
    group: "Demo Layouts",
    description: route.description,
    keywords: [route.slug, "demo", "landing", "theme"],
  }));

  const navEntries = siteChromeNavItems.map((item) => ({
    id: item.href,
    label: item.label,
    href: item.href,
    group: item.href.startsWith("/demo") ? "Demo" : "Navigation",
    external: item.external,
    keywords: [item.label.toLowerCase()],
  }));

  const byHref = new Map<string, SiteSearchEntryRecord>();
  for (const entry of [
    ...layoutEntries,
    ...componentLibraryEntries,
    ...navEntries,
  ]) {
    byHref.set(entry.href, entry);
  }
  return [...byHref.values()];
}
