import { createId } from "@paralleldrive/cuid2";
import { initTRPC, TRPCError } from "@trpc/server";
import { hash } from "argon2";

import { authSchema } from "@/data/valids/auth";

import { procedure, router } from "../../trpc";

export const authRouter = router({
  signup: procedure.input(authSchema).mutation(async ({ input, ctx }) => {
    const { email, password } = input;

    const exists = await ctx.prisma.user.findFirst({
      where: { email },
    });

    if (exists) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "User already exists.",
      });
    }

    const hashedPassword = await hash(password);

    const result = await ctx.prisma.user.create({
      data: {
        id: createId(),
        email,
        password: hashedPassword,
        image:
          "https://res.cloudinary.com/dqo2aggjs/image/upload/v1696596420/default-avatar_kqqse2.jpg",
      },
    });

    return {
      status: 201,
      message: "Account created successfully",
      result: result.email,
    };
  }),
});

export type IAuthRouter = typeof authRouter;
