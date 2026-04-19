export type SiteChromeNavItem = {
  href: string;
  label: string;
  external?: boolean;
};

export const siteChromeNavItems: readonly SiteChromeNavItem[] = [
  { href: "/", label: "Home" },
  { href: "/preview/installation", label: "Installation" },
  { href: "/preview/components", label: "Components" },
  { href: "/preview/hooks", label: "Hooks" },
  {
    href: "https://github.com/ShubhamTiwari909/zentauri-ui",
    label: "GitHub",
    external: true,
  },
] as const;
