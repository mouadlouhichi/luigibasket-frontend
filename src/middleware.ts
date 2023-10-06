//TODO: refactor and improve auth
import { NextResponse, type NextRequest } from "next/server";
import { withAuth } from "next-auth/middleware";
import createMiddleware from "next-intl/middleware";

import { fallbackLng, languages } from "@/data/i18n/settings";

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: languages,

  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: fallbackLng,
});

function doesPathMatchPages(req: NextRequest, pages: string[]) {
  return RegExp(
    `^(/(${languages.join("|")}))?(${pages.join("|")})/?$`,
    "i",
  ).test(req.nextUrl.pathname);
}

// TODO : list all protected routes
const protectedPages = ["/home", "/account"];

const defaultPublicPage = "";
const blockedPages = ["/account"];
const defaultBlockedPage = "/";
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

    /* if (!token) {
      if (
        !doesPathMatchPages(req, authPages) &&
        !doesPathMatchPages(req, publicPages)
      ) {
        return null;
      }
      return intlMiddleware(req);
    } */

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

    if (!doesPathMatchPages(req, blockedPages) && token.isBlocked) {
      return redirect(req, defaultBlockedPage);
    }

    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: () => true,
    },
  },
);

export const config = {
  // Skip all paths that should not be internationalized. This example skips the
  // folders "api", "_next" and all files with an extension (e.g. favicon.ico)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
