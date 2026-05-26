import Link from "next/link";

import type { SiteChromeNavItem } from "./navigation";

export function SiteNavLink({
  item,
  className,
  onNavigate,
}: {
  item: SiteChromeNavItem;
  className: string;
  onNavigate?: () => void;
}) {
  if (item.external) {
    return (
      <a
        href={item.href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onNavigate}
      >
        {item.label}
      </a>
    );
  }

  return (
    <Link href={item.href} className={className} onClick={onNavigate}>
      {item.label}
    </Link>
  );
}
