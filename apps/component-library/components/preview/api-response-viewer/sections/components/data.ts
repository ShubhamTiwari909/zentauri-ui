import type { ApiResponseViewerProps } from "@zentauri-ui/zentauri-components/ui/api-response-viewer";
import type { ApiResponseViewerAnimation } from "@zentauri-ui/zentauri-components/ui/api-response-viewer/animated";

export const API_RESPONSE_VIEWER_APPEARANCES = [
  "default",
  "subtle",
  "contrast",
  "glass",
] as const satisfies readonly NonNullable<
  ApiResponseViewerProps["appearance"]
>[];

export const API_RESPONSE_VIEWER_SIZES = [
  "sm",
  "md",
  "lg",
] as const satisfies readonly NonNullable<ApiResponseViewerProps["size"]>[];

export const API_RESPONSE_VIEWER_ANIMATIONS = [
  "none",
  "fade",
  "slide",
] as const satisfies readonly ApiResponseViewerAnimation[];

type ApiResponseDataset = {
  status: number;
  statusText?: string;
  method: string;
  url: string;
  time: number;
  responseSize: string;
  headers: Record<string, string>;
  body: unknown;
};

/** Sample responses the playground can render. */
export const API_RESPONSE_VIEWER_DATASETS = {
  "200 OK": {
    status: 200,
    statusText: "OK",
    method: "GET",
    url: "https://api.example.com/v1/users/8f21",
    time: 128,
    responseSize: "2.4 KB",
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "private, max-age=0",
      "x-request-id": "req_8f21a0",
    },
    body: {
      ok: true,
      user: {
        id: "u_8f21",
        name: "Ada Lovelace",
        roles: ["admin", "editor"],
        verified: true,
        lastLogin: null,
      },
    },
  },
  "404 Not Found": {
    status: 404,
    statusText: "Not Found",
    method: "GET",
    url: "https://api.example.com/v1/users/does-not-exist",
    time: 36,
    responseSize: "182 B",
    headers: {
      "content-type": "application/json; charset=utf-8",
      "x-request-id": "req_44c1de",
    },
    body: {
      ok: false,
      error: { code: "not_found", message: "User does not exist" },
    },
  },
  "500 Error": {
    status: 500,
    statusText: "Internal Server Error",
    method: "POST",
    url: "https://api.example.com/v1/orders",
    time: 842,
    responseSize: "256 B",
    headers: {
      "content-type": "application/json; charset=utf-8",
      "x-request-id": "req_50f9aa",
      "retry-after": "5",
    },
    body: {
      ok: false,
      error: {
        code: "internal_error",
        message: "Unexpected error while creating order",
      },
    },
  },
} as const satisfies Record<string, ApiResponseDataset>;

export const API_RESPONSE_VIEWER_DATASET_KEYS = [
  "200 OK",
  "404 Not Found",
  "500 Error",
] as const;
