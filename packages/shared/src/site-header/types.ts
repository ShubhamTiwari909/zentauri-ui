import type { ComponentType } from "react";

import type { SiteHeaderSite } from "./navigation";

export type SiteSearchOpenButtonComponent = ComponentType<{
  className?: string;
}>;

export type SiteHeaderProps = {
  className?: string;
  site: SiteHeaderSite;
  SearchOpenButton: SiteSearchOpenButtonComponent;
  showMenuToggle?: boolean;
  isMenuOpen?: boolean;
  onMenuToggle?: () => void;
  /** Element id controlled by the menu toggle (e.g. sidebar `id`). */
  menuControlsId?: string;
};
