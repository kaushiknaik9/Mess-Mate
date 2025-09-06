import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";
import Admin from "../models/admin";

const router = express.Router();

router.post("/login", async (req: Request, res: Response) => {
  const { id, password, type } = req.body as {
    id: string;
    password: string;
    type: "student" | "admin";
  };

  try {
    let user;
    if (type === "student") {
      user = await User.findOne({ studentId: id });
    } else if (type === "admin") {
      user = await Admin.findOne({ username: id });
    } else {
      return res.status(400).json({ msg: "Invalid type" });
    }

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, type },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1d" }
    );

    return res.json({
      token,
      user: {
        id: user._id,
        name: (user as any).name || (user as any).username,
        type,
      },
    });
  } catch (err: any) {
    console.error("Login error:", err);
    return res.status(500).json({ error: err.message });
  }
});

export default router;
