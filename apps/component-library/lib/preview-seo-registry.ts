import type { PreviewSeoDocument } from "@/lib/preview-seo";
import accordion from "@/content/seo/preview/components/accordion.json";
import alert from "@/content/seo/preview/components/alert.json";
import avatar from "@/content/seo/preview/components/avatar.json";
import badge from "@/content/seo/preview/components/badge.json";
import breadcrumb from "@/content/seo/preview/components/breadcrumb.json";
import buttons from "@/content/seo/preview/components/buttons.json";
import card from "@/content/seo/preview/components/card.json";
import divider from "@/content/seo/preview/components/divider.json";
import drawer from "@/content/seo/preview/components/drawer.json";
import dropdown from "@/content/seo/preview/components/dropdown.json";
import emptyState from "@/content/seo/preview/components/empty-state.json";
import hooks from "@/content/seo/preview/hooks/hooks.json";
import fileUpload from "@/content/seo/preview/components/file-upload.json";
import index from "@/content/seo/preview/components/index.json";
import inputs from "@/content/seo/preview/components/inputs.json";
import installation from "@/content/seo/preview/components/installation.json";
import modal from "@/content/seo/preview/components/modal.json";
import pagination from "@/content/seo/preview/components/pagination.json";
import progress from "@/content/seo/preview/components/progress.json";
import select from "@/content/seo/preview/components/select.json";
import skeleton from "@/content/seo/preview/components/skeleton.json";
import slider from "@/content/seo/preview/components/slider.json";
import spinner from "@/content/seo/preview/components/spinner.json";
import stepper from "@/content/seo/preview/components/stepper.json";
import table from "@/content/seo/preview/components/table.json";
import tabs from "@/content/seo/preview/components/tabs.json";
import toast from "@/content/seo/preview/components/toast.json";
import toggle from "@/content/seo/preview/components/toggle.json";
import tooltip from "@/content/seo/preview/components/tooltip.json";

const previewSeoRegistry = {
  index: index as PreviewSeoDocument,
  installation: installation as PreviewSeoDocument,
  accordion: accordion as PreviewSeoDocument,
  alert: alert as PreviewSeoDocument,
  avatar: avatar as PreviewSeoDocument,
  badge: badge as PreviewSeoDocument,
  breadcrumb: breadcrumb as PreviewSeoDocument,
  buttons: buttons as PreviewSeoDocument,
  card: card as PreviewSeoDocument,
  divider: divider as PreviewSeoDocument,
  drawer: drawer as PreviewSeoDocument,
  dropdown: dropdown as PreviewSeoDocument,
  "empty-state": emptyState as PreviewSeoDocument,
  hooks: hooks as PreviewSeoDocument,
  "file-upload": fileUpload as PreviewSeoDocument,
  inputs: inputs as PreviewSeoDocument,
  modal: modal as PreviewSeoDocument,
  pagination: pagination as PreviewSeoDocument,
  progress: progress as PreviewSeoDocument,
  select: select as PreviewSeoDocument,
  skeleton: skeleton as PreviewSeoDocument,
  slider: slider as PreviewSeoDocument,
  spinner: spinner as PreviewSeoDocument,
  stepper: stepper as PreviewSeoDocument,
  table: table as PreviewSeoDocument,
  tabs: tabs as PreviewSeoDocument,
  toast: toast as PreviewSeoDocument,
  toggle: toggle as PreviewSeoDocument,
  tooltip: tooltip as PreviewSeoDocument,
} as const;

export type PreviewSeoSlug = keyof typeof previewSeoRegistry;

export function getPreviewSeo(slug: PreviewSeoSlug): PreviewSeoDocument {
  return previewSeoRegistry[slug];
}
