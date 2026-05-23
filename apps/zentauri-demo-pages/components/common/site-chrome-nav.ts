export type SiteChromeNavItem = {
  href: string;
  label: string;
  external?: boolean;
};

export const siteChromeNavItems = [
  { href: "/preview/installation", label: "Installation" },
  { href: "/preview/components", label: "Components" },
  { href: "/preview/hooks", label: "Hooks" },
  { href: "/preview/typography", label: "Typography" },
  { href: "/preview/charts", label: "Charts" },
  { href: "/demo", label: "Demos" },
  {
    href: "https://github.com/ShubhamTiwari909/zentauri-ui",
    label: "GitHub",
    external: true,
  },
] satisfies SiteChromeNavItem[];
