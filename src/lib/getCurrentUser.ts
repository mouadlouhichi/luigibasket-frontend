import { UserRole } from "@prisma/client";
import { Session } from "@supabase/auth-helpers-nextjs";
import { Provider } from "@supabase/supabase-js";

import { prisma as db } from "./prisma";
import { getSession } from "./servers/session";

const getUserFromSession = (session: Session) => {
  const { user } = session;
  switch (user.app_metadata.provider) {
    case "google":
      return {
        id: user.id,
        name: user.user_metadata.full_name,
        email: user.email,
        image: user.user_metadata.avatar_url,
      };
    case "facebook":
      return {
        id: user.id,
        name: user.user_metadata.full_name,
        email: user.email,
        image: user.user_metadata.avatar_url,
      };
    case "linkedin":
      return {
        id: user.id,
        name: user.user_metadata.full_name,
        email: user.email,
        image: user.user_metadata.avatar_url,
      };
    default:
      return {
        id: user.id,
        name: user.user_metadata.username,
        email: user.email,
        image: user.user_metadata.image,
      };
  }
};

export const getCurrentUser = async () => {
  const session = await getSession();
  console.log("SESSION_____________", session);
  if (!session) return null;
  const user = getUserFromSession(session);
  return user;
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
