import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { BASE_URL } from "@/app";
import type { Database } from "@/lib/database.types";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

async function handler(request: Request) {
  const requestUrl = new URL(request.url);

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookieStore,
  });

  const result = await supabase.auth.signOut();

  if (result.error) {
    return new Response(result.error.message, { status: 422 });
  } else {
    return NextResponse.redirect(BASE_URL + "/");
  }
}

export { handler as GET, handler as POST };
