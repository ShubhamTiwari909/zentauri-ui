import type { PreviewSeoDocument } from "@/lib/preview-seo";
import accordion from "@/content/seo/preview/accordion.json";
import alert from "@/content/seo/preview/alert.json";
import avatar from "@/content/seo/preview/avatar.json";
import badge from "@/content/seo/preview/badge.json";
import breadcrumb from "@/content/seo/preview/breadcrumb.json";
import buttons from "@/content/seo/preview/buttons.json";
import card from "@/content/seo/preview/card.json";
import divider from "@/content/seo/preview/divider.json";
import drawer from "@/content/seo/preview/drawer.json";
import dropdown from "@/content/seo/preview/dropdown.json";
import emptyState from "@/content/seo/preview/empty-state.json";
import fileUpload from "@/content/seo/preview/file-upload.json";
import index from "@/content/seo/preview/index.json";
import inputs from "@/content/seo/preview/inputs.json";
import installation from "@/content/seo/preview/installation.json";
import modal from "@/content/seo/preview/modal.json";
import pagination from "@/content/seo/preview/pagination.json";
import progress from "@/content/seo/preview/progress.json";
import select from "@/content/seo/preview/select.json";
import skeleton from "@/content/seo/preview/skeleton.json";
import slider from "@/content/seo/preview/slider.json";
import spinner from "@/content/seo/preview/spinner.json";
import stepper from "@/content/seo/preview/stepper.json";
import table from "@/content/seo/preview/table.json";
import tabs from "@/content/seo/preview/tabs.json";
import toast from "@/content/seo/preview/toast.json";
import toggle from "@/content/seo/preview/toggle.json";
import tooltip from "@/content/seo/preview/tooltip.json";

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
