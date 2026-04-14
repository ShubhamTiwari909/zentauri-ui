"use client";

import { variantLeadComment } from "@/components/preview/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { Avatar, AvatarFallback, AvatarImage, type AvatarProps } from "@/components/ui/avatar";

const SECTION =
  "rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40";

const AVATAR_SIZES = ["xs", "sm", "md", "lg", "xl", "2xl"] as const satisfies readonly NonNullable<
  AvatarProps["size"]
>[];

const AVATAR_SHAPES = ["circle", "square", "squircle"] as const satisfies readonly NonNullable<
  AvatarProps["shape"]
>[];

const AVATAR_STATUSES = ["online", "offline", "busy", "away", "none"] as const satisfies readonly NonNullable<
  AvatarProps["status"]
>[];

function avatarSnippet(opts: {
  size: NonNullable<AvatarProps["size"]>;
  shape: NonNullable<AvatarProps["shape"]>;
  status: NonNullable<AvatarProps["status"]>;
}) {
  const { size, shape, status } = opts;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  const shapeAttr = shape === "circle" ? "" : ` shape="${shape}"`;
  const statusAttr = status === "none" ? "" : ` status="${status}"`;
  return `${variantLeadComment(`size · ${size}, shape · ${shape}, status · ${status}`)}<Avatar${sizeAttr}${shapeAttr}${statusAttr} animation="none">
  <AvatarImage src="" alt="Alex" />
  <AvatarFallback>AL</AvatarFallback>
</Avatar>`;
}

function AvatarDemo(opts: {
  size: NonNullable<AvatarProps["size"]>;
  shape: NonNullable<AvatarProps["shape"]>;
  status: NonNullable<AvatarProps["status"]>;
}) {
  const { size, shape, status } = opts;
  return (
    <Avatar size={size} shape={shape} status={status} animation="none">
      <AvatarImage src="" alt="Alex" />
      <AvatarFallback>AL</AvatarFallback>
    </Avatar>
  );
}

export function AvatarCodeExamplesSection() {
  return (
    <section className={SECTION}>
      <h2 className="mt-3 text-2xl font-semibold text-white">Avatar variants examples</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Fallback state with size, shape, and status indicator tokens. Each code block opens with a Variant line.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {AVATAR_SIZES.map((size) => (
          <PreviewCodeShowcase
            key={`size-${size}`}
            code={avatarSnippet({ size, shape: "circle", status: "none" })}
          >
            <AvatarDemo size={size} shape="circle" status="none" />
          </PreviewCodeShowcase>
        ))}
        {AVATAR_SHAPES.map((shape) => (
          <PreviewCodeShowcase
            key={`shape-${shape}`}
            code={avatarSnippet({ size: "md", shape, status: "none" })}
          >
            <AvatarDemo size="md" shape={shape} status="none" />
          </PreviewCodeShowcase>
        ))}
        {AVATAR_STATUSES.map((status) => (
          <PreviewCodeShowcase
            key={`status-${status}`}
            code={avatarSnippet({ size: "lg", shape: "circle", status })}
          >
            <AvatarDemo size="lg" shape="circle" status={status} />
          </PreviewCodeShowcase>
        ))}
      </div>
    </section>
  );
}
