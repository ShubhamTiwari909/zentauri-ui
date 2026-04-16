import React from "react";
import { SiteChromeNavItem } from "../site-chrome-nav";
import Link from "next/link";

const SiteNavLink = ({
  item,
  className,
  onNavigate,
}: {
  item: SiteChromeNavItem;
  className: string;
  onNavigate?: () => void;
}) => {
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
};

export default SiteNavLink;
