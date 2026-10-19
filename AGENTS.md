<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project Coding Standards for LLM Agents

This is a link shortener built with Next.js (App Router), Clerk, Drizzle ORM on Neon Postgres, Tailwind CSS v4, and shadcn/ui.

**Before writing or changing any code, read the relevant standards file(s) in `/docs` below. These rules are mandatory; follow them over general habits or memorized patterns.**

## Standards Index

| Working on... | Read first |
| --- | --- |
| Layout, folders, commands, general rules | [docs/project-structure.md](docs/project-structure.md) |
| TypeScript, Server/Client Components, routing, Server Actions, code style | [docs/typescript-and-nextjs.md](docs/typescript-and-nextjs.md) |
| Sign-in, sign-up, protected routes, user identity | [docs/authentication.md](docs/authentication.md) |
| Schema, migrations, queries, data access | [docs/database.md](docs/database.md) |
| Components, shadcn/ui, Tailwind styling, accessibility | [docs/ui-components.md](docs/ui-components.md) |

## Non-Negotiables

- Verify Next.js APIs against `node_modules/next/dist/docs/` rather than assuming.
ALWAYS refer to the relevant .md file BEfore generating any code:
- Use Clerk for all auth; the Clerk `userId` from `auth()` is the only trusted identity.
- Every query or mutation on user-owned data must be scoped to the authenticated user.
- Database access is server-only via `db` from `db/index.ts`.
- Use shadcn/ui primitives, `cn()`, and theme tokens; do not hard-code colors.
- Validate all external input; never hard-code or expose secrets.
- Keep changes minimal and scoped to the request; run `npm run lint` before finishing.
