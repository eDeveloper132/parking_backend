import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET ?? "replace_this_with_env_secret";

export function requireAuth(req: Request & { user?: any }, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth) {
    res.status(401);
    return next(new Error("Missing auth token"));
  }
  const token = auth.split(" ")[1];
  try {
    const payload = jwt.verify(token as string, JWT_SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    res.status(401);
    return next(err);
  }
}

export function requireRole(...roles: string[]) {
  return (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
      res.status(401);
      return next(new Error("This account is not authenticated/authorized or registered"));
    }
    if (!roles.includes(user.role)) {
      res.status(403);
      return next(new Error("Forbidden: insufficient role, please add a role in this request"));
    }
    next();
  };
}