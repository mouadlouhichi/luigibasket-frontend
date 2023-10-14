import { Session } from "@supabase/auth-helpers-nextjs";

export const getUserFromSession = (session: Session) => {
  if (!session) return null;
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
