"use client";

import { type ComponentProps } from "react";
import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { WithChildren } from "@/types";

import { TooltipProvider } from "@/shared/Primitives/Tooltip";

export function ThemeProvider({
  children,
}: WithChildren<ComponentProps<typeof NextThemeProvider>>) {
  return (
    <NextThemeProvider
      attribute="class"
    >
      {children}
    </NextThemeProvider>
  );
}

type Props = {
  locale: string;
  messages: AbstractIntlMessages;
  children?: React.ReactNode;
};

export const AppProvider = ({ children, locale, messages }: Props) => {
  return (
    //handle theme rerendereing
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
};
