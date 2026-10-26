"use server";

import { randomBytes } from "node:crypto";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  createLink,
  deleteLink,
  isShortCodeTaken,
  updateLink,
} from "@/data/links";

const createLinkSchema = z.object({
  url: z.url({ protocol: /^https?$/ }).max(2048),
  shortCode: z
    .string()
    .regex(/^[A-Za-z0-9_-]{3,32}$/)
    .optional(),
});

export type CreateLinkInput = z.infer<typeof createLinkSchema>;

type ActionResult = { success: true } | { error: string };

export async function createLinkAction(
  input: CreateLinkInput,
): Promise<ActionResult> {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  const parsed = createLinkSchema.safeParse(input);
  if (!parsed.success) {
    return {
      error:
        "Enter a valid http(s) URL and a short code of 3-32 letters, numbers, - or _.",
    };
  }

  const { url, shortCode: customCode } = parsed.data;

  try {
    if (customCode && (await isShortCodeTaken(customCode))) {
      return { error: "That short code is already taken." };
    }

    const shortCode = customCode ?? randomBytes(5).toString("base64url");
    await createLink({ userId, url, shortCode });
  } catch {
    return { error: "Failed to create link" };
  }

  revalidatePath("/dashboard");
  return { success: true };
}

const updateLinkSchema = z.object({
  id: z.number().int().positive(),
  url: z.url({ protocol: /^https?$/ }).max(2048),
  shortCode: z.string().regex(/^[A-Za-z0-9_-]{3,32}$/),
});

export type UpdateLinkInput = z.infer<typeof updateLinkSchema>;

export async function updateLinkAction(
  input: UpdateLinkInput,
): Promise<ActionResult> {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  const parsed = updateLinkSchema.safeParse(input);
  if (!parsed.success) {
    return {
      error:
        "Enter a valid http(s) URL and a short code of 3-32 letters, numbers, - or _.",
    };
  }

  const { id, url, shortCode } = parsed.data;

  try {
    if (await isShortCodeTaken(shortCode, id)) {
      return { error: "That short code is already taken." };
    }

    const updated = await updateLink({ id, userId, url, shortCode });
    if (!updated) return { error: "Link not found" };
  } catch {
    return { error: "Failed to update link" };
  }

  revalidatePath("/dashboard");
  return { success: true };
}

const deleteLinkSchema = z.object({ id: z.number().int().positive() });

export type DeleteLinkInput = z.infer<typeof deleteLinkSchema>;

export async function deleteLinkAction(
  input: DeleteLinkInput,
): Promise<ActionResult> {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  const parsed = deleteLinkSchema.safeParse(input);
  if (!parsed.success) return { error: "Invalid input" };

  try {
    const deleted = await deleteLink({ id: parsed.data.id, userId });
    if (!deleted) return { error: "Link not found" };
  } catch {
    return { error: "Failed to delete link" };
  }

  revalidatePath("/dashboard");
  return { success: true };
}
