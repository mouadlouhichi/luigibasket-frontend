/* eslint-disable @typescript-eslint/no-empty-function */
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getUserFromSession } from "@/lib/getUserFromSession";
/* import { getUserFromSession } from "@/lib/getCurrentUser";
 */
import { AppUser } from "@/types";
import {
  createClientComponentClient,
  Session,
  User,
} from "@supabase/auth-helpers-nextjs";

interface UserContextValues {
  user: AppUser | null;
  setUser: (user: AppUser) => void;
  isAdmin: boolean;
  hasSurvey: boolean;
}
export const UserContext = createContext<UserContextValues>({
  user: {} as AppUser,
  setUser: () => {},
  isAdmin: false,
  hasSurvey: false,
});

export const useUserContext = () => useContext(UserContext);

interface UserContextProviderProps {
  children: React.ReactNode;
  user: AppUser | null;
  isAdmin: boolean;
  hasSurvey: boolean;
}

const UserContextProvider = ({
  children,
  user,
  isAdmin,
  hasSurvey,
}: UserContextProviderProps) => {
  const [userSession, setUserSession] = useState<AppUser>(user as AppUser);
  const [session, setSession] = useState<Session | null>(null);
  const supabase = createClientComponentClient();

 /*  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) return;
      const user = getUserFromSession(session);
      user && setUserSession(user);
      setSession(session);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!session) return;
        const user = getUserFromSession(session);
        user && setUserSession(user);
        setSession(session);
      },
    );
    console.log("userSession___ form context", userSession, "session", session);

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);
 */
  return (
    <UserContext.Provider
      value={{
        user: userSession,
        setUser: setUserSession,
        isAdmin,
        hasSurvey,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
