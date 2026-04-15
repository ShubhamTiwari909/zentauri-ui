import type { ReactNode } from "react";

const previewPageShellClassName =
  "min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_30%),radial-gradient(circle_at_top_right,rgba(14,165,233,0.16),transparent_25%),linear-gradient(180deg,#020617_0%,#020617_100%)] text-slate-50";

const previewMainClassName =
  "mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-12 px-6 py-12 sm:px-10 lg:px-12";

type PreviewPageShellProps = {
  children: ReactNode;
};

export function PreviewPageShell({ children }: PreviewPageShellProps) {
  return (
    <div className={previewPageShellClassName}>
      <main className={previewMainClassName}>{children}</main>
    </div>
  );
}
