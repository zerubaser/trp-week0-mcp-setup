import express from "express";
import cors from "cors";
import notesRouter from "./routes/notes";
import { HttpError } from "./utils/httpError";
import { requireAuth } from "./middleware/auth";

export const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("TRP Week 0 API is running. Try /health or /notes");
});

app.get("/health", (_req, res) => res.json({ ok: true }));

// Protect /notes route with authentication
app.use("/notes", requireAuth, notesRouter);

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  if (err instanceof HttpError) {
    return res.status(err.status).json({ error: err.message, details: err.details ?? null });
  }

  const msg = err instanceof Error ? err.message : "Unknown error";
  res.status(500).json({ error: "Internal Server Error", message: msg });
});
