/* eslint-disable @typescript-eslint/no-empty-function */
"use client";

import { createContext, useContext, useState } from "react";
import { UserSession } from "@/types";

interface UserContextValues {
  user: UserSession;
  setUser: (user: UserSession) => void;
  isAdmin: boolean;
  hasSurvey: boolean;
}
export const UserContext = createContext<UserContextValues>({
  user: undefined,
  setUser: () => {},
  isAdmin: false,
  hasSurvey: false,
});

export const useUserContext = () => useContext(UserContext);

interface UserContextProviderProps {
  children: React.ReactNode;
  user: UserSession;
  isAdmin: boolean;
  hasSurvey: boolean;
}

const UserContextProvider = ({
  children,
  user,
  isAdmin,
  hasSurvey,
}: UserContextProviderProps) => {
  const [userSession, setUserSession] = useState<UserSession>(user);

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
