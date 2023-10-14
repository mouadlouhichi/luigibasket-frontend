import { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";
import { BASE_URL } from "@/app";
import { Database } from "@/lib/database.types";
import Iron from "@hapi/iron";
import { createId } from "@paralleldrive/cuid2";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Session } from "@supabase/supabase-js";
import { initTRPC, TRPCError } from "@trpc/server";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { parse, serialize } from "cookie";

import { setCookie } from "@/server/common/cookie";
import { authSchema, loginSchema } from "@/data/valids/auth";

import { procedure, router } from "../../trpc";

const ACCESS_TOKEN_COOKIE = "sb-eruodbvtdlmnrbpqoiqi-auth-token";
const REFRESH_TOKEN_COOKIE = "sb-refresh-token";
const isDefined = <T>(value: T | undefined): value is T => !!value;

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
  login: procedure.input(loginSchema).mutation(async ({ input, ctx }) => {
    const { email, password } = input;
    const exists = await ctx.prisma.user.findFirst({
      where: { email },
    });

    if (!exists) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found.",
      });
    }
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const session = await res.json();
    const { access_token, refresh_token, expires_in } = session;

    if (!session.access_token) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Login failed.",
      });
    }

    const authCookies = [
      { name: ACCESS_TOKEN_COOKIE, value: access_token },
      refresh_token
        ? { name: REFRESH_TOKEN_COOKIE, value: refresh_token }
        : undefined,
    ]
      .filter(isDefined)
      .map(({ name, value }) =>
        serialize(name, value, {
          maxAge: expires_in,
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          path: "/",
          sameSite: "lax",
        }),
      );
    /*  authCookies.forEach((cookie) => {
      ctx.resHeaders.append("Set-Cookie", cookie);
    }); */

    return {
      status: 200,
      message: "Success! Please check your email for further instructions.",
      result: input,
    };
  }),
});

export type IAuthRouter = typeof authRouter;
