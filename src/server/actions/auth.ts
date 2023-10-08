"use server";

import { hash } from "bcrypt";

export async function getHashedPassword(password: string) {
  const hashedPassword = await hash(password, 10);

  return hashedPassword;
}
