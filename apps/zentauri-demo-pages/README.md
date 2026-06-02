# Zentauri Demo Pages

Next.js 16 app for showcasing complete Zentauri UI page patterns outside the main documentation catalog.

The current demo surface lives under `/demo` and uses `@zentauri-ui/zentauri-components` plus `@zentauri-ui/shared` from the monorepo workspace.

## Routes

| Route             | Purpose                                  |
| ----------------- | ---------------------------------------- |
| `/demo`           | Index of available landing-page layouts. |
| `/demo/split`     | Split hero layout.                       |
| `/demo/dashboard` | Dashboard-forward layout.                |
| `/demo/centered`  | Centered launch layout.                  |
| `/demo/sidebar`   | Sidebar navigation layout.               |
| `/demo/bento`     | Bento-card layout.                       |
| `/demo/minimal`   | Minimal product layout.                  |
| `/demo/terminal`  | Terminal-inspired product layout.        |
| `/demo/pricing`   | Pricing-led layout.                      |
| `/contact`        | End-to-end form submitting to the backend. |

Each layout reuses the same landing content and exposes theme options so the component appearances can be compared in context.

## End-to-end backend flow

`/contact` is a working component-to-backend demo: a form built from Zentauri UI
primitives (`Input`, `Button`, `Text`) that POSTs to the FastAPI service in
`apps/zentauri-backend` at `POST /api/v1/contact-us`.

To run it locally, start the backend (see `apps/zentauri-backend/README.md`) and
this app together:

```sh
# terminal 1 — backend on http://127.0.0.1:8000
cd apps/zentauri-backend && source .venv/bin/activate && fastapi dev main.py

# terminal 2 — demo app on http://localhost:3000
pnpm --filter zentauri-demo-pages dev
```

The form's backend base URL defaults to `http://localhost:8000` and can be
overridden with `NEXT_PUBLIC_API_BASE_URL`. Ensure the demo app's origin is in
the backend's `ALLOWED_ORIGINS` (localhost:3000/3001 are allowed by default).

## Commands

Run from the repository root unless you are already inside this workspace.

```sh
pnpm --filter zentauri-demo-pages dev
pnpm --filter zentauri-demo-pages build
pnpm --filter zentauri-demo-pages lint
```

To run the demo app together with the rest of the monorepo dev tasks:

```sh
pnpm dev
```

## Local Development Notes

- This app consumes the component package through `workspace:*`; if you are editing library source at the same time, run the component package watcher or the root `pnpm dev` task.
- Global styles live in `app/globals.css`.
- Layout data and theme options live in `app/demo/landing-data.ts`.
- Shared site chrome comes from `@zentauri-ui/shared`.

## Next.js 16 Note

This app uses Next.js 16. Before making framework-level routing, metadata, caching, or middleware changes, check the matching guidance in `node_modules/next/dist/docs/` from this repo install.
