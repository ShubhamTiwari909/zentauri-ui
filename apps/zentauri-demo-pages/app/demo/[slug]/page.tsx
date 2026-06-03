import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DemoLandingPage } from "../landing-page";
import { getLayoutRoute, layoutRoutes } from "../landing-data";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return layoutRoutes.map((route) => ({ slug: route.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const route = getLayoutRoute(slug);

  if (!route) {
    return {};
  }

  return {
    title: `${route.label} | Zentauri Demo`,
    description: route.description,
  };
}

export default async function DemoPage({ params }: PageProps) {
  const { slug } = await params;
  const route = getLayoutRoute(slug);

  if (!route) {
    notFound();
  }

  return <DemoLandingPage route={route} />;
}
