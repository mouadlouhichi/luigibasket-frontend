import { UserType } from "@prisma/client";

import { prisma as db } from "./prisma";
import { getSession } from "./servers/session";

export const getCurrentUser = async () => {
  const session = await getSession();
  return session?.user;
};
export const getHasSurvey = async (userId?: string) => {
  if (!userId) return false;

  const { hasSurvey } =
    (await db.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        hasSurvey: true,
      },
    })) || {};

  return !!hasSurvey;
};
export const isAdmin = async (userId?: string) => {
  if (!userId) return false;

  const { userType } =
    (await db.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        userType: true,
      },
    })) || {};

  return userType === UserType.Admin;
};
