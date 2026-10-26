---
description: Read this before implementing or modifying authentication in the project.
---
# Authentication

## Rules

- All authentication is handled by **Clerk**. Do NOT use or add any other auth method (NextAuth/Auth.js, custom sessions, JWTs, cookies, passwords, other providers).
- The Clerk `userId` from `auth()` (`@clerk/nextjs/server`) is the only trusted identity. Never accept a user ID from client input, params, or request bodies.
- Do not build custom sign-in/sign-up forms. Use Clerk's components/buttons.

## Route Behavior

| Route | Behavior |
| --- | --- |
| `/dashboard` (and sub-routes) | Protected. Signed-out users must not access it; they are redirected to sign in. |
| `/` (homepage) | If the user is signed in, redirect to `/dashboard`. |

- Enforce both rules server-side in `src/proxy.ts` using `clerkMiddleware`, `createRouteMatcher`, and `auth.protect()` / `NextResponse.redirect`. Do not rely on client-side checks alone.
- Keep `ClerkProvider` wrapping the app in `src/app/layout.tsx`.
- Also verify `userId` in Server Components, Server Actions, and route handlers that touch user data; redirect or return an error if it is missing.

Example (`src/proxy.ts`):

```ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  if (userId && req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (isProtectedRoute(req)) await auth.protect();
});
```

Keep the existing `config.matcher` in `src/proxy.ts`.

## Sign-in / Sign-up

- Sign-in and sign-up must **always launch as a modal**.
- Use `<SignInButton mode="modal" />` and `<SignUpButton mode="modal" />`; never link to or redirect users to a full-page sign-in/sign-up flow for normal navigation.
- Use `<Show when="signed-in">` / `<Show when="signed-out">` for conditional UI, and `<UserButton />` for the signed-in user menu.
- The `sign-in` / `sign-up` catch-all pages under `src/app` exist only as Clerk fallbacks; do not link to them from the UI.

## Checklist

- No non-Clerk auth code introduced.
- `/dashboard` protected in `src/proxy.ts`.
- Signed-in users on `/` redirected to `/dashboard`.
- Sign-in/sign-up buttons use `mode="modal"`.
- Data access scoped to the Clerk `userId` (see [database.md](database.md)).
