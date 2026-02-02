import { prisma } from "../db/client";
import { HttpError } from "../utils/httpError";

export async function createNote(input: {
  title: string;
  content: string;
  tags?: string[];
  userId: string;
}) {
  if (!input.title.trim()) throw new HttpError(400, "Title is required");

  const tags = (input.tags || []).map(t => t.trim()).filter(Boolean).join(",");

  return prisma.note.create({
    data: {
      title: input.title,
      content: input.content,
      tags,
      userId: input.userId
    }
  });
}

export async function listNotes(userId: string, q?: string) {
  return prisma.note.findMany({
    where: {
      userId,
      ...(q
        ? {
            OR: [
              { title: { contains: q } },
              { content: { contains: q } },
              { tags: { contains: q } }
            ]
          }
        : {})
    },
    orderBy: { updatedAt: "desc" }
  });
}

export async function deleteNote(userId: string, noteId: string) {
  const existing = await prisma.note.findFirst({ where: { id: noteId, userId } });
  if (!existing) throw new HttpError(404, "Note not found");

  await prisma.note.delete({ where: { id: noteId } });
  return { ok: true };
}

export async function updateNote(userId: string, noteId: string, input: { title?: string; content?: string; tags?: string[] }) {
  const existing = await prisma.note.findFirst({ where: { id: noteId, userId } });
  if (!existing) throw new HttpError(404, "Note not found");

  const data: any = {};
  if (input.title !== undefined) data.title = input.title;
  if (input.content !== undefined) data.content = input.content;
  if (input.tags !== undefined) data.tags = input.tags.map(t => t.trim()).filter(Boolean).join(",");

  const updated = await prisma.note.update({ where: { id: noteId }, data });
  return updated;
}
