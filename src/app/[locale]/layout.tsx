import { use } from "react";
import type { Metadata } from "next";
import { Manrope, Montserrat, Raleway } from "next/font/google";
import localFont from "next/font/local";
import { getMessages } from "@/i18n/server";
import { languages } from "@/i18n/settings";
import { getCurrentUser, getHasSurvey, isAdmin } from "@/lib/getCurrentUser";
import { getUserFromSession } from "@/lib/getUserFromSession";
import { AppProvider } from "@/providers/AppProvider";
import LoglibAnalytics from "@/providers/LoglibAnalytics";
import { Toaster } from "react-hot-toast";

import { DEFAULT_METADATA } from "@/data/meta";

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

  const session = use(getCurrentUser());
  const user = getUserFromSession(session);

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
        <AppProvider
          locale={locale}
          messages={messages}
          user={user}
          admin={admin}
          hasSurvey={hasSurvey}
        >
          {children}
          <LoglibAnalytics />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 5000,
            }}
          />
        </AppProvider>
      </body>
    </html>
  );
}
