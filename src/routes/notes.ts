import { Router, Request, Response, NextFunction } from "express";
import { z } from "zod";
import { listNotes, createNote, deleteNote, updateNote } from "../services/notesService";

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const q = typeof req.query.q === "string" ? req.query.q : undefined;
    const notes = await listNotes(req.user!.id, q);
    res.json({ notes });
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = z.object({
      title: z.string().min(1),
      content: z.string().min(1),
      tags: z.array(z.string()).optional()
    });

    const body = schema.parse(req.body);
    const note = await createNote({ ...body, userId: req.user!.id });
    res.status(201).json({ note });
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = z.string().min(1).parse(req.params.id);
    const result = await deleteNote(req.user!.id, id);
    res.json(result);
  } catch (e) {
    next(e);
  }
});

router.patch("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = z.string().min(1).parse(req.params.id);
    const schema = z.object({
      title: z.string().min(1).optional(),
      content: z.string().min(1).optional(),
      tags: z.array(z.string()).optional()
    });
    const body = schema.parse(req.body);
    if (!body.title && !body.content && !body.tags) {
      throw new Error("At least one field (title, content, tags) must be provided");
    }
    const note = await updateNote(req.user!.id, id, body);
    res.json({ note });
  } catch (e) {
    next(e);
  }
});

export default router;
