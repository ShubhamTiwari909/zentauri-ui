import { HOOK_PREVIEW_REGISTRY } from "@/lib/constants";
import { SidebarNavGroup } from "./types";

const hookSidebarItems = [...HOOK_PREVIEW_REGISTRY]
  .sort((a, b) => a.name.localeCompare(b.name))
  .map((hook) => ({
    title: hook.name,
    href: `/preview/hooks/${hook.slug}`,
  }));

export const sidebareRouteDataShared = [
  {
    title: "Getting Started",
    items: [
      {
        title: "Installation",
        href: "/preview/installation",
      },
      {
        title: "Components",
        href: "/preview/components",
      },
      {
        title: "Hooks",
        href: "/preview/hooks",
      },
      {
        title: "Typography",
        href: "/preview/typography",
      },
    ],
  },
];

const typographySidebarItems = [
  {
    title: "Heading",
    href: "/preview/typography/heading",
  },
  {
    title: "Paragraph",
    href: "/preview/typography/paragraph",
  },
  {
    title: "Lists",
    href: "/preview/typography/lists",
  },
  {
    title: "Blockquote",
    href: "/preview/typography/blockquote",
  },
  {
    title: "Inline",
    href: "/preview/typography/inline",
  },
  {
    title: "Code Block",
    href: "/preview/typography/code-block",
  },
];

export const sidebarTypographyData: SidebarNavGroup[] = [
  ...sidebareRouteDataShared,
  {
    title: "Typography",
    items: [
      ...typographySidebarItems,
    ],
  },
];

export const sidebarHooksData: SidebarNavGroup[] = [
  ...sidebareRouteDataShared,
  {
    title: "Hooks",
    items: [
      ...hookSidebarItems,
    ],
  },
];

export const sidebarComponentsData: SidebarNavGroup[] = [
  ...sidebareRouteDataShared,
  {
    title: "Components",
    items: [
      {
        title: "Accordion",
        href: "/preview/components/accordion",
      },
      {
        title: "Alert",
        href: "/preview/components/alert",
      },
      {
        title: "Avatar",
        href: "/preview/components/avatar",
      },
      {
        title: "Badge",
        href: "/preview/components/badge",
      },
      {
        title: "Breadcrumb",
        href: "/preview/components/breadcrumb",
      },
      {
        title: "Buttons",
        href: "/preview/components/buttons",
      },
      {
        title: "Card",
        href: "/preview/components/card",
      },
      {
        title: "Divider",
        href: "/preview/components/divider",
      },
      {
        title: "Drawer",
        href: "/preview/components/drawer",
      },
      {
        title: "Dropdown",
        href: "/preview/components/dropdown",
      },
      {
        title: "Empty state",
        href: "/preview/components/empty-state",
      },
      {
        title: "File upload",
        href: "/preview/components/file-upload",
      },
      {
        title: "Inputs",
        href: "/preview/components/inputs",
      },
      {
        title: "Modal",
        href: "/preview/components/modal",
      },
      {
        title: "Pagination",
        href: "/preview/components/pagination",
      },
      {
        title: "Progress",
        href: "/preview/components/progress",
      },
      {
        title: "Search",
        href: "/preview/components/search",
      },
      {
        title: "Select",
        href: "/preview/components/select",
      },
      {
        title: "Skeleton",
        href: "/preview/components/skeleton",
      },
      {
        title: "Slider",
        href: "/preview/components/slider",
      },
      {
        title: "Spinner",
        href: "/preview/components/spinner",
      },
      {
        title: "Stepper",
        href: "/preview/components/stepper",
      },
      {
        title: "Table",
        href: "/preview/components/table",
      },
      {
        title: "Tabs",
        href: "/preview/components/tabs",
      },
      {
        title: "Toast",
        href: "/preview/components/toast",
      },
      {
        title: "Toggle",
        href: "/preview/components/toggle",
      },
      {
        title: "Tooltip",
        href: "/preview/components/tooltip",
      },
    ],
  },
];
