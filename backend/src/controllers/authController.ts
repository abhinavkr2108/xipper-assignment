import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
// import prisma from "../utils/db.ts";

const prisma = new PrismaClient();
export async function signUp(req: Request, res: Response) {
  try {
    const { name, email, password, cpassword } = req.body;
    if (!name || !email || !password || !cpassword) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (password !== cpassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    console.error(`Error signing up user: ${error.message}`);
  }
}
export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const isPasswordValid = bcryptjs.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);
    res.cookie("token", token, { httpOnly: true });

    const returnUser = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    return res
      .status(201)
      .json({ token: token, user: returnUser, message: "Login successful" });
  } catch (error: any) {
    console.error(`Error logging in user: ${error.message}`);
    return res
      .status(500)
      .json({ error: `Internal Server Error: ${error.message}` });
  }
}
