import { and, desc, eq, ne } from "drizzle-orm";
import { db } from "../../db";
import { links } from "../../db/schema";

export async function getLinksByUserId(userId: string) {
  return db
    .select()
    .from(links)
    .where(eq(links.userId, userId))
    .orderBy(desc(links.createdAt));
}

export async function getLinkByShortCode(shortCode: string) {
  const [link] = await db
    .select({ url: links.url })
    .from(links)
    .where(eq(links.shortCode, shortCode))
    .limit(1);
  return link;
}

export async function isShortCodeTaken(
  shortCode: string,
  excludeLinkId?: number,
) {
  const rows = await db
    .select({ id: links.id })
    .from(links)
    .where(
      excludeLinkId === undefined
        ? eq(links.shortCode, shortCode)
        : and(eq(links.shortCode, shortCode), ne(links.id, excludeLinkId)),
    )
    .limit(1);
  return rows.length > 0;
}

export async function createLink(input: {
  userId: string;
  url: string;
  shortCode: string;
}) {
  const [created] = await db.insert(links).values(input).returning();
  return created;
}

export async function updateLink(input: {
  id: number;
  userId: string;
  url: string;
  shortCode: string;
}) {
  const { id, userId, url, shortCode } = input;
  const [updated] = await db
    .update(links)
    .set({ url, shortCode })
    .where(and(eq(links.id, id), eq(links.userId, userId)))
    .returning();
  return updated;
}

export async function deleteLink(input: { id: number; userId: string }) {
  const [deleted] = await db
    .delete(links)
    .where(and(eq(links.id, input.id), eq(links.userId, input.userId)))
    .returning();
  return deleted;
}
