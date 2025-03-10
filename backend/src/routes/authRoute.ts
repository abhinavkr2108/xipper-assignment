import express, { Router } from "express";
import { login, signUp } from "../controllers/authController.ts";

const router: Router = express.Router();

router.post("/signup", signUp as any);
router.post("/login", login as any);

export default router;
