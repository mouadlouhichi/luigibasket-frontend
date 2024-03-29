//TODO: refactor and improve auth
import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { fallbackLng, languages } from "@/i18n/settings";
import type { Database } from "@/lib/database.types";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

import { ADMIN_ROLE } from "./app";

// TODO : list all protected routes
const protectedPages = ["/home", "/account"];

const defaultPublicPage = "";
const defaultBlockedPage = "/";
const defaultUserPage = "/home";
const blockedPages = ["/account"];
const surveyPages = ["/survey", "/survey/next"];

const authPages = ["/login", "/signup"];
const adminPages = ["/admin"];
const publicPages = [""];

function redirect(req: NextRequest, redirectURL: string) {
  return NextResponse.redirect(
    new URL(redirectURL, req.nextUrl.origin).toString(),
  );
}

function doesPathMatchPages(req: NextRequest, pages: string[]) {
  return RegExp(
    `^(/(${languages.join("|")}))?(${pages.join("|")})/?$`,
    "i",
  ).test(req.nextUrl.pathname);
}

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: languages,

  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: fallbackLng,
});

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });

  const result = await supabase.auth.getSession();
  const token = result.data?.session?.access_token;

  //PAGES ACCESS CONTROL
  if (!token) {
    if (doesPathMatchPages(req, protectedPages)) {
      return redirect(req, defaultPublicPage);
    }
    return intlMiddleware(req);
  } else {
    if (doesPathMatchPages(req, authPages)) {
      return redirect(req, defaultUserPage);
    }
  }

  if (req.nextUrl.pathname.startsWith("/api")) {
    if (true) return NextResponse.next();
  }

  return intlMiddleware(req);
}

export const config = {
  // Skip all paths that should not be internationalized. This example skips the
  // folders "api", "_next" and all files with an extension (e.g. favicon.ico)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
