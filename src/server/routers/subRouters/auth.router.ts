import { cookies } from "next/headers";
import { BASE_URL } from "@/app";
import { Database } from "@/lib/database.types";
import { createId } from "@paralleldrive/cuid2";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { initTRPC, TRPCError } from "@trpc/server";

import { authSchema } from "@/data/valids/auth";

import { procedure, router } from "../../trpc";

export const authRouter = router({
  signup: procedure.input(authSchema).mutation(async ({ input, ctx }) => {
    const { email, password, username } = input;

    const exists = await ctx.prisma.user.findFirst({
      where: { email },
    });

    if (exists) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "User already exists.",
      });
    }

    return {
      status: 201,
      message: "Success! Please check your email for further instructions.",
      result: input,
    };
  }),
});

export type IAuthRouter = typeof authRouter;
