export type SiteChromeNavItem = {
  href: string;
  label: string;
  external?: boolean;
};

export type SiteHeaderSite = "library" | "demos";

export const ZENTAURI_LIBRARY_ORIGIN = "https://zentauri-ui.vercel.app";
export const ZENTAURI_DEMOS_ORIGIN = "https://zentauri-ui-demo.vercel.app";
export const ZENTAURI_GITHUB_URL =
  "https://github.com/ShubhamTiwari909/zentauri-ui";

const libraryRouteItems = [
  { href: "/preview/installation", label: "Installation" },
  { href: "/preview/components", label: "Components" },
  { href: "/preview/hooks", label: "Hooks" },
  { href: "/preview/animations", label: "Animations" },
  { href: "/preview/typography", label: "Typography" },
  { href: "/preview/charts", label: "Charts" },
  { href: "/preview/tokens", label: "Design tokens" },
  { href: "/contact-us", label: "Contact" },
] as const;

function withOrigin(path: string, origin: string) {
  return `${origin}${path}`;
}

export function getSiteChromeNavItems(
  site: SiteHeaderSite,
): readonly SiteChromeNavItem[] {
  const libraryItems = libraryRouteItems.map((item) => ({
    ...item,
    href:
      site === "library"
        ? item.href
        : withOrigin(item.href, ZENTAURI_LIBRARY_ORIGIN),
  }));

  return [
    ...libraryItems,
    {
      href:
        site === "demos" ? "/demo" : withOrigin("/demo", ZENTAURI_DEMOS_ORIGIN),
      label: "Demos",
    },
    {
      href: ZENTAURI_GITHUB_URL,
      label: "GitHub",
      external: true,
    },
  ];
}

export function getSiteHeaderBrand(site: SiteHeaderSite) {
  return {
    href: site === "demos" ? ZENTAURI_LIBRARY_ORIGIN : "/",
  };
}
