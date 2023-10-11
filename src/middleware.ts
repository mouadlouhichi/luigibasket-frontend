//TODO: refactor and improve auth
import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { fallbackLng, languages } from "@/i18n/settings";
import type { Database } from "@/lib/database.types";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: languages,

  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: fallbackLng,
});

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });
  // TODO: handle session and user
  const result = await supabase.auth.getSession();

  return intlMiddleware(req);
}

/* function doesPathMatchPages(req: NextRequest, pages: string[]) {
  return RegExp(
    `^(/(${languages.join("|")}))?(${pages.join("|")})/?$`,
    "i",
  ).test(req.nextUrl.pathname);
}

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

export default withAuth(
  function onSuccess(req) {
    const token = req.nextauth.token;

    if (req.nextUrl.pathname.startsWith("/api")) {
      if (true) return NextResponse.next();
    }

     if (!token) {
      if (
        !doesPathMatchPages(req, authPages) &&
        !doesPathMatchPages(req, publicPages)
      ) {
        return null;
      }
      return intlMiddleware(req);
    }

    if (!token) {
      if (doesPathMatchPages(req, protectedPages)) {
        return redirect(req, defaultPublicPage);
      }
      return intlMiddleware(req);
    }

    // todo: make it more stable
    // if (
    //   doesPathMatchPages(req, authPages) ||
    //   (doesPathMatchPages(req, blockedPages) && !token.isBlocked) ||
    //   (doesPathMatchPages(req, adminPages) && !token.isAdmin)
    // ) {
    //   return redirect(req, defaultPublicPage);
    // }

    // controle access to survey pages
    if (doesPathMatchPages(req, surveyPages) && token.hasSurvey) {
      return redirect(req, defaultUserPage);
    }
    // controle access to home page
    if (doesPathMatchPages(req, publicPages) && !token.isAdmin) {
      return redirect(req, defaultUserPage);
    }

    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: () => true,
    },
  },
);
 */
export const config = {
  // Skip all paths that should not be internationalized. This example skips the
  // folders "api", "_next" and all files with an extension (e.g. favicon.ico)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
