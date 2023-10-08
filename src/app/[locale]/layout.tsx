import { use } from "react";
import type { Metadata } from "next";
import { Manrope, Montserrat, Raleway } from "next/font/google";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { getMessages } from "@/i18n/server";
import { languages } from "@/i18n/settings";
import { getCurrentUser, getHasSurvey, isAdmin } from "@/lib/getCurrentUser";
import { HandleOnComplete } from "@/lib/router-events";
import { AppProvider } from "@/providers/AppProvider";
import ClientCommons from "@/providers/ClientCommons";
import LoglibAnalytics from "@/providers/LoglibAnalytics";
import { TRPCProvider } from "@/providers/trpcProvider";
import UserContextProvider from "@/providers/UserProvider";
import { UserSession } from "@/types";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "react-hot-toast";

import { DEFAULT_METADATA } from "@/data/meta";
import { TailwindIndicator } from "@/shared/TailwindIndicator";

// Manrope : Primary Font
const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-manrope",
});

//Monsterrat : Secondary Font
const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
});

// Raleway Accent Font
const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-raleway",
});

// Sharp : Business Accent Font
const sharp = localFont({
  src: "../../fonts/sharp/la-sharp-sans.woff2",
  variable: "--font-sharp",
});

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export async function generateStaticParams() {
  return languages.map((locale) => ({ locale }));
}

export const metadata: Metadata = DEFAULT_METADATA;
export default function RootLayout({
  children,
  params: { locale },
}: RootLayoutProps) {
  const messages = use(getMessages(locale));

  const user = use(getCurrentUser());
  const admin = use(isAdmin(user?.id));
  const hasSurvey = use(getHasSurvey(user?.id));
  return (
    <html
      suppressHydrationWarning
      dir={locale === "ar" ? "rtl" : "ltr"}
      lang={locale}
      className={`${manrope.className} ${montserrat.variable}  ${raleway.variable} ${sharp.variable} `}
    >
      <body className="bg-white  font-sans text-base text-neutral-900 dark:bg-neutral-900 dark:text-neutral-200">
        <UserContextProvider
          user={user as UserSession}
          isAdmin={admin}
          hasSurvey={hasSurvey}
        >
          <TRPCProvider>
            <AppProvider locale={locale} messages={messages}>
              <ClientCommons />
              {children}

              <TailwindIndicator />
              <LoglibAnalytics />
              <Analytics />
              <HandleOnComplete />
              <Toaster position="top-right" />
            </AppProvider>
          </TRPCProvider>
        </UserContextProvider>
      </body>
    </html>
  );
}
