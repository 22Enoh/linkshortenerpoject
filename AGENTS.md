<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project Coding Standards for LLM Agents

This is a link shortener built with Next.js (App Router), Clerk, Drizzle ORM on Neon Postgres, Tailwind CSS v4, and shadcn/ui.


## Non-Negotiables

- Verify Next.js APIs against `node_modules/next/dist/docs/` rather than assuming.
- NEVER use `middleware.ts`. It is deprecated in later versions of Next.js, including the version used in this project. Use `src/proxy.ts` instead (it already exists; extend it rather than creating a middleware file).
- Use Clerk for all auth; the Clerk `userId` from `auth()` is the only trusted identity.
- Every query or mutation on user-owned data must be scoped to the authenticated user.
- Database access is server-only via `db` from `db/index.ts`.
- ALL UI uses shadcn/ui components. Never create custom components; add missing ones via `npx shadcn@latest add`.
- Use `cn()` and theme tokens; do not hard-code colors.
- Validate all external input; never hard-code or expose secrets.
- Keep changes minimal and scoped to the request; run `npm run lint` before finishing.
