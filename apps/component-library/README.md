# Zentauri UI — Component library app

This package is the **Zentauri UI** site: a Next.js application that combines a small marketing home page with an interactive **preview and documentation** experience for the workspace library [`@zentauri-ui/zentauri-components`](../../packages/components/README.md).

Contributors work here when they change how components are showcased, how copy and SEO are structured for each preview route, or how the shell (header, sidebar, footer) behaves. Changes to the actual UI primitives live in `packages/components`; this app imports them and presents examples, props guidance, and syntax-highlighted snippets.

## Live preview

The public playground is deployed at **[https://zentauri-ui.vercel.app/](https://zentauri-ui.vercel.app/)**.

For local development, the app serves at [http://localhost:3000](http://localhost:3000) unless you override the port.

## What this app does

- **Home** (`/`) — Entry landing for Zentauri UI.
- **Preview hub** (`/preview/components`) — Sidebar-driven navigation, live demos, and code examples (`app/preview/components/page.tsx`; SEO from `content/seo/preview/components/index.json`).
- **Installation** (`/preview/components/installation`) — On-site getting-started context that complements the package README.
- **Component previews** (`/preview/components/<name>`) — Each route loads a preview module under `components/preview/<name>/` with sections (hero, examples, code panels). Matching SEO lives in `content/seo/preview/components/<name>.json` and is registered in `lib/preview-seo-registry.ts`.
- **Hooks previews** (`/preview/components/hooks`, `/preview/components/hooks/<slug>`) — Hook gallery and individual hook pages under `app/preview/components/hooks/`; hub SEO JSON is `content/seo/preview/hooks/hooks.json`, and per-hook titles and descriptions are assembled in `lib/hook-preview-seo.ts` from the hook registry.

Supporting pieces include:

- **`react-syntax-highlighter`** for fenced code in the UI.
- **`lib/preview-seo.ts`** — Types and helpers that turn structured SEO documents into Next.js `metadata`, canonical URLs, and FAQ JSON-LD.
- **Vercel Analytics** — Wired in the root layout for usage insights on the deployed site.

## Tech stack

| Area              | Choice                                                                                                                          |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Framework         | [Next.js](https://nextjs.org/) 16 (App Router)                                                                                  |
| UI                | [React](https://react.dev/) 19                                                                                                  |
| Styling           | [Tailwind CSS](https://tailwindcss.com/) v4 with `@tailwindcss/postcss`                                                         |
| Motion            | [Framer Motion](https://www.framer.com/motion/)                                                                                 |
| Icons             | `react-icons`                                                                                                                   |
| Class names       | `class-variance-authority`, `clsx`, `tailwind-merge`                                                                            |
| Components source | `@zentauri-ui/zentauri-components` (`workspace:*` in this monorepo)                                                             |
| Tests             | [Vitest](https://vitest.dev/) with [Testing Library](https://testing-library.com/docs/react-testing-library/intro/) and `jsdom` |
| Analytics         | `@vercel/analytics`                                                                                                             |
| Type checking     | TypeScript — `pnpm check-types` runs `tsc --noEmit` in this app                                                                 |
| Formatting        | [Prettier](https://prettier.io/) — `pnpm format` in this app; root [`package.json`](../../package.json) formats the whole repo  |

`next.config.ts` sets `transpilePackages: ["@zentauri-ui/zentauri-components"]` so the workspace package is compiled as part of this app’s build.

## Repository layout (this app)

- **`app/`** — Routes, root `layout.tsx`, preview shell under `preview/components/layout.tsx`, and `globals.css`.
- **`components/`** — Home experience, preview sections per component, shared chrome (`site-header`, `site-footer`, sidebar layout), and small utilities used by previews.
- **`content/seo/preview/components/`** — One JSON document per component (or hub) preview slug (for example `alert.json`, `buttons.json`, `index.json`, `installation.json`). Consumed via `lib/preview-seo-registry.ts` for `metadata` and long-form sections (headings, intro, FAQs).
- **`content/seo/preview/hooks/`** — Hooks gallery SEO (`hooks.json`) registered alongside component docs in `preview-seo-registry.ts`.
- **`lib/`** — Shared logic such as `preview-seo.ts` (metadata base URL, document-to-metadata mapping, FAQ schema).
- **`vitest.config.ts`** / **`vitest.setup.ts`** — Unit test runner and DOM test setup.

The monorepo root uses [Turborepo](https://turbo.build/repo) and [pnpm](https://pnpm.io/) workspaces (`apps/*`, `packages/*`).

## Prerequisites

- **Node.js** — `>= 18` (see root `package.json` `engines`).
- **pnpm** — The repo pins `packageManager` at the root; install dependencies from the repository root so workspace links resolve.

## Scripts

From **`apps/component-library`** (after install from repo root):

| Command            | Purpose                                                                |
| ------------------ | ---------------------------------------------------------------------- |
| `pnpm dev`         | Next.js dev server                                                     |
| `pnpm build`       | Production build (`next build`)                                        |
| `pnpm start`       | Run the production server locally                                      |
| `pnpm lint`        | ESLint (Next.js config)                                                |
| `pnpm format`      | Prettier write for `**/*.{ts,tsx,md}` under this app only              |
| `pnpm check-types` | TypeScript `tsc --noEmit` (no `.next` emit; validates `tsconfig.json`) |

From the **repository root**:

| Command                                                 | Purpose                                                                        |
| ------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `pnpm install`                                          | Install all workspace packages                                                 |
| `pnpm dev`                                              | `turbo run dev` for every package that defines `dev`                           |
| `pnpm build`                                            | `turbo run build` (depends on upstream package builds per `turbo.json`)        |
| `pnpm lint`                                             | `turbo run lint`                                                               |
| `pnpm format`                                           | Prettier write across the repo (`**/*.{ts,tsx,md}`)                            |
| `pnpm check-types`                                      | `turbo run check-types` (runs `check-types` in each workspace that defines it) |
| `pnpm turbo run dev --filter=component-library`         | Start only this app’s dev task                                                 |
| `pnpm turbo run format --filter=component-library`      | Run this app’s `format` script                                                 |
| `pnpm turbo run check-types --filter=component-library` | Run this app’s `check-types` script                                            |

Root `pnpm format` runs Prettier once from the monorepo root (it is not wired through Turbo). [`turbo.json`](../../turbo.json) defines a `format` task so `pnpm turbo run format` can run each package’s `format` script in parallel where present.

## Environment variables

| Variable               | Required            | Description                                                                                                                                                          |
| ---------------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | No                  | Public site origin (including scheme), used as `metadataBase` and for canonical / Open Graph URLs in `lib/preview-seo.ts`. Example: `https://zentauri-ui.vercel.app` |
| `VERCEL_URL`           | Automatic on Vercel | Hostname provided by Vercel; used as a fallback when `NEXT_PUBLIC_SITE_URL` is unset                                                                                 |

If neither is set locally, preview metadata falls back to `http://localhost:3000`.

## Related documentation

- **Consuming the library in your own app** — [`packages/components/README.md`](../../packages/components/README.md) (install, Tailwind `@source`, barrel vs subpath imports such as `@zentauri-ui/zentauri-components/ui` and `@zentauri-ui/zentauri-components/ui/<name>`).
- **Source repository** — [github.com/ShubhamTiwari909/zentauri-ui](https://github.com/ShubhamTiwari909/zentauri-ui) (same link as the in-app GitHub nav).
- **Next.js** — [nextjs.org/docs](https://nextjs.org/docs) for App Router, `metadata`, and deployment patterns.
