import { Request, Response } from "express";
import { create, login, logout } from "../services/userService";
import { IUser } from "../models/User";
import { InvalidCredentialsError } from "../utils/errors";

export async function createUser(req: Request, res: Response) {
  const user: IUser = req.body;
  try {
    const newUser = await create(user);
    res.status(201).json(newUser);
  } catch (err: any) {
    if (err.message.includes("E11000 duplicate key error collection:"))
      res.status(409).json({ message: "Username or email already exists" });
    else res.status(500).json({ message: err.message });
  }
}

export async function loginUser(req: Request, res: Response) {
  const credentials: Partial<IUser> = req.body;
  try {
    const user = await login(credentials);
    res.status(200).json(user);
  } catch (err: any) {
    if (err instanceof InvalidCredentialsError)
      res.status(401).json({ message: "Invalid Credentials" });
    else res.status(500).json({ message: err.message });
  }
}
export async function logoutUser(req: Request, res: Response) {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: "Access token missing or malformed" });
  }

  const accessToken = authHeader.split(' ')[1];

  try {
    const result = await logout(accessToken);

    if (!result.success) {
      return res.status(400).json({ message: "Logout failed" });
    }

    // If you use refresh tokens in cookies, clear them here as well (optional)
    res.clearCookie("bcjwt", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return res.sendStatus(204);
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: "Server error during logout" });
  }
}



export async function test(req: Request, res: Response) {
  return res.status(200).json({ message: "Test endpoint is working!" });
}
export default { createUser, loginUser, logoutUser, test };
