import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import * as authRepository from "./auth.repository";
import { IUser } from "./auth.interfaces";
import crypto from "crypto";

dotenv.config();
const JWT_SECRET = `${process.env.JWT_SECRET}`;
bcrypt.setRandomFallback(() => Array.from(crypto.randomBytes(16)));

export async function register(
  userData: IUser
): Promise<Omit<IUser, "password">> {
  try {
    const existingUser = await authRepository.getUserByEmail(userData.email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser: IUser = { ...userData, password: hashedPassword };

    const { password, ...user } = await authRepository.createUser(newUser);

    return user;
  } catch (error) {
    console.error("Error in auth service (register):", error);
    throw error;
  }
}

export async function login(email: string, password: string): Promise<string> {
  try {
    const user = await authRepository.getUserByEmail(email);
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
      { userId: user.user_id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    return token;
  } catch (error) {
    console.error("Error in auth service (login):", error);
    throw error;
  }
}
