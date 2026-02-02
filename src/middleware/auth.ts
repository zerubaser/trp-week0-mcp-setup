import { Request, Response, NextFunction } from "express";
import { HttpError } from "../utils/httpError";

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; role: string };
    }
  }
}

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const userId = req.header("x-user-id");
  const role = req.header("x-user-role") || "user";

  if (!userId) {
    return next(new HttpError(401, "Missing x-user-id header"));
  }

  req.user = { id: userId, role };
  next();
}

export function requireAdmin(req: Request, _res: Response, next: NextFunction) {
  if (req.user?.role !== "admin") {
    return next(new HttpError(403, "Admin role required"));
  }
  next();
}
