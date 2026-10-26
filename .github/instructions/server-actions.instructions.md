---
description: Read this before creating or modifying server actions or any data mutation in the project.
---
# Server Actions guidelines

ALL data mutations (create, update, delete) MUST be done via server actions.

## 1. Calling and location

- Server actions MUST be called from Client Components.
- Server action files MUST be named `actions.ts` and colocated in the same directory as the component that calls them.
- Start the file with `"use server"`.

## 2. Typing

- ALL data passed to server actions MUST have explicit TypeScript types.
- NEVER use the `FormData` type; pass typed objects instead.

## 3. Validation

- ALL input MUST be validated with `zod` inside the server action before use.
- Derive the input type from the schema where possible with `z.infer`.

## 4. Authentication

- ALL server actions MUST check for a logged-in user (`auth()` from Clerk) FIRST, before validation side effects or any database operation.
- Return `{ error: "Unauthorized" }` if there is no `userId`. Use only this `userId` for ownership, never an id supplied by the client.

## 5. Database access

- Database operations MUST go through helper functions in the `/data` directory that wrap Drizzle queries.
- Server actions MUST NOT use Drizzle queries (`db.select`, `db.insert`, etc.) directly.
- Mutations on user-owned data must be scoped to the authenticated user's `userId`.

## 6. Return values and errors

- Server actions MUST NOT throw errors. Catch failures and return an object instead.
- Return `{ success: true, data? }` on success, or `{ error: string }` on failure.
- Use `safeParse` for zod validation and return `{ error }` when it fails.
- Wrap `/data` helper calls in `try/catch` and return `{ error }` on failure.
- Client Components check the `error` / `success` property of the result to update the UI.

## Example

```ts
// src/app/dashboard/actions.ts
"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { createLink } from "@/data/links";

const createLinkSchema = z.object({
  url: z.url(),
  slug: z.string().min(1).max(32),
});

type CreateLinkInput = z.infer<typeof createLinkSchema>;

type ActionResult<T> = { success: true; data: T } | { error: string };

export async function createLinkAction(
  input: CreateLinkInput,
): Promise<ActionResult<Awaited<ReturnType<typeof createLink>>>> {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  const parsed = createLinkSchema.safeParse(input);
  if (!parsed.success) return { error: "Invalid input" };

  try {
    const data = await createLink({ ...parsed.data, userId });
    return { success: true, data };
  } catch {
    return { error: "Failed to create link" };
  }
}
```
