import { UserRole } from "@/types";
import { DefaultSession } from "next-auth";

type JwtPayload = {
  userId?: string;
};

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      hasSurvey: boolean;
      role: UserRole;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends JwtPayload {
    [k in JwtPayload]: JwtPayload[k];
  }
}
