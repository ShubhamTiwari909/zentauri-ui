export type SiteHeaderProps = {
  className?: string;
  showMenuToggle?: boolean;
  isMenuOpen?: boolean;
  onMenuToggle?: () => void;
  /** Element id controlled by the menu toggle (e.g. sidebar `id`). */
  menuControlsId?: string;
};
