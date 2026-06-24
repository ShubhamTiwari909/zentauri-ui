export type LayoutKind = "dashboard";

export type DemoLayoutRoute = {
  slug: LayoutKind;
  label: string;
  description: string;
  layout: LayoutKind;
};

export const layoutRoutes = [
  {
    slug: "dashboard",
    label: "Dashboard Layout",
    description:
      "A product-forward composition with the live workspace leading the page.",
    layout: "dashboard",
  },
] satisfies DemoLayoutRoute[];

export const getLayoutRoute = (slug: string) =>
  layoutRoutes.find((route) => route.slug === slug);
