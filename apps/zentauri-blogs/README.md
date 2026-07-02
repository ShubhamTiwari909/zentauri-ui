# Zentauri Blogs

A Next.js + Payload CMS blog app, part of the zentauri-ui monorepo.

## Quick Start - local setup

To spin up this app locally, follow these steps:

### Development

1. If you haven't already, clone the `zentauri-ui` monorepo and install dependencies from the repo root with `pnpm install`
2. `cd apps/zentauri-blogs && cp .env.example .env` to copy the example environment variables, then fill in `DATABASE_URL`, `PAYLOAD_SECRET`, `NEXT_PUBLIC_PREVIEW_SECRET`, and `UPLOADTHING_TOKEN`
3. From the repo root, run `pnpm --filter=zentauri-blogs dev` to start the dev server
4. open `http://localhost:3000` to open the app in your browser

That's it! Changes made in `./src` will be reflected in your app. Follow the on-screen instructions to login and create your first admin user.

## How it works

The Payload config is tailored specifically to the needs of most websites. It is pre-configured in the following ways:

### Collections

See the [Collections](https://payloadcms.com/docs/configuration/collections) docs for details on how to extend this functionality.

- #### Users (Authentication)

  Users are auth-enabled collections that have access to the admin panel.

  For additional help, see the official [Auth Example](https://github.com/payloadcms/payload/tree/3.x/examples/auth) or the [Authentication](https://payloadcms.com/docs/authentication/overview#authentication-overview) docs.

- #### Media

  This is the uploads enabled collection. It features pre-configured sizes, focal point and manual resizing to help you manage your pictures.

## Questions

If you have any issues or questions, open an issue or discussion in the [zentauri-ui](https://github.com/ShubhamTiwari909/zentauri-ui) repository.
