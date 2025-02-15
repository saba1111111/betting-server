import db from "../../config/db";
import { IUser } from "./auth.interfaces";

export async function getUserByEmail(
  email: string
): Promise<IUser | undefined> {
  return await db("users").where({ email }).first();
}

export async function createUser(user: IUser): Promise<IUser> {
  const [newUser] = await db("users").insert(user).returning("*");
  return newUser;
}
