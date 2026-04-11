export type SidebarNavItem = {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
};

export type SidebarNavGroup = {
  title: string;
  items: SidebarNavItem[];
};

export const sidebarRouteData: SidebarNavGroup[] = [
  {
    title: "Getting Started",
    items: [
      {
        title: "Introduction",
        href: "/preview",
      },
    ],
  },
  {
    title: "Components",
    items: [
      {
        title: "Buttons",
        href: "/preview/buttons",
      },
    ],
  },
];
