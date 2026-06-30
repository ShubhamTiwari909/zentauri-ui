import type { HttpRequestViewerProps } from "@zentauri-ui/zentauri-components/ui/http-request-viewer";
import type { HttpRequestViewerAnimation } from "@zentauri-ui/zentauri-components/ui/http-request-viewer/animated";

export const HTTP_REQUEST_VIEWER_APPEARANCES = [
  "default",
  "subtle",
  "contrast",
  "glass",
] as const satisfies readonly NonNullable<
  HttpRequestViewerProps["appearance"]
>[];

export const HTTP_REQUEST_VIEWER_SIZES = [
  "sm",
  "md",
  "lg",
] as const satisfies readonly NonNullable<HttpRequestViewerProps["size"]>[];

export const HTTP_REQUEST_VIEWER_ANIMATIONS = [
  "none",
  "fade",
  "slide",
] as const satisfies readonly HttpRequestViewerAnimation[];

type RequestSample = {
  method: string;
  url: string;
  headers?: Record<string, string>;
  query?: Record<string, string>;
  body?: unknown;
};

/** Sample requests the playground can render. */
export const HTTP_REQUEST_VIEWER_DATASETS = {
  "GET users": {
    method: "GET",
    url: "https://api.example.com/v1/users",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer eyJhbGciOi…",
    },
    query: {
      page: "2",
      limit: "20",
      sort: "-createdAt",
    },
  },
  "POST login": {
    method: "POST",
    url: "https://api.example.com/v1/auth/login",
    headers: {
      "Content-Type": "application/json",
      "X-Request-Id": "req_8f21c4",
    },
    query: {
      redirect: "/dashboard",
    },
    body: {
      email: "ada@example.com",
      password: "••••••••",
      remember: true,
    },
  },
  "DELETE item": {
    method: "DELETE",
    url: "https://api.example.com/v1/posts/42",
    headers: {
      Authorization: "Bearer eyJhbGciOi…",
      "If-Match": '"a1b2c3"',
    },
  },
} as const satisfies Record<string, RequestSample>;

export const HTTP_REQUEST_VIEWER_DATASET_KEYS = [
  "GET users",
  "POST login",
  "DELETE item",
] as const;
