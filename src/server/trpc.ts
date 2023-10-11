import { Session } from "@supabase/auth-helpers-nextjs";
import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

import { prisma as db } from "@/data/db";

// eslint-disable-next-line
interface CreateContextOptions {
  session: Session | null;
}

/** Use this helper for:
 * - testing, where we dont have to Mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 **/
export const createContextInner = async (opts: CreateContextOptions) => {
  return {
    session: opts.session,
    prisma: db,
  };
};

export async function createContext(session: Session | null) {
  return { user: session?.user, prisma: db, session };
}

type Context = inferAsyncReturnType<typeof createContext>;
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<Context>().create({
  /**
   * @see https://trpc.io/docs/v10/data-transformers
   */
  transformer: superjson,
  /**
   * @see https://trpc.io/docs/v10/error-formatting
   */
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zod:
          error.cause instanceof ZodError
            ? error.cause.flatten().fieldErrors
            : null,
      },
    };
  },
});

// Base router and procedure helpers
export const router = t.router;
export const procedure = t.procedure;
