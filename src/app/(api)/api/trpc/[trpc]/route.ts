/**
 * @see https://youtu.be/qCLV0Iaq9zU
 */

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { appRouter } from "@/server/routers/_app";
import { createContext } from "@/server/trpc";

const handler = async (req: Request) => {
  const session = await getServerSession(authOptions());
  console.log("session@@", session);

  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: async () => await createContext(session),
  });
};

export { handler as GET, handler as POST };
