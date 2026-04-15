export type SiteChromeNavItem = {
  href: string;
  label: string;
  external?: boolean;
};

export const siteChromeNavItems: readonly SiteChromeNavItem[] = [
  { href: "/", label: "Home" },
  { href: "/preview", label: "Components" },
  {
    href: "https://github.com/ShubhamTiwari909/zentauri-ui",
    label: "GitHub",
    external: true,
  },
] as const;
