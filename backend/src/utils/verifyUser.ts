import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../utils/db.ts";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

interface CustomRequest extends Request {
  user?: User;
}

export async function verifyUser(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const token =
      req.body.token ||
      req.cookies?.token ||
      req.query.token ||
      req.headers["x-access-token"];

    if (!token) {
      return res.status(401).json({ error: "Unauthorized. Token missing." });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
    };

    if (!decoded || !decoded.id) {
      return res.status(401).json({ error: "Unauthorized. Invalid token." });
    }

    // Fetch user from DB
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (!user) {
      return res.status(401).json({ error: "Unauthorized. User not found." });
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error: any) {
    console.error(`Error verifying user: ${error.message}`);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
