import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { BASE_URL, USER_ROLE } from "@/app";
import { Database } from "@/lib/database.types";
import { prisma } from "@/lib/prisma";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { TRPCError } from "@trpc/server";

import { getCookie, getCookies } from "@/server/common/cookie";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const callbackUrl = getCookie(request, "authCallbackUrl");
  const cookiesAll = getCookies(request);

  if (code) {
    const supabase = createRouteHandlerClient<Database>({ cookies });
    const result = await supabase.auth.exchangeCodeForSession(code);
    await supabase.auth.updateUser({
      data: { userRole: USER_ROLE },
    });
    const id = result.data.user?.id;
    const email = result.data.user?.email as string;
    const exists = await prisma.user.findFirst({
      where: { email },
    });

    if (!exists) {
      await prisma.user.create({
        data: {
          id: id,
          name: result.data.user?.user_metadata?.username || "User",
          email: result.data.user?.email,
        },
      });
    } else {
      await supabase.auth.updateUser({
        data: { userRole: exists.userRole },
      });
    }
  }

  return NextResponse.redirect(BASE_URL + callbackUrl);
}
