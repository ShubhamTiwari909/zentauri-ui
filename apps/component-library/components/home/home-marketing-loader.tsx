"use client";

import { useIntersectionObserver } from "@zentauri-ui/zentauri-components/hooks/useIntersectionObserver";
import dynamic from "next/dynamic";

const HomeMarketing = dynamic(
  () => import("./home-marketing").then((mod) => mod.HomeMarketing),
  {
    loading: () => <div className="min-h-80" aria-hidden="true" />,
    ssr: false,
  },
);

export function HomeMarketingLoader() {

  const [sentinelRef] = useIntersectionObserver<HTMLDivElement>({
    threshold: [0, 0.5, 1],
  });

  return (
    <div ref={sentinelRef}>
      <HomeMarketing />
    </div>
  );
}
