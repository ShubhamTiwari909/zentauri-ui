/**
 * Single source of truth for the demo item pool: id, label, and the
 * `react-icons/fi` export name (as a string, not JSX) for each entry.
 *
 * `demo.tsx` resolves `icon` to an actual icon component to build the live
 * `ITEM_POOL`; `snippets.ts` uses the same `icon` string directly to render
 * matching `<FiXxx />` text in the "Show code" snippet. Keeping both derived
 * from this one list is what keeps the snippet and the demo in sync.
 */
export const CIRCULAR_MENU_ITEM_POOL_DATA = [
  { id: "copy", label: "Copy", icon: "FiCopy" },
  { id: "share", label: "Share", icon: "FiShare2" },
  { id: "edit", label: "Edit", icon: "FiEdit2" },
  { id: "save", label: "Save", icon: "FiSave" },
  { id: "download", label: "Download", icon: "FiDownload" },
  { id: "link", label: "Copy link", icon: "FiLink" },
  { id: "star", label: "Star", icon: "FiStar" },
  { id: "bookmark", label: "Bookmark", icon: "FiBookmark" },
  { id: "like", label: "Like", icon: "FiHeart" },
  { id: "notify", label: "Notify", icon: "FiBell" },
  { id: "send", label: "Send", icon: "FiSend" },
  { id: "delete", label: "Delete", icon: "FiTrash2" },
] as const;
