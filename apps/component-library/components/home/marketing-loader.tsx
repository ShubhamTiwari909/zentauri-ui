"use client";

import dynamic from "next/dynamic";

const HomeMarketing = dynamic(
  () => import("./marketing").then((mod) => mod.HomeMarketing),
  {
    loading: () => <div className="min-h-80" aria-hidden="true" />,
    ssr: false,
  },
);

export function HomeMarketingLoader() {
  return <HomeMarketing />;
}
