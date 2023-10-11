/**
 * @see https://youtu.be/qCLV0Iaq9zU
 */

import { cookies } from "next/headers";
import { Database } from "@/lib/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { appRouter } from "@/server/routers/_app";
import { createContext } from "@/server/trpc";

const handler = async (req: Request) => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: async () => await createContext(session),
  });
};

export { handler as GET, handler as POST };
