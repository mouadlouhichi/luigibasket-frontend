"use client";

import { useEffect, type ComponentProps } from "react";
import { AbstractIntlMessages } from "next-intl";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { HandleOnComplete } from "@/lib/router-events";
import useAppStore from "@/store";
import { AppUser, WithChildren } from "@/types";
import { Analytics } from "@vercel/analytics/react";

import { TooltipProvider } from "@/shared/Primitives/Tooltip";

import ClientCommons from "./ClientCommons";
import { TailwindIndicator } from "./indicators/tailwind-indicator";
import { NextIntlProvider } from "./nextintl-provider";
import { TRPCProvider } from "./trpcProvider";
import UserContextProvider from "./UserProvider";

export function ThemeProvider({
  children,
}: WithChildren<ComponentProps<typeof NextThemeProvider>>) {
  return <NextThemeProvider attribute="class">{children}</NextThemeProvider>;
}

type Props = {
  locale: string;
  messages: AbstractIntlMessages;
  children?: React.ReactNode;
  user: AppUser | null;
  admin: boolean;
  hasSurvey: boolean;
};

export const AppProvider = ({
  children,
  locale,
  messages,
  user,
  admin,
  hasSurvey,
}: Props) => {
  const { setUser, setIsAdmin, setHasSurvey } = useAppStore();

  useEffect(() => {
    console.log("user", user);
    if (user) {
      setUser(user);
      setIsAdmin(admin);
      setHasSurvey(hasSurvey);
    }
  }, [user]);

  return (
    //handle theme rerendereing
    <TRPCProvider>
      {/*       <UserContextProvider
        user={user}
        isAdmin={admin}
        hasSurvey={hasSurvey}
      > */}
      <NextIntlProvider locale={locale} messages={messages}>
        <TooltipProvider>
          {children}

          <ClientCommons />
          <HandleOnComplete />
          <TailwindIndicator />
          <Analytics />
        </TooltipProvider>
      </NextIntlProvider>
      {/*       </UserContextProvider>
       */}{" "}
    </TRPCProvider>
  );
};
