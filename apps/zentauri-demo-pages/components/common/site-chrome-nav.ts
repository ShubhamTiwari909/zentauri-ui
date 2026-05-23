export type SiteChromeNavItem = {
  href: string;
  label: string;
  external?: boolean;
};

export const siteChromeNavItems = [
  { href: "https://zentauri-ui.vercel.app/preview/installation", label: "Installation" },
  { href: "https://zentauri-ui.vercel.app/preview/components", label: "Components" },
  { href: "https://zentauri-ui.vercel.app/preview/hooks", label: "Hooks" },
  { href: "https://zentauri-ui.vercel.app/preview/typography", label: "Typography" },
  { href: "https://zentauri-ui.vercel.app/preview/charts", label: "Charts" },
  { href: "/demo", label: "Demos" },
  {
    href: "https://github.com/ShubhamTiwari909/zentauri-ui",
    label: "GitHub",
    external: true,
  },
] satisfies SiteChromeNavItem[];
