import { UserRole } from "@prisma/client";
import { Session } from "@supabase/auth-helpers-nextjs";
import { Provider } from "@supabase/supabase-js";

import { prisma as db } from "./prisma";
import { getSession } from "./servers/session";



export const getCurrentUser = async () => {
  const session = await getSession();
  return  session as Session;
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

  const { userRole } =
    (await db.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        userRole: true,
      },
    })) || {};

  return userRole === UserRole.Admin;
};
