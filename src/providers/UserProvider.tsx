/* eslint-disable @typescript-eslint/no-empty-function */
"use client";

import { createContext, useContext, useState } from "react";
import { AppUser } from "@/types";
import { User } from "@supabase/auth-helpers-nextjs";

interface UserContextValues {
  user: AppUser;
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
  user: AppUser;
  isAdmin: boolean;
  hasSurvey: boolean;
}

const UserContextProvider = ({
  children,
  user,
  isAdmin,
  hasSurvey,
}: UserContextProviderProps) => {
  const [userSession, setUserSession] = useState<AppUser>(user);

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
