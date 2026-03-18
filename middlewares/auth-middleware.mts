import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET ?? "replace_this_with_env_secret";

export function requireAuth(req: Request & { user?: any }, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: "Missing auth token" });
  const token = auth.split(" ")[1];
  try {
    const payload = jwt.verify(token as string, JWT_SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

export function requireRole(...roles: string[]) {
  return (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) return res.status(401).json({ success: false, message: "Not authenticated" });
    if (!roles.includes(user.role)) return res.status(403).json({ success: false, message: "Forbidden: insufficient role" });
    next();
  };
}